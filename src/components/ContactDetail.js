import React from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import user from '../images/user.png'

const ContactDetail = (props) => {
    // let params = useParams();
    let location = useLocation();

    // console.log("params", params);
    // console.log("params", params);
    // console.log("props", props);
    console.log("location", location);
    const {name, email} = location.state.contact;
    
    return (
        <div className="item">
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
               <button className="ui button blue center">Back to Contact list</button>
               </Link>
           </div>
        </div>
    );
};

export default ContactDetail;