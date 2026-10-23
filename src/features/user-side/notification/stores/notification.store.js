import { create } from "zustand";
import {
  getNotificationsApi,
  getUnreadCountApi,
  markAllNotificationsAsReadApi,
  markNotificationAsReadApi,
} from "../api/notification.api";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,


  fetchNotifications: async (page = 1) => {
    set({ loading: true });
    try {
      // Direct API call: unwrap `res.data.data`
      const res = await getNotificationsApi(page);
      const data = res.data;


      const notificationList = Array.isArray(data)
        ? data
        : data?.notifications || [];

      set({
        notifications: notificationList,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error("Failed to fetch notifications:", error);
    }
  },

  fetchUnreadCount: async () => {
    try {
      const res = await getUnreadCountApi();
      const data = res.data;
      set({
        unreadCount: data?.unreadCount ?? 0,
      });
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  },

  markAsRead: async (id) => {
    // Optimistic UI update
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n,
      ),
      unreadCount: Math.max(state.unreadCount - 1, 0),
    }));

    try {
      await markNotificationAsReadApi(id);
    } catch (error) {
      // Revert/refresh on failure
      get().fetchNotifications();
      get().fetchUnreadCount();
    }
  },

  markAllRead: async () => {
    // Optimistic UI update
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));

    try {
      await markAllNotificationsAsReadApi();
    } catch (error) {
      get().fetchNotifications();
      get().fetchUnreadCount();
    }
  },

  addNotification: (notification) =>
    set((state) => ({
      // Avoid duplicate items
      notifications: [
        notification,
        ...state.notifications.filter((n) => n._id !== notification._id),
      ],
      unreadCount: state.unreadCount + 1,
    })),
}));
