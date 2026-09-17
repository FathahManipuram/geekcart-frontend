import { useEffect } from "react";
import socket from "./socket";

import { useNotificationStore } from "@/features/user-side/notification/stores/notification.store";
import { useAuthStore } from "@/features/auth/store/auth.store";

const SocketProvider = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  // Use individual Zustand selectors to prevent unnecessary re-renders
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );
  const fetchUnreadCount = useNotificationStore(
    (state) => state.fetchUnreadCount,
  );
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  // 1. Register global socket event listeners ONCE on mount
  useEffect(() => {
    const handleWelcome = (data) => {
      console.log("Server:", data?.message);
    };

    const handleNotification = (notification) => {
      console.log("New notification received:", notification);
      addNotification(notification);
    };

    const handleDisconnect = (reason) => {
      console.log("Socket disconnected:", reason);
    };

    socket.on("welcome", handleWelcome);
    socket.on("notification", handleNotification);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("welcome", handleWelcome);
      socket.off("notification", handleNotification);
      socket.off("disconnect", handleDisconnect);
    };
  }, [addNotification]);

  // 2. Handle room joining & initial fetching when `user._id` or connection status changes
  useEffect(() => {
    if (!user?._id) return;

    // Fetch initial notification state from DB
    fetchNotifications();
    fetchUnreadCount();

    const joinUserRoom = () => {
      console.log("Joining room for user:", user._id);
      socket.emit("join-room", user._id);
    };

    // If socket is already connected, join room immediately
    if (socket.connected) {
      joinUserRoom();
    }

    // Also listen for re-connections (e.g. server restart or network drop)
    socket.on("connect", joinUserRoom);

    return () => {
      socket.off("connect", joinUserRoom);
    };
  }, [user?._id, fetchNotifications, fetchUnreadCount]);

  return children;
};

export default SocketProvider;
