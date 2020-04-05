import React from "react";



export function P(props){
    return (
        <p {...props}>{props.children}</p>
    )
}


export function Span(props){
    return (
        <span {...props}>{props.children}</span>
    )
}