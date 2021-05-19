import React from "react";
import "./filter.css"

export default class Filter extends React.Component{

    render(){
        return(
            <div className="filter">
                <h1 className="filter-h1">Todo List</h1>
                <div>
                    <button className="filter-button" onClick={this.props.handleFilter} value="All">All</button>
                    <button className="filter-button" onClick={this.props.handleFilter} value="Complete">Complete</button>
                    <button className="filter-button" onClick={this.props.handleFilter} value="Incomplete">Incomplete</button>  
                </div>
                <input className="filter-search" type="text" placeholder="Search by name" onChange={this.props.onSearch}/>
            </div>
        )
    }
}