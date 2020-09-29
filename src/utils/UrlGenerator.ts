interface UrlGeneratorOptions {
  defaultLocaleURL: string;
  localeURL: string;
  homepage: string;
}

interface Target {
  slug: string;
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

    if (this.isDefaultLocale() && this.isHomepage(target)) {
      url = '/';
    } else if (!this.isDefaultLocale()) {
      if (homepage === target.slug) {
        url = `/${this.options.localeURL}`;
      } else {
        url = `/${this.options.localeURL}/${url}`;
      }
    }

    return url;
  }

  private isDefaultLocale() {
    return this.options.defaultLocaleURL === this.options.localeURL;
  }

  private isHomepage(target: Target) {
    return this.options.homepage === target.slug;
  }
}
