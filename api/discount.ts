import { Collection, ObjectId } from "mongodb";

export interface DiscountCode {
  _id: string;
  timestamp: number;
  tag: string;
  limit: number;
  description: string;
  discount: number;
}

export async function getAllCodes(collection: Collection) {
  const discountCollection = await collection.find({});
  const discountCodes = await discountCollection.toArray();
  return discountCodes;
}

export async function getCode(id: string, collection: Collection) {
  const discountCode = await collection.findOne({ _id: new ObjectId(id)});
  return discountCode;
}

export async function createCode(code: Omit<DiscountCode, "_id">, collection: Collection) {
  return await collection.insertOne(code);
}

export async function updateCode(id: string, dataToUpdate: any, collection: Collection) {
  return await collection.updateOne({ _id: new ObjectId(id)}, {
    $set: {
      ...dataToUpdate
    },
  });
}

export async function deleteCode(id: string, collection: Collection) {
  return await collection.deleteOne({ _id: new ObjectId(id)});
}
