import { useEffect } from "react";
import socket from "./socket";

import { useNotificationStore } from "@/features/user-side/notification/stores/notification.store";
import { useAuthStore } from "@/features/auth/store/auth.store";

const SocketProvider = ({ children }) => {
  const userId = useAuthStore((state) => state.user?._id);

  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );

  const fetchUnreadCount = useNotificationStore(
    (state) => state.fetchUnreadCount,
  );

  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  // --------------------------------
  // Global socket listeners
  // --------------------------------

  useEffect(() => {
    const handleWelcome = (data) => {
      console.log("Server:", data?.message);
    };

    const handleNotification = (notification) => {
      console.log("New notification:", notification);

      addNotification(notification);
    };

    const handleDisconnect = (reason) => {
      console.log("Socket disconnected:", reason);
    };

    const handleConnectError = (error) => {
      console.error("Socket connection error:", error.message);
    };

    socket.on("welcome", handleWelcome);
    socket.on("notification", handleNotification);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("welcome", handleWelcome);
      socket.off("notification", handleNotification);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
    };
  }, [addNotification]);

  // --------------------------------
  // User-specific socket handling
  // --------------------------------

  useEffect(() => {
    if (!userId) return;

    const syncNotifications = async () => {
      try {
        await Promise.all([fetchNotifications(), fetchUnreadCount()]);
      } catch (error) {
        console.error("Failed to sync notifications:", error);
      }
    };

    const handleConnect = async () => {
      console.log("Socket connected:", socket.id);

      // Ideally the server should derive the user
      // from the authenticated socket rather than
      // trusting a client-provided userId.
      socket.emit("join-room", userId);

      // Sync missed notifications
      await syncNotifications();
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [userId, fetchNotifications, fetchUnreadCount]);

  return children;
};

export default SocketProvider;