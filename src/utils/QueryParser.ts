import { ParsedUrlQuery } from 'querystring';
import { Locale } from '@/core/domain';

interface QueryParserOptions {
  locales: Locale[];
  defaultLocale: string;
  query?: ParsedUrlQuery;
}

export class QueryParser {
  private defaultLocale: Locale;

  constructor(private options: QueryParserOptions) {
    const defaultLocale = options.locales.find(
      (locale) => locale.name === options.defaultLocale,
    );

    if (!defaultLocale) {
      throw new Error('Default locale not provided with locales.');
    }

    this.defaultLocale = defaultLocale;
  }

  /**
   * retrieves the slug as a string from a query slug, even if it's passed as an array.
   * returns undefined if the alleged slug is instead a locale.
   */
  getSlug(): string | undefined {
    const query = this.options.query;
    let slug;

    if (query?.slug && typeof query.slug === 'string') {
      slug = this.isLocale(query.slug) ? undefined : query.slug;
    } else if (query?.slug && Array.isArray(query.slug)) {
      slug = this.isLocale(query.slug[0]) ? query.slug.slice(1) : query.slug;
      slug = slug.join('/') || undefined;
    }

    return slug;
  }

  /**
   * retrieves the locale from a query slug. if it's passed as an array it will look for the first item.
   * if it doesn't find a locale it will return the default locale.
   */
  getLocale(): string {
    const query = this.options.query;
    const defaultLocale = this.defaultLocale.value;

    if (query?.slug && typeof query.slug === 'string') {
      return this.findLocale(query.slug)?.value || defaultLocale;
    } else if (query?.slug && Array.isArray(query.slug)) {
      return this.findLocale(query.slug[0])?.value || defaultLocale;
    }

    return defaultLocale;
  }

  private findLocale(str?: string): Locale | undefined {
    return this.options.locales.find((locale) => locale.url === str);
  }

  private isLocale(str?: string): boolean {
    return !!this.findLocale(str);
  }
}
