import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='icon' type='/image/svg+xml' href='/reddit_logo.svg' />
          <meta property='og:site_name' content='readit' />
          {/* <meta property='twitter:site' content='@readit' /> */}
          <meta property='twitter:card' content='summary' />
          <meta property='og:type' content='website' />
          <meta
            property='og:image'
            content={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reddit_logo.svg`}
          />
          <meta
            property='twitter:image'
            content={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reddit_logo.svg`}
          />
          <link
            href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'
            integrity='sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=='
            crossOrigin='anonymous'
          />
        </Head>
        <body className='font-body' style={{ backgroundColor: '#DAE0E6' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
