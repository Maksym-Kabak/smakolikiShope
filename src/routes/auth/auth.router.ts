import {Router} from 'express';
import {authController} from '../../controller';
import {
  checkAccessTokenMiddleware,
  checkIsUserConfirmedMiddleware,
  checkIsUserExistsByEmailMiddleware,
  emailPasswordValidatorMiddleware
} from '../../middleware';

const router = Router();

router.post(
  '/',
  emailPasswordValidatorMiddleware,
  checkIsUserExistsByEmailMiddleware,
  checkIsUserConfirmedMiddleware,
  authController.authUser
);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

export const authRouter = router;
