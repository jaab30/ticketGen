import React from "react";

export function H1(props) {
    return <h1 {...props}>{props.children}</h1>
};

export function P(props) {
    return <p {...props}>{props.children}</p>
};


export function Span(props) {
    return <span {...props}>{props.children}</span>
};

export function Img(props) {
    return <img alt={props.alt} {...props} />
}
