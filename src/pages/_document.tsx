import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html lang="pt">
				<Head>
					<meta charSet="UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="keywords" content="Keywords" />
					<link rel="manifest" href="/manifest.json" />
					<link
						href="/icons/favicon_16x16.png"
						rel="icon"
						type="image/png"
						sizes="16x16"
					/>
					<link
						href="/icons/favicon_32x32.png"
						rel="icon"
						type="image/png"
						sizes="32x32"
					/>
					<meta name="google-site-verification" content="f1VAh8_uqfqqJW5fBdlH-ANfrSog3YLPZ6w0IvcZNmU" />
					<link rel="apple-touch-icon" href="/icons/apple-icon.png" />
					<meta name="theme-color" content="#0d0d0d" />
					<meta name="mobile-web-app-capable" content="yes" />
					{/* Tap highlighting */}
					<meta name="msapplication-tap-highlight" content="no" />

					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
						rel="stylesheet"
					/>

				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
