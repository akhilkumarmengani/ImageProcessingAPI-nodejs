import express from 'express';
import path from 'path';
import routes from './routes/index';
import validator from './middleware/validator';

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api',[validator.tiny],routes);

app.listen(3000);
console.log('Server is listening on port 3000');