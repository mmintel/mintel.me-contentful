import { Page } from '../domain';
import { PageGateway } from '../gateways';
import { Logger, createLogger } from '@/core/utils';

export interface PageRepository {
  findById(locale: string, id: string): Promise<Page>;
  findBySlug(locale: string, slug: string): Promise<Page>;
  all(locale: string): Promise<Page[]>;
}

export class PageRepositoryImpl implements PageRepository {
  private logger: Logger = createLogger('PageRepositoryImpl');
  private pages: Page[] = [];

  constructor(private gateway: PageGateway) {}

  async findById(locale: string, id: string): Promise<Page> {
    const pageFromCache = this.pages.find((p) => p.id === id);

    if (pageFromCache) {
      this.logger.debug(`Returning page from cache with id "${id}".`);
      return pageFromCache;
    }

    this.logger.debug(`Asking gateway for new page with id "${id}".`);

    const page = await this.gateway.getPageById(locale, id);

    if (!page) {
      const message = `Could not find page with id "${id}".`;
      this.logger.error(message);
      throw new Error(message);
    } else {
      this.logger.debug('Gateway responded with page', page);
    }

    this.resolveRelations(page);

    return page;
  }

  async findBySlug(locale: string, slug: string): Promise<Page> {
    const pageFromCache = this.pages.find((p) => p.slug === slug);

    if (pageFromCache) {
      this.logger.debug(`Returning page from cache with slug "${slug}".`);
      return pageFromCache;
    }

    this.logger.debug(`Asking gateway for new page with slug "${slug}".`);

    const page = await this.gateway.getPageBySlug(locale, slug);

    if (!page) {
      const message = `Could not find page with slug "${slug}".`;
      this.logger.error(message);
      throw new Error(message);
    } else {
      this.logger.debug('Gateway responded with page', page);
    }

    this.resolveRelations(page);

    return page;
  }

  async all(locale: string): Promise<Page[]> {
    const slugs = await this.gateway.getAllPageSlugs(locale);

    for (const slug of slugs) {
      if (!this.pages.find((p) => p.slug === slug)) {
        const page = await this.findBySlug(locale, slug);
        this.pages.push(page);
      }
    }

    return this.pages;
  }

  private resolveRelations(page: Page): void {
    if (page.parent) {
      this.logger.debug('Page has a parent, trying to find it...');
      const parent = this.pages.find((page) => page.id === page.parentID);

      if (parent) {
        this.logger.debug('Found parent', parent);
        page.setParent(parent);
      } else {
        this.logger.debug('No parent found');
      }
    }
  }
}
