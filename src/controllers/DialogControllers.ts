import express from 'express'
import { DialogModel, MessageModel } from '../models'
import socket from 'socket.io'
class DialogControllers { 

    io: socket.Server
    constructor(io: socket.Server){
        this.io = io
    }
    
    index(req: any , res: express.Response) {
        const userId: any = req.user._id
        DialogModel.find()
        .or([{author: userId}, {partner: userId}])
        .populate(['author','partner','attachments'])
        .populate({
            path: "lastMessage",
            populate: {
                path: 'user'
            }
        })
        .populate({
          path: "messages",
          populate: {
              path: 'message'
          }
      })
        .exec((err,dialogs)=> {
            if(err) {
                return res.status(404).json({
                    message: 'Dialog not found'
                })
            }
            return res.json(dialogs)
        })
           
    }
    getAll(req: express.Request , res: express.Response) {
     
        DialogModel.find().then((dialogs)=>{
            res.json(dialogs)
        })
        .catch(err => {
            res.json(err)
        })
           
    }
    create = (req: express.Request, res: express.Response) => {
        const postData = {
          author: req.user._id,
          partner: req.body.partner,
        };
    
        DialogModel.findOne(
          {
            author: req.user._id,
            partner: req.body.partner,
          },
          (err, user) => {
            if (err) {
              return res.status(500).json({
                status: 'error',
                message: err,
              });
            }
            if (user) {
              return res.status(403).json({
                status: 'error',
                message: 'Такой диалог уже есть',
              });
            } else {
              const dialog = new DialogModel(postData);
    
              dialog
                .save()
                .then((dialogObj: any) => {
                  const message = new MessageModel({
                    text: req.body.text,
                    user: req.user._id,
                    dialog: dialogObj._id,
                  });
    
                  message
                    .save()
                    .then(() => {
                      dialogObj.lastMessage = message._id;
                      dialogObj.messages = message
                      dialogObj.save().then(() => {
                        res.json(dialogObj);
                        
                        this.io.emit('SERVER:DIALOG_CREATED', {
                          ...postData,
                          dialog: dialogObj,
                        });
                      });
                    })
                    .catch(reason => {
                      res.json(reason);
                    });
                })
                .catch(err => {
                  res.json({
                    status: 'error',
                    message: err,
                  });
                });
            }
          },
        );
      };
    

    delete(req: express.Request , res: express.Response) {
        const id: string = req.params.id
        DialogModel.findOneAndDelete({_id: id})
        .then(dialog => {
            if(dialog){
                res.json({
                    message: `Dialogs  deleted`
                });
            }
        })
        .catch( () => {
            res.json({
                message: 'Dialog not Found'
            })
        })
    }
}

export default DialogControllers