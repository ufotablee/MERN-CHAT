import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";

import multer from "./multer";

import { updateLastSeen, checkAuth } from '../middleware'

import { loginValidation,registerValidation } from '../utils/validations'

import { UserControllers, DialogControllers, Messagecontrollers,UploadFileControllers } from '../controllers'



const createRoutes = (app: express.Express, io: socket.Server) => {

    
    const User = new UserControllers(io);
    const Dialog = new DialogControllers(io);
    const Message = new Messagecontrollers(io);
    const Upload = new UploadFileControllers();

    app.use(bodyParser.json())
    app.use(checkAuth)
    app.use(updateLastSeen)

    app.get('/user/me', User.getMe)
    app.get('/user/verify',User.verify)
    app.get('/user/find',User.findUsers)
    app.get('/user/:id', User.index)
    app.delete('/user/:id',User.delete)
    app.post('/user/signup',registerValidation,User.create)
    app.post('/user/signin', loginValidation, User.login)
    app.post(`/user/avatar/:id`,User.uploadAvatar)
    app.post(`/user/edit/:id`,User.update)


    app.get('/dialogs', Dialog.index)
    app.post('/dialogs', Dialog.create)
    app.delete('/dialog/:id', Dialog.delete)
    

    app.get('/messages', Message.index)
    app.post('/messages', Message.create)
    app.delete('/messages', Message.delete)
    app.post("/files", multer.single("file"), Upload.create);
}
export default createRoutes;