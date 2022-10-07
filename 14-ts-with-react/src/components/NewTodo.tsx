import React, {useRef} from "react";
// import {useState} from "react";
// import "./NewTodo.css";
// import classes from "./NewTodo.module.css";

interface NewTodoProps {
    onAddTodo: (text: string) => void,
}

const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = inputRef.current!.value;
        onAddTodo(enteredText);
        inputRef.current!.value = '';
    };

    return (<form onSubmit={submitHandler}>
        <div>
            <label htmlFor={'todo-text'}>Todo Text</label>
            <input id={'todo-text'} type={"text"} ref={inputRef}/>
        </div>
        <button type={"submit"}>ADD TODO</button>
    </form>);
};

export default NewTodo;
