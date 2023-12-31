import React, { useState, useRef, useEffect } from "react";
import usePrevious from "../usePrevious";

export default function Todo(props) {
    // ajout d'un hook pour la modification d'une tâche
    const [isEditing, setEditing] = useState(false);

    // ajout d'un hook pour le nouveau nom de la tache
    const [newName, setNewName] = useState("");

    // ajout de 2 constantes pour définir la position du curseur quand le composant sera appelé
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    // permet de pister si l'état précédent du composant était en mode édition
    const wasEditing = usePrevious(isEditing);

    /**
     * prend en compte le champ input pour modifier le nom de la tache
     * @param {e} e 
     */
    function handleChange(e) {
        console.log(e.target.value)
        setNewName(e.target.value);
    };

    /**
     * récupère le nouveau nom au moment de la soumission et remets el champ à 0
     * @param {e} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    // ajout d'une interface utilisateur pour faire la modification
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              Nouveau nom de {props.name}
            </label>
            <input 
                type="text" 
                id={props.id} 
                className="todo-text"
                value={newName} 
                onChange={handleChange} 
                ref={editFieldRef}
            />
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
              <span className="visually-hidden">Nouveau nom pour {props.name}</span>
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
                ref={editButtonRef}
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

    // ajout de useEffect pour compléter le useRef
    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            //le curseur se met sur le bouton modifié quand on a enregistré le nouveau nom
            editButtonRef.current.focus();
        };
    }, [wasEditing, isEditing] //tableau pour dire de quoi dépend le fonctionnement de useEffect()
    );

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