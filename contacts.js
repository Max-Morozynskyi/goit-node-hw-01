const fs = require('fs').promises;
const path = require('path');
const uniqid = require("uniqid");

const contactPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const choosenContact = contacts.find(({ id }) => id === contactId);
  return choosenContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContactsList = contacts.filter(({ id }) => id !== contactId);
  fs.writeFile(contactPath, JSON.stringify(newContactsList));
  return console.log(`Contact ${contactId} removed successfully`)
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uniqid(), name, email, phone };
  fs.writeFile(contactPath, JSON.stringify([...contacts, newContact]));
  return console.log(`Contact ${name} added successfully`)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}