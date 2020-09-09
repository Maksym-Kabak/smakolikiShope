import {NextFunction, Request, Response} from 'express';

import {userService} from '../../services';
import {newUserValidator} from '../../vallidators/user';
import {IUser} from '../../models';
import {comparePassword, hashPassword} from '../../helpers';

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

    res.sendStatus(201);
  }
}

export const userController = new UserController();
