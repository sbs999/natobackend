"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controller_1 = require("../controllers/media.controller");
const router = (0, express_1.Router)();
router.get("/generate-pre-signed-url", media_controller_1.generatePreSignedUrl);
router.delete("/object/:key", media_controller_1.deleteObject);
exports.default = router;
