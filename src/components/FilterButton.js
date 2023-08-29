import React from "react";

function FilterButton(props) {
    return (
        <button 
            type="button" 
            className="btn toggle-btn" 
            aria-pressed={props.isPressed} 
            onClick={() => props.setFilter(props.name)}
        >
            <span className="visually-hidden">Montrer </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> les tâches</span>
        </button>
    );
}

export default FilterButton;