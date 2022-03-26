import React from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';


class EditContact extends React.Component{

    state = {
        id : "",
        name : "",
        email: ""
    };

    constructor(props){
        super(props);
        if(!props.contact) window.location.href = "/";
        const {id, name, email} = props.contact;
        this.state = {
            id,
            name, 
            email
        };
    }


    update = (e) =>{
        e.preventDefault();
        console.log("hello there");
        if(this.state.name === "" || this.state.email === ""){
            alert("All the fields are required");
            return;
        }
        this.props.updateContactHandler(this.state);
    }

    render(){
        return (
            <div className="ui main">
            <h2>Edit Contact</h2>
            <div className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input type="text" placeholder='name' 
                    value={this.state.name}
                    onChange = {(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email" placeholder='email'
                    value={this.state.email}
                    onChange = {(e) => this.setState({email: e.target.value})}/>
                </div>
                <Link to="/">
                    <button className="ui button white">Discard</button>
                </Link>
                <button type="submit" onClick={this.update} className="ui button blue">Update</button>
            </div>
        </div>
        );
    }
}

export default EditContact;

