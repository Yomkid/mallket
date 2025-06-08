"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const mailer_1 = __importDefault(require("./mailer"));
async function sendEmail({ to, subject, html }) {
    const mailOptions = {
        from: `"Mallket" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    };
    await mailer_1.default.sendMail(mailOptions);
}
