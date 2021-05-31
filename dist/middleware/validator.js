"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = __importDefault(require("morgan"));
var validateURL = function (req, res, next) {
    var filename = req.query.filename;
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);
    var isValid = isValidParameters(filename, width, height);
    if (!isValid) {
        res.status(400).send('Please provide valid parameters to resize');
    }
    next();
};
var isValidParameters = function (filename, width, height) {
    var isValid = true;
    if (filename === '' || !filename) {
        isValid = false;
    }
    if (width <= 0 || isNaN(width) || height <= 0 || isNaN(height)) {
        isValid = false;
    }
    return isValid;
};
var tiny = morgan_1.default('tiny');
exports.default = { tiny: tiny, validateURL: validateURL, isValidParameters: isValidParameters };
