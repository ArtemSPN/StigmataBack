import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
    try{
        console.log(req.body)
        const doc = new UserModel({
            username: req.body.username,
            password: req.body.password,
            link: "http://localhost:4444/uploads/"+req.body.link,
            role: req.body.role,
        });

        const user = await doc.save();
        res.json(user)
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать пользователя"
        })
    }
}

export const getOne = async (req, res) => {
    try{

        const user = await UserModel.findOne({
            username: req.params.username,
        });
        console.log(user);

        console.log(user);


        const token = jwt.sign({
            username: req.params.username,
            link: user.link,
            role: user.role
        }, "secret123");
        console.log(token);

        const isValid = user.password == req.params.password;
        if(!isValid){
            return res.status(404).json({
                message: "неверный логин или пароль"
            })
        }
        if (user && isValid){
            res.json({
                user,
                token
            })
            return user; 
        } 
          
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить пользователя"
        })
    }
}