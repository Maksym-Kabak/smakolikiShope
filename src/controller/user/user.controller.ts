import {NextFunction, Request, Response} from 'express';

import {emailService, userService} from '../../services';
import {newUserValidator} from '../../vallidators/user';
import {IRequestExtended, IUser} from '../../models';
import {comparePassword, hashPassword, tokinizer} from '../../helpers';
import {ActionEnum, ResponseStatusCodesEnum, UserStatusEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const {error} = newUserValidator.validate(user);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    await comparePassword('xx', 'xx');

    const {_id} = await userService.createUser(user);

    const {access_token} = tokinizer(ActionEnum.USER_REGISTER);

    await userService.addActionToken(_id, {action: ActionEnum.USER_REGISTER, token: access_token});

    await emailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: access_token});

    res.sendStatus(201);
  }

  async confirmUser(req: IRequestExtended, res: Response, next: NextFunction) {

    const {_id, status} = req.user as IUser;

    if (status !== UserStatusEnum.PENDING) {
      return next(
        new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_USER_ACTIVATED.message,
          customErrors.BAD_REQUEST_USER_ACTIVATED.code)
      );
    }

    await userService.updateUserByParams({_id}, {status: UserStatusEnum.CONFIRMED});

    res.end();
  }
}

export const userController = new UserController();
