import {Router} from 'express';
import {userController} from '../../controller';
import {checkConfirmTokenMiddleware, checkIsEmailExistsMiddleware} from '../../middleware';

const router = Router();

router.post('/', checkIsEmailExistsMiddleware, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);

export const userRouter = router;
