import React from "react"

export default function StylizedHeading(props) {

    return (

        <h1 className="text-3xl font-bold underline text-sky-400">{props.children}</h1>
    )
}