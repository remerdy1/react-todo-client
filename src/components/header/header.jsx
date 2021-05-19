import React from "react";
import "./header.css";

export default class Header extends React.Component{
    render(){
        return(
            <header className="header">
              <h1 className="header-h1">ToDo App</h1>  
            </header>
        )
    }
}