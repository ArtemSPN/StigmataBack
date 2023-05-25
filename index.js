import express from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from "multer";


mongoose.set("strictQuery", false);

import { postCreateValidation, commentCreateValidation, userCreateValidation } from './validations.js';

mongoose.connect(
    'mongodb+srv://admin:stigmataPas@cluster0.djunlug.mongodb.net/stigmata?retryWrites=true&w=majority'
    ).then(() => console.log("DB OK!"))
    .catch((err) => console.log('DB error', err));

import * as PostController from './controllers/PostControllers.js';
import * as CommentController from './controllers/CommentController.js';
import * as FileControllers from './controllers/FileControllers.js';
import * as UserController from './controllers/UserController.js';

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(express.static('uploads'));
const storage = multer.diskStorage({
  destination:(_,__,cb) => {
    cb(null,'uploads')
  },
  filename: (_,file,cb) => {
    cb(null, file.originalname);
  }
})


const upload = multer({storage});

app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Server work!");
});



//-------------------------file---------------
app.post("/upload", upload.single('file') ,FileControllers.addFile);
app.post("/uploads", upload.array('files') ,FileControllers.addFiles);

app.get("/download/:filename", FileControllers.downloadFile);


//--------------------------------------------



//--------------------post-------------------------------
app.get('/posts', PostController.getAll);
app.get('/posts/:id/:page', PostController.getAllInSection);
app.get('/post/:id', PostController.getOne);
app.get('/postRemove/:id', PostController.Remove);
app.post('/post', postCreateValidation , PostController.create);
//--------------------Comment-----------------------------------
app.get('/comments/:id', CommentController.getAll);
app.get('/commentRemove/:id', CommentController.Remove);
app.post('/comment', commentCreateValidation , CommentController.create);
//--------------------user-----------------------------------
app.get('/user/:username/:password', UserController.getOne);
app.post('/createUser', userCreateValidation , UserController.create);
