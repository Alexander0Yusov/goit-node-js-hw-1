const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");
// const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const newContact = { id: nanoid(), name, email, phone };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  getContactById,
  removeContact,
  addContact,
  listContacts,
};
