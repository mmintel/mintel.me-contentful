import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import * as Sentry from '@sentry/node';
import { createLogger, Logger } from '@/lib/logger';

const logger: Logger = createLogger('Document');

process.on('unhandledRejection', err => {
  logger.error('unhandledRejection', err)
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  logger.error('uncaughtException', err)
  Sentry.captureException(err);
});

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.pageProps.page?.meta?.locale || 'en'}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
