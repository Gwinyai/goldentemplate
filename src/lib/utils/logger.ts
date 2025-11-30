// Logger Utility
// Centralized logging with different levels and structured output

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  userId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  private constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || "info";
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };

    return levels[level] >= levels[this.logLevel];
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    
    if (this.isDevelopment) {
      // Colorful console output for development
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m', // Red
      };
      const reset = '\x1b[0m';
      
      let output = `${colors[level]}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}`;
      
      if (context) {
        output += `\n  Context: ${JSON.stringify(context, null, 2)}`;
      }
      
      return output;
    } else {
      // Structured JSON output for production
      const logEntry: LogEntry = {
        level,
        message,
        timestamp,
        context,
      };
      
      return JSON.stringify(logEntry);
    }
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, context);

    switch (level) {
      case "debug":
        console.debug(formattedMessage);
        break;
      case "info":
        console.info(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        if (error) console.warn(error);
        break;
      case "error":
        console.error(formattedMessage);
        if (error) console.error(error);
        break;
    }

    // TODO: In production, consider sending logs to external service
    // this.sendToExternalLogger(level, message, context, error);
  }

  public debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  public info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  public error(message: string, error?: Error, context?: LogContext): void {
    this.log("error", message, context, error);
  }

  // Convenience methods for common use cases
  public apiRequest(method: string, url: string, context?: LogContext): void {
    this.info(`API ${method} ${url}`, {
      ...context,
      component: "api",
      action: "request",
    });
  }

  public apiResponse(method: string, url: string, statusCode: number, duration?: number, context?: LogContext): void {
    const level = statusCode >= 400 ? "warn" : "info";
    this.log(level, `API ${method} ${url} - ${statusCode}`, {
      ...context,
      component: "api",
      action: "response",
      metadata: {
        statusCode,
        duration,
      },
    });
  }

  public userAction(userId: string, action: string, context?: LogContext): void {
    this.info(`User action: ${action}`, {
      ...context,
      userId,
      component: "user",
      action,
    });
  }

  public authEvent(event: string, userId?: string, context?: LogContext): void {
    this.info(`Auth event: ${event}`, {
      ...context,
      userId,
      component: "auth",
      action: event,
    });
  }

  public paymentEvent(event: string, userId?: string, amount?: number, currency?: string, context?: LogContext): void {
    this.info(`Payment event: ${event}`, {
      ...context,
      userId,
      component: "payment",
      action: event,
      metadata: {
        amount,
        currency,
      },
    });
  }

  public databaseQuery(query: string, duration?: number, context?: LogContext): void {
    this.debug(`Database query executed`, {
      ...context,
      component: "database",
      action: "query",
      metadata: {
        query: this.isDevelopment ? query : "[REDACTED]",
        duration,
      },
    });
  }

  public webhookEvent(provider: string, event: string, context?: LogContext): void {
    this.info(`Webhook received: ${provider}/${event}`, {
      ...context,
      component: "webhook",
      action: event,
      metadata: {
        provider,
      },
    });
  }

  // Performance timing utility
  public time(label: string): { end: () => void } {
    const start = Date.now();
    
    return {
      end: () => {
        const duration = Date.now() - start;
        this.debug(`Timer "${label}": ${duration}ms`, {
          component: "performance",
          action: "timing",
          metadata: { label, duration },
        });
      },
    };
  }

  // Error boundary logging
  public reactError(error: Error, errorInfo: any, context?: LogContext): void {
    this.error("React error boundary caught error", error, {
      ...context,
      component: "react",
      action: "error",
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  private async sendToExternalLogger(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): Promise<void> {
    // TODO: Implement external logging service integration
    // Examples:
    // - Sentry for error tracking
    // - LogRocket for user session recording
    // - DataDog for infrastructure logs
    // - Custom logging endpoint
    
    try {
      // const logEntry: LogEntry = {
      //   level,
      //   message,
      //   timestamp: new Date().toISOString(),
      //   context,
      //   error: error ? {
      //     name: error.name,
      //     message: error.message,
      //     stack: error.stack,
      //   } : undefined,
      // };

      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry),
      // });
    } catch (err) {
      // Silently fail to avoid infinite logging loops
      console.error("Failed to send log to external service:", err);
    }
  }

  // Configure logger
  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public getLogLevel(): LogLevel {
    return this.logLevel;
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience exports
export const log = logger;
export default logger;

// React hook for logging with component context
export function useLogger(componentName: string) {
  const componentLogger = {
    debug: (message: string, context?: Omit<LogContext, 'component'>) =>
      logger.debug(message, { ...context, component: componentName }),
    
    info: (message: string, context?: Omit<LogContext, 'component'>) =>
      logger.info(message, { ...context, component: componentName }),
    
    warn: (message: string, context?: Omit<LogContext, 'component'>) =>
      logger.warn(message, { ...context, component: componentName }),
    
    error: (message: string, error?: Error, context?: Omit<LogContext, 'component'>) =>
      logger.error(message, error, { ...context, component: componentName }),
    
    userAction: (action: string, userId?: string, context?: Omit<LogContext, 'component'>) =>
      logger.userAction(userId || 'unknown', action, { ...context, component: componentName }),
  };

  return componentLogger;
}

// API route logging middleware
export function withLogging(handler: Function, routeName: string) {
  return async function loggingWrapper(req: any, res: any, ...args: any[]) {
    const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const start = Date.now();

    logger.apiRequest(req.method, req.url, {
      requestId,
      component: routeName,
    });

    try {
      const result = await handler(req, res, ...args);
      
      const duration = Date.now() - start;
      logger.apiResponse(req.method, req.url, res.statusCode || 200, duration, {
        requestId,
        component: routeName,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - start;
      logger.error(`API error in ${routeName}`, error as Error, {
        requestId,
        component: routeName,
        metadata: { duration },
      });
      
      throw error;
    }
  };
}

// Development helper for debugging
export function debugLog(obj: any, label?: string): void {
  if (process.env.NODE_ENV === "development") {
    console.log(label ? `[DEBUG] ${label}:` : "[DEBUG]", obj);
  }
}