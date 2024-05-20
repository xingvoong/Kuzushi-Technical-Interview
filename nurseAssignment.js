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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopNurses = void 0;
var fs_1 = require("fs");
function readFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.readFile(filePath, 'utf-8')];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error reading file:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function preprocessData(data) {
    return data.map(function (nurse) { return ({
        id: nurse.id,
        name: nurse.name,
        location: nurse.location,
        yoe: nurse.yoe || 0,
        acceptedOffers: nurse.acceptedOffers || 0,
        canceledOffers: nurse.canceledOffers || 0,
        averageReplyTime: nurse.averageReplyTime || 0
    }); });
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the Earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
function scoreNurses(data, facilityLocation) {
    var scores = data.map(function (nurse) {
        var distance = calculateDistance(parseFloat(nurse.location.latitude), parseFloat(nurse.location.longitude), parseFloat(facilityLocation.location.latitude), parseFloat(facilityLocation.location.longitude));
        var yoeScore = (nurse.yoe / 10) * 0.10;
        var distanceScore = (distance / 100) * 0.10; // Assume max 100 km for normalization
        var acceptedOffersScore = (nurse.acceptedOffers / 100) * 0.30; // Assume max 100 accepted offers for normalization
        var canceledOffersScore = ((100 - nurse.canceledOffers) / 100) * 0.30; // Assume max 100 canceled offers for normalization
        var replyTimeScore = ((6000 - nurse.averageReplyTime) / 6000) * 0.20; // Assume max 6000 seconds for normalization
        return yoeScore + distanceScore + acceptedOffersScore + canceledOffersScore + replyTimeScore;
    });
    return scores;
}
function rankNurses(scores, data) {
    var rankedIndices = scores.map(function (score, index) { return ({ score: score, index: index }); })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 10);
    return rankedIndices.map(function (_a) {
        var index = _a.index;
        return data[index];
    });
}
function getTopNurses(facilityLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var fileData, nurseData, nurseScores, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, readFile('sample-data/clinician.json')];
                case 1:
                    fileData = _a.sent();
                    nurseData = preprocessData(JSON.parse(fileData));
                    nurseScores = scoreNurses(nurseData, facilityLocation);
                    return [2 /*return*/, rankNurses(nurseScores, nurseData)];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error processing nurse data:', error_2);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getTopNurses = getTopNurses;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var facilityLocation, topNurses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    facilityLocation = {
                        location: {
                            latitude: '37.7749', // Example latitude
                            longitude: '-122.4194' // Example longitude
                        }
                    };
                    return [4 /*yield*/, getTopNurses(facilityLocation)];
                case 1:
                    topNurses = _a.sent();
                    console.log(topNurses);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
