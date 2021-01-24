import React, { Fragment, useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    // delete todo function

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3333/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
            console.log(deleteTodo);
        } catch (err) {
            console.error(err.message)
        }
    }


    const getAllTodos = async () => {
        try {
            const response = await fetch("http://localhost:3333/todos")
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAllTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map(todo => (
                      <tr key={todo.todo_id}>
                          <td>{todo.description}</td>
                          <td><EditTodo todo={todo} /></td>
                          <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                      </tr>
                  ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;
