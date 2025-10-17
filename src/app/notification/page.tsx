import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockNotifications, getImageById } from "@/lib/mock-data";
import { Bell, MessageCircle, Trash2, UserPlus } from "lucide-react";

export default function NotificationPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <ul className="divide-y">
            {mockNotifications.map((notification, index) => {
              const userAvatar = notification.user ? getImageById(notification.user.avatarId) : null;
              const isLast = index === mockNotifications.length - 1;
              return (
                <li key={notification.id} className={`flex items-start gap-4 p-4 ${isLast ? '' : 'border-b'}`}>
                  <div className="mt-1">
                    {notification.type === 'follow' && <UserPlus className="h-5 w-5 text-primary" />}
                    {notification.type === 'comment' && <MessageCircle className="h-5 w-5 text-green-500" />}
                    {notification.type === 'report' && <Bell className="h-5 w-5 text-destructive" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {notification.user && userAvatar && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={userAvatar.imageUrl} alt={notification.user.name} />
                          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <p className="text-sm">
                        {notification.type === 'follow' && (
                          <>
                            <span className="font-semibold">{notification.user?.name}</span> started following you.
                          </>
                        )}
                        {notification.type === 'comment' && (
                          <>
                            <span className="font-semibold">{notification.user?.name}</span> commented: "
                            <span className="italic text-muted-foreground">{notification.commentContent}</span>"
                          </>
                        )}
                        {notification.type === 'report' && (
                          <span className="font-semibold">A comment was reported: </span>
                        )}
                      </p>
                    </div>
                     {notification.type === 'report' && <p className="italic text-muted-foreground text-sm">{notification.commentContent}</p>}
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                  {notification.type === 'report' && (
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
