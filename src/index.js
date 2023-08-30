import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Manger", completed: true, description: "avec des couverts" },
  { id: "todo-1", name: "Dormir", completed: false, description: "dans un lit" },
  { id: "todo-2", name: "Travailler", completed: false, description: "avec ardeur" },
  { id: "todo-3", name: "Jouer", completed: false, description: "" }
]
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
