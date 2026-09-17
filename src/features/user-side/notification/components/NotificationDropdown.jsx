import { useState } from "react";
import { Bell, BellOff, CheckCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useNotificationStore } from "../stores/notification.store";
import NotificationItem from "./NotificationItem";
import NotificationBell from "./NotificationBell";

const NotificationDropdown = () => {
  const [activeTab, setActiveTab] = useState("unread");

  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const notifications = useNotificationStore((state) => state.notifications);

  const loading = useNotificationStore((state) => state.loading);

  const markAllRead = useNotificationStore((state) => state.markAllRead);

  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );


  const handleOpenChange = (isOpen) => {
    if (isOpen) {
      // Every time bell opens,
      // start with unread notifications
      setActiveTab("unread");

      fetchNotifications();
  
    }
  };

  const displayedNotifications =
    activeTab === "unread"
      ? notifications.filter((notification) => !notification.isRead)
      : notifications;

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      {/* Bell */}
      <DropdownMenuTrigger asChild>
        <button>
          <NotificationBell />
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent align="end" className="w-80 p-0 sm:w-96">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-semibold">Notification</h3>

            <p className="text-muted-foreground text-xs">
              {unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "No unread notifications"}
            </p>
          </div>

          {/* Mark all */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              title="Mark all as read"
              className="hover:bg-muted flex h-9 w-9 items-center justify-center rounded-lg"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b p-3">
          {/* Unread */}
          <button
            type="button"
            onClick={() => setActiveTab("unread")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === "unread"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Unread
            <span
              className={`rounded-md px-1.5 py-0.5 text-xs ${
                activeTab === "unread" ? "bg-white/20" : "bg-muted"
              }`}
            >
              {unreadCount}
            </span>
          </button>

          {/* All */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
        </div>

        {/* Notification list */}
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="text-muted-foreground p-8 text-center text-sm">
              Loading notifications...
            </div>
          ) : displayedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10">
              <BellOff className="text-muted-foreground mb-3 h-10 w-10" />

              <p className="text-muted-foreground text-sm">
                {activeTab === "unread"
                  ? "No unread notifications"
                  : "No notifications found"}
              </p>
            </div>
          ) : (
            displayedNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
