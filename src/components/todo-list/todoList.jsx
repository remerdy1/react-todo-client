import React from "react";

import ToDo from "../todo/todo"

export default class TodoList extends React.Component{

    render(){
        return(
            <div className="todo-list">
                <ul>
                    {this.props.todos.map((todo, index) => <ToDo key={todo.key} keyProp={todo.key} index={index} name={todo.name} description={todo.description} status={todo.status} handleDelete={this.props.handleDelete} handleClick={this.props.showModal} handleCheck={this.props.handleCheck}/>)}
                </ul>
            </div>
        )
    }
}