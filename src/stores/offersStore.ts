import { create } from "zustand";
import { OfferDTO } from "../models/OfferDTO";
import { Get } from "../api/apiService";
import { showMessage } from "react-native-flash-message";

interface OfferStore {
  offers: OfferDTO[];
  initializeOffers: (
    id: string,
    latitude: number,
    longitude: number,
    distance: number
  ) => Promise<void>;
  categoryId: string;

  offer: OfferDTO | undefined;
  initializeOffer: (id: string, latitude: number, longitude: number) => void;
  offerId: string;

  categories: WorkCategory[] | undefined;
  initializeCategories: () => void;
}
const useOffers = create<OfferStore>()((set, get) => ({
  offers: [],
  categoryId: "",
  initializeOffers: async (
    id: string,
    latitude: number,
    longitude: number,
    distance: number
  ) => {
    if (get().categoryId !== id) {
      try {
        var response = await Get<OfferDTO[]>(
          `/category-offers/${id}?latitude=${latitude}&longitude=${longitude}&distance=${distance}`,
          true
        );
        set({ offers: response, categoryId: id });
      } catch (ex) {
        showMessage({
          message: JSON.parse(ex as string),
          type: "danger",
          duration: 5000,
          icon: "success",
        });
      }
    }
  },
  offer: undefined,
  offerId: "",
  initializeOffer: async (id: string, latitude: number, longitude: number) => {
    if (get().offerId !== id) {
      try {
        var response = await Get<OfferDTO>(
          `/offer/${id}?latitude=${latitude}&longitude=${longitude}`,
          true
        );
        set({ offer: response, offerId: id });
      } catch (ex) {
        showMessage({
          message: JSON.parse(ex as string),
          type: "danger",
          duration: 5000,
          icon: "success",
        });
      }
    }
  },

  categories: undefined,
  initializeCategories: async () => {
    var response = await Get<WorkCategory[]>(
      `/categories-names`,
      true
    );
    set({ categories: response });
  },
}));
export default useOffers;
