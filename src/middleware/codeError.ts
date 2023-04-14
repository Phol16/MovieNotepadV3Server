import express,{Request, Response, NextFunction } from 'express';

export const codeError = (error :Error ,req:Request, res:Response,next:NextFunction)=>{
  return res.status(500).json({ error:error})
}