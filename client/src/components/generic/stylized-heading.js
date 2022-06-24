// import React from "react"
// import styled from "styled-components"

// const StyledHeading = styled.h1`
//     font-size:3em;
//     margin-top:2em;
//     text-align:center;
// `

// function StylizedHeading(props){
//     return(
//         <StyledHeading>{props.children}</StyledHeading>
//     )
// }

// export default StylizedHeading

import React from "react"

export default function StylizedHeading(props) {

    return (

        <h1 className="text-3xl font-bold underline text-sky-400">{props.children}</h1>
    )
}