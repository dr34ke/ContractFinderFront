import { create } from "zustand";
import { Get, Post } from "../api/apiService";

interface UsersProfileStore {
  user: UserProfileDTO;
  setUserProfile: (id:string) =>void;

  users: UserProfileDTO[];
  getProfile: (id: string) => Promise<UserProfileDTO | undefined>;
}

const EMPTY_USER: User = {
  password: "",
  email: "",
};

const UsersProfileStore = create<UsersProfileStore>()((set, get) => ({
  users: [],

  user:{
    id:"",
    first_name:"",
    last_name:""
  },

  setUserProfile:(id:string)=>{
    let userProfile = get().users.find((item) => item.id === id);
    set({user:userProfile});
  },

  getProfile: async (id: string) => {
    let user = get().users.find((item) => item.id === id);
    try {
      if (user === undefined) {
        var response = await Get<UserProfileDTO>(
          "/user/get-public-profile/" + id,
          true
        );
        set({ users: [...get().users, response] });
        user = response;
      }
      return user;
    } catch {
      return undefined;
    }
  },
}));
export default UsersProfileStore;
