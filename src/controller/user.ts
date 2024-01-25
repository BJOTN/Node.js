import { Request, Response } from "express";
import{db} from './../db.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();

const login =  async (req: Request, res: Response) => {
 const {username, password} =req.body;
 const user = await db.one(`SELECT * FROM users WHERE username=$1`,username)
 if(user && user.password === password){
    const payload = {
        id: user.id,
        username,
    }
    const {SECRET = ''} = process.env
    const token=jwt.sign(payload,SECRET)

    await db.none(`UPDATE users SET token=$2 WHERE ID=$1`,[user.id,token])
    res.status(200).json({id:user.id, username, token})
 }else{
    res.status(400).json({msg:'Some errore on data'})
 }
}

const signUp = async (req: Request, res: Response) => {
    const{username, password} = req.body;
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`,username);

    if(!user){
        db.one(`INSERT INTO users(username,password) VALUES ($1,$2) RETURNING id`,[username, password])
    }else{
        return res.status(409).json({msg:'user already exist'})
    }
    res.status(201).json({ msg:'user created'})
}
const logout = async (req: Request, res: Response) => {
    const user:any = req.user;
    await db.none(`UPDATE user SET token =$2 WHERE id=$1`, [user?.id,null]);
    res.status(200).json({msg:'logout work'})
}

export {login, signUp, logout}