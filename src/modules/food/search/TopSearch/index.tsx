import BarcodeScannerComponent from '@/components/BarcodeScanner';
import {  Menu } from '@/styles/pages/food/create';
import { BarcodeButton, Floating2 } from '@/styles/pages/food/search';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoBarcodeOutline } from 'react-icons/io5';
import { useSearchContext } from '../SearchContext';
import handleEnter from "@/utils/blurOnEnter";

import { Container, Icon } from './styles';

const TopSearch: React.FC = () => {
	const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

	// Auto Focus on search bar
	let inputRef = useRef<HTMLInputElement>();

	// useEffect(() => {
	// 	inputRef.current.focus();
	// }, [inputRef]);

	const handleBarcode = useCallback((e) => {
		e.preventDefault();
		setShowBarcodeScanner(true);
	}, []);

	const { setSearchInput, isTyping } = useSearchContext();

	return (
		<>
			{showBarcodeScanner &&
				<BarcodeScannerComponent setVisibility={setShowBarcodeScanner} />
			}
			<Container>
				<Floating2>
					<div>
						<Menu>
							<div className="search">
								<div className="icon">
									{isTyping ? <div className="lds-dual-ring"></div> : <Icon size={16} />}
								</div>
								<input
									ref={inputRef}
									type="search"
									placeholder="Search"
									onChange={e => setSearchInput(e.target.value)}
									onKeyDown={e => handleEnter(e)}
								/>
							</div>
							<BarcodeButton onClick={handleBarcode}><div><IoBarcodeOutline /></div><span>BARCODE</span></BarcodeButton>
						</Menu>
					</div>
				</Floating2>
			</Container>
		</>
	);
}

export default TopSearch;
