import { GreeterService } from '@/abstract/services/greeter';

interface Loggable {
  log: (message: string, ...data: any) => void;
}

export class Greeter implements GreeterService {
  constructor(private logger: Loggable) {}

  greet() {
    this.logger.log(
      `
      %c Hello Mr. Anderson... We've been waiting for you.
      Awesome that you care about the internals of my website!
      This website is written in TypeScript and
      based on React.js in conjunction with Next.js for SSR.
      The data is served via the Contentful Delivery API (https://www.contentful.com/).
      Actually you can even have a look at the source code over
      at Github on https://github.com/mmintel/mintel.me.
    `,
      'color: green; background-color: #333; font-family: monospace;',
    );
  }
}
