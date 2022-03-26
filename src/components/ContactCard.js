import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import user from '../images/user.png'

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    let contact = props.contact;
    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content">
                <Link  
                    to={`/contact/${id}`}
                    state={{contact: props.contact}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>

            </div>
            <Link to={`/edit/${id}`} onClick={() => props.editContactHandler(props.contact)}>
                <i className="right floated edit pointer alternate outline icon"
                style={{color: "blue", marginTop:"7px", marginLeft: "10px"}}></i>
            </Link>

            <Link to={`/delete/${id}`} state={{contact: props.contact}}>
                <i className="right floated trash pointer alternate outline icon"
                style={{color: "red", marginTop:"7px"}}></i>
            </Link>
            
        </div>
    );
};

export default ContactCard;