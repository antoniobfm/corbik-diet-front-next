import { RootState } from '@/redux/store';
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
	id: string;
	type?: 'success' | 'error' | 'info';
	title: string;
	description?: string;
}

interface ToastContextData {
	addToast(message: Omit<ToastMessage, 'id'>): void;
	removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
	const [messages, setMessages] = useState<ToastMessage[]>([]);
	const messagesUser = useSelector((state: RootState) => state.user.messages)
	const messagesFood = useSelector((state: RootState) => state.food.messages)

	useEffect(() => {
		const message = messagesUser[messagesUser.length - 1]
		addToast({
			title: message.title,
			type: message.type
		})
	}, [messagesUser])

	useEffect(() => {
		const message = messagesFood[messagesFood.length - 1]
		addToast({
			title: message.title,
			type: message.type
		})
	}, [messagesFood])

	const addToast = useCallback(
		({ type, title, description }: Omit<ToastMessage, 'id'>) => {
			const id = uuid();

			const toast = {
				id,
				type,
				title,
				description,
			};

			setMessages(oldMessages => [...oldMessages, toast]);
		},
		[],
	);

	const removeToast = useCallback((id: string) => {
		setMessages(state => state.filter(message => message.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer messages={messages} />
		</ToastContext.Provider>
	);
};

function useToast(): ToastContextData {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must used within a ToastProvider');
	}

	return context;
}

export { ToastProvider, useToast };
