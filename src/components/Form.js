import React from "react";

function Form(props) {
    function handleSubmit(e) {
        e.preventDefault();
        // utilisation de la prop de App
        props.addTask("message d'alerte");
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                Qu'y a-t-il à faire&nbsp;?
            </label>
            </h2>
            <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            />
            <button type="submit" className="btn btn__primary btn__lg">
            Ajouter
            </button>
        </form>
    );
}

export default Form;