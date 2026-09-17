import { getNotificationsApi, getUnreadCountApi, markAllNotificationsAsReadApi, markNotificationAsReadApi } from "../api/notification.api.js";

export const getNotificationsService = async (page, limit) => {
  const { data } = await getNotificationsApi(page, limit);

  return data.data;
};

export const getUnreadCountService = async () => {
  const { data } = await getUnreadCountApi();

  return data.data;
};

export const markNotificationAsReadService = async (id) => {
  const { data } = await markNotificationAsReadApi(id);

  return data.data;
};

export const markAllNotificationsAsReadService = async () => {
  const { data } = await markAllNotificationsAsReadApi();

  return data.data;
};
