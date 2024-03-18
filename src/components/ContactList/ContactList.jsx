import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/contactsSlice";
import { useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filtersSlice";

export default function ContactList() {
  const selectedContacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const contacts = selectedContacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact info={contact} />
        </li>
      ))}
    </ul>
  );
}
