import React from "react";

export default function Die({value, isHeld, holdDice}) {
    return (
        <div className={`die ${isHeld === true ? 'held' : ''}`} onClick={holdDice}>
            <p>{value}</p>
        </div>
    )
}