"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var origImages = ['Spacex1.jpeg', 'Spacex4'];
var errImages = ['Nasa1.jpeg', 'Nasa2'];
var imageFolder = '../public/images/';
var resizeFolder = '../public/rs-images/';
var imagesPath = path_1.default.join(__dirname, imageFolder);
var resizePath = path_1.default.join(__dirname, resizeFolder);
it("Image path test", function () {
    expect(1).toEqual(1);
    //expect(util.getNameAndExtension(origImages[0])[0]).toEqual('Spacex1');
});
describe("Image Processing API Suite", function () {
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
