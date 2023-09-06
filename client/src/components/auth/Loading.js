import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../context/auth-context';
import axios from 'axios'
import useSettingStore from "../../context/useSettingStore";


export default function Loading(){

    const history = useNavigate();
    const { getLoggedIn } = useContext(AuthContext);
    const refreshSettings = useSettingStore((state) => state.refreshSettings);

    const addSchedule = async function(){
        const savedSchedule = await axios.post("http://localhost:8282/schedule", {}, {})
    }

    const addStat = async function(){
        const savedStat = await axios.post("http://localhost:8282/userStat/", {})
    }

    const addSettings = async function(){
        const savedSettings = await axios.post("http://localhost:8282/settings/", {})
    }

    const initialize = async function(){
        const scheduleReq = await axios.get("http://localhost:8282/schedule/")
        const schedule = scheduleReq.data

        const statReq = await axios.get("http://localhost:8282/userStat/")
        const stat = statReq.data

        const settingsReq = await axios.get("http://localhost:8282/settings/")
        const settings = settingsReq.data

        if (schedule == null){
            addSchedule()
        } 
        if (stat == null){
            addStat()
        }
        if (settings == null){
            addSettings()
        }

        getLoggedIn()
        refreshSettings()
        history("/dashboard/schedule")
    }

    useEffect(()=> {
        initialize()
    }, [])

    return(
        <>
            <h1>Setting Up Your Account</h1>
            <p>This should only take a moment</p>
        </>
    )
}