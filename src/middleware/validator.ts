import morgan from 'morgan';
import express from 'express';


const validateURL = ( req : express.Request, res : express.Response ,next : Function ) : void=>{
     let url = req.url;
     let filename : string = req.query.filename as string;
     let width : number =  parseInt(req.query.width as string);
     let height : number = parseInt(req.query.height as string);

     let isValid = isValidParameters(filename,width,height);
     
     if(!isValid){
         res.status(400).send('Please provide valid parameters to resize \n Check filename , width > 0 , height > 0');
     }
     next();
};

const isValidParameters = (filename : string , width : number , height : number) : boolean =>{
      let isValid : boolean = true;
      if(filename==='' || !filename){
         isValid = false;
      }
      if(width<=0 || isNaN(width) || height<=0 || isNaN(height)){
         isValid = false;
      }
      return isValid;

}

const tiny = morgan('tiny');

export default {tiny,validateURL,isValidParameters};

