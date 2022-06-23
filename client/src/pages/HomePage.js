import React from "react"
import { useHistory } from "react-router-dom"
import StylizedButton from "../components/forms/StylizedButton";
import StylizedHeading from "../components/generic/StylizedHeading";
import StylizedSubheading from "../components/generic/StylizedSubheading";

function HomePage(){
    const history = useHistory();
    return(
        <div>
            <StylizedHeading>TaskApp</StylizedHeading>
            <StylizedSubheading>A dynamic scheduling app</StylizedSubheading>
            <StylizedButton onClick={() => history.push("/register")}>Join Now</StylizedButton>
            <StylizedButton onClick={() => history.push("/login")}>Login</StylizedButton>
        </div>
    )
}

export default HomePage