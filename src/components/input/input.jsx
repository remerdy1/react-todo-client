import React from "react";
import "./input.css"

export default class Input extends React.Component{

    render(){
        return(
            <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                <h1 className="input-h1">Add a new item</h1>
                <div className="input-div">
                    <input className="input-new-todo" type="text" name="name" placeholder="New Todo" required/>
                    <textarea className="input-textarea" placeholder="Add detail (optional)" name="description"></textarea>
                    <button className="input-button"><h3>Add new task</h3></button> 
                </div>
            </form>
        )
    }
}