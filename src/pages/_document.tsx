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
					<meta name="description" content="Description" />
					<meta name="keywords" content="Keywords" />
					<script id="mcjs">!function(c,h,i,m,p){m = c.createElement(h), p = c.getElementsByTagName(h)[0], m.async = 1, m.src = i, p.parentNode.insertBefore(m, p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/b1a337258225c471b23863b3c/ed8600647ad99293b96d43cf5.js");</script>
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
