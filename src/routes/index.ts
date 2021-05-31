import express from 'express';
import validator from '../middleware/validator';
import util from '../utilities/imageutil';

const routes = express.Router();

routes.get('/image', validator.validateURL, async (req, res) => {
  let [filename, ext]: [string, string] = util.getNameAndExtension(
    req.query.filename as string
  );
  let width: number = parseInt(req.query.width as string);
  let height: number = parseInt(req.query.height as string);

  const image = await util.resizeImage(filename, width, height);
  //res.type("jpeg").status(200);
  //fs.createReadStream(image).pipe(res);
  if (image === '__NOT_FOUND__') {
    res.status(400).send('Image Not Found!!');
  } else if (image === '__ERROR__') {
    res.status(400).send('Image Resize Error!!');
  } else {
    res.status(200).sendFile(image);
  }
});

export default routes;
