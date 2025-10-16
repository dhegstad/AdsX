"use server";

import { db } from "@/lib/db/client";
import { member, invitation } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function inviteMember(data: {
  organizationId: string;
  email: string;
  role: "member" | "admin";
  inviterId: string;
}) {
  try {
    // Check if inviter has permission (owner or admin)
    const [inviterMembership] = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, data.organizationId),
          eq(member.userId, data.inviterId)
        )
      )
      .limit(1);

    if (!inviterMembership || (inviterMembership.role !== "owner" && inviterMembership.role !== "admin")) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if user is already a member
    const { user } = await import("@/lib/db/schema");
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, data.email))
      .limit(1);

    if (existingUser) {
      const [existingMember] = await db
        .select()
        .from(member)
        .where(
          and(
            eq(member.organizationId, data.organizationId),
            eq(member.userId, existingUser.id)
          )
        )
        .limit(1);

      if (existingMember) {
        return { success: false, error: "User is already a member" };
      }
    }

    // Check if invitation already exists
    const [existingInvitation] = await db
      .select()
      .from(invitation)
      .where(
        and(
          eq(invitation.organizationId, data.organizationId),
          eq(invitation.email, data.email),
          eq(invitation.status, "pending")
        )
      )
      .limit(1);

    if (existingInvitation) {
      return { success: false, error: "Invitation already sent" };
    }

    // Create invitation
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    const [newInvitation] = await db
      .insert(invitation)
      .values({
        organizationId: data.organizationId,
        email: data.email,
        role: data.role,
        invitedBy: data.inviterId,
        expiresAt,
      })
      .returning();

    // TODO: Send email with invitation link
    console.log("Send invitation email to:", data.email, "Token:", newInvitation.token);

    return { success: true, invitation: newInvitation };
  } catch (error) {
    console.error("Error inviting member:", error);
    return { success: false, error: "Failed to send invitation" };
  }
}

export async function removeMember(data: {
  memberId: string;
  organizationId: string;
  userId: string;
}) {
  try {
    // Check if user has permission (owner or admin)
    const [userMembership] = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, data.organizationId),
          eq(member.userId, data.userId)
        )
      )
      .limit(1);

    if (!userMembership || (userMembership.role !== "owner" && userMembership.role !== "admin")) {
      return { success: false, error: "Unauthorized" };
    }

    // Get the member to remove
    const [memberToRemove] = await db
      .select()
      .from(member)
      .where(eq(member.id, data.memberId))
      .limit(1);

    if (!memberToRemove) {
      return { success: false, error: "Member not found" };
    }

    // Cannot remove yourself
    if (memberToRemove.userId === data.userId) {
      return { success: false, error: "Cannot remove yourself" };
    }

    // Cannot remove owner
    if (memberToRemove.role === "owner") {
      return { success: false, error: "Cannot remove organization owner" };
    }

    // Only owner can remove admin
    if (memberToRemove.role === "admin" && userMembership.role !== "owner") {
      return { success: false, error: "Only owner can remove admins" };
    }

    // Remove member
    await db.delete(member).where(eq(member.id, data.memberId));

    return { success: true };
  } catch (error) {
    console.error("Error removing member:", error);
    return { success: false, error: "Failed to remove member" };
  }
}

export async function updateMemberRole(data: {
  memberId: string;
  organizationId: string;
  newRole: "member" | "admin" | "owner";
  userId: string;
}) {
  try {
    // Check if user has permission (only owner can change roles)
    const [userMembership] = await db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, data.organizationId),
          eq(member.userId, data.userId)
        )
      )
      .limit(1);

    if (!userMembership || userMembership.role !== "owner") {
      return { success: false, error: "Only owner can change member roles" };
    }

    // Get the member to update
    const [memberToUpdate] = await db
      .select()
      .from(member)
      .where(eq(member.id, data.memberId))
      .limit(1);

    if (!memberToUpdate) {
      return { success: false, error: "Member not found" };
    }

    // Cannot change owner role
    if (memberToUpdate.role === "owner" || data.newRole === "owner") {
      return { success: false, error: "Cannot change owner role" };
    }

    // Update role
    const [updated] = await db
      .update(member)
      .set({ role: data.newRole })
      .where(eq(member.id, data.memberId))
      .returning();

    return { success: true, member: updated };
  } catch (error) {
    console.error("Error updating member role:", error);
    return { success: false, error: "Failed to update member role" };
  }
}
