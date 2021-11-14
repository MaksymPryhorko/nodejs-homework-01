const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");
const updateContacts = require("./updateContacts");

//listContacts - получить список контактов.
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

//getContactById - получить контакт по id.
async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find(
    (contact) => contact.id === Number(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
}

//removeContact - удалить контакт.
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(
    (contact) => contact.id === Number(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const newContact = allContacts.filter((_, index) => index !== idx);
  await updateContacts(newContact);
  return allContacts[idx];
}

//addContact - добавить контакт.
async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
