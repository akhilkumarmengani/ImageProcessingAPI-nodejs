import path from 'path';
import util from '../utilities/imageutil';
import validator from '../middleware/validator';
import express from 'express';

import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

const origImages : string[] = ['Spacex1.jpeg', 'Spacex4'];
const errImages : string[]= ['Nasa1.jpeg', 'Nasa2'];
const imageFolder : string = '../../public/images/';
const resizeFolder : string = '../../public/rs-images/';
const imagesPath : string = path.join(__dirname, imageFolder);
const resizePath : string = path.join(__dirname, resizeFolder);

describe('Image Processing API Suite', () => {
  it('Image path test', () => {
    expect(util.getNameAndExtension(origImages[0])[0]).toEqual('Spacex1');
  });

  it('Image exists test', async () => {
    expect(
      await util.isImageExists(
        util.getNameAndExtension(origImages[0])[0],
        imageFolder
      )
    ).toBeTruthy();
  });

  it('Image not exists test', async () => {
    let isExists = await util.isImageExists(
      util.getNameAndExtension(errImages[0])[0],
      imageFolder
    );
    expect(isExists).toBeFalsy();
  });

  it('Image resize test', async () => {
    console.log(resizePath);
    let filename: string = util.getNameAndExtension(origImages[0])[0];
    let resultPath = resizePath + filename + '_100_100.jpeg';
    expect(await util.resizeImage(filename, 100, 100)).toEqual(resultPath);
  });

  it('Image not found test', async () => {
    let filename: string = util.getNameAndExtension(errImages[0])[0];
    expect(await util.resizeImage(filename, 100, 100)).toEqual('__NOT_FOUND__');
  });

  it('Invalid URL test', () => {
    expect(validator.isValidParameters('Spacex', 0, 100)).toBeFalsy();
  });

  it('Endpoint Test Success', async () => {
    let response = await request.get(
      '/api/image?filename=Spacex1&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });

  it('Endpoint Test Failure', async () => {
    const response = await request.get(
      '/api/image?filename=Spacex1&width=0&height=200'
    );
    expect(response.status).toBe(400);
  });
});
