import {NextFunction, Request, Response} from 'express';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';
import {newProductValidator} from '../../vallidators';

export const newProductValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = newProductValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
