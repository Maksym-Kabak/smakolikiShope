import {NextFunction, Request, Response} from 'express';
import {emailValidator} from '../../vallidators/user';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';

export const emailValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = emailValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
