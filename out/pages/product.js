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
exports.product = void 0;
const db_1 = require("../db");
const ejs = require("ejs");
const tools_1 = require("../tools");
function product(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //获取产品
            var type = req.query.type == null ? "all" : req.query.type;
            var pageStart = req.query.pageStart == null ? 0 : req.query.pageStart;
            pageStart = parseInt(pageStart);
            let product = yield db_1.Dbs.content.queryProduct(type, pageStart, 8);
            let pageCount = yield db_1.Dbs.content.queryProductPageCount(type, 8);
            let header = ejs.fileLoader(tools_1.viewPath + 'header/home-header' + tools_1.ejsSuffix).toString();
            let main = ejs.fileLoader(tools_1.viewPath + 'product' + tools_1.ejsSuffix).toString();
            let footer = ejs.fileLoader(tools_1.viewPath + 'footer/home-footer' + tools_1.ejsSuffix).toString();
            let template = header
                + main
                + footer;
            let data = (0, tools_1.buildData)(req, {
                type: type,
                product: product,
                pageStart: pageStart,
                pageCount: pageCount
            });
            let html = ejs.render(template, data);
            res.end(html);
        }
        catch (e) {
            (0, tools_1.ejsError)(e, res);
        }
    });
}
exports.product = product;
;
//# sourceMappingURL=product.js.map