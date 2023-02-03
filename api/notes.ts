import { Collection, ObjectId } from "mongodb";
import {
    CustomerType
} from "./customers";

export interface NoteType {
    ownerId: CustomerType["_id"];
    timestamp: number;
    content: string;
}

export async function getNotes(collection: Collection, ownerId: CustomerType["_id"]) {
    const notesResponse = await collection.find({ ownerId: new ObjectId(ownerId) });
    const notes = await notesResponse.toArray();
    return notes;
}

export async function createNote(note: NoteType, collection: Collection) {
  return await collection.insertOne({
    ...note,
    ownerId: new ObjectId(note.ownerId)
  });
}

export async function updateNote(id: string, dataToUpdate: any, collection: Collection) {
  console.log(id);
  return await collection.updateOne({ _id: new ObjectId(id)}, {
    $set: {
      ...dataToUpdate
    },
  });
}

export async function deleteNote(id: string, collection: Collection) {
  return await collection.deleteOne({ _id: new ObjectId(id)});
}

export async function deleteAllNotes(ownerId: string, collection: Collection) {
  return await collection.deleteMany({ ownerId: new ObjectId(ownerId)});
}
