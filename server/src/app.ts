import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"
import path from "path"
 
const app: Express = express()
 
const PORT: string | number = process.env.PORT || 3001
app.use(cors())
app.use(routes);
app.use(express.static(path.join(__dirname, '../dist/js')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/js'))
})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ezjournal", {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
}).catch(error => {throw error;})