import { Db } from "./db";
import { DbContent } from "./dbContent";
export class Dbs {
    static unit = 24;
    static content: DbContent;

    static init() {
        Db.init();
        Dbs.content = new DbContent();
        // Dbs.product = new DbProduct();
        // Dbs.productIndex = new DbProductIndex();
        // Dbs.pointshop = new DbPointShop();
    }
}

export { Db } from './db';
