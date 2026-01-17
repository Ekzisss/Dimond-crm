import nodemailer from 'nodemailer';

import { config } from '@shared/config';

/**
 * Email сервис для отправки писем через собственный SMTP
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
      },
    });
  }

  /**
   * Отправить письмо для сброса пароля
   */
  async sendPasswordReset({ to, token }: { to: string; token: string }): Promise<void> {
    const resetLink = `${config.frontendUrl}/reset-password?token=${token}`;

    console.log(config);

    try {
      const info = await this.transporter.sendMail({
        from: `"${config.emailFromName}" <${config.smtpUser}>`,
        to,
        subject: 'Восстановление пароля - Diamond CRM',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">Восстановление пароля</h2>
            <p>Вы запросили восстановление пароля для вашего аккаунта в Diamond CRM.</p>
            <p>Перейдите по ссылке ниже для сброса пароля:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
              Сбросить пароль
            </a>
            <p style="color: #666; font-size: 14px;">Ссылка действительна в течение 1 часа.</p>
            <p style="color: #666; font-size: 14px;">Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.</p>
          </div>
        `,
        text: `Восстановление пароля\n\nПерейдите по ссылке для сброса пароля: ${resetLink}\n\nСсылка действительна в течение 1 часа.`,
      });

      console.log('✅ Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      console.log('===================\n');
    } catch (error) {
      console.error('❌ Email sending failed!');
      console.error('Error:', error);
      console.log('===================\n');
      throw error;
    }
  }
}

export const emailService = new EmailService();
