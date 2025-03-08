import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ContactDetail from "./ContactDetail";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import api from "../api/contacts";
import EditContact from "./EditContact";
function App() {
  const Local_Storage_Key = "contacts";
  const [contacts, setcontacts] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  // Retrievecontacts
  const retrievecontacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setcontacts([...contacts, response.data]);
  };
  const updatecontacthandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setcontacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
  };
  const searchHandler = (searchTerm) => {
    setsearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase);
      });
      setsearchResults(newContactList)
    }
    else{
      setsearchResults(contacts)
    }
  };

  useEffect(() => {
    //   const retrivecontacts = JSON.parse(localStorage.getItem(Local_Storage_Key));
    //   if (retrivecontacts) setcontacts(retrivecontacts);
    // }, []);
    const getAllContacts = async () => {
      const allContacts = await retrievecontacts();
      if (allContacts) setcontacts(allContacts);
    };
    getAllContacts();
  }, []);
  useEffect(() => {
    // localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <switch>
          <route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updatecontacthandler={updatecontacthandler}
              />
            )}
          />
          <route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts :searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </switch>
      </Router>
    </div>
  );
}

export default App;
