import React from 'react';
import {Link} from 'react-router-dom';
import ContactCard from "./ContactCard";

const ContactList = (props) => { 

    const deleteContactHandler  = (id) =>{
        props.getContactId(id);
    }
    const editContactHandler  = (contact) =>{
        props.getContactHandler(contact);
    }

    const getSearchTerm  = (e) =>{
        props.searchKeyword(e.target.value);
    }

    const renderContactList =  props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} editContactHandler={editContactHandler} clickHandler={deleteContactHandler} key={contact.id}></ContactCard>
        )
    })
    return (
        <div className="main">
            <h3>
                Contact List
                <Link to="/add">
                <button className="ui blue button right floated">Add Contact</button>
                </Link>
                
            </h3>

            <div className="ui search">
                <div className="ui icon input">
                    <input type="text" placeholder="Search contacts" className="prompt" 
                    value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>
            </div>

            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No contacts available"}
            </div>
        </div>
    );
}
export default ContactList;