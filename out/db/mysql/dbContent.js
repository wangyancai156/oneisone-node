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
exports.DbContent = void 0;
const db_1 = require("./db");
class DbContent extends db_1.Db {
    constructor() {
        super('content');
        this.db = this.databaseName;
        // let test = this.istest ? "$test" : "";
    }
    //搜索产品
    queryProduct(type, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT * FROM ${this.db}.product where type=? or 'all'=?  ORDER BY sort LIMIT ?,?;  `;
            const ret = yield this.tableFromSql(querySql, [type, type, pageStart, pageSize]);
            return ret;
        });
    }
    //统计产品页数
    queryProductPageCount(type, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT ceil(count(1)/?) as counts FROM ${this.db}.product where type=? or 'all'=? `;
            const ret = yield this.tableFromSql(querySql, [pageSize, type, type]);
            const ss = ret[0][0];
            return ret[0].counts;
        });
    }
    //搜索图片
    queryImage(type, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT * FROM ${this.db}.image where type=? ORDER BY sort LIMIT ?,?;  `;
            const ret = yield this.tableFromSql(querySql, [type, pageStart, pageSize]);
            return ret;
        });
    }
    //搜索轮播图
    querySwiper() {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT * FROM ${this.db}.swiper order by sort`;
            const ret = yield this.tableFromSql(querySql);
            return ret;
        });
    }
    //搜索关于
    queryAbout() {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT  * FROM ${this.db}.about limit 1 `;
            const ret = yield this.tableFromSql(querySql);
            return ret;
        });
    }
    //搜索新闻
    queryNews() {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT id,title,image, text, date_format(createdate, '%Y-%c-%d %h:%i:%s' ) as createdate FROM ${this.db}.news where isdel=0 order by createdate desc  `;
            const ret = yield this.tableFromSql(querySql);
            return ret;
        });
    }
    queryNewsDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var querySql = `SELECT id,title,image, text, date_format(createdate, '%Y-%c-%d %h:%i:%s' ) as createdate FROM ${this.db}.news where isdel=0 and id=? `;
            const ret = yield this.tableFromSql(querySql, [id]);
            return ret;
        });
    }
}
exports.DbContent = DbContent;
//# sourceMappingURL=dbContent.js.map