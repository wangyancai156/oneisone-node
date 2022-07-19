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
exports.home = void 0;
const db_1 = require("../db");
const ejs = require("ejs");
const tools_1 = require("../tools");
function home(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //获取产品
            let product0 = yield db_1.Dbs.content.queryProduct("0", 0, 8);
            let product1 = yield db_1.Dbs.content.queryProduct("1", 0, 8);
            let product2 = yield db_1.Dbs.content.queryProduct("2", 0, 8);
            //let product = await Dbs.content.queryImage("product", 0,  10);
            //获取轮播图
            let swiper = yield db_1.Dbs.content.querySwiper();
            //车间
            let workshop = yield db_1.Dbs.content.queryImage("workshop", 0, 10);
            //合作案例
            let engineetring = yield db_1.Dbs.content.queryImage("engineetring", 0, 10);
            let abouts = yield db_1.Dbs.content.queryAbout();
            let about = abouts.length > 0 ? abouts[0] : null;
            let header = ejs.fileLoader(tools_1.viewPath + 'header/home-header' + tools_1.ejsSuffix).toString();
            let main = ejs.fileLoader(tools_1.viewPath + 'home' + tools_1.ejsSuffix).toString();
            let footer = ejs.fileLoader(tools_1.viewPath + 'footer/home-footer' + tools_1.ejsSuffix).toString();
            let template = header
                + main
                + footer;
            let data = (0, tools_1.buildData)(req, {
                swiper: swiper,
                about: about,
                product0: product0,
                product1: product1,
                product2: product2,
                engineetring: engineetring,
                workshop: workshop
            });
            console.log(about);
            let html = ejs.render(template, data);
            res.end(html);
        }
        catch (e) {
            (0, tools_1.ejsError)(e, res);
        }
    });
}
exports.home = home;
;
//# sourceMappingURL=home.js.map