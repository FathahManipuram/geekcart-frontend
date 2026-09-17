// import { formatDistanceToNow } from "date-fns";
import { useNotificationStore } from "../stores/notification.store";

const NotificationItem = ({ notification }) => {
  const markAsRead = useNotificationStore((state) => state.markAsRead);

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`hover:bg-muted/50 cursor-pointer border-b p-4 transition ${
        !notification.isRead ? "bg-muted/20" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1.5 flex-shrink-0">
          {!notification.isRead ? (
            <div className="h-2 w-2 rounded-full bg-blue-600" />
          ) : (
            <div className="h-2 w-2" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <h4 className="text-sm leading-none font-medium">
            {notification.title}
          </h4>

          <p className="text-muted-foreground line-clamp-2 text-xs">
            {notification.message}
          </p>

          {notification.createdAt && (
            <span className="text-muted-foreground block pt-1 text-[10px]">
              {/* {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })} */}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
