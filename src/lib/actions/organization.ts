"use server";

import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

export async function createOrganization(data: {
  name: string;
  userId: string;
}) {
  try {
    const slug = generateSlug(data.name);

    // Check if slug already exists
    const existing = await db
      .select()
      .from(organization)
      .where(eq(organization.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      // Add random suffix if slug exists
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const uniqueSlug = `${slug}-${randomSuffix}`;

      const [newOrg] = await db
        .insert(organization)
        .values({
          name: data.name,
          slug: uniqueSlug,
        })
        .returning();

      // Add user as owner
      await db.insert(member).values({
        organizationId: newOrg.id,
        userId: data.userId,
        role: "owner",
      });

      return { success: true, organization: newOrg };
    }

    // Create organization
    const [newOrg] = await db
      .insert(organization)
      .values({
        name: data.name,
        slug,
      })
      .returning();

    // Add user as owner
    await db.insert(member).values({
      organizationId: newOrg.id,
      userId: data.userId,
      role: "owner",
    });

    return { success: true, organization: newOrg };
  } catch (error) {
    console.error("Error creating organization:", error);
    return { success: false, error: "Failed to create organization" };
  }
}

export async function updateOrganization(data: {
  organizationId: string;
  name: string;
  userId: string;
}) {
  try {
    // Check if user has permission (owner or admin)
    const [membership] = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, data.organizationId),
          eq(member.userId, data.userId)
        )
      )
      .limit(1);

    if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
      return { success: false, error: "Unauthorized" };
    }

    const [updated] = await db
      .update(organization)
      .set({ name: data.name, updatedAt: new Date() })
      .where(eq(organization.id, data.organizationId))
      .returning();

    return { success: true, organization: updated };
  } catch (error) {
    console.error("Error updating organization:", error);
    return { success: false, error: "Failed to update organization" };
  }
}

export async function getUserOrganizations(userId: string) {
  try {
    const userOrgs = await db
      .select({
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        role: member.role,
      })
      .from(member)
      .innerJoin(organization, eq(member.organizationId, organization.id))
      .where(eq(member.userId, userId));

    return { success: true, organizations: userOrgs };
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return { success: false, organizations: [] };
  }
}

export async function getOrganizationMembers(organizationId: string) {
  try {
    // Import user from schema
    const { user } = await import("@/lib/db/schema");

    const members = await db
      .select({
        id: member.id,
        role: member.role,
        createdAt: member.createdAt,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
      })
      .from(member)
      .innerJoin(user, eq(member.userId, user.id))
      .where(eq(member.organizationId, organizationId));

    return { success: true, members };
  } catch (error) {
    console.error("Error fetching members:", error);
    return { success: false, members: [] };
  }
}

export async function deleteOrganization(data: {
  organizationId: string;
  userId: string;
}) {
  try {
    // Check if user is the owner
    const [membership] = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, data.organizationId),
          eq(member.userId, data.userId)
        )
      )
      .limit(1);

    if (!membership || membership.role !== "owner") {
      return { success: false, error: "Only the organization owner can delete the organization" };
    }

    // Delete all members (cascade will handle this, but we do it explicitly)
    await db.delete(member).where(eq(member.organizationId, data.organizationId));

    // Delete the organization
    await db.delete(organization).where(eq(organization.id, data.organizationId));

    return { success: true };
  } catch (error) {
    console.error("Error deleting organization:", error);
    return { success: false, error: "Failed to delete organization" };
  }
}
