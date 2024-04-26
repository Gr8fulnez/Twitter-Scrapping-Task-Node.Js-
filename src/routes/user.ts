import express from 'express';
import { scrapperController } from '../controller/user';


const router = express.Router();

 router.get('/scrape', scrapperController);


router.get('/', (req, res) => {
    res.send('Hyperhire Assessment API');
    });
export default router;
