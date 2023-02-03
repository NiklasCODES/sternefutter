const { MongoClient } = require("mongodb");
import { CustomerType } from "../api/customers";
import { DiscountCode } from "../api/discount";
import { NoteType } from "../api/notes";
import { PurchaseType } from "../api/purchases";

//test data that does not need merging
const url = "mongodb://localhost:27017";
const dbName = "sternefutterdb-v1";
const client = new MongoClient(url);
async function generate() {
    await client.connect();
    const db = client.db(dbName);
    const customerCollection = db.collection("customers");
    const codesCollection = db.collection("codes");
    const notesCollection = db.collection("notes");
    const purchaseCollection = db.collection("purchases");
    for(let i = 0; i <= 1000; i++) {
      //insert customer
      var customer: Omit<CustomerType, "_id"> = {
        customer_name: makeid(12),
        pet_name: makeid(12),
        pet_art: makeid(12),
        amount: 100
      };
      var { insertedId } = customerCollection.insertOne(customer);

      //insert notes for customer
      for(let i = 0; i <= 3; i++) {
        var note: NoteType = {
          ownerId: insertedId,
          timestamp: Date.now(),
          content: makeid(20)
        };
        notesCollection.insertOne(note);
      }

      //insert purchases for customer
      for(let i = 0; i <= 3; i++) {
        var purchase: Omit<Omit<PurchaseType, "_id">,"usedCode"> = {
          ownerId: insertedId,
          timestamp: Date.now(),
          description: makeid(20),
          amount: 13.99
        };
        purchaseCollection.insertOne(purchase);
      }
    }
}

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

generate();
