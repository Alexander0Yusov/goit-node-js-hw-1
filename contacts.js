const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function getContactsList() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await getContactsList();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await getContactsList();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const newContact = { id: nanoid(), name, email, phone };
  const allContacts = await getContactsList();
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  getContactById,
  removeContact,
  addContact,
  getContactsList,
};
