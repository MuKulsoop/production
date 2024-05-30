import express from "express";
import dotenv from "dotenv"
import Connection from "./db/db.js";
import router from "./routes/routes.js";
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"


const app = express();

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
app.use(cors());
app.use(bodyParser.json({extended : true}))
app.use('/', router)


app.use(express.static( path.join(__dirname , "./client/build")));

app.get('*', function ( _ , res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
        res.status(500).send(err);
    })
})


const User = process.env.DB_USERNAME
const pass = process.env.DB_PASSWORD

const DB_URL = process.env.MONGODB_URI || `mongodb://${User}:${pass}@ac-h2agvux-shard-00-00.wwjvuel.mongodb.net:27017,ac-h2agvux-shard-00-01.wwjvuel.mongodb.net:27017,ac-h2agvux-shard-00-02.wwjvuel.mongodb.net:27017/?ssl=true&replicaSet=atlas-wb8qm8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

Connection( DB_URL);