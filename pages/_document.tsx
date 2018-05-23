import Document, { Main, Head, NextScript } from 'next/document';
import { unsafe_getEnvScriptForDocument } from '../utils/env';
import * as analytics from '../utils/analytics';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      absoluteUrl: ctx.pathname,
    };
  }

  render() {
    return (
      <html
        lang="pl-PL"
        prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#"
        itemScope
        itemType="http://schema.org/WebPage"
      >
        <Head>
          <base href="/" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" itemProp="url" content={this.props.absoluteUrl} />
          <meta
            property="og:image"
            itemProp="logo image"
            content={`${this.props.absoluteUrl}/img/fefaq-cover-facebook.png`}
          />
          <meta property="og:site_name" content="Fefaq.pl" />
          <meta property="fb:app_id" content="2005583769700691" />
          <meta property="og:locale" content="pl_PL" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#673ab7" />
          <link rel="apple-touch-startup-image" href="/splash-iphone-8.png" />
          <meta name="msapplication-TileColor" content="#673ab7" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Sans:200,400,700&amp;subset=latin-ext"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={unsafe_getEnvScriptForDocument()} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (window.navigator.standalone) {
                document.querySelector('html').classList.add('ios-standalone');
              }
            `,
            }}
          />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${analytics.GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag(){
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(analytics.GA_TRACKING_ID)}, {
                custom_map: ${JSON.stringify(analytics.CUSTOM_MAP)},
              });
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
