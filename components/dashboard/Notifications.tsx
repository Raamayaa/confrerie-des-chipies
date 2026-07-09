import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { Bell } from "lucide-react";

import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function Notifications() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("profile_id", session.user.id)
    .order("created_at", {
      ascending: false,
    })
    .limit(6);

  return (
    <Card className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <Bell className="h-6 w-6 text-violet-500" />

        <h2 className="text-2xl font-bold">
          Notifications
        </h2>
      </div>

      {notifications?.length ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-xl border p-4"
            >
              <h3 className="font-semibold">
                {notification.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {notification.message}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(
                  notification.created_at
                ).toLocaleString("fr-FR")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Aucune notification.
        </p>
      )}
    </Card>
  );
}