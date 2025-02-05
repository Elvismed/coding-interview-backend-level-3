import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemRoutes from "./routes/item.routes";
const AutoIncrement = require("mongoose-sequence")(mongoose);
const app = express();
// using express instead of hapi as server in this case
const PORT: string | number = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(itemRoutes);
// setting uri to the mongo db uri or to the default one
const uri: string =
  process.env.MONGO_DB_URI || "mongodb://localhost:27017/item_db";
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
