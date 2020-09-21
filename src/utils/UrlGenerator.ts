import { Locale } from '@/core/domain';

interface UrlGeneratorOptions {
  defaultLocale: Locale;
  homepage: string;
}

interface Target {
  slug: string;
  locale: Locale;
  parent?: {
    slug: string;
  };
}

export class UrlGenerator {
  constructor(private options: UrlGeneratorOptions) {}

  generate(target: Target): string {
    const homepage = this.options.homepage;
    let url = target.slug;

    if (target.parent) {
      url = `/${target.parent.slug}/${url}`;
    }

    if (this.isDefaultLocale(target) && this.isHomepage(target)) {
      url = '/';
    } else {
      if (homepage === target.slug) {
        url = `/${target.locale}`;
      } else {
        url = `/${target.locale}/${url}`;
      }
    }

    return url;
  }

  private isDefaultLocale(target: Target) {
    return this.options.defaultLocale === target.locale;
  }

  private isHomepage(target: Target) {
    return this.options.homepage === target.slug;
  }
}
