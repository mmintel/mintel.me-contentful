interface UrlGeneratorOptions {
  currentLocale: string;
  defaultLocale: string;
  homepage: string;
}

export class UrlGenerator {
  constructor(private options: UrlGeneratorOptions) {}

  generate(href: string): string {
    const currentLocale = this.options.currentLocale;
    const defaultLocale = this.options.defaultLocale;
    const homepage = this.options.homepage;
    let url = href;

    if (currentLocale === defaultLocale) {
      if (homepage === url) {
        url = '/';
      } else {
        url = `/${url}`;
      }
    } else {
      if (homepage === url) {
        url = `/${currentLocale}`;
      } else {
        url = `/${currentLocale}/${url}`;
      }
    }
    return url;
  }
}
