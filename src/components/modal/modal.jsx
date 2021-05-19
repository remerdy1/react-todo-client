import React from "react";
import "./modal.css";

export default class Modal extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name: this.props.name,
            description: this.props.description,
            status: this.props.status,
            key: this.props.keyProp
        }
    }

    render(){
        return (
        <div className="modalContainer">
            <div className="modal">

                <form id="editForm" className="modalForm" onSubmit={e => this.props.handleSubmit(e, this.state.key)} autoComplete="off"> 
                    <input name="name" type="text" defaultValue={this.state.name} className="modalName"/>
                    <textarea name="description" defaultValue={this.state.description} className="modalTextArea"></textarea>
                    <label>Completed?</label>
                    <select name="status" defaultValue={this.state.status.toString()}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                    <div className="buttons">
                        <button className="modalButton" onClick={this.props.handleCancel}>Cancel</button>
                        <input className="modalButton" type="submit" htmlFor="editForm"></input>
                    </div>
                </form>
                
            </div>
        </div>

        )
    }
}