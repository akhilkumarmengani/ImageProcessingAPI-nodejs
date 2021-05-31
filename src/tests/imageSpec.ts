import path from 'path';
import util from '../utilities/imageutil'
import validator from '../middleware/validator'

const origImages = ['Spacex1.jpeg','Spacex4'];
const errImages = ['Nasa1.jpeg','Nasa2'];
const imageFolder = '../../public/images/';
const resizeFolder = '../../public/rs-images/';
const imagesPath = path.join(__dirname,imageFolder);
const resizePath = path.join(__dirname,resizeFolder);




describe("Image Processing API Suite",()=>{
    it("Image path test",()=>{
        expect(util.getNameAndExtension(origImages[0])[0]).toEqual('Spacex1');
    });
   
     it("Image exists test",async ()=>{
        expect(await util.isImageExists(util.getNameAndExtension(origImages[0])[0],imageFolder)).toBeTruthy();
    });

    it("Image not exists test",async ()=>{
        let isExists  = await util.isImageExists(util.getNameAndExtension(errImages[0])[0],imageFolder);
        expect(isExists).toBeFalsy();
    });

    it("Image resize test",async ()=>{
        console.log(resizePath);
        let filename : string = util.getNameAndExtension(origImages[0])[0];
        let resultPath = resizePath+ filename +'_100_100.jpeg';
        expect(await util.resizeImage(filename,100,100)).toEqual(resultPath);
    });

    it("Image not found test",async ()=>{
        let filename : string = util.getNameAndExtension(errImages[0])[0];
         expect(await util.resizeImage(filename,100,100)).toEqual("__NOT_FOUND__");
    });

    it("Invalid URL test",()=>{
         expect(validator.isValidParameters('Spacex',0,100)).toBeFalsy();
    });

});
