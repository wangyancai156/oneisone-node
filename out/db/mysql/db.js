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
exports.Db = void 0;
const mysql_1 = require("mysql");
const config = require("config");
class Db {
    constructor(dbName) {
        this.istest = Db.isTest;
        let myConfig = Db.dbConfig[dbName];
        if (myConfig === undefined) {
            console.error('config.json db 没有定义 database ' + dbName);
        }
        this.databaseName = myConfig.database;
        if (this.databaseName === undefined) {
            console.error('config.json db/' + dbName + ' 没有定义 database');
        }
        if (Db.isTest === true)
            this.databaseName += '$test';
        let conn = myConfig.connection;
        let connection;
        if (conn === undefined) {
            connection = Db.connection;
        }
        else {
            if (config.has(conn) === false) {
                console.error('config.json 没有定义 connection ' + conn);
            }
            //在此处获取default配置里面是否为测试的模式，如果是则获取default里面的测试链接地址，否则获取正式链接地址
            if (Db.isTest === true) {
                connection = config.get("connection-test");
            }
            else {
                connection = config.get("connection");
            }
        }
        this.pool = (0, mysql_1.createPool)(connection);
    }
    static init() {
        //初始化数据库之前先获取 项目的当前状态
        Db.isTest = config.has('test') === true ? config.get('test') : false;
        if (config.has('connection') === false) {
            console.error('config.json 没有定义 connection');
        }
        if (config.has('db') === false) {
            console.error('config.json 没有定义 db');
        }
        Db.connection = config.get('connection');
        Db.dbConfig = config.get('db');
    }
    buildCall(proc, values) {
        let ret = 'call `' + this.databaseName + '`.`' + proc + '`(';
        if (values !== undefined) {
            ret += values.map(v => '?').join(',');
        }
        return ret + ');';
    }
    execSql(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.pool.query(sql, params, (err, result) => {
                    if (err !== null) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    tableFromSql(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.execSql(sql, values);
            if (Array.isArray(res) === false)
                return [];
            if (res.length === 0)
                return [];
            let row0 = res[0];
            if (Array.isArray(row0))
                return row0;
            return res;
        });
    }
    tablesFromSql(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execSql(sql, values);
        });
    }
    execProc(proc, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                let sql = this.buildCall(proc, values);
                this.pool.query(sql, values, (err, result) => {
                    if (err !== null) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    tableFromProc(proc, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.execProc(proc, values);
            if (Array.isArray(res) === false)
                return [];
            switch (res.length) {
                case 0: return [];
                default: return res[0];
            }
        });
    }
    tablesFromProc(proc, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execProc(proc, values);
        });
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map