type Notification = {
  id: string;
  title: string;
  message: string;
  created_at: string | null;
  is_read: boolean | null;
};

type Props = {
  notifications: Notification[];
};

export default function NotificationList({
  notifications,
}: Props) {
  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="rounded-3xl border bg-card p-8 text-center">
          <div className="text-5xl">
            🔕
          </div>

          <p className="mt-4 text-muted-foreground">
            Aucune notification.
          </p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-3xl border p-6 transition ${
              notification.is_read
                ? "bg-card"
                : "border-violet-500 bg-violet-500/10"
            }`}
          >
            <h2 className="text-xl font-bold">
              {notification.title}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {notification.message}
            </p>

            {notification.created_at && (
              <p className="mt-4 text-xs text-muted-foreground">
                {new Date(
                  notification.created_at
                ).toLocaleString("fr-FR")}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}