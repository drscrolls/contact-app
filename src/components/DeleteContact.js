import React from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import user from '../images/user.png'

const DeleteContact = (props) => { 
    let location = useLocation();
    console.log("location", location); 
    const {id, name, email} = location.state.contact;
    console.log("props", props);

    const deleteContact = (id) => {
        props.removeContactHandler(id);
    }
      
   
    return (
        <div className="ui form">
            <h2 className="ui center aligned header">Are you sure you want to delete ?</h2>
               <div className="ui card centered">
                   <div className="image">
                       <img src={user} alt="user" />
                   </div>
                   <div className="content">
                       <div className="header">{name}</div>
                       <div className="description">{email}</div>
                   </div>
               </div>
    
               <div className="ui center aligned header">
                   <Link to="/">
                    <button className="ui button white center center aligned">No</button>
                   </Link>
                    <button className="ui button blue center center aligned" onClick={()=> {deleteContact(id)}}
                    >Yes</button>
               </div>
            </div>
    );
}

export default DeleteContact;