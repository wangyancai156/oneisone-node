import { Request, Response } from "express";
import { Dbs } from "../db";
import * as ejs from 'ejs';
import { ejsError, viewPath, ejsSuffix, buildData } from "../tools";
  
export async function newsdetail(req: Request, res: Response) {
    try {
        //let slideshowlist = await Dbs.content.homePostList();
        let header = ejs.fileLoader(viewPath + 'header/home-header' + ejsSuffix).toString();
        let main = ejs.fileLoader(viewPath + 'newsdetail' + ejsSuffix).toString();
        let footer = ejs.fileLoader(viewPath + 'footer/home-footer' + ejsSuffix).toString();

        var id = req.query.id == null ? "0" : req.query.id;
        let news = await Dbs.content.queryNewsDetail(id);
      

        let template = header
            + main
            + footer;
        let data = buildData(req, {
            news:news
        });
        let html = ejs.render(template, data);
        res.end(html);
    } catch (e) {
        ejsError(e, res);
    }

};
