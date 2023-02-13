const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const listResult = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(listResult);
}

async function getContactById(contactId) {
  const listResult = await fs.readFile(contactsPath, "utf-8");

  const parseContact = JSON.parse(listResult);

  const foundContact = parseContact.find((contact) => contact.id === contactId);

  return foundContact;
}

async function addContact(name, email, phone) {
  const oldContacts = await listContacts();

  const newData = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  oldContacts.push(newData);

  await fs.writeFile(contactsPath, JSON.stringify(oldContacts), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });

  const newContact = await listContacts();

  return newContact;
}

async function removeContact(contactId) {
  const oldContacts = await listContacts();

  const findContactDyId = oldContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (findContactDyId === -1) return;

  const deletedContact = oldContacts.splice(findContactDyId, 1);

  await fs.writeFile(contactsPath, JSON.stringify(oldContacts), (err) => {
    if (err) console.log(err);
    else {
      console.log(`Contact ${deletedContact}  was deleted`);
    }
  });

  const newContact = await listContacts();

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
