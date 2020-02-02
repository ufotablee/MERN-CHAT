import express from 'express'
import { UserModel } from '../models'
import createJWT from '../utils/createJWT'
import socket from 'socket.io'
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import transport from '../core/mailers'

class UserControllers { 
    io: socket.Server
    constructor(io: socket.Server){
        this.io = io
    }
    index(req: express.Request , res: express.Response) {
        const id: string = req.params.id
        UserModel.findById(id, (err,user)=> {
            if (err){
                return res.status(404)
                .json({
                    message: 'Not Found'
                })
            }
            res.json(user)
        });
    }
    findUsers = (req: any, res: express.Response) => {
        const query: string = req.query.query;
        UserModel.find()
          .or([
            { fullname: new RegExp(query, 'i') },
            { email: new RegExp(query, 'i') }
          ])
          .then((users: any) => res.json(users))
          .catch((err: any) => {
            return res.status(404).json({
              status: 'error',
              message: err
            });
          });
      };
    getMe(req: any , res: express.Response) {
        if(req.user) {
          const id: string = req.user._id

        UserModel.findById(id, (err,user)=> {
            if (err){
                return res.status(404)
                .json({
                    message: 'Not Found'
                })
            }
            res.json(user)
        });
    }
  }
    create(req: express.Request , res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        }
      

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const user = new UserModel(postData);

        user.save().then((obj : any) => {
            res.json(obj)
            transport.sendMail(
                {
                  from: 'semenAdmin@gmail.com',
                  to: postData.email,
                  subject: 'Подтверждение почты React Chat Tutorial',
                  html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/signup/verify?hash=${obj.confirm_hash}">по этой ссылке</a>`
                },
                function(err: any, info: any) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(info);
                    }
                  }
                );
              })
        .catch( reason => {
            res.status(500)
            .json({
                status:"error",
                message: reason
            })
        })
    }
    verify (req: express.Request , res: express.Response) {
        const hash = req.query.hash
        if(!hash) {
            return res.status(422).json({errors: 'Invalid Hash'})
        }
        UserModel.findOne({confirm_hash: hash}, (error,user) => {
            if(error || !user){
                return res.status(404).json({
                    message: "Hash not found"
                });
            }
            user.confirmed = true
            user.save(() =>{
                res.json({
                    status: 'success',
                    message: "Аккаунт успешно подтвержден!"
                });
            });
            
        })
    }
    uploadAvatar = (req: express.Request , res: express.Response) => {
        const filter = { _id: req.params.id }
        const update = {avatar: req.body.url}
        UserModel.findOneAndUpdate(filter,update,{new: true}, (err,message) => {
            if (err) {
                return res.status(500).json({
                  status: 'error',
                  message: err,
                });
              }
              res.json({
                  status: 'success',
                  message: 'Аватар загружен',
                  file: message
              })
        })
    }
    update = (req: express.Request , res: express.Response) => {
        const filter = { _id: req.params.id }
        const update = { $set: req.body}
        UserModel.findOneAndUpdate(filter,update,{new: true}, (err,message) => {
            if (err) {
                return res.status(500).json({
                  status: 'error',
                  message: err,
                });
              }
              res.json({
                  status: 'success',
                  message: 'Информация изменена',
                  info: message
              })
        })
    }
    delete(req: express.Request , res: express.Response) {
        const id: string = req.params.id
        UserModel.findOneAndDelete({_id: id})
        .then(user => {
            if(user){
                res.json({
                    message: `User ${user.fullname} deleted`
                });
            }
        })
        .catch( () => {
            res.json({
                message: 'User not Found'
            })
        })
    }
    login(req: express.Request , res: express.Response){
        const postData = {
            email: req.body.email,
            password: req.body.password
        };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    UserModel.findOne({ email: postData.email }, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWT(user);
        res.json({
          status: 'success',
          token
        });
      } else {
        res.json({
          status: 'error',
          message: 'Incorrect password or email'
        });
      }
    });
  };
    
}

export default UserControllers