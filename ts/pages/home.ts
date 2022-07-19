import { Request, Response } from "express";
import { Dbs } from "../db";
import * as ejs from 'ejs';
import { ejsError, viewPath, ejsSuffix, buildData } from "../tools";

export async function home(req: Request, res: Response) {
    try {

        //获取产品
        let product0 = await Dbs.content.queryProduct("0", 0,  8);
        let product1 = await Dbs.content.queryProduct("1", 0,  8);
        let product2 = await Dbs.content.queryProduct("2", 0,  8);
        //let product = await Dbs.content.queryImage("product", 0,  10);
        //获取轮播图
        let swiper = await Dbs.content.querySwiper();
        //车间
        let workshop = await Dbs.content.queryImage("workshop", 0, 10);
        //合作案例
        let engineetring = await Dbs.content.queryImage("engineetring", 0, 10);

        let abouts = await Dbs.content.queryAbout();
        let about = abouts.length > 0 ? abouts[0] : null

        let header = ejs.fileLoader(viewPath + 'header/home-header' + ejsSuffix).toString();
        let main = ejs.fileLoader(viewPath + 'home' + ejsSuffix).toString();
        let footer = ejs.fileLoader(viewPath + 'footer/home-footer' + ejsSuffix).toString();
        let template = header
            + main
            + footer;

        let data = buildData(req, {
            swiper: swiper,
            about: about,
            product0: product0,
            product1: product1,
            product2: product2,
            engineetring:engineetring,
            workshop: workshop
        });

        console.log(about);
        let html = ejs.render(template, data);
        res.end(html);
    } catch (e) {
        ejsError(e, res);
    }

};
