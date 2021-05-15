import React from 'react'

import { Container } from '@/styles/components/Loading';

const Loading: React.FC = () => {
	return (
		<Container>
			<div className="loader">Loading...</div>
		</Container>
	)
}

export default Loading;
