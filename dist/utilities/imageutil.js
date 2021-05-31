"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var fs_2 = require("fs");
var path_1 = __importDefault(require("path"));
var origImageFolder = '../../public/images/';
var resizeImageFolder = '../../public/rs-images/';
var getNameAndExtension = function (sourcePath) {
    var arr = sourcePath.split('.');
    if (arr.length == 1) {
        return [arr[0], ''];
    }
    var ext = arr[arr.length - 1];
    if (arr.length > 1)
        arr.pop();
    var filename = arr.length > 0 ? arr.join('+') : '';
    return [filename, ext];
};
var getOriginalImageName = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
    var result, imageFolder, allImages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = '';
                imageFolder = path_1.default.join(__dirname, '../../public/images/');
                return [4 /*yield*/, fs_2.promises.readdir(imageFolder)];
            case 1:
                allImages = _a.sent();
                allImages.forEach(function (file) {
                    var _a = getNameAndExtension(file), name = _a[0], ext = _a[1];
                    if (filename === name) {
                        if (ext === '') {
                            result = name;
                        }
                        else {
                            result = name + '.' + ext;
                        }
                    }
                });
                return [2 /*return*/, result];
        }
    });
}); };
var resize = function (sourcePath, destinationPath, width, height) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var readStream, writeStream, file, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                readStream = fs_1.default.createReadStream(sourcePath);
                                writeStream = fs_1.default.createWriteStream(destinationPath);
                                return [4 /*yield*/, fs_2.promises.open(destinationPath, 'w')];
                            case 1:
                                file = _c.sent();
                                _b = (_a = file).write;
                                return [4 /*yield*/, sharp_1.default(sourcePath)
                                        .resize(width, height)
                                        .toBuffer()];
                            case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, file.close()];
                            case 4:
                                _c.sent();
                                resolve('success');
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
            })];
    });
}); };
var isImageExists = function (filename, folder) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFolder, isFound, allImages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageFolder = '';
                if (folder === origImageFolder) {
                    imageFolder = path_1.default.join(__dirname, '../../public/images');
                }
                else if (folder === resizeImageFolder) {
                    imageFolder = path_1.default.join(__dirname, '../../public/rs-images');
                }
                if (filename === '' || imageFolder === '') {
                    return [2 /*return*/, false];
                }
                isFound = false;
                return [4 /*yield*/, fs_2.promises.readdir(imageFolder)];
            case 1:
                allImages = _a.sent();
                allImages.forEach(function (file) {
                    var _a = getNameAndExtension(file), name = _a[0], ext = _a[1];
                    if (filename === name) {
                        isFound = true;
                    }
                });
                return [2 /*return*/, isFound];
        }
    });
}); };
function resizeImage(filename, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var isExists, destinationPath, origName, originalPath, rsFileName, isResizeImageExists, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isImageExists(filename, origImageFolder)];
                case 1:
                    isExists = _a.sent();
                    destinationPath = '';
                    if (!!isExists) return [3 /*break*/, 2];
                    return [2 /*return*/, '__NOT_FOUND__'];
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    return [4 /*yield*/, getOriginalImageName(filename)];
                case 3:
                    origName = _a.sent();
                    originalPath = path_1.default.join(__dirname, '../../public/images/' + origName);
                    rsFileName = filename + '_' + width + '_' + height;
                    return [4 /*yield*/, isImageExists(rsFileName, resizeImageFolder)];
                case 4:
                    isResizeImageExists = _a.sent();
                    destinationPath = path_1.default.join(__dirname, '../../public/rs-images/' + rsFileName + '.jpeg');
                    if (!!isResizeImageExists) return [3 /*break*/, 6];
                    return [4 /*yield*/, resize(originalPath, destinationPath, width, height)];
                case 5:
                    _a.sent();
                    console.log('Image Resize Complete!!');
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log(e_1.message + 'Image Resize Error!!');
                    destinationPath = '__ERROR__';
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, destinationPath];
            }
        });
    });
}
exports.default = { resizeImage: resizeImage, getNameAndExtension: getNameAndExtension, isImageExists: isImageExists };
