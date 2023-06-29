import {create} from 'zustand'
import axios from 'axios'

const useSettingStore = create((set, get) => ({
    theme: fetch() | "light",
    freeTimeProportions: [1,1,1],

    fetch: async() => {
        const res = await axios.get("http://localhost:8282/auth/")
        set({theme: await res.data.settings[0].value})
        return res.data.settings[0].value
    },
    
    toggleTheme: () => set((state) => ({
        theme: state.theme === "light" ? "dark" : "light"
    }))
}))

export default {useSettingStore}