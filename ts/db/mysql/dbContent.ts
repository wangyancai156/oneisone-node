import { Db } from "./db";
import { DebounceSettings } from "lodash";

export class DbContent extends Db {

    private db: string;
    constructor() {
        super('content');
        this.db = this.databaseName;
        // let test = this.istest ? "$test" : "";

    }

    //搜索产品
    async queryProduct(type: any, pageStart: number, pageSize: number): Promise<any> {

        var querySql: string = `SELECT * FROM ${this.db}.product where type=? or 'all'=?  ORDER BY sort LIMIT ?,?;  `;

        const ret = await this.tableFromSql(querySql, [type, type, pageStart, pageSize]);
        return ret;
    }
    //统计产品页数
    async queryProductPageCount(type: any, pageSize: number): Promise<any> {

        var querySql: string = `SELECT ceil(count(1)/?) as counts FROM ${this.db}.product where type=? or 'all'=? `;

        const ret = await this.tableFromSql(querySql, [pageSize, type, type]);
        const ss = ret[0][0];
        return  ret[0].counts;
    }

    //搜索图片
    async queryImage(type: any, pageStart: number, pageSize: number): Promise<any> {

        var querySql: string = `SELECT * FROM ${this.db}.image where type=? ORDER BY sort LIMIT ?,?;  `;

        const ret = await this.tableFromSql(querySql, [type, pageStart, pageSize]);
        return ret;
    }


    //搜索轮播图
    async querySwiper(): Promise<any> {

        var querySql: string = `SELECT * FROM ${this.db}.swiper order by sort`;

        const ret = await this.tableFromSql(querySql);
        return ret;
    }

    //搜索关于
    async queryAbout(): Promise<any> {

        var querySql: string = `SELECT  * FROM ${this.db}.about limit 1 `;

        const ret = await this.tableFromSql(querySql);
        return ret;
    }

    //搜索新闻
    async queryNews(): Promise<any> {

        var querySql: string = `SELECT id,title,image, text, date_format(createdate, '%Y-%c-%d %h:%i:%s' ) as createdate FROM ${this.db}.news where isdel=0 order by createdate desc  `;

        const ret = await this.tableFromSql(querySql);
        return ret;
    }

    async queryNewsDetail(id:number): Promise<any> {

        var querySql: string = `SELECT id,title,image, text, date_format(createdate, '%Y-%c-%d %h:%i:%s' ) as createdate FROM ${this.db}.news where isdel=0 and id=? `;

        const ret = await this.tableFromSql(querySql,[id]);
        return ret;
    }


}
