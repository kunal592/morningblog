
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/profile/${user.id}`}>
      <div className="flex items-center gap-4 p-4 border rounded-lg">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.profileImage || ""} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </Link>
  );
}
