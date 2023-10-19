/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/js-sub-parsers/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/js-sub-parsers/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseFile: () => (/* reexport safe */ _parser__WEBPACK_IMPORTED_MODULE_0__.parseFile),
/* harmony export */   toVtt: () => (/* reexport safe */ _parser__WEBPACK_IMPORTED_MODULE_0__.toVtt)
/* harmony export */ });
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ "./node_modules/js-sub-parsers/dist/parser.js");



/***/ }),

/***/ "./node_modules/js-sub-parsers/dist/parser.js":
/*!****************************************************!*\
  !*** ./node_modules/js-sub-parsers/dist/parser.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseFile: () => (/* binding */ parseFile),
/* harmony export */   toVtt: () => (/* binding */ toVtt)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
// returns the string formatted as a vtt file
var toVtt = function (subtitles) {
    var vtt = "WEBVTT\n\n";
    for (var _i = 0, subtitles_1 = subtitles; _i < subtitles_1.length; _i++) {
        var sub = subtitles_1[_i];
        var start = sub.start.replace(",", ".");
        var end = sub.end.replace(",", ".");
        vtt += "".concat(sub.index, "\n");
        vtt += "".concat(start, " --> ").concat(end, "\n");
        vtt += "".concat(sub.text, "\n\n");
    }
    var blob = new Blob([vtt], { type: "text/vtt" });
    return blob;
};
// parse srt file and returns vtt blob
var parseFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var text, lines, subtitles, subtitle, textLines;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file.text()];
            case 1:
                text = _a.sent();
                lines = text.split(/\r?\n/);
                subtitles = [];
                subtitle = null;
                textLines = [];
                lines.forEach(function (line) {
                    // check if line is empty, if is, start new subtitle
                    if (!line.trim()) {
                        if (subtitle && textLines.length) {
                            subtitle.text = textLines.join("\n");
                            subtitles.push(subtitle);
                        }
                        subtitle = null;
                        textLines = [];
                        return;
                    }
                    // first line will be index
                    if (!subtitle) {
                        subtitle = {
                            index: Number(line),
                            start: "",
                            end: "",
                            text: ""
                        };
                        return;
                    }
                    // next comes timestamps, I am pretty sure that we do not need to check both timestamps
                    if (!subtitle.start) {
                        var times = line.split(" --> ");
                        // TODO: handle case where not two timestmaps
                        if (times.length === 2) {
                            subtitle.start = times[0];
                            subtitle.end = times[1];
                        }
                        return;
                    }
                    textLines.push(line);
                });
                return [2 /*return*/, subtitles];
        }
    });
}); };


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const js_sub_parsers_1 = __webpack_require__(/*! js-sub-parsers */ "./node_modules/js-sub-parsers/dist/index.js");
const getFileExtension = (filename) => {
    const matches = filename.match(/(?<=\.)[A-z]*$/);
    if (!matches)
        return "";
    return matches[0];
};
const video = document.querySelector("video");
video.addEventListener("dragenter", (e) => { e.preventDefault(); e.stopPropagation(); });
video.addEventListener("dragover", (e) => { e.preventDefault(); e.stopPropagation(); });
video.addEventListener("dragleave", (e) => { e.preventDefault(); e.stopPropagation(); });
video.addEventListener("drop", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer || !e.dataTransfer.items.length || e.dataTransfer.items[0].kind !== "file")
        return;
    const file = e.dataTransfer.items[0].getAsFile();
    if (!file)
        return;
    const ext = getFileExtension(file === null || file === void 0 ? void 0 : file.name);
    let url;
    let subtitles;
    switch (ext) {
        case "srt": {
            subtitles = yield (0, js_sub_parsers_1.parseFile)(file);
            console.log(subtitles);
            const vtt = (0, js_sub_parsers_1.toVtt)(subtitles);
            console.log(yield vtt.text());
            url = URL.createObjectURL(vtt);
            break;
        }
        default: return;
    }
    const track = document.createElement("track");
    track.src = url;
    track.default = true;
    track.kind = "subtitles";
    track.label = "ja";
    video.appendChild(track);
    track.addEventListener("cuechange", handleCueChange);
    for (const sub of subtitles) {
        const div = newSubtitleElement(sub);
        document.body.appendChild(div);
    }
}));
function handleCueChange(e) {
    // console.log(e)
    if (!video.textTracks)
        return;
    const track = video.textTracks[0];
    if (!track.activeCues)
        return;
    const active = track.activeCues[0];
    console.log(active, track);
}
function newSubtitleElement(subtitle) {
    const div = document.createElement("div");
    div.setAttribute("id", `sub${subtitle.index}`);
    div.setAttribute("class", "subtitle");
    const text = document.createElement("p");
    text.innerText = subtitle.text;
    text.setAttribute("class", "sub-text");
    const timestamp = document.createElement("p");
    timestamp.innerText = `${subtitle.start} - ${subtitle.end}`;
    timestamp.setAttribute("class", "timestamp");
    div.appendChild(text);
    div.appendChild(timestamp);
    return div;
}
// //for now while the one from js-sub-parsers isnt working
// function toVtt(subtitles: Subtitle[]): Blob {
//     let vtt = "WEBVTT\n\n"
//     for (const sub of subtitles) {
//         const start = sub.start.replace(",", ".")
//         const end = sub.end.replace(",", ".")
//         vtt += `${sub.index}\n`
//         vtt += `${start} --> ${end}\n`
//         vtt += `${sub.text}\n\n`
//     }
//     const blob = new Blob([vtt], {type: "text/vtt"})
//     return blob
// }


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3VicGxheWVyLy4vbm9kZV9tb2R1bGVzL2pzLXN1Yi1wYXJzZXJzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3VicGxheWVyLy4vbm9kZV9tb2R1bGVzL2pzLXN1Yi1wYXJzZXJzL2Rpc3QvcGFyc2VyLmpzIiwid2VicGFjazovL3N1YnBsYXllci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9zdWJwbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3VicGxheWVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdWJwbGF5ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdWJwbGF5ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdWJwbGF5ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdWJwbGF5ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N1YnBsYXllci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgcGFyc2VGaWxlLCB0b1Z0dCB9IGZyb20gXCIuL3BhcnNlclwiO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLy8gcmV0dXJucyB0aGUgc3RyaW5nIGZvcm1hdHRlZCBhcyBhIHZ0dCBmaWxlXG5leHBvcnQgdmFyIHRvVnR0ID0gZnVuY3Rpb24gKHN1YnRpdGxlcykge1xuICAgIHZhciB2dHQgPSBcIldFQlZUVFxcblxcblwiO1xuICAgIGZvciAodmFyIF9pID0gMCwgc3VidGl0bGVzXzEgPSBzdWJ0aXRsZXM7IF9pIDwgc3VidGl0bGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBzdWIgPSBzdWJ0aXRsZXNfMVtfaV07XG4gICAgICAgIHZhciBzdGFydCA9IHN1Yi5zdGFydC5yZXBsYWNlKFwiLFwiLCBcIi5cIik7XG4gICAgICAgIHZhciBlbmQgPSBzdWIuZW5kLnJlcGxhY2UoXCIsXCIsIFwiLlwiKTtcbiAgICAgICAgdnR0ICs9IFwiXCIuY29uY2F0KHN1Yi5pbmRleCwgXCJcXG5cIik7XG4gICAgICAgIHZ0dCArPSBcIlwiLmNvbmNhdChzdGFydCwgXCIgLS0+IFwiKS5jb25jYXQoZW5kLCBcIlxcblwiKTtcbiAgICAgICAgdnR0ICs9IFwiXCIuY29uY2F0KHN1Yi50ZXh0LCBcIlxcblxcblwiKTtcbiAgICB9XG4gICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbdnR0XSwgeyB0eXBlOiBcInRleHQvdnR0XCIgfSk7XG4gICAgcmV0dXJuIGJsb2I7XG59O1xuLy8gcGFyc2Ugc3J0IGZpbGUgYW5kIHJldHVybnMgdnR0IGJsb2JcbmV4cG9ydCB2YXIgcGFyc2VGaWxlID0gZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRleHQsIGxpbmVzLCBzdWJ0aXRsZXMsIHN1YnRpdGxlLCB0ZXh0TGluZXM7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZpbGUudGV4dCgpXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0ZXh0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIGxpbmVzID0gdGV4dC5zcGxpdCgvXFxyP1xcbi8pO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0ZXh0TGluZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGxpbmUgaXMgZW1wdHksIGlmIGlzLCBzdGFydCBuZXcgc3VidGl0bGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnRpdGxlICYmIHRleHRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZS50ZXh0ID0gdGV4dExpbmVzLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGVzLnB1c2goc3VidGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dExpbmVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZmlyc3QgbGluZSB3aWxsIGJlIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3VidGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBOdW1iZXIobGluZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBjb21lcyB0aW1lc3RhbXBzLCBJIGFtIHByZXR0eSBzdXJlIHRoYXQgd2UgZG8gbm90IG5lZWQgdG8gY2hlY2sgYm90aCB0aW1lc3RhbXBzXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3VidGl0bGUuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IGxpbmUuc3BsaXQoXCIgLS0+IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSBjYXNlIHdoZXJlIG5vdCB0d28gdGltZXN0bWFwc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlLnN0YXJ0ID0gdGltZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGUuZW5kID0gdGltZXNbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dExpbmVzLnB1c2gobGluZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHN1YnRpdGxlc107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGpzX3N1Yl9wYXJzZXJzXzEgPSByZXF1aXJlKFwianMtc3ViLXBhcnNlcnNcIik7XG5jb25zdCBnZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVuYW1lKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGZpbGVuYW1lLm1hdGNoKC8oPzw9XFwuKVtBLXpdKiQvKTtcbiAgICBpZiAoIW1hdGNoZXMpXG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIHJldHVybiBtYXRjaGVzWzBdO1xufTtcbmNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfSk7XG52aWRlby5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfSk7XG52aWRlby5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCFlLmRhdGFUcmFuc2ZlciB8fCAhZS5kYXRhVHJhbnNmZXIuaXRlbXMubGVuZ3RoIHx8IGUuZGF0YVRyYW5zZmVyLml0ZW1zWzBdLmtpbmQgIT09IFwiZmlsZVwiKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgZmlsZSA9IGUuZGF0YVRyYW5zZmVyLml0ZW1zWzBdLmdldEFzRmlsZSgpO1xuICAgIGlmICghZmlsZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGV4dCA9IGdldEZpbGVFeHRlbnNpb24oZmlsZSA9PT0gbnVsbCB8fCBmaWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmaWxlLm5hbWUpO1xuICAgIGxldCB1cmw7XG4gICAgbGV0IHN1YnRpdGxlcztcbiAgICBzd2l0Y2ggKGV4dCkge1xuICAgICAgICBjYXNlIFwic3J0XCI6IHtcbiAgICAgICAgICAgIHN1YnRpdGxlcyA9IHlpZWxkICgwLCBqc19zdWJfcGFyc2Vyc18xLnBhcnNlRmlsZSkoZmlsZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdWJ0aXRsZXMpO1xuICAgICAgICAgICAgY29uc3QgdnR0ID0gKDAsIGpzX3N1Yl9wYXJzZXJzXzEudG9WdHQpKHN1YnRpdGxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh5aWVsZCB2dHQudGV4dCgpKTtcbiAgICAgICAgICAgIHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwodnR0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIik7XG4gICAgdHJhY2suc3JjID0gdXJsO1xuICAgIHRyYWNrLmRlZmF1bHQgPSB0cnVlO1xuICAgIHRyYWNrLmtpbmQgPSBcInN1YnRpdGxlc1wiO1xuICAgIHRyYWNrLmxhYmVsID0gXCJqYVwiO1xuICAgIHZpZGVvLmFwcGVuZENoaWxkKHRyYWNrKTtcbiAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKFwiY3VlY2hhbmdlXCIsIGhhbmRsZUN1ZUNoYW5nZSk7XG4gICAgZm9yIChjb25zdCBzdWIgb2Ygc3VidGl0bGVzKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IG5ld1N1YnRpdGxlRWxlbWVudChzdWIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufSkpO1xuZnVuY3Rpb24gaGFuZGxlQ3VlQ2hhbmdlKGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgIGlmICghdmlkZW8udGV4dFRyYWNrcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHRyYWNrID0gdmlkZW8udGV4dFRyYWNrc1swXTtcbiAgICBpZiAoIXRyYWNrLmFjdGl2ZUN1ZXMpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBhY3RpdmUgPSB0cmFjay5hY3RpdmVDdWVzWzBdO1xuICAgIGNvbnNvbGUubG9nKGFjdGl2ZSwgdHJhY2spO1xufVxuZnVuY3Rpb24gbmV3U3VidGl0bGVFbGVtZW50KHN1YnRpdGxlKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHN1YiR7c3VidGl0bGUuaW5kZXh9YCk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3VidGl0bGVcIik7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRleHQuaW5uZXJUZXh0ID0gc3VidGl0bGUudGV4dDtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3ViLXRleHRcIik7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGltZXN0YW1wLmlubmVyVGV4dCA9IGAke3N1YnRpdGxlLnN0YXJ0fSAtICR7c3VidGl0bGUuZW5kfWA7XG4gICAgdGltZXN0YW1wLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGltZXN0YW1wXCIpO1xuICAgIGRpdi5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQodGltZXN0YW1wKTtcbiAgICByZXR1cm4gZGl2O1xufVxuLy8gLy9mb3Igbm93IHdoaWxlIHRoZSBvbmUgZnJvbSBqcy1zdWItcGFyc2VycyBpc250IHdvcmtpbmdcbi8vIGZ1bmN0aW9uIHRvVnR0KHN1YnRpdGxlczogU3VidGl0bGVbXSk6IEJsb2Ige1xuLy8gICAgIGxldCB2dHQgPSBcIldFQlZUVFxcblxcblwiXG4vLyAgICAgZm9yIChjb25zdCBzdWIgb2Ygc3VidGl0bGVzKSB7XG4vLyAgICAgICAgIGNvbnN0IHN0YXJ0ID0gc3ViLnN0YXJ0LnJlcGxhY2UoXCIsXCIsIFwiLlwiKVxuLy8gICAgICAgICBjb25zdCBlbmQgPSBzdWIuZW5kLnJlcGxhY2UoXCIsXCIsIFwiLlwiKVxuLy8gICAgICAgICB2dHQgKz0gYCR7c3ViLmluZGV4fVxcbmBcbi8vICAgICAgICAgdnR0ICs9IGAke3N0YXJ0fSAtLT4gJHtlbmR9XFxuYFxuLy8gICAgICAgICB2dHQgKz0gYCR7c3ViLnRleHR9XFxuXFxuYFxuLy8gICAgIH1cbi8vICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Z0dF0sIHt0eXBlOiBcInRleHQvdnR0XCJ9KVxuLy8gICAgIHJldHVybiBibG9iXG4vLyB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9