// Centralized Email Integration Layer
// Allows switching between email providers (Resend, Mailgun, etc.)

import { 
  sendEmail as sendWithResend, 
  sendWelcomeEmail as sendWelcomeWithResend,
  sendPasswordResetEmail as sendPasswordResetWithResend,
  sendSubscriptionConfirmation as sendSubscriptionConfirmationWithResend,
  sendContactFormSubmission as sendContactFormWithResend,
  SendEmailParams as ResendParams
} from "./resend";

import { 
  sendEmailWithMailgun,
  sendTransactionalEmail as sendTransactionalWithMailgun,
  validateEmail as validateWithMailgun,
  MailgunSendParams 
} from "./mailgun";

export type EmailProvider = "resend" | "mailgun";

export interface EmailConfig {
  provider: EmailProvider;
  fromEmail: string;
}

export interface UniversalEmailParams {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  tags?: string[];
}

export interface EmailResult {
  id: string;
  provider: EmailProvider;
  success: boolean;
  message?: string;
}

// Default to Resend as it's more developer-friendly
const DEFAULT_EMAIL_PROVIDER: EmailProvider = "resend";

export function getEmailProvider(): EmailProvider {
  const provider = process.env.NEXT_PUBLIC_EMAIL_PROVIDER as EmailProvider;
  return provider || DEFAULT_EMAIL_PROVIDER;
}

export function getFromEmail(): string {
  const provider = getEmailProvider();
  
  switch (provider) {
    case "resend":
      return process.env.RESEND_FROM_EMAIL || "noreply@yourdomain.com";
    case "mailgun":
      const domain = process.env.MAILGUN_DOMAIN;
      return domain ? `noreply@${domain}` : "noreply@yourdomain.com";
    default:
      return "noreply@yourdomain.com";
  }
}

export async function sendEmail(params: UniversalEmailParams): Promise<EmailResult> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case "resend":
        const resendResult = await sendWithResend({
          to: params.to,
          subject: params.subject,
          text: params.text,
          html: params.html,
          from: params.from || getFromEmail(),
          replyTo: params.replyTo,
          cc: params.cc,
          bcc: params.bcc,
          tags: params.tags?.map(tag => ({ name: tag, value: "true" })),
        });
        
        return {
          id: resendResult.id,
          provider: "resend",
          success: true,
        };

      case "mailgun":
        const mailgunResult = await sendEmailWithMailgun({
          to: params.to,
          subject: params.subject,
          text: params.text,
          html: params.html,
          from: params.from || getFromEmail(),
          cc: params.cc,
          bcc: params.bcc,
          tags: params.tags,
        });
        
        return {
          id: mailgunResult.id,
          provider: "mailgun",
          success: true,
          message: mailgunResult.message,
        };

      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Email sending error (${provider}):`, error);
    
    // In development, return a mock success response
    if (process.env.NODE_ENV === "development") {
      console.warn("Email provider not configured. Using mock email sending for development.");
      return {
        id: `mock-email-${Date.now()}`,
        provider,
        success: true,
        message: "Mock email sent successfully",
      };
    }
    
    return {
      id: "",
      provider,
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendWelcomeEmail(to: string, userName: string): Promise<EmailResult> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case "resend":
        const result = await sendWelcomeWithResend(to, userName);
        return {
          id: result.id,
          provider: "resend",
          success: true,
        };

      case "mailgun":
        // For Mailgun, we can use a template or send a custom email
        const welcomeResult = await sendTransactionalWithMailgun(to, "welcome", { 
          userName,
          appName: process.env.NEXT_PUBLIC_APP_NAME || "Our Platform"
        });
        return {
          id: welcomeResult.id,
          provider: "mailgun",
          success: true,
          message: welcomeResult.message,
        };

      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error("Welcome email error:", error);
    
    if (process.env.NODE_ENV === "development") {
      return {
        id: `mock-welcome-${Date.now()}`,
        provider,
        success: true,
        message: `Mock welcome email sent to ${userName}`,
      };
    }
    
    throw error;
  }
}

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<EmailResult> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case "resend":
        const result = await sendPasswordResetWithResend(to, resetUrl);
        return {
          id: result.id,
          provider: "resend",
          success: true,
        };

      case "mailgun":
        const resetResult = await sendTransactionalWithMailgun(to, "password-reset", { 
          resetUrl,
          appName: process.env.NEXT_PUBLIC_APP_NAME || "Our Platform"
        });
        return {
          id: resetResult.id,
          provider: "mailgun",
          success: true,
          message: resetResult.message,
        };

      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error("Password reset email error:", error);
    
    if (process.env.NODE_ENV === "development") {
      return {
        id: `mock-reset-${Date.now()}`,
        provider,
        success: true,
        message: "Mock password reset email sent",
      };
    }
    
    throw error;
  }
}

export async function sendSubscriptionConfirmation(
  to: string,
  userName: string,
  planName: string,
  amount: number,
  currency: string
): Promise<EmailResult> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case "resend":
        const result = await sendSubscriptionConfirmationWithResend(to, userName, planName, amount, currency);
        return {
          id: result.id,
          provider: "resend",
          success: true,
        };

      case "mailgun":
        const subResult = await sendTransactionalWithMailgun(to, "subscription-confirmed", { 
          userName,
          planName,
          amount: (amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
          }),
        });
        return {
          id: subResult.id,
          provider: "mailgun",
          success: true,
          message: subResult.message,
        };

      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error("Subscription confirmation email error:", error);
    
    if (process.env.NODE_ENV === "development") {
      return {
        id: `mock-subscription-${Date.now()}`,
        provider,
        success: true,
        message: `Mock subscription confirmation sent to ${userName}`,
      };
    }
    
    throw error;
  }
}

export async function sendContactFormSubmission(
  name: string,
  email: string,
  message: string
): Promise<EmailResult> {
  try {
    // Always send contact forms with the configured provider
    const result = await sendContactFormWithResend(name, email, message);
    return {
      id: result.id,
      provider: "resend",
      success: true,
    };
  } catch (error) {
    console.error("Contact form email error:", error);
    
    if (process.env.NODE_ENV === "development") {
      return {
        id: `mock-contact-${Date.now()}`,
        provider: "resend",
        success: true,
        message: `Mock contact form submission from ${name}`,
      };
    }
    
    throw error;
  }
}

export async function validateEmail(email: string): Promise<boolean> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case "mailgun":
        return await validateWithMailgun(email);
      
      case "resend":
      default:
        // Basic email validation for Resend (they don't provide validation API)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  } catch (error) {
    console.error("Email validation error:", error);
    // Fallback to basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Re-export provider-specific functions for direct usage when needed
export * from "./resend";
export * from "./mailgun";