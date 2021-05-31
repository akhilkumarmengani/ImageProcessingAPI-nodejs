import sharp from 'sharp';
import fs from 'fs';
import { promises as fsAsync } from 'fs';
import path from 'path';

const origImageFolder = '../../public/images/';
const resizeImageFolder = '../../public/rs-images/';

const getNameAndExtension = (sourcePath: string): [string, string] => {
  const arr: string[] = sourcePath.split('.');
  if (arr.length == 1) {
    return [arr[0], ''];
  }
  let ext = arr[arr.length - 1];
  if (arr.length > 1) arr.pop();
  let filename = arr.length > 0 ? arr.join('+') : '';
  return [filename, ext];
};

const getOriginalImageName = async (filename: string): Promise<string> => {
  let result: string = '';
  let imageFolder = path.join(__dirname, '../../public/images/');
  let allImages: string[] = await fsAsync.readdir(imageFolder);

  allImages.forEach(file => {
    let [name, ext]: [string, string] = getNameAndExtension(file);
    if (filename === name) {
      if (ext === '') {
        result = name;
      } else {
        result = name + '.' + ext;
      }
    }
  });
  return result;
};

const resize = async (
  sourcePath: string,
  destinationPath: string,
  width: number,
  height: number
): Promise<String> => {
  return new Promise(resolve => {
    setTimeout(async () => {
      const readStream: fs.ReadStream = fs.createReadStream(sourcePath);
      const writeStream: fs.WriteStream = fs.createWriteStream(destinationPath);

      let file = await fsAsync.open(destinationPath, 'w');
      await file.write(
        await sharp(sourcePath)
          .resize(width, height)
          .toBuffer()
      );
      await file.close();
      resolve('success');
    }, 1000);
  });
};

const isImageExists = async (
  filename: string,
  folder: string
): Promise<boolean> => {
  let imageFolder: string = '';
  if (folder === origImageFolder) {
    imageFolder = path.join(__dirname, '../../public/images');
  } else if (folder === resizeImageFolder) {
    imageFolder = path.join(__dirname, '../../public/rs-images');
  }
  if (filename === '' || imageFolder === '') {
    return false;
  }
  let isFound: boolean = false;
  let allImages: string[] = await fsAsync.readdir(imageFolder);

  allImages.forEach(file => {
    let [name, ext]: [string, string] = getNameAndExtension(file);
    if (filename === name) {
      isFound = true;
    }
  });
  return isFound;
};

async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  let isExists: boolean = await isImageExists(filename, origImageFolder);
  let destinationPath: string = '';
  if (!isExists) {
    return '__NOT_FOUND__';
  } else {
    try {
      let origName: string = await getOriginalImageName(filename);
      let originalPath: string = path.join(
        __dirname,
        '../../public/images/' + origName
      );
      let rsFileName: string = filename + '_' + width + '_' + height;
      let isResizeImageExists: boolean = await isImageExists(
        rsFileName,
        resizeImageFolder
      );
      destinationPath = path.join(
        __dirname,
        '../../public/rs-images/' + rsFileName + '.jpeg'
      );
      if (!isResizeImageExists) {
        await resize(originalPath, destinationPath, width, height);
        console.log('Image Resize Complete!!');
      }
    } catch (e) {
      console.log(e.message + 'Image Resize Error!!');
      destinationPath = '__ERROR__';
    }
  }
  return destinationPath;
}

export default { resizeImage, getNameAndExtension, isImageExists };
