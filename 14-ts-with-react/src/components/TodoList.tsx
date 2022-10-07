import React from "react";
// import {useState} from "react";
// import "./TodoList.css";
// import classes from "./TodoList.module.css";

// inline would be: (but not as understandable)
// const TodoList: React.FC<{ items: { id: string, text: string }[] }> = ({items}) => {

interface TodoListProps {
    items: { id: string, text: string }[]
}

const TodoList: React.FC<TodoListProps> = ({items}) => {
    return (<ul>
        {
            items.map(todo => <li key={todo.id}>{todo.text}</li>)
        }
    </ul>);
};

export default TodoList;
