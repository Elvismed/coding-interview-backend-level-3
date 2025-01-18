import { IItem } from "../interfaces/item.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ItemSchema: Schema = new Schema(
  {
    // name is required field this validation is not handled in the controller, i only did all the validations that appears in the tests
    name: {
      type: String,
      required: true,
    },
    // price must be a + number and it is required field this validation is done by mongoose itself it could apply here npm yup
    price: {
      type: Number,
      required: true,
      min: [0, 'Field "price" cannot be negative'],
    },
  },
  // set timestamps to true to add the created and updated at fields
  { timestamps: true }
);
// this auto increment package will add a new field named id to the shema and it will be the auto increased id
ItemSchema.plugin(AutoIncrement, { inc_field: "id" });
export default model<IItem>("Item", ItemSchema);
