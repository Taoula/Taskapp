import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useSettingStore = create(
  persist(
    (set) => ({
  theme: "light", // A default value
  refreshSettings: async () => {
    try {
      const response = await axios.get("http://localhost:8282/settings");
      set({ theme: response.data.theme });

      console.log(response.data.theme);
    } catch (err) {
      console.error(err);
    }
  },
}),
  {
    name: "theme",
  }
));

// Call refreshSettings to initialize theme from API
useSettingStore.getState().refreshSettings();

export default useSettingStore;
