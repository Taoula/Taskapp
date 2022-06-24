import {useState} from "react"

function useToggle  (initialState = false) {
    const [state, setState] = useState(initialState)

    function toggle(){
        setState(state => !state)
        console.log(`toggled from ${!state} to ${state}`)
    }

    return [state, toggle]
}

export default useToggle