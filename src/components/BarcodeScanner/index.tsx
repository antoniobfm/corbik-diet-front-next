import api from "@/services/api";
import { BackButton, Container, Icon, ModalContainer } from "@/styles/components/BarcodeScannerComponent";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Scanner from "./Scanner";

export default function BarcodeScannerComponent({setVisibility}: any) {
	const [results, setResults] = useState([]);
	const router = useRouter();


	const _onDetected = useCallback(async (result) => {
		if (!result) {
			return null;
		}
		try {
			if (results.length >= 1) {
				router.push(`/`);
				setResults(null);
				return;
			}
			const response = await api.post('/food-library/search/code', {code: result.codeResult.code});

			setResults(results.concat([result]));

			router.push(`/food/${response.data[0].id}`);

		} catch(err) {
			router.push(`/food/create?barcode=${result.codeResult.code}`);
		}
	}, [results]);

	const handleGoBack = useCallback(() => {

	}, []);

	return (
		<ModalContainer>
			<Container>
				<div>
					<Scanner onDetected={_onDetected} />
				</div>
			</Container>
			<BackButton onClick={() => {setVisibility(false)}} type="button"><Icon /></BackButton>
		</ModalContainer>
	)
}
