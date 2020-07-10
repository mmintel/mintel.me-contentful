import React from 'react';
import App, { Container } from 'next/app';
import * as Sentry from '@sentry/browser';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

class CustomApp extends App {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtra('componentStack', info);
      Sentry.captureException(error);
    });

    super.componentDidCatch(error, info);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default CustomApp;
