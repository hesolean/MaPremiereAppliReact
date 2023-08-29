import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';

function App(props) {
  // hook pour préserver l'état initial de props.task
  const [tasks, setTasks] = useState(props.tasks);

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

  // transforme le tableau DATA en tableau ne contenant que le nom des tâches
  //const taskList = props.task?.map((task) => task.name);
  // mais on perd la mise en forme alors on fait :
  const taskList = tasks.map( // on transforme props.tasks en tasks grâce au hook ajouté plus haut
    (task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id}
      // ajout de toggle pour synchroniser les taches cochées
      toggleTaskCompleted={toggleTaskCompleted} />
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

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* ajout de la fonction addTask définie plus haut */}
      <Form addTask={addTask} />
      
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
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
