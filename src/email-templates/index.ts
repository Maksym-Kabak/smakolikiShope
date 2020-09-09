import {ActionEnum} from '../constants';

export const htmlTemplate: {[index: string]: { subject: string, templateFileName: string }} = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Вітаємо',
    templateFileName: 'user-welcome'
  }
};
