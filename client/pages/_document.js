//@flow
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import type { GetInitialPropsContext } from "global/utils/pages";

export default class extends Document {
  static async getInitialProps(ctx: GetInitialPropsContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
