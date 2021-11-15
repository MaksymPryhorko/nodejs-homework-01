const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

//addContact - добавить контакт.
const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
};

module.exports = addContact;
