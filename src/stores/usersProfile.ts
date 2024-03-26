import { create } from "zustand";
import { Get, Post } from "../api/apiService";
import { storeToken } from "../helpers/TokenHelper";

interface UsersProfileStore {
  users: UserProfileDTO[];
  getProfile: (id: string) => Promise<UserProfileDTO|undefined>;
}

const EMPTY_USER: User = {
  password: "",
  email: "",
};

const UsersProfileStore = create<UsersProfileStore>()((set, get) => ({
  users: [],

  getProfile: async (id: string) => {
    let user = get().users.find((item) => item.id === id);
    try{
        if (user === undefined) {
            var response = await Get<UserProfileDTO>("/user/get-public-profile/" + id, true);
            set({ users: [...get().users, response] });
            user=response;
          }
          return user;
    }
    catch{
        return undefined
    }  
  },
}));
export default UsersProfileStore;
