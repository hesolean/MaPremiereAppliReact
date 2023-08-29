import React, { useState } from "react";

function Form(props) {
    // name : valeur initiale 'Utiliser les hooks", setName() : fonction qui modifie name
    // useState() renvoie les 2 valeurs
    const [name, setName] = useState("");

    /**
     * fonction qui permet de récupérer la valeur saisie dans le champs pour modifier la valeur de name
     * @param {e} e ce qui est saisie dans le champs
     */
    function handleChange(e) {
        // affiche dans la console les lettres tapées dans le champ input
        console.log(e.target.value);
        // on change la valeur de name
        setName(e.target.value)
    }

    /**
     * foncrion qui permet de récupérer les données lors de l'action sur le bouton ajouter
     * @param {e} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        // alerte si le champs est vide
        if (name !== "") {
            // utilisation de la prop de App pour donner le nom de la tache saisie dans l'input
            props.addTask(name);
            // on rappelle setName("") pour repasser le champs à vide quand la tache est ajoutée
            setName("");
        } else {
            alert("Le champs est vide");
        }
        
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
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
            Ajouter la tâche
            </button>
        </form>
    );
}

export default Form;