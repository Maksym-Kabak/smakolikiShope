import {NextFunction, Request, Response} from 'express';

import {mailService, userService} from '../../services';
import {newUserValidator} from '../../vallidators/user';
import {IUser} from '../../models';
import {comparePassword, hashPassword} from '../../helpers';
import {ActionEnum} from '../../constants';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const {error} = newUserValidator.validate(user);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    await comparePassword('xx', 'xx');

    await userService.createUser(user);

    await mailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: 'xxx'});

    res.sendStatus(201);
  }
}

export const userController = new UserController();
