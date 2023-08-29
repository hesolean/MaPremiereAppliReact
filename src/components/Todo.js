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
            <input id={props.id} className="todo-text" type="text" />
          </div>
          <div className="btn-group">
            <button 
                type="button" 
                className="btn todo-cancel" 
                onClick={() => setEditing(false)}
            >
              Abandon
              <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Enregistrer
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button 
                type="button" 
                className="btn" 
                onClick={() => setEditing(true)}
            >
              Modifier <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)}>
              Supprimer <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </div>
      );
      

    console.log(props);
    return (
        // <li className="todo stack-small">
        //     <div className="c-cb">
        //     <input 
        //         id={props.id} 
        //         type="checkbox" 
        //         defaultChecked={props.completed} 
        //         // ajout de toggle pour la synchronisation des tâches complétées
        //         onChange={() => props.toggleTaskCompleted(props.id)}
        //     />
        //         <label className="todo-label" htmlFor={props.id}>
        //         {props.name}
        //         </label>
        //     </div>
        //     <div className="btn-group">
        //         <button type="button" className="btn">
        //         Éditer <span className="visually-hidden">{props.name}</span>
        //         </button>
        //         <button 
        //             type="button" 
        //             className="btn btn__danger"
        //             // ajout de la fonction delete avec l'identifiant de la tâche à supprimera
        //             onClick={() => {
        //                 props.deleteTask(props.id)
        //             }}>
        //         Supprimer <span className="visually-hidden">{props.name}</span>
        //         </button>
        //     </div>
        // </li>

        // on utilise la vue en focntion de ce que l'utilisateur veut faire
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}