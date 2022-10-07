import React from "react";
// import {useState} from "react";
import "./TodoList.css";
// import classes from "./TodoList.module.css";

// inline would be: (but not as understandable)
// const TodoList: React.FC<{ items: { id: string, text: string }[] }> = ({items}) => {

interface TodoListProps {
    items: { id: string, text: string }[],
    onDeleteTodo: (id: string) => void,
}

const TodoList: React.FC<TodoListProps> = ({items, onDeleteTodo}) => {
    return (<ul>
        {
            items.map(todo => <li key={todo.id}><span>{todo.text}</span>
                <button onClick={onDeleteTodo.bind(null, todo.id)}>Del</button>
            </li>)
        }
    </ul>);
};

export default TodoList;
