import dynamic from 'next/dynamic'
import {
	BigCardHeader,
	Calendar,
	Calories,
	Container,
	Header,
	Logs,
	Macro,
	Macros,
	WideCardContainer,
	CardHeader,
	CardContent,
	Mission
} from '@/styles/pages/Home'
import React, { useCallback, useEffect, useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { isToday, format } from 'date-fns'
import { useAuth } from '@/hooks/auth'
import Menu from '@/components/Menu'
import { useRouter } from 'next/router'
import { FiCheck, FiChevronDown, FiSettings } from 'react-icons/fi'
import LogsHorizontalScroll from '@/components/Logs/Food/HorizontalScroll'
import LogsVerticalScroll from '@/components/Logs/Food/VerticalScroll'
import { useError } from '@/hooks/errors'
import { AnimatePresence } from 'framer-motion'
import CardMessage from '@/components/Card/CardMessage'
import Head from 'next/head'
import { useLog } from '@/hooks/logs'
import { withSSRAuth } from '@/utils/withSSRAuth'
import { parseCookies } from 'nookies'
import { api } from '@/services/apiClient'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

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
	const [isHorizontal, setIsHorizontal] = useState(true)
	const [showCalendar, setShowCalendar] = useState(false)

	const router = useRouter()
	const { handleError } = useError()

	const { logData, selectedDate, handleSelectDate } = useLog()

	const { user } = useContext(AuthContext)

	const handleCalendar = useCallback(
		e => {
			e.preventDefault()

			setShowCalendar(!showCalendar)
		},
		[showCalendar]
	)

	const handleLogsDirection = useCallback(() => {
		setIsHorizontal(!isHorizontal)
	}, [isHorizontal])

	return (
		<>
			<Head>
				<title>Corbik</title>
			</Head>
			<Menu currentRoute="Diet" />
			<Container>
				<Header>
					<button
						id="diet--home--change--date"
						type="button"
						onClick={e => handleCalendar(e)}
					>
						{isToday(selectedDate)
							? 'Today'
							: format(selectedDate, 'MMM, dd')}
					</button>
					<button
						id="diet--home--settings--button"
						onClick={() => {
							router.push('/food/settings')
						}}
					>
						<FiSettings />
					</button>
				</Header>
				{showCalendar && (
					<Calendar>
						<button type="button" onClick={e => handleCalendar(e)} />
						<DayPicker
							onDayClick={handleSelectDate}
							selectedDays={selectedDate}
						/>
						<button type="button" onClick={e => handleCalendar(e)} />
					</Calendar>
				)}
				<Macros>
					<Macro macro="carb">
						<div>
							<h4>Carbs</h4>
							<span>
								{logData ? logData.carbohydrates : `0`}
								{user && user.carbohydrates && (
									<span>/{parseInt(user.carbohydrates)}</span>
								)}
							</span>
						</div>
						<progress
							id="carbs"
							value={logData ? logData.carbohydrates : `0`}
							max={user && user.carbohydrates}
						>
							30%
						</progress>
					</Macro>
					<Macro macro="protein">
						<div>
							<h4>Prots</h4>
							<span>
								{logData ? logData.proteins : `0`}
								{user && user.proteins && (
									<span>/{parseInt(user.proteins)}</span>
								)}
							</span>
						</div>
						<progress
							id="carbs"
							value={logData ? logData.proteins : `0`}
							max={user && user.proteins}
						>
							30%
						</progress>
					</Macro>
					<Macro macro="fat">
						<div>
							<h4>Fat</h4>
							<span>
								{logData ? logData.fats : `0`}
								{user && user.fats && <span>/{parseInt(user.fats)}</span>}
							</span>
						</div>
						<progress
							id="carbs"
							value={logData ? logData.fats : `0`}
							max={user && user.fats}
						>
							30%
						</progress>
					</Macro>
				</Macros>
				<Calories>
					<div>
						<h4>Calories</h4>
						<span>
							{logData ? logData.calories : `0`}
							{user && user.calories && (
								<span>/{parseInt(user.calories)}</span>
							)}
						</span>
					</div>
					<progress
						id="carbs"
						value={logData ? logData.calories : `0`}
						max={user && user.calories}
					>
						30%
					</progress>
				</Calories>
				<Logs>
					<BigCardHeader isHorizontal={isHorizontal}>
						<h3>Logs</h3>
						<div onClick={handleLogsDirection}>
							<FiChevronDown />
						</div>
					</BigCardHeader>
					<div>
						<AnimatePresence>
							{logData && logData.logs.length >= 1 ? (
								isHorizontal ? (
									<LogsHorizontalScroll data={logData.logs} />
								) : (
									<LogsVerticalScroll data={logData.logs} />
								)
							) : (
								<CardMessage borderBottom={false}>
									<h4>NO LOGS TODAY</h4>
								</CardMessage>
							)}
						</AnimatePresence>
					</div>
					<div className="add-log">
						<button onClick={() => router.push(`/food/search`)}>
							ADD LOG
						</button>
					</div>
					{/* <canvas
						height="100px"
						id={`background-chart`}
						ref={chartRef}
					/> */}
				</Logs>
				<WideCardContainer>
					<CardHeader>
						<h3>Welcome to the diet page</h3>
						<p>
							Your diet is everything you eat, inside or outside of your
							planning.
						</p>
					</CardHeader>
					<CardContent>
						<h4>Getting started</h4>
						<div id="missions-container">
							<Mission isDone={true}>
								<div className="is-done">
									<FiCheck />
								</div>
								<h5>Create your first food</h5>
							</Mission>
							<Mission
								isDone={user && (
									!!user.calories &&
									!!user.carbohydrates &&
									!!user.proteins &&
									!!user.carbohydrates &&
									!!user.fats)
								}
							>
								<div className="is-done">
									<FiCheck />
								</div>
								<h5>Add your first food log</h5>
							</Mission>
							<Mission
								isDone={user && (
									!!user.calories &&
									!!user.carbohydrates &&
									!!user.proteins &&
									!!user.carbohydrates &&
									!!user.fats)
								}
							>
								<div className="is-done">
									<FiCheck />
								</div>
								<h5>Set your macro’s target</h5>
							</Mission>
						</div>
					</CardContent>
				</WideCardContainer>
			</Container>
		</>
	)
}

export const getServerSideProps = withSSRAuth(async ctx => {
	return {
		props: {}
	}
})
