import { create } from "zustand";

import {
  createOfferApi,
  getOffersApi,
  getOfferDetailsApi,
  updateOfferApi,
  deleteOfferApi,
  toggleOfferStatusApi,
} from "../api/offer.api";

export const useOfferStore = create((set, get) => ({
  loading: false,

  offers: [],
  offer: null,
  pagination: null,
  stats: [],

  // Create offer
  createOffer: async (payload) => {
    try {
      set({
        loading: true,
      });
      const res = await createOfferApi(payload);
      return res;
    } catch (err) {
      set({
        loading: false,
      });
      throw err;
    }
  },

  // Fetch all offers
  fetchOffers: async (params) => {
    set({
      loading: true,
    });

    try {
      const res = await getOffersApi(params);
      set({
        offers: res.data.offers,
        pagination: res.data.pagination,
        stats: res.data.stats,
        loading: false,
      });

      return res;
    } catch (err) {
      set({
        loading: false,
      });
      throw err;
    }
  },

  //Get offer details
  getOfferDetails: async (offerId) => {
    try {
      set({
        loading: true,
      });

      const res = await getOfferDetailsApi(offerId);

      set({
        offer: res.data,
        loading: false,
      });

      return res;
    } catch (err) {
      set({
        loading: false,
      });
      throw err;
    }
  },

  updateOffer: async (offerId, payload) => {
    set({
      loading: true,
    });

    try {
      const res = await updateOfferApi(offerId, payload);
      set({
        loading: false,
      });
      return res.data;
    } catch (err) {
      set({
        loading: false,
      });
      throw err;
    }
  },

  deleteOffer: async (offerId) => {
    try {
      set({
        loading: true,
      });

      const res = await deleteOfferApi(offerId);
      set({
        loading: false,
      });

      get().fetchOffers();
      return res.data;
    } catch (err) {
      set({
        loading: false,
      });
      throw err;
    }
  },

  toggleOfferStatus: async (offerId) => {
    try {
      set({
        loading: true,
      });

      const res = await toggleOfferStatusApi(offerId);
      set({
        loading: false,
      });

      get().fetchOffers();
      return res.data;
    } catch (err) {
      set({
        loading: false,
      });
      throw err;
    }
  },
}));
