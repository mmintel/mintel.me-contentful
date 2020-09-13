import { ParsedUrlQuery } from 'querystring';

export class QueryParser {
  constructor(private query?: ParsedUrlQuery) {}

  getSlug(): string {
    const query = this.query;
    let slug = 'home';

    if (query?.slug && typeof query.slug === 'string') {
      slug = query.slug;
    } else if (query?.slug && Array.isArray(query.slug)) {
      slug = query.slug.join('/');
    }

    return slug;
  }

  getLanguage(): string {
    return 'de';
  }
}
