import { IItem } from "../interfaces/item.interface";
import ItemSchema from "../schemas/item.schema";

// this service is used in both routes, one route is the one created by me and the other is the one created by the tests using hapi as server

export const createItem = async (item: IItem | any) => {
  try {
    const createdItem = await ItemSchema.create(item);
    const createdMappedItem = {
      id: createdItem.id,
      name: createdItem.name,
      price: createdItem.price,
    };
    return createdMappedItem;
  } catch (error: any) {
    if (error.errors.price.name === "ValidatorError") {
      if (error.errors.price.kind === "required") {
        return {
          errors: [
            {
              field: "price",
              message: 'Field "price" is required',
            },
          ],
        };
      }
      if (error.errors.price.kind === "min") {
        return {
          errors: [
            {
              field: "price",
              message: 'Field "price" cannot be negative',
            },
          ],
        };
      }
    }
  }
};

export const getItems = async (): Promise<IItem[]> => {
  const data = await ItemSchema.find({}, "id name price -_id");
  return data.map((item) => item.toObject());
};

export const getItem = async (id: string): Promise<IItem | null> => {
  const data = ItemSchema.findOne({ id }, "id name price -_id");
  return data;
};

export const updateItem = async (id: string, item: IItem) => {
  try {
    const data = await ItemSchema.findOneAndUpdate({ id }, item, {
      new: true,
      runValidators: true,
    });
    if (data) {
      return {
        id: data.id,
        name: data.name,
        price: data.price,
      };
    }
  } catch (error: any) {
    if (error.errors.price.name === "ValidatorError") {
      if (error.errors.price.kind === "required") {
        return {
          errors: [
            {
              field: "price",
              message: 'Field "price" is required',
            },
          ],
        };
      }
      if (error.errors.price.kind === "min") {
        return {
          errors: [
            {
              field: "price",
              message: 'Field "price" cannot be negative',
            },
          ],
        };
      }
    }
  }
};

export const deleteItem = async (id: string): Promise<IItem | null> => {
  return ItemSchema.findOneAndDelete({ id });
};
