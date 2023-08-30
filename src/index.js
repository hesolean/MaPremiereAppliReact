import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Manger", completed: true, describe: "avec des couverts" },
  { id: "todo-1", name: "Dormir", completed: false, describe: "dans un lit" },
  { id: "todo-2", name: "Travailler", completed: false, describe: "avec ardeur" },
  { id: "todo-3", name: "Jouer", completed: false, describe: "" }
]
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
