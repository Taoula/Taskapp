import { create } from "zustand";
import axios from "axios";

const useSettingStore = create((set) => ({
  theme: "light", // A default value
  refreshSettings: async () => {
    try {
      const response = await axios.get("http://localhost:8282/settings");
      set({ theme: response.data.theme });

      if (response.data.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      console.log(response.data.theme);
    } catch (err) {
      console.error(err);
    }
  },
}));

// Call refreshSettings to initialize theme from API
useSettingStore.getState().refreshSettings();

export default useSettingStore;
