import {ActionEnum} from '../constants';

export const htmlTemplates: { [index: string]: { subject: string, templateFileName: string } } = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Вітаємо',
    templateFileName: 'user-welcome'
  },
  [ActionEnum.FORGOT_PASSWORD]: {
    subject: 'Співчуваєм',
    templateFileName: 'forgot-password'
  }
};
