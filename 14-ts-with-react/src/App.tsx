import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import {Todo} from "./Todo";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const todoAddHandler = (text: string) => {
        // console.log(text);
        setTodos((prevState) => [...prevState, {id: Math.random().toString(), text: text}]);
    };

    const todoDeleteHandler = (id: string) => {
        setTodos((prevState) => prevState.filter(t => t.id !== id));
    }

    return (
        <div className="App">
            <NewTodo onAddTodo={todoAddHandler}/>
            <TodoList items={todos} onDeleteTodo={todoDeleteHandler}/>
        </div>
    );
}

export default App;
