import transporter from './mailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// export async function sendEmail({ to, subject, html }: SendEmailOptions) {
//   const mailOptions = {
//     from: `"Mallket" <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// }

type MailOptions = {
    to: string;
    subject: string;
    html: string;
};


export const sendMail = async ({ to, subject, html }: MailOptions) => {
    try {
        await transporter.sendMail({
            from: '"MallKet" <no-reply@mallket.com>',
            to,
            subject,
            html,
        });
        console.log(`📨 Email sent to ${to}`);
    } catch (error) {
        console.error('❌ Email sending failed:', error);
    }
};
