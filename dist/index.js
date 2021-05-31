"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var validator_1 = __importDefault(require("./middleware/validator"));
var app = express_1.default();
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', [validator_1.default.tiny], index_1.default);
app.listen(3000);
console.log('Server is listening on port 3000');
exports.default = app;
