import { Request, Response } from "express";
import { Dbs } from "../db";
import * as ejs from 'ejs';
import { ejsError, viewPath, ejsSuffix, buildData } from "../tools";

export async function product(req: Request, res: Response) {
    try {

        //获取产品
        var type = req.query.type == null ? "all" : req.query.type;
        var pageStart = req.query.pageStart == null ?0 : req.query.pageStart;
        pageStart = parseInt(pageStart);
        let product = await Dbs.content.queryProduct(type,pageStart, 8);
        let pageCount = await Dbs.content.queryProductPageCount(type,8);
        
        let header = ejs.fileLoader(viewPath + 'header/home-header' + ejsSuffix).toString();
        let main = ejs.fileLoader(viewPath + 'product' + ejsSuffix).toString();
        let footer = ejs.fileLoader(viewPath + 'footer/home-footer' + ejsSuffix).toString();

        let template = header
            + main
            + footer;
        let data = buildData(req, {
            type:type,
            product: product,
            pageStart:pageStart,
            pageCount:pageCount
        });
        let html = ejs.render(template, data);
        res.end(html);
    } catch (e) {
        ejsError(e, res);
    }

};
