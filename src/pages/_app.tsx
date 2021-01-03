import React from 'react'

import AppProvider from '@/hooks'
import { ProtectRoute } from '@/hooks/auth'
import { AnimatePresence } from 'framer-motion'
import { SkeletonTheme } from 'react-loading-skeleton'
import GlobalStyle from '../styles/GlobalStyle'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Head } from 'next/document'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
		{/* <Head>
			<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
		</Head> */}
		<AppProvider>
			<GlobalStyle />
			<ProtectRoute>
				<SkeletonTheme color="#0A0A0B" highlightColor="#181A1B">
					<AnimatePresence>
						<Component {...pageProps} />
					</AnimatePresence>
				</SkeletonTheme>
			</ProtectRoute>
		</AppProvider>
		</>
	)
}

export default MyApp
