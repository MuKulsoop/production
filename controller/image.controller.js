import grid from "gridfs-stream"
import mongoose from "mongoose"

const url = ""
const conn = mongoose.connection;

let gfsPromise, gridfsBucketPromise;

const initializeGridFS = () => {
    gridfsBucketPromise = new Promise((resolve, reject) => {
        conn.once('open', () => {
            const gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'fs'
            });
            resolve(gridfsBucket);
        });
    });

    gfsPromise = new Promise((resolve, reject) => {
        conn.once('open', () => {
            const gfs = grid(conn.db, mongoose.mongo);
            gfs.collection('fs');
            resolve(gfs);
        });
    });
};

initializeGridFS();

export const uploadImage = async (request, response) => {
    if (!request.file) {
        return response.status(404).json({ msg: "File not found "})
    }
    const imageUrl = `${url}/file/${request.file.filename}`
    return response.status(200).json(imageUrl)
};

export const getimage = async (request, response) => {
    try {
        const [gfs, gridfsBucket] = await Promise.all([gfsPromise, gridfsBucketPromise]);
        
        const file = await gfs.files.findOne({ filename: request.params.filename });
        if (!file) {
            return response.status(404).json({ msg: "File not found" });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};
