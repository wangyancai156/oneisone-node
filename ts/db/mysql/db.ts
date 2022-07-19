import { createPool, Pool } from 'mysql';
import * as config from 'config';

export abstract class Db {
    protected static isTest: boolean;
    private static connection: any;
    private static dbConfig: any;

    static init() {
        //初始化数据库之前先获取 项目的当前状态
        Db.isTest = config.has('test') === true ? config.get<boolean>('test') : false;

        if (config.has('connection') === false) {
            console.error('config.json 没有定义 connection');
        }
        if (config.has('db') === false) {
            console.error('config.json 没有定义 db');
        }

        Db.connection = config.get('connection');
        Db.dbConfig = config.get('db');
    }

    protected readonly databaseName: string;
    protected readonly istest: boolean;
    private readonly pool: Pool;

    constructor(dbName: string) {
        this.istest = Db.isTest;
        let myConfig = Db.dbConfig[dbName];
        if (myConfig === undefined) {
            console.error('config.json db 没有定义 database ' + dbName);
        }
        this.databaseName = myConfig.database;
        if (this.databaseName === undefined) {
            console.error('config.json db/' + dbName + ' 没有定义 database');
        }
        if (Db.isTest === true) this.databaseName += '$test';
        let conn = myConfig.connection;
        let connection: any;
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
            } else {
                connection = config.get("connection");
            }
        }
        this.pool = createPool(connection)
    }

    buildCall(proc: string, values?: any[]) {
        let ret = 'call `' + this.databaseName + '`.`' + proc + '`(';
        if (values !== undefined) {
            ret += values.map(v => '?').join(',');
        }
        return ret + ');';
    }

    async execSql(sql: string, params: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.pool.query(sql, params, (err, result) => {
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        });
    }

    async tableFromSql(sql: string, values?: any[]): Promise<any[]> {
        let res = await this.execSql(sql, values)
        if (Array.isArray(res) === false) return [];
        if (res.length === 0) return [];
        let row0 = res[0];
        if (Array.isArray(row0)) return row0;
        return res;
    }

    async tablesFromSql(sql: string, values?: any[]): Promise<any[]> {
        return await this.execSql(sql, values);
    }

    async execProc(proc: string, values?: any[]): Promise<any> {
        return await new Promise<any>((resolve, reject) => {
            let sql = this.buildCall(proc, values);
            this.pool.query(sql, values, (err, result) => {
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        });
    }

    async tableFromProc(proc: string, values?: any[]): Promise<any[]> {
        let res = await this.execProc(proc, values);
        if (Array.isArray(res) === false) return [];
        switch (res.length) {
            case 0: return [];
            default: return res[0];
        }
    }

    async tablesFromProc(proc: string, values?: any[]): Promise<any[][]> {
        return await this.execProc(proc, values);
    }
}
