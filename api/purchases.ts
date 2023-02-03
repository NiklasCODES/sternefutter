import { Collection, ObjectId } from "mongodb";

export interface PurchaseType {
  _id: string;
  ownerId: string;
  timestamp: number;
  description: string;
  amount: number;
  usedCode: string;
}

export async function getAllPurchasesOfCustomer(id: string, collection: Collection) {
  const purchaseCollection = await collection.find({ ownerId: new ObjectId(id)});
  const purchases = await purchaseCollection.toArray();
  return purchases;
}

export async function getPurchase(id: string, collection: Collection) {
  const purchase = await collection.findOne({ _id: new ObjectId(id)});
  return purchase;
}

export async function createPurchase(purchase: Omit<PurchaseType, "_id">, collection: Collection) {
  return await collection.insertOne({
    ...purchase,
    ownerId: new ObjectId(purchase.ownerId)
  });
}

export async function updatePurchase(id: string, dataToUpdate: any, collection: Collection) {
  return await collection.updateOne({ _id: new ObjectId(id)}, {
    $set: {
      ...dataToUpdate
    },
  });
}

export async function deletePurchase(id: string, collection: Collection) {
  return await collection.deleteOne({ _id: new ObjectId(id)});
}

export async function deleteAllPurchases(ownerId: string, collection: Collection) {
  return await collection.deleteMany({ ownerId: new ObjectId(ownerId)});
}
