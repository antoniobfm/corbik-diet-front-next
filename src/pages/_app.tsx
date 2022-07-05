import React, { useEffect } from 'react'
import AppProvider from '@/hooks'
// import { ProtectRoute } from '@/hooks/auth'
import { SkeletonTheme } from 'react-loading-skeleton'
import GlobalStyle from '../styles/GlobalStyle'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { Provider, useSelector } from 'react-redux'
import store, { RootState } from '@/redux/store'
import router, { useRouter } from 'next/router'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

	return (
		<Provider store={store}>
			<AppProvider>
				<GlobalStyle />
				<SkeletonTheme color="#0A0A0B" highlightColor="#181A1B">
					<Head>
						<meta
							name="viewport"
							content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
						/>
					</Head>
					<Component {...pageProps} />
				</SkeletonTheme>
			</AppProvider>
			</Provider>
	)
}

export default MyApp

