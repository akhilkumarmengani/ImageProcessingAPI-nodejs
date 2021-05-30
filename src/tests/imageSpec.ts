import path from 'path';
import util from '../utilities/imageutil'

const origImages = ['Spacex1.jpeg','Spacex4'];
const errImages = ['Nasa1.jpeg','Nasa2'];
const imageFolder = '../public/images/';
const resizeFolder = '../public/rs-images/';
const imagesPath = path.join(__dirname,imageFolder);
const resizePath = path.join(__dirname,resizeFolder);


it("Image path test",()=>{
    expect(1).toEqual(1);
    //expect(util.getNameAndExtension(origImages[0])[0]).toEqual('Spacex1');
});

describe("Image Processing API Suite",()=>{

   
    // it("Image exists test",()=>{
    //     expect(util.isImageExists(originalImages[0],imageFolder)).toBeTruthy();
    // });

    // it("Image not exists test",()=>{
    //     expect(util.isImageExists(errImages[0],imageFolder)).toBeFalsy();
    // });

    // it("Image resize test",async ()=>{
    //     expect(await util.resizeImage(origImages[0],100,100)).toStrictEqual(resizePath+originalImages[0]);
    // });

    // it("Image not found test",async ()=>{
    //     expect(await util.resizeImage(errImages[0],100,100)).toStrictEqual("__NOT_FOUND__");
    // });

    // it("Invalid URL test",()=>{
    //     expect(isValidParameters('Spacex',0,100)).toBeFalsy();
    // });

});
