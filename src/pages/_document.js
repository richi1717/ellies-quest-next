import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render () {
    return (
      <Html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body style={{ display: 'flex', justifyContent: 'center' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
