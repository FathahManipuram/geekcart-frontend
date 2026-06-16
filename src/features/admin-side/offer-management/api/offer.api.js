import adminApi from "@/services/adminApi";

export const createOfferApi = async (payload) =>
  adminApi.post("/admin/offers", payload);

export const getOffersApi = async (params) =>
  adminApi.get("/admin/offers", {
    params,
  });

export const getOfferDetailsApi = async (offerId) =>
  adminApi.get(`/admin/offers/${offerId}`);

export const updateOfferApi = async (offerId, payload) =>
  adminApi.patch(`/admin/offers/${offerId}`, payload);

export const deleteOfferApi = async (offerId) =>
  adminApi.delete(`/admin/offers/${offerId}`);

export const toggleOfferStatusApi = async (offerId) =>
  adminApi.patch(`/admin/offers/${offerId}/status`);
