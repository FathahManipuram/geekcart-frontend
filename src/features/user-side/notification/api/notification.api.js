import userApi from "@/services/userApi";


export const getNotificationsApi = (page = 1, limit = 20) =>
  userApi.get(`/notifications?page=${page}&limit=${limit}`);

export const getUnreadCountApi = () => userApi.get("/notifications/unread-count");

export const markNotificationAsReadApi = (id) =>
  userApi.patch(`/notifications/${id}/read`);

export const markAllNotificationsAsReadApi = () =>
  userApi.patch("/notifications/read-all");
