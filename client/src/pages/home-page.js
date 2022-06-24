// import React from "react"
// import { useHistory } from "react-router-dom"
// import StylizedButton from "../components/forms/StylizedButton";
// import StylizedHeading from "../components/generic/StylizedHeading";
// import StylizedSubheading from "../components/generic/StylizedSubheading";

// function HomePage(){
//     const history = useHistory();
//     return(
//         <div>
//             <StylizedHeading>TaskApp</StylizedHeading>
//             <StylizedSubheading>A dynamic scheduling app</StylizedSubheading>
//             <StylizedButton onClick={() => history.push("/register")}>Join Now</StylizedButton>
//             <StylizedButton onClick={() => history.push("/login")}>Login</StylizedButton>
//         </div>
//     )
// }

// export default HomePage

import React from "react"
import { useNavigate } from "react-router-dom"
import StylizedButton from "../components/forms/stylized-button";
import StylizedHeading from "../components/generic/stylized-heading";
import StylizedSubheading from "../components/generic/stylized-subheading";

function HomePage(){
    const history = useNavigate();
    return(
        <div>
            <StylizedHeading>TaskApp</StylizedHeading>
            <StylizedSubheading>A dynamic scheduling app</StylizedSubheading>
            <StylizedButton onClick={() => history("/register")}>Join Now</StylizedButton>
            <StylizedButton onClick={() => history("/login")}>Login</StylizedButton>
        </div>
    )
}

export default HomePage