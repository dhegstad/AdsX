"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { inviteMember, removeMember, updateMemberRole } from "@/lib/actions/member";

interface Member {
  id: string;
  role: string;
  createdAt: Date;
  userId: string;
  userName: string | null;
  userEmail: string;
  userImage: string | null;
}

interface MembersSettingsProps {
  organizationId: string;
  members: Member[];
  canManageMembers: boolean;
  currentUserRole: string;
  currentUserId: string;
}

export function MembersSettings({
  organizationId,
  members,
  canManageMembers,
  currentUserRole,
  currentUserId,
}: MembersSettingsProps) {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"member" | "admin">("member");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError("");
    setInviteSuccess(false);
    setInviteLoading(true);

    try {
      const result = await inviteMember({
        organizationId,
        email: inviteEmail,
        role: inviteRole,
        inviterId: currentUserId,
      });

      if (!result.success) {
        setInviteError(result.error || "Failed to send invitation");
        setInviteLoading(false);
        return;
      }

      setInviteSuccess(true);
      setInviteLoading(false);

      setTimeout(() => {
        setInviteOpen(false);
        setInviteEmail("");
        setInviteRole("member");
        setInviteSuccess(false);
        router.refresh();
      }, 1500);
    } catch (err) {
      setInviteError("An unexpected error occurred");
      setInviteLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) {
      return;
    }

    const result = await removeMember({
      memberId,
      organizationId,
      userId: currentUserId,
    });

    if (result.success) {
      router.refresh();
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: "member" | "admin" | "owner") => {
    const result = await updateMemberRole({
      memberId,
      organizationId,
      newRole,
      userId: currentUserId,
    });

    if (result.success) {
      router.refresh();
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "owner":
        return "default";
      case "admin":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email[0].toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team members</CardTitle>
            <CardDescription>
              Manage who has access to this organization
            </CardDescription>
          </div>
          {canManageMembers && (
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite team member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your organization
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite}>
                  <div className="space-y-4 py-4">
                    {inviteError && (
                      <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                        {inviteError}
                      </div>
                    )}

                    {inviteSuccess && (
                      <div className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-600">
                        Invitation sent successfully!
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="colleague@company.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        disabled={inviteLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={inviteRole}
                        onValueChange={(value) => setInviteRole(value as "member" | "admin")}
                        disabled={inviteLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Admins can manage members and settings. Members have read-only access.
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setInviteOpen(false)}
                      disabled={inviteLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={inviteLoading}>
                      {inviteLoading ? "Sending..." : "Send invitation"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => {
            const isCurrentUser = member.userId === currentUserId;
            const canModifyMember =
              canManageMembers &&
              !isCurrentUser &&
              member.role !== "owner" &&
              (currentUserRole === "owner" || member.role === "member");

            return (
              <div
                key={member.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.userImage || undefined} />
                    <AvatarFallback>
                      {getInitials(member.userName, member.userEmail)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">
                        {member.userName || member.userEmail}
                      </p>
                      {isCurrentUser && (
                        <Badge variant="outline" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.userEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={getRoleBadgeVariant(member.role)}>
                    {member.role}
                  </Badge>

                  {canModifyMember && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {member.role === "member" && (
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(member.id, "admin")}
                          >
                            Promote to admin
                          </DropdownMenuItem>
                        )}
                        {member.role === "admin" && currentUserRole === "owner" && (
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(member.id, "member")}
                          >
                            Demote to member
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
