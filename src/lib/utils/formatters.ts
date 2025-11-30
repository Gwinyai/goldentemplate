// Data Formatters
// Utilities for formatting dates, currency, numbers, and other data types

export interface FormatOptions {
  locale?: string;
  timezone?: string;
}

// Date formatting utilities
export class DateFormatter {
  private locale: string;
  private timezone: string;

  constructor(options: FormatOptions = {}) {
    this.locale = options.locale || 'en-US';
    this.timezone = options.timezone || 'UTC';
  }

  // Format date as relative time (e.g., "2 hours ago", "3 days ago")
  relative(date: Date | string | number): string {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

    if (diffInSeconds < 0) {
      return this.formatFutureRelative(Math.abs(diffInSeconds));
    }

    return this.formatPastRelative(diffInSeconds);
  }

  private formatPastRelative(seconds: number): string {
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    if (seconds < 60) return 'just now';

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  private formatFutureRelative(seconds: number): string {
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    if (seconds < 60) return 'in a moment';

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `in ${count} ${interval.label}${count > 1 ? 's' : ''}`;
      }
    }

    return 'in a moment';
  }

  // Format date as short string (e.g., "Jan 15, 2024")
  short(date: Date | string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: this.timezone,
    }).format(new Date(date));
  }

  // Format date as medium string (e.g., "January 15, 2024")
  medium(date: Date | string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: this.timezone,
    }).format(new Date(date));
  }

  // Format date as long string (e.g., "Monday, January 15, 2024")
  long(date: Date | string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: this.timezone,
    }).format(new Date(date));
  }

  // Format time (e.g., "3:30 PM")
  time(date: Date | string | number, use24Hour: boolean = false): string {
    return new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !use24Hour,
      timeZone: this.timezone,
    }).format(new Date(date));
  }

  // Format date and time (e.g., "Jan 15, 2024 at 3:30 PM")
  dateTime(date: Date | string | number, use24Hour: boolean = false): string {
    const dateStr = this.short(date);
    const timeStr = this.time(date, use24Hour);
    return `${dateStr} at ${timeStr}`;
  }

  // Format as ISO string for APIs
  iso(date: Date | string | number): string {
    return new Date(date).toISOString();
  }

  // Format for display in different contexts
  calendar(date: Date | string | number): string {
    const targetDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Same day
    if (this.isSameDay(targetDate, today)) {
      return `Today at ${this.time(date)}`;
    }

    // Yesterday
    if (this.isSameDay(targetDate, yesterday)) {
      return `Yesterday at ${this.time(date)}`;
    }

    // Tomorrow
    if (this.isSameDay(targetDate, tomorrow)) {
      return `Tomorrow at ${this.time(date)}`;
    }

    // This week
    const daysDiff = Math.abs(Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    if (daysDiff <= 7) {
      const weekday = new Intl.DateTimeFormat(this.locale, {
        weekday: 'long',
        timeZone: this.timezone,
      }).format(targetDate);
      return `${weekday} at ${this.time(date)}`;
    }

    // Older dates
    return this.dateTime(date);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }
}

// Currency formatting utilities
export class CurrencyFormatter {
  private locale: string;

  constructor(options: FormatOptions = {}) {
    this.locale = options.locale || 'en-US';
  }

  // Format currency with symbol (e.g., "$29.99")
  format(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  }

  // Format currency without symbol (e.g., "29.99")
  formatWithoutSymbol(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // Format currency for display in different contexts
  display(amount: number, currency: string = 'USD', showFree: boolean = true): string {
    if (amount === 0 && showFree) {
      return 'Free';
    }
    return this.format(amount, currency);
  }

  // Format subscription pricing (e.g., "$29/month", "$290/year")
  subscription(amount: number, interval: 'month' | 'year' | 'week' | 'day', currency: string = 'USD'): string {
    if (amount === 0) return 'Free';
    return `${this.format(amount, currency)}/${interval}`;
  }

  // Format as percentage discount (e.g., "Save 20%")
  discount(originalAmount: number, discountedAmount: number): string {
    if (originalAmount <= discountedAmount) return '';
    
    const discountPercent = Math.round(((originalAmount - discountedAmount) / originalAmount) * 100);
    return `Save ${discountPercent}%`;
  }

  // Format price range (e.g., "$10 - $50")
  range(minAmount: number, maxAmount: number, currency: string = 'USD'): string {
    return `${this.format(minAmount, currency)} - ${this.format(maxAmount, currency)}`;
  }
}

// Number formatting utilities
export class NumberFormatter {
  private locale: string;

  constructor(options: FormatOptions = {}) {
    this.locale = options.locale || 'en-US';
  }

  // Format large numbers with abbreviations (e.g., "1.2K", "5.4M", "2.1B")
  abbreviate(num: number): string {
    const units = [
      { value: 1e9, symbol: 'B' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'K' },
    ];

    for (const unit of units) {
      if (Math.abs(num) >= unit.value) {
        const abbreviated = num / unit.value;
        return `${abbreviated % 1 === 0 ? abbreviated : abbreviated.toFixed(1)}${unit.symbol}`;
      }
    }

    return num.toString();
  }

  // Format with thousand separators (e.g., "1,234,567")
  withSeparators(num: number): string {
    return new Intl.NumberFormat(this.locale).format(num);
  }

  // Format as percentage (e.g., "75%", "125.5%")
  percentage(num: number, decimals: number = 0): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num / 100);
  }

  // Format ordinal numbers (e.g., "1st", "2nd", "3rd", "21st")
  ordinal(num: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = num % 100;
    const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    return `${num}${suffix}`;
  }

  // Format file sizes (e.g., "1.5 KB", "2.3 MB", "4.7 GB")
  fileSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const base = 1024;
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
    const size = bytes / Math.pow(base, unitIndex);

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  // Format duration in milliseconds to human readable (e.g., "2h 30m", "45s", "1.5s")
  duration(milliseconds: number): string {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    }

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    if (seconds >= 10) {
      return `${seconds}s`;
    }
    return `${(milliseconds / 1000).toFixed(1)}s`;
  }
}

// Text formatting utilities
export class TextFormatter {
  // Truncate text with ellipsis
  truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  }

  // Truncate text at word boundaries
  truncateWords(text: string, maxWords: number, suffix: string = '...'): string {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + suffix;
  }

  // Convert to title case
  titleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  // Convert to sentence case
  sentenceCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  // Extract initials from name (e.g., "John Doe" -> "JD")
  initials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3); // Max 3 characters
  }

  // Format phone numbers (basic US format)
  phone(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    if (cleaned.length === 11 && cleaned.charAt(0) === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phoneNumber; // Return original if not a recognized format
  }

  // Mask sensitive data (e.g., email, credit card)
  mask(text: string, visibleStart: number = 2, visibleEnd: number = 2, maskChar: string = '*'): string {
    if (text.length <= visibleStart + visibleEnd) {
      return maskChar.repeat(text.length);
    }
    
    const start = text.slice(0, visibleStart);
    const end = text.slice(-visibleEnd);
    const masked = maskChar.repeat(text.length - visibleStart - visibleEnd);
    
    return start + masked + end;
  }

  // Format email for display (mask if needed)
  email(email: string, shouldMask: boolean = false): string {
    if (!shouldMask) return email;
    
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    
    const maskedUsername = this.mask(username, 2, 1);
    return `${maskedUsername}@${domain}`;
  }

  // Convert markdown-like syntax to HTML (basic)
  simpleMarkdown(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/`(.*?)`/g, '<code>$1</code>') // Code
      .replace(/\n/g, '<br>'); // Line breaks
  }
}

// Default formatter instances
export const dateFormatter = new DateFormatter();
export const currencyFormatter = new CurrencyFormatter();
export const numberFormatter = new NumberFormatter();
export const textFormatter = new TextFormatter();

// Convenience functions
export const formatDate = {
  relative: (date: Date | string | number) => dateFormatter.relative(date),
  short: (date: Date | string | number) => dateFormatter.short(date),
  medium: (date: Date | string | number) => dateFormatter.medium(date),
  long: (date: Date | string | number) => dateFormatter.long(date),
  time: (date: Date | string | number) => dateFormatter.time(date),
  dateTime: (date: Date | string | number) => dateFormatter.dateTime(date),
  calendar: (date: Date | string | number) => dateFormatter.calendar(date),
  iso: (date: Date | string | number) => dateFormatter.iso(date),
};

export const formatCurrency = {
  usd: (amount: number) => currencyFormatter.format(amount, 'USD'),
  eur: (amount: number) => currencyFormatter.format(amount, 'EUR'),
  gbp: (amount: number) => currencyFormatter.format(amount, 'GBP'),
  display: (amount: number, currency?: string) => currencyFormatter.display(amount, currency),
  subscription: (amount: number, interval: 'month' | 'year' | 'week' | 'day', currency?: string) => 
    currencyFormatter.subscription(amount, interval, currency),
  discount: (original: number, discounted: number) => currencyFormatter.discount(original, discounted),
  range: (min: number, max: number, currency?: string) => currencyFormatter.range(min, max, currency),
};

export const formatNumber = {
  abbreviate: (num: number) => numberFormatter.abbreviate(num),
  withSeparators: (num: number) => numberFormatter.withSeparators(num),
  percentage: (num: number, decimals?: number) => numberFormatter.percentage(num, decimals),
  ordinal: (num: number) => numberFormatter.ordinal(num),
  fileSize: (bytes: number) => numberFormatter.fileSize(bytes),
  duration: (ms: number) => numberFormatter.duration(ms),
};

export const formatText = {
  truncate: (text: string, length: number) => textFormatter.truncate(text, length),
  truncateWords: (text: string, words: number) => textFormatter.truncateWords(text, words),
  titleCase: (text: string) => textFormatter.titleCase(text),
  sentenceCase: (text: string) => textFormatter.sentenceCase(text),
  initials: (name: string) => textFormatter.initials(name),
  phone: (phone: string) => textFormatter.phone(phone),
  mask: (text: string, start?: number, end?: number) => textFormatter.mask(text, start, end),
  email: (email: string, shouldMask?: boolean) => textFormatter.email(email, shouldMask),
  markdown: (text: string) => textFormatter.simpleMarkdown(text),
};