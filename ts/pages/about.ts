import { Request, Response } from "express";
import { Dbs } from "../db";
import * as ejs from 'ejs';
import { ejsError, viewPath, ejsSuffix, buildData } from "../tools";

export async function about(req: Request, res: Response) {
    try {


        let abouts = await Dbs.content.queryAbout();
        let about = abouts.length > 0 ? abouts[0] : null


        //let slideshowlist = await Dbs.content.homePostList();
        let header = ejs.fileLoader(viewPath + 'header/home-header' + ejsSuffix).toString();
        let main = ejs.fileLoader(viewPath + 'about' + ejsSuffix).toString();
        let footer = ejs.fileLoader(viewPath + 'footer/home-footer' + ejsSuffix).toString();

        let template = header
            + main
            + footer;
        let data = buildData(req, {
            about: about
        });
        let html = ejs.render(template, data);
        res.end(html);
    } catch (e) {
        ejsError(e, res);
    }

};
