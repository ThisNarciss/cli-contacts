const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newBook = { id: nanoid(), name, email, phone };
  contacts.push(newBook);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newBook;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
