import {Router} from 'express';
import {productController} from '../../controller';
import {checkAccessTokenMiddleware, newProductValidatorMiddleware} from '../../middleware';

const router = Router();

router.post(
  '/', checkAccessTokenMiddleware,
  newProductValidatorMiddleware,
  productController.createProduct);

export const productRouter = router;
