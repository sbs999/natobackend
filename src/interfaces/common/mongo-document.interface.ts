import { ObjectId } from "mongoose";

export interface MongoDocument {
  _id: unknown;
  __v?: string;
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
}
