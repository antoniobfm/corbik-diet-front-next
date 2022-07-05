import dynamic from 'next/dynamic'
import {
	BigCardHeader,
	Calendar,
	Calories,
	Container,
	Logs,
	Macro,
	Macros,
} from '@/styles/pages/Home'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-day-picker/lib/style.css'
import { isToday, format, setHours } from 'date-fns'
import { useAuth } from '@/hooks/auth'
import Menu from '@/components/Menu'
import { useRouter } from 'next/router'
import { FiCheck, FiChevronDown, FiSettings } from 'react-icons/fi'
import { useError } from '@/hooks/errors'
import { AnimatePresence } from 'framer-motion'
import CardMessage from '@/components/Card/CardMessage'
import Head from 'next/head'
import { useLog } from '@/hooks/logs'
import { parseCookies } from 'nookies'
import { api } from '@/services/apiClient'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import MacrosAndMicros from '@/modules/diet/home/MacrosAndMicros'
import LogsMain from '@/modules/diet/home/Logs'
import { DietHomeProvider } from '@/modules/diet/home/DietHomeContext'
import HeaderComponent from '@/modules/diet/home/Header'
import Onboarding from '@/modules/diet/home/Onboarding'

const LoginModal = dynamic(() => import('@/components/LoginModal'), {
	loading: () => (
		<div className="blurred__background">
			<h1>Loading</h1>
		</div>
	)
})

interface ILog {
	food_id: string
	user_id: string
	id: number
	//
	name: string
	brand?: string
	//
	calories: string
	carbohydrates: string
	fats: string
	proteins: string
	//
	amount: string
	unit_abbreviation: string
	//
	day: string
	month: string
	year: string
	hour: string | number
	minute: string | number
	when: Date
	//
	created_at: Date
	updated_at: Date
}

interface IDayResume {
	carbohydrates: string
	proteins: string
	fats: string
	calories: string
	logs: ILog[] | undefined
}

export default function Home() {

	return (
		<DietHomeProvider>
			<Head>
				<title>Corbik</title>
			</Head>
			<Menu currentRoute="Diet" />
			<Container>
				<HeaderComponent />
				<MacrosAndMicros />
				<LogsMain />
				<Onboarding />
			</Container>
		</DietHomeProvider>
	)
}
