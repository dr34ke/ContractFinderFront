import { create } from "zustand";
import { Offer } from "../models/Offer";
import { Get } from "../api/apiService";
import { showMessage } from "react-native-flash-message";

interface OfferStore {
    offers: Offer[];
    initializeOffers: (id:string, latitude:number, longitude:number, distance:number) => Promise<void>;
    categoryId: string;
  }
  const useOffers = create<OfferStore>()((set,get) => ({
    offers:[],
    categoryId:"",
    initializeOffers: async (id:string, latitude:number, longitude:number, distance:number) => {
        if(get().categoryId!==id){
            try {
                var response = await Get<Offer[]>(`/category-offers/${id}?latitude=${latitude}&longitude=${longitude}&distance=${distance}`, true);
                set({offers: response, categoryId:id})
              } catch (ex) {
                showMessage({
                  message: JSON.parse(ex as string),
                  type: "danger",
                  duration: 5000,
                  icon: "success",
                });
              }
        }
       
    }
  }))
  export default useOffers;