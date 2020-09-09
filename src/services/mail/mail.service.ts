import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import {ActionEnum} from '../../constants';
import {config} from '../../config';
import {htmlTemplate} from '../../email-templates';
import {ErrorHandler} from '../../errors';

const contextExtention = {
  frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

const emailTemplates = new EmailTemplates({
  message: {},
  views: {
    root: path.resolve((global as any).appRoot, 'email-templates', 'templates')
  }
});

export class MailService {
  async sendEmail(email: string, action: ActionEnum, context: any = {}) {
    const templateInfo = htmlTemplate[action];
    if (!templateInfo) {
      throw new ErrorHandler(500, 'Template not found');
    }
    Object.assign(context, contextExtention);

    const html = await emailTemplates.render(templateInfo.templateFileName, context);

    const mailOption = {
      from: `NOREPLY <${config.ROOT_EMAIL}`,
      to: email,
      subject: templateInfo.subject,
      html
    };
    await transporter.sendMail(mailOption);
  }
}

export const mailService = new MailService();
