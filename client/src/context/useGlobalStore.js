import { create } from "zustand";
import dayjs from "dayjs";

const useGlobalStore = create((set, get) => ({
  currentDay: dayjs(),
  taskLayout: 1,
  currentFolder: "global",

  incrementDay: () =>
    set((state) => ({ currentDay: state.currentDay.add(1, "day") })),

  decrementDay: () =>
    set((state) => ({ currentDay: state.currentDay.subtract(1, "day") })),

  resetDay: () => set({ currentDay: dayjs() }),

  jumpToDay: (date) => set({ currentDay: date }),

  isToday: () => get().currentDay.isSame(dayjs(), "day"),

  setTaskLayout: (newLayout) => set({ taskLayout: newLayout }),

  changeFolder: (folderId) => set({ currentFolder: folderId})
}));

export default useGlobalStore;
