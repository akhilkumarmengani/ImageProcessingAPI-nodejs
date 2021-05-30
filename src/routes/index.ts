import express from 'express';
import main from './api/main';
import path from 'path';
import validator from '../middleware/validator';
import util from '../utilities/imageutil';
import fs from 'fs';

const routes = express.Router();

//routes.use('/',[validator.tiny,validator.validateURL],main);

//routes.use('/api/image',[validator.tiny],main);

routes.get('/image',validator.validateURL,async (req,res)=>{
    let [filename,ext] : [string,string] = util.getNameAndExtension(req.query.filename as string);
    console.log('filename - '+filename);
    let width : number =  parseInt(req.query.width as string);
    let height : number = parseInt(req.query.height as string);
    

    const image = await util.resizeImage(filename,width,height);
    console.log('Image Name - '+image);
    //res.type("jpeg").status(200);
    //fs.createReadStream(image).pipe(res);
    if(image==='__NOT_FOUND__'){
        res.status(400).send("Image Not Found!!");
    }
    else{
        res.status(200).sendFile(image);
    }
    console.log('Image Sent - '+image);
});


export default routes;