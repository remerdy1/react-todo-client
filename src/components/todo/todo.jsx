import React from "react";
import "./todo.css";

export default class ToDo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: this.props.name,
            description: this.props.description,
            status: this.props.status,
            key: this.props.keyProp
        }
    }

    render(){
        return (        
                <li className="todo-li" onClick={e => this.props.handleClick(e, this.state.name, this.state.description, this.state.status, this.state.key)}>
                    <p className="todo-p" style={{textDecoration: this.state.status === true ? "line-through" : "none"}}>{this.state.name}</p>
                    {/* e.stopPropagation();*/}
                    <input className="todo-input" type="checkbox" checked={this.state.status} onClick={e => e.stopPropagation()} onChange={e => this.props.handleCheck(e, this.state.key)} name="checkbox"/>
                    <button className="delete" onClick={e => {e.stopPropagation(); this.props.handleDelete(e, this.props.index)}} name="delete">X</button>
                </li>
        )
    }
}