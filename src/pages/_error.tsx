import React from 'react';
import NextErrorComponent, { ErrorProps } from 'next/error';
import * as Sentry from '@sentry/node';
import { NextPageContext } from 'next';
import { Logger } from '@/old/implementations/services';

const logger = new Logger('ErrorPage');

interface CustomErrorProps {
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

const CustomError = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}: CustomErrorProps): React.ReactNode => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    logger.error(err.message);
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

CustomError.getInitialProps = async (
  ctx: NextPageContext,
): Promise<CustomErrorProps> => {
  const errorInitialProps: ErrorProps = await NextErrorComponent.getInitialProps(
    ctx,
  );

  const customErrorInitialProps: CustomErrorProps = {
    ...errorInitialProps,
    // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
    // getInitialProps has run
    hasGetInitialPropsRun: true,
  };

  if (ctx.res?.statusCode === 404) {
    return { statusCode: 404 };
  }

  if (ctx.err) {
    logger.error(ctx.err.message);
    Sentry.captureException(ctx.err);
    return customErrorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${ctx.asPath}`),
  );

  return customErrorInitialProps;
};

export default CustomError;
