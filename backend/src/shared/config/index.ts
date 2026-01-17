/**
 * Конфигурация приложения
 */
export const config = {
  /**
   * JWT секретный ключ
   */
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',

  /**
   * Время жизни JWT токена
   */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  /**
   * Количество раундов для bcrypt
   */
  bcryptRounds: 10,

  /**
   * SMTP хост
   */
  smtpHost: process.env.SMTP_HOST || 'mail.ahahlol.space',

  /**
   * SMTP порт
   */
  smtpPort: Number(process.env.SMTP_PORT) || 587,

  /**
   * SMTP secure (SSL/TLS)
   */
  smtpSecure: process.env.SMTP_SECURE === 'true',

  /**
   * SMTP пользователь
   */
  smtpUser: process.env.SMTP_USER || 'siteuser@ahahlol.space',

  /**
   * SMTP пароль
   */
  smtpPassword: process.env.SMTP_PASSWORD || '',

  /**
   * Email отправителя
   */
  emailFrom: process.env.EMAIL_FROM || 'siteuser@ahahlol.space',

  /**
   * Имя отправителя
   */
  emailFromName: process.env.EMAIL_FROM_NAME || 'Diamond CRM',

  /**
   * URL фронтенда
   */
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
} as const;
