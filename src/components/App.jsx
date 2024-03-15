import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { useState, useEffect } from "react";
import infoContacts from "./contacts.json";
import css from "./App.module.css";

const initialObj = [];

const getContactsFromLocalStorage = () => {
  const savedContacts = localStorage.getItem("contacts");
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return initialObj;
};

function App() {
  const [contacts, setContacts] = useState(getContactsFromLocalStorage);
  const [filter, setFilter] = useState("");

  const addContact = (newContact) => {
    setContacts((prevContact) => {
      return [...prevContact, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
