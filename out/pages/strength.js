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
Object.defineProperty(exports, "__esModule", { value: true });
exports.strength = void 0;
const ejs = require("ejs");
const tools_1 = require("../tools");
function strength(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //let slideshowlist = await Dbs.content.homePostList();
            let header = ejs.fileLoader(tools_1.viewPath + 'header/home-header' + tools_1.ejsSuffix).toString();
            let main = ejs.fileLoader(tools_1.viewPath + 'strength' + tools_1.ejsSuffix).toString();
            let footer = ejs.fileLoader(tools_1.viewPath + 'footer/home-footer' + tools_1.ejsSuffix).toString();
            let template = header
                + main
                + footer;
            let data = (0, tools_1.buildData)(req, {});
            let html = ejs.render(template, data);
            res.end(html);
        }
        catch (e) {
            (0, tools_1.ejsError)(e, res);
        }
    });
}
exports.strength = strength;
;
//# sourceMappingURL=strength.js.map