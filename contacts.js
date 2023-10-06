const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db", "contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);

  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);

  return contact ? contact : null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const contactIndex = allContacts.findIndex((item) => item.id === contactId);

  if (contactIndex !== -1) {
    const deletedContact = allContacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return deletedContact[0];
  }
  return null;
}

async function addContact({ name, email, phone }) {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
