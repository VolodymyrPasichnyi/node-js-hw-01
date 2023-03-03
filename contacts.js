const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async() => {
    try {
        const listRead = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(listRead);
    } catch (error) {
        console.log(error);
    };
};
  
  const getContactById = async(contactId) => {
    try {
        const contactById = await listContacts();
        const contactFind = contactById.find(el => el.id === contactId);
        return contactFind || null;
    } catch (error) {
        console.log(error);
    };
};
  
  const addContact = async(name, email, phone) => {
    try {
        const contact = await listContacts();
        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone,
        };
        contact.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
        return newContact
    } catch (error) {
        console.log(error);
    };
};

const removeContact = async(contactId) => {
    try {
        const contactsList = await listContacts();
        const remove =  contactsList.filter(el => el.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(remove, null, 2));
        return remove;
    } catch (error) {
        console.log(error);
    };
};

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };