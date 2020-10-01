interface UrlGeneratorOptions {
  defaultLocaleURL: string;
  localeURL: string;
  homepage: string;
}

interface Target {
  slug: string;
  parent?: Target;
}

export class UrlGenerator {
  constructor(private options: UrlGeneratorOptions) {}

  generate(target: Target, url = ''): string {
    const homepage = this.options.homepage;
    let currentUrl = url || `/${target.slug}`;

    if (target.parent) {
      currentUrl = `/${target.parent.slug}${currentUrl}`;
    }

    if (this.isDefaultLocale() && this.isHomepage(target)) {
      currentUrl = '/';
    } else if (!this.isDefaultLocale()) {
      if (homepage === target.slug) {
        currentUrl = `/${this.options.localeURL}`;
      } else {
        currentUrl = `/${this.options.localeURL}${currentUrl}`;
      }
    }

    if (!target.parent) return currentUrl;

    return this.generate(target.parent, currentUrl);
  }

  private isDefaultLocale() {
    return this.options.defaultLocaleURL === this.options.localeURL;
  }

  private isHomepage(target: Target) {
    return this.options.homepage === target.slug;
  }
}
