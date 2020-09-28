"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.MailService = void 0;
const EmailTemplates = require("email-templates");
const nodemailer = require("nodemailer");
const path = require("path");
const constants_1 = require("../../constants");
const config_1 = require("../../config");
const email_templates_1 = require("../../email-templates");
const errors_1 = require("../../errors");
if (!config_1.config.FRONTEND_URL
    || !config_1.config.ROOT_EMAIL_SERVICE
    || !config_1.config.ROOT_EMAIL
    || !config_1.config.ROOT_EMAIL_PASSWORD) {
    throw Error('Root email credentials are not defined!');
}
const contextExtension = {
    frontendUrl: config_1.config.FRONTEND_URL
};
const transporter = nodemailer.createTransport({
    service: config_1.config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config_1.config.ROOT_EMAIL,
        pass: config_1.config.ROOT_EMAIL_PASSWORD
    }
});
const emailTemplates = new EmailTemplates({
    message: {},
    views: {
        root: path.resolve(__dirname, '../../', 'email-templates')
    }
});
class MailService {
    async sendEmail(email, action, context = {}) {
        const templateInfo = email_templates_1.htmlTemplates[action];
        if (!templateInfo) {
            throw new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.SERVER, 'Template not found (');
        }
        Object.assign(context, contextExtension);
        const html = await emailTemplates.render(templateInfo.templateFileName, context);
        await transporter.sendMail({
            from: `NOREPLY <${config_1.config.ROOT_EMAIL}>`,
            to: email,
            subject: templateInfo.subject,
            html
        });
    }
}
exports.MailService = MailService;
exports.emailService = new MailService();
//# sourceMappingURL=mail.service.js.map