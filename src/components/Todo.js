import React, { useState } from "react";

export default function Todo(props) {
    // ajout d'un hook pour la modification d'une tâche
    const [isEditing, setEditing] = useState(false);

    // ajout d'une interface utilisateur pour faire la modification
    const editingTemplate = (
        <form className="stack-small">
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    Nouveau nom de {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel">
                    Supprimer
                    <span className="visually-hidden">Renommer {props.name}</span>
                </button>
                <button type="button" className="btn btn_primary todo-edit">
                    Enregistrer
                    <span className="visually-hidden">Nouveau nom de {props.nale}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <button type="button" className="btn">
                Modifier
                <span className="visually-hidden">{props.name}</span>
            </button>
            <button 
                type="button" 
                className="btn btn_danger" 
                onClick={() => props.deleteTask(props.id)}
                >
                    Supprimer
                    <span className="visually-hidden">{props.name}</span>
                </button>
        </div>
    );
    
    console.log(props);
    return (
        <li className="todo stack-small">
            <div className="c-cb">
            <input 
                id={props.id} 
                type="checkbox" 
                defaultChecked={props.completed} 
                // ajout de toggle pour la synchronisation des tâches complétées
                onChange={() => props.toggleTaskCompleted(props.id)}
            />
                <label className="todo-label" htmlFor={props.id}>
                {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn">
                Éditer <span className="visually-hidden">{props.name}</span>
                </button>
                <button 
                    type="button" 
                    className="btn btn__danger"
                    // ajout de la fonction delete avec l'identifiant de la tâche à supprimera
                    onClick={() => {
                        props.deleteTask(props.id)
                    }}>
                Supprimer <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </li>
    );
}