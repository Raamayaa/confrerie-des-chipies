import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { NotificationService } from "@/lib/services/notification.service";

import NotificationList from "@/components/notifications/NotificationList";

export default async function NotificationsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const notifications =
    await NotificationService.getByProfile(
      session.user.id
    );

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-5xl px-8 pb-20 pt-36">
        <div className="mb-10">
          <h1 className="text-5xl font-black">
            🔔 Notifications
          </h1>

          <p className="mt-3 text-muted-foreground">
            Toutes tes notifications.
          </p>
        </div>

        <NotificationList
          notifications={notifications}
        />
      </main>
    </>
  );
}