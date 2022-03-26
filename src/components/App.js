import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //Retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    // console.log("axios response", response.data);
    return response.data;
  };


  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact
    };

    const response = await api.post("/contacts", request);
    console.log("response", response);
    setContacts([...contacts, response.data]);

    window.location.href = "/";
  }


  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log("update response", response.data);
    const {id, name, email} = response.data;
    window.location.href = "/";
  }

  const removeContactHandler = async (id) => {

    await api.delete(`/contacts/${id}`);
    const newContactList =  contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
    window.location.href="/";
  }
  

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !==""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ")
        .toLowerCase().
        includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  }



  const getContactHandler = (contact) => {
    setContact(contact);
  }
  
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) setContacts(retrieveContacts);

    const getAllContacts = async() => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }

    getAllContacts();
  },[]);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
        <Header/>

        <Routes>
          <Route path="/" 
          element={<ContactList 
          contacts={searchTerm.length < 1 ? contacts : searchResults} 
          term={searchTerm}
          searchKeyword={searchHandler}
          getContactHandler={getContactHandler} 
          getContactId={removeContactHandler}/>}/>
          
          <Route path="add" 
          element={<AddContact addContactHandler={addContactHandler}/>}/>
          
          <Route path="/delete/:id" 
          element={<DeleteContact removeContactHandler={removeContactHandler} />}/>
          
          <Route path="/edit/:id" 
          element={<EditContact updateContactHandler={updateContactHandler} contact={contact} />}/>
           
          <Route path="/contact/:id" 
          element={<ContactDetail />}/>
          
        </Routes>
    </div>
  );
}

export default App;
