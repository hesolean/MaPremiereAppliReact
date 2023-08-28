import React from "react";
export default function Todo(props) {
    console.log(props)
    return (
        <li className="todo stack-small">
            <div className="c-cb">
            <input id={props.id} type="checkbox" defaultChecked={props.completed} />
                <label className="todo-label" htmlFor="todo-0">
                {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn">
                Éditer <span className="visually-hidden">{props.name}</span>
                </button>
                <button type="button" className="btn btn__danger">
                Supprimer <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </li>
    );
}