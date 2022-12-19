import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="en"/>
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// It allows us to define the general structure of our page. And for example, set an attribute on the HTML element itself or add extra entry points, extra elements which we could use with react portal.
