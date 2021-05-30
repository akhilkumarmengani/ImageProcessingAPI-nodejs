import sharp from 'sharp';
import fs from 'fs';
//import fsAsync from 'fs/promises';
import {promises as fsAsync} from 'fs'
import path from 'path';
import express from 'express';

const origImageFolder = '../public/images';
const resizeImageFolder = '../public/resize';

function getNameAndExtension(sourcePath : string) : [string,string]{
    const arr: string[] = sourcePath.split('.');
    let ext = arr[arr.length-1];
    if(arr.length>1)
        arr.pop();
    let filename = arr.length>0? arr.join('+'):'';
    return [filename,ext];
}

const resize = async (
  sourcePath : string,
  destinationPath : string,
  width : number ,
  height : number
): Promise<String> => {
  
  return new Promise((resolve) => {  
    setTimeout(async () => {
      console.log(sourcePath+'-A-'+destinationPath);
      const readStream : fs.ReadStream = fs.createReadStream(sourcePath);
      const writeStream : fs.WriteStream = fs.createWriteStream(destinationPath+'.jpeg');

      let file = await fsAsync.open(destinationPath + '.jpeg', "w");
      await (file).write(
        await sharp(
            sourcePath
        ).resize(
            width, height
        ).toBuffer()
      );
      await file.close();
      resolve('success');
    }, 1000);
  });
}

const isImageExists =  async (filename:string, folder: string) : Promise<boolean> =>{

    let imageFolder :string = '';
    if(folder === origImageFolder){
      imageFolder =  path.join(__dirname,'../public/images');
    }
    else if (folder === resizeImageFolder){
      imageFolder =  path.join(__dirname,'../public/rs-images');
    }
    if(imageFolder === ''){
      console.log('false returned');
      return false;
    }
    let isFound : boolean = false;
    let allImages: string[] = await fsAsync.readdir(imageFolder);

    allImages.forEach(file => {
        let [name,ext]:[string,string] = getNameAndExtension(file);
        if(filename===name){
          isFound =  true;
        }
    });
    return isFound;
};

async function resizeImage(filename : string , width : number , height : number): Promise<string>{
    let isExists : boolean = await isImageExists(filename,origImageFolder);
    let originalPath : string = path.join(__dirname,'../public/images/'+filename+'.jpeg');
    let destinationPath : string = '';
    console.log(isExists);
    if(!isExists){
        return "__NOT_FOUND__";
    }
    else{
        try{
          let isResizeImageExists : boolean = await isImageExists(filename,resizeImageFolder);
          destinationPath = path.join(__dirname,'../public/rs-images/'+filename);
          console.log(isResizeImageExists);
          if(!isResizeImageExists){
            await resize(originalPath,destinationPath,width,height);
            console.log('Image Resize Complete!!');
          }
        }
        catch (e){
            console.log(e.message + "Image Resize Error!!");
        }
    }
    return destinationPath+'.jpeg';
}

export default {resizeImage,getNameAndExtension,isImageExists};