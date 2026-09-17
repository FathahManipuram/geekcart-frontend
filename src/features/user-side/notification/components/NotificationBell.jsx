import { Bell, ShoppingBag } from "lucide-react";
import { useNotificationStore } from "../stores/notification.store";

const NotificationBell = () => {
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <div className="relative">
      <Bell className="h-5 w-5 cursor-pointer" />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
