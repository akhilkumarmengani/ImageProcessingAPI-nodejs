import express, { response } from 'express';
import path from 'path'
import util from '../../utilities/imageutil';

const routes = express.Router();


routes.get('/',async (req,res,next)=>{
    //let originalPath : string = path.join(__dirname,'../public/images/'+'Spacex1.jpeg');
    // let filename : string = req.query.filename as string;
    // let width : number =  parseInt(req.query.width as string);
    // let height : number = parseInt(req.query.height as string);
    
    // console.log('Resize : '+ width+'--'+height+'--'+filename);

    // const image = util.resizeImage(filename,width,height);
    // console.log('Image Name - '+image);
    // res.sendFile(image);
    // console.log('Image Sent - '+image);
});


export default routes;