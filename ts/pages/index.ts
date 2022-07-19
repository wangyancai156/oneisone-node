import { Router } from 'express';
import { home } from './home'; 
import { about } from './about'; 
import { product } from './product';
import { honor } from './honor';
import { news } from './news';
import { contact } from './contact';
import { strength } from './strength';
import { sitemap } from './sitemap';
import { newsdetail } from './newsdetail';


export const homeRouter = Router({ mergeParams: true });
homeRouter.get('/', home); 
homeRouter.get('/home', home); 
homeRouter.get('/about', about); 
homeRouter.get('/product', product); 
homeRouter.get('/honor', honor); 
homeRouter.get('/news', news); 
homeRouter.get('/contact', contact); 
homeRouter.get('/strength', strength); 
homeRouter.get('/sitemap', sitemap); 
homeRouter.get('/newsdetail', newsdetail); 



