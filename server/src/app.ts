import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
import path from "path";
 
const app: Express = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(cors());
app.use(routes);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../client/build', 'index.html'));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ezjournal", {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
}).catch(error => {throw error;});
