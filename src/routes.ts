import { Server } from "@hapi/hapi";
import * as itemService from "../src/services/item.service";
import { IItem } from "./interfaces/item.interface";

// this works as the controller of the routes of the tests
export const defineRoutes = (server: Server) => {
  server.route({
    method: "GET",
    path: "/ping",
    handler: async (request, h) => {
      return {
        ok: true,
      };
    },
  });
  server.route({
    method: "GET",
    path: "/items",
    handler: async (request, h) => {
      return await itemService.getItems();
    },
  });
  server.route({
    method: "POST",
    path: "/items",
    handler: async (request, h) => {
      try {
        const createdItem = await itemService.createItem(
          request.payload as IItem
        );
        if (createdItem && "errors" in createdItem) {
          return h.response(createdItem).code(400);
        } else {
          return h.response(createdItem).code(201);
        }
      } catch (error: any) {
        console.log(error);
        return h.response({ error }).code(400);
      }
    },
  });
  server.route({
    method: "GET",
    path: "/items/{id}",
    handler: async (request, h) => {
      const item = await itemService.getItem(request.params.id as string);
      if (item) {
        return h
          .response({ id: item.id, name: item.name, price: item.price })
          .code(200);
      } else {
        return h.response({ error: "Item not found" }).code(404);
      }
    },
  });
  server.route({
    method: "PUT",
    path: "/items/{id}",
    handler: async (request, h) => {
      try {
        const updatedItem = await itemService.updateItem(
          request.params.id as string,
          request.payload as IItem
        );
        if (updatedItem && "errors" in updatedItem) {
          return h.response(updatedItem).code(400);
        }
        if (updatedItem) {
          return h.response(updatedItem).code(200);
        } else {
          return h.response({ error: "Item not found" }).code(404);
        }
      } catch (error: any) {
        return h.response({ error: error.message }).code(400);
      }
    },
  });
  server.route({
    method: "DELETE",
    path: "/items/{id}",
    handler: async (request, h) => {
      const deletedItem = await itemService.deleteItem(
        request.params.id as string
      );
      if (deletedItem) {
        return h.response(deletedItem).code(204);
      } else {
        return h.response({ error: "Item not found" }).code(404);
      }
    },
  });
};
