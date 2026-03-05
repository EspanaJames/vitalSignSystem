"use strict";
import { initQRCodeScanner } from "./scanQRCode.js";
import { initFileUploader } from "./uploadQRCode.js";
import { initExitButton } from "./exitDataBox.js";
initFileUploader();
initQRCodeScanner();
initExitButton();
