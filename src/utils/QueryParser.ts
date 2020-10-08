import { Locale } from '@/core/domain';
import { ParsedUrlQuery } from 'querystring';

interface QueryParserOptions {
  locales: Locale[];
  defaultLocale: Locale;
  query?: ParsedUrlQuery;
}

export class QueryParser {
  constructor(private options: QueryParserOptions) {}

  /**
   * retrieves the slug as a string from a query slug, even if it's passed as an array.
   * returns undefined if the alleged slug is instead a locale.
   * currently we only care about the last part of the slug and assume there will be exactly only one matching page.
   */
  getSlug(): string | undefined {
    const query = this.options.query;
    let slug;

    if (query?.slug && typeof query.slug === 'string') {
      slug = this.isLocale(query.slug) ? undefined : query.slug;
    } else if (query?.slug && Array.isArray(query.slug)) {
      slug = this.isLocale(query.slug[0]) ? query.slug.slice(1) : query.slug;
      slug = slug.slice(-1)[0] || undefined;
    }

    return slug;
  }

  /**
   * retrieves the locale from a query slug. if it's passed as an array it will look for the first item.
   * if it doesn't find a locale it will return the default locale.
   */
  getLocale(): Locale {
    const query = this.options.query;
    const defaultLocale = this.options.defaultLocale;

    if (query?.slug && typeof query.slug === 'string') {
      return this.findLocale(query.slug) || defaultLocale;
    } else if (query?.slug && Array.isArray(query.slug)) {
      return this.findLocale(query.slug[0]) || defaultLocale;
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
