const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

//removeContact - удалить контакт.
const removeContact = async (contactId) => {
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
};

module.exports = removeContact;
