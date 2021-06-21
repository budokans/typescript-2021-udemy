"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.post("./");
exports.router.get("./");
exports.router.patch("./:id");
exports.router.delete("./:id");
