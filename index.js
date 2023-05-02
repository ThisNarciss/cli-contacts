const contacts = require("./contacts");
require("colors");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      try {
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      } catch (error) {
        return console.log(error.message);
      }

    case "get":
      try {
        const contact = await contacts.getContactById(id);
        if (!contact) {
          throw new Error("Contact not found!".red);
        }
        return console.log(contact);
      } catch (error) {
        return console.log(error.message);
      }

    case "add":
      try {
        const addContact = await contacts.addContact(name, email, phone);
        return console.log(addContact);
      } catch (error) {
        return console.log(error.message);
      }

    case "remove":
      try {
        const delContact = await contacts.removeContact(id);
        if (!delContact) {
          throw new Error("Deletion did not occur! Contact not found!".red);
        }
        return console.log(delContact);
      } catch (error) {
        return console.log(error.message);
      }

    default:
      console.warn("Unknown action type!".underline.red);
  }
};

invokeAction(argv);
