import {create} from 'zustand'
import dayjs from 'dayjs'

const useGlobalStore = create((set, get) => ({
    currentDay: dayjs(),
    incrementDay: () => set((state) => ({ currentDay: state.currentDay.add(1, 'day') })),
    decrementDay: () => set((state) => ({ currentDay: state.currentDay.subtract(1, 'day')})),
    resetDay: () => set({ currentDay: dayjs()}),
    jumpToDay: (date) => set({ currentDay: date}),
    isToday: () => get().currentDay.isSame(dayjs(), 'day'),
}))

export default useGlobalStore