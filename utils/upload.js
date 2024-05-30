import { GridFsStorage } from "multer-gridfs-storage"
import multer from "multer"

import dotenv from "dotenv"

dotenv.config()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-h2agvux-shard-00-00.wwjvuel.mongodb.net:27017,ac-h2agvux-shard-00-01.wwjvuel.mongodb.net:27017,ac-h2agvux-shard-00-02.wwjvuel.mongodb.net:27017/?ssl=true&replicaSet=atlas-wb8qm8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image,jpg"];
        if(match.indexOf(file.memeType === -1 )){
            return `${Date.now()}-story-${file.originalname}`
        }
        return {
            bucketname: "photos",
            filename: `${Date.now()}-story-${file.originalname}`
        }
    }
})
export default multer({ storage })