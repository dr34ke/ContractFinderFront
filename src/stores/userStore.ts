import { create } from "zustand";
import { Get, Post } from "../api/apiService";
import { storeToken } from "../helpers/TokenHelper";

interface UserStore {
  user: User;
  userProfile: UserProfile;
  userPreference: UserPreference;
  userInitialized: boolean;
  userProfileInitialized: boolean;
  userPreferenceInitialized: boolean;
  initializeUser: (email: string, password: string) => Promise<void>;
  initializeUserProfile: () => Promise<void>;
  initializeUserPreference: () => Promise<void>;

  loginState: "loading" | "idle" | "success" | "error";
  loginResponse: string;

  profileState: "loading" | "idle" | "success" | "error";
  profileResponse: string;
}

const EMPTY_USER: User = {
  password: "",
  email: "",
};

const UserStore = create<UserStore>()((set, get) => ({
  user: EMPTY_USER,
  userProfile: {},
  userPreference: {},
  userInitialized: false,
  userPreferenceInitialized: false,
  userProfileInitialized: false,

  loginState: "idle",
  loginResponse: "",

  profileState: "idle",
  profileResponse: "",

  initializeUser: async (email: string, password: string) => {
    if (!get().userInitialized) {
      let _usr: User = {
        email: email,
        password: password,
      };
      try {
        var response = await Post<User>(_usr, "/user/login", false);
        try {
          storeToken(response.token!);
          set({ user: response, loginState: "success", userInitialized: true });
        } catch (ex) {
          set({ loginState: "error", loginResponse: "Błąd logowania" });
        }
      } catch (ex) {
        const json = JSON.parse(ex as string);
        set({ loginState: "error", loginResponse: json as string });
      }
    }
  },
  initializeUserProfile: async () => {
    if (!get().userProfileInitialized) {
        try {
            console.log("/user/get-profile/"+get().user.id);
            var response = await Get<UserProfile>("/user/get-profile/"+get().user.id, true);
            console.log(response);
            try {
              set({ userProfile: response, profileState: "success", userProfileInitialized: true });
            } catch (ex) {
              set({ profileState: "error", profileResponse: "Błąd pobierania profilu" });
            }
          } catch (ex) {
            const json = JSON.parse(ex as string);
            set({ profileState: "error", profileResponse: json as string });
          }
    }
  },
  initializeUserPreference: async () => {},
}));
export default UserStore;
