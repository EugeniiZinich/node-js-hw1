const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .parse();
const argv = program.opts();

const contactApi = require("./db/contact");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContact = await contactApi.listContacts();
      console.table(listContact);
      break;

    case "get":
      const foundContact = await contactApi.getContactById(id);
      console.log(foundContact);
      break;

    case "add":
      const newContact = await contactApi.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const afterRemove = await contactApi.removeContact(id);
      console.table(afterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
