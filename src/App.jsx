import React from "react";
import axios from "axios";

// Used to generate unique key
import { v4 as uuidv4 } from 'uuid';

import Header from "./components/header/header"
import Input from "./components/input/input"
import TodoList from "./components/todo-list/todoList"
import Filter from "./components/filter/filter"
import Modal from "./components/modal/modal"

import "./App.css"

export default class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            todos: [],
            filter: "All",
            showModal: false,
            // MODAL
            modalName: null,
            modalDescription: null,
            modalStatus: false,
            modalKey: null
        }

        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount(){
        const res = await axios.get("https://remys-react-todo.herokuapp.com/?filter=" + this.state.filter);
        this.setState({todos: res.data});
    }

    // User submits form
    async handleInputSubmit(e){

        const newTodo = {name: e.target.name.value, description: e.target.description.value, status: false, key: uuidv4()}
        // Save to database
        await axios.post("https://remys-react-todo.herokuapp.com", newTodo);

        // reset form
        e.target.name.value = "";
        e.target.description.value = "";
    }

    async handleFilter({target}){
        this.setState({filter: target.value})

        // Fetch data
        const res = await axios.get("https://remys-react-todo.herokuapp.com/?filter=" + target.value);
        this.setState({todos: res.data});
    }
    
    async handleDelete(e, index){
        const newTodos = [...this.state.todos];

        //delete from database
        await axios.delete("https://remys-react-todo.herokuapp.com/", {data: {todo: newTodos[index]}});

        // Fetch data
        const res = await axios.get("https://remys-react-todo.herokuapp.com/?filter=" + this.state.filter);
        this.setState({todos: res.data});
    }
    
    async handleCheck(e, key){
        const todoToEdit = this.state.todos.find(todo => todo.key === key);
        const newTodo = {status: e.target.checked, key: uuidv4()};

        // Update database
        await axios.patch("https://remys-react-todo.herokuapp.com/", {todoToEdit, newTodo});

        // Fetch data
        const res = await axios.get("https://remys-react-todo.herokuapp.com/?filter=" + this.state.filter);
        this.setState({todos: res.data});
    }

    // MODAL
    showModal(e, name, description, status, key){
        this.setState((prevState, props) => ({showModal: !prevState.showModal}));
        this.setState({modalName: name});
        this.setState({modalDescription: description});
        this.setState({modalStatus: status});
        this.setState({modalKey: key});
    }
 
    async handleModalSubmit(e, key){
        e.preventDefault();

        const todoToEdit = this.state.todos.find(todo => todo.key === key);
        const newTodo = {
            name: e.target.name.value,
            description: e.target.description.value,
            status: e.target.status.value,
            key: uuidv4()
        }

        // Update database
        await axios.patch("https://remys-react-todo.herokuapp.com/", {todoToEdit, newTodo});

        this.setState({showModal: false});

        // Fetch data
        const res = await axios.get("https://remys-react-todo.herokuapp.com/?filter=" + this.state.filter);
        this.setState({todos: res.data});
    }

    async onSearch(e){
        const res = await axios.get("https://remys-react-todo.herokuapp.com/?filter=" + this.state.filter + "&search=" + e.target.value );
        this.setState({todos: res.data});
    }

    render() {
        return (
            <div>
                <Header />
                <Input handleSubmit={this.handleInputSubmit}/>
                <Filter handleFilter={this.handleFilter} onSearch={this.onSearch}/>
                <TodoList todos={this.state.todos} filter={this.state.filter} handleDelete={this.handleDelete} showModal={this.showModal} handleCheck={this.handleCheck}/>
                {this.state.showModal && <Modal name={this.state.modalName} description={this.state.modalDescription} status={this.state.modalStatus} keyProp={this.state.modalKey} handleSubmit={this.handleModalSubmit}/>}
            </div>
        )
    }
}