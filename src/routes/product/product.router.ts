import {Router} from 'express';
import {productController} from '../../controller';
import {checkIsEmailExistsMiddleware} from '../../middleware/user';

const router = Router();

router.post('/', checkIsEmailExistsMiddleware, productController.createProduct);

export const productRouter = router;
