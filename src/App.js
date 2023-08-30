import React, { useState, useRef, useEffect } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';
import usePrevious from './usePrevious';

// definition des fonctions qui vont servir à filtrer
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
// definition de cles des filtres
const FILTER_NAMES = Object.keys(FILTER_MAP);
// les filtres sont créés en dehors de la fonction App pour qu'ils restent constants quoiqu'il arrive dans l'appli

function App(props) {
  // hook pour préserver l'état initial de props.task
  const [tasks, setTasks] = useState(props.tasks);

  // ajout d'un tableau pour les titres des filtres avec "All" car ils vont tous s'afficher en même temps
  const [filter, setFilter] = useState("All");
  
  // ajout d'une constant pour avoir la liste des filtres
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  /**
   * ajout de la synchronisation des tâches completées
   * @param {id} id tâche à modifier
   */
  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      // on cherche dans le tableau la tâche qui a changé
      if (id === task.id) {
        // on inverse la situation de la tache en utilisant la décomposition d'objet
        return { ...task, completed: !task.completed}
      }
      // on retourne la tache màj
      return task;
    });
    // on màj le tableau de tâches
    setTasks(updatedTask);
  };

  /**
   * suppression d'une tâche
   * @param {id} id tâche à supprimer
   */
  function deleteTask(id) {
    const remainingTask = tasks.filter((task) => id !== task.id);
    setTasks(remainingTask);
  };

  /**
   * modifie le nom de la tâche
   * @param {id} id 
   * @param {newName} newName 
   */
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  // transforme le tableau DATA en tableau ne contenant que le nom des tâches
  //const taskList = props.task?.map((task) => task.name);
  // mais on perd la mise en forme alors on fait :
  const taskList = tasks
  // on ajoute les filtres dans la liste de taches pour activer les fonctionnalités des boutons
    .filter(FILTER_MAP[filter])
    .map( (task) => (
      // on transforme props.tasks en tasks grâce au hook ajouté plus haut
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        description={task.description}
        key={task.id}
        // ajout de toggle pour synchroniser les taches cochées
        toggleTaskCompleted={toggleTaskCompleted} 
        // ajout de l'option suppression d'une tâche
        deleteTask={deleteTask}
        editTask={editTask} />
  ));

  // création d'une fonction prop callback pour récupérer les données du l'enfant Form
  function addTask(name) {
    // on commence par recomposer un objet pour la nouvelle tache
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    // on utilise la décomposition de tableau pour ajouter la nouvelle tache à la fin du tableau
    setTasks([...tasks, newTask]);
  };
  
  // on ajoute une variable pour avoir le bon nombre de taches restantes en tenant compte du pluriel
  const taskWords = taskList.length !== 1 ? "tâches restantes" : "tâche restante";
  const headingText = `${taskList.length} ${taskWords}`;

  // ajout d'une constante pour la position du curseur 
  // on ajoute les éléments de la liste par tabindex="-1" dans les balises directement
  // sauf pour les balises naturellement focussable comme les boutons, les inputs ...
  const listHeadingRef = useRef("null");

  // const qui permet de savoir combien il y avait de tâches avant un ajout ou une suppression
  const prevTaskLength = usePrevious(tasks.length);
/**
 * permet de repositionner le curseur si on a supprimé une tache
 */
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* ajout de la fonction addTask définie plus haut */}
      <Form addTask={addTask} />
      
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 
        id="list-heading" 
        tabIndex="-1" 
        ref={listHeadingRef}
      >{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
