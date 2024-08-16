import React from "react";

export function List({num, text, onClick, active}) {
    return(
        <li className={`list${active ? " active" : ""}`} onClick={onClick}>
            <div className={`index-song`}>{num}</div>
            <div>{text}</div>
        </li>
    )
}