import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { Calendar, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
import { useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format, formatISO, setHours } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';

const LoginModal = dynamic(() => import('@/components/LoginModal'),
{ loading: () => <div className="blurred__background"><h1>Loading</h1></div>})

interface BodyLog {
	id: string;
	muscle: number;
	water: number;
	weight: number;
	fat: number;
	bones: number;
	when: string;
}

interface IBodyLogDayResume extends BodyLog {
	month: string;
	day: string;
}

interface IDayResume {
	currentWeight: number;
	currentWater: number;
	currentFat: number;
	currentMuscle: number;
	logs: IBodyLogDayResume[];
}

export default function Home() {
  const [logData, setLogData] = useState<IDayResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

  const { isAuthenticated, user, signOut } = useAuth();
  if(!isAuthenticated) return <LoginModal />;

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleCalendar = useCallback((e) => {
    e.preventDefault();

    setShowCalendar(!showCalendar);
  }, [showCalendar]);

  const handleData = useCallback((data) => {
    setLoading(true);

    if (!data) {
      setLogData(null);
      return setLoading(false);
    }

    setLogData(data);
    setLoading(false);
  }, [logData]);

  useEffect(() => {
    async function loadData() {
      try {
				const when = formatISO(selectedDate);
				const response = await api.post('/body/logs', { when });

        handleData(response.data);
      } catch (err) {
				console.log('err');
      }
    }

    loadData();
  }, [selectedDate]);

  return (
    <>
			<Menu currentRoute="body" />
      <Container>
        <Header>
          {/* <button type="button" onClick={e => handleCalendar(e)}>{isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM, dd')}</button> */}
        </Header>
        <Macros>
          <Macro macro="carb">
            <h3>Muscle</h3>
            <span>{!loading && logData ? logData.currentMuscle : `0`}<span>/{user && parseInt(user.muscle)}%</span></span>
            <progress id="carbs" value={logData ? logData.currentMuscle : `0`} max={user && user.muscle} />
          </Macro>
          <Macro macro="protein">
            <h3>Water</h3>
            <span>{!loading && logData ? logData.currentWater : `0`}<span>/{user && parseInt(user.water)}%</span></span>
            <progress id="carbs" value={logData ? logData.currentWater : `0`} max={user && user.water} />
          </Macro>
          <Macro macro="fat">
            <h3>Fat</h3>
            <span>{!loading && logData ? logData.currentFat : `0`}<span>/{user && parseInt(user.fat)}%</span></span>
            <progress id="carbs" value={logData ? logData.currentFat: `0`} max={user && user.fat} />
          </Macro>
        </Macros>
        <Calories>
          <div>
            <h3>Weight</h3>
            <span>{!loading && logData ? logData.currentWeight : `0`}<span>/{user && parseInt(user.weight)}kg</span></span>
          </div>
          <progress id="carbs" value={logData ? logData.currentWeight : `0`} max={user && user.weight} />
        </Calories>
        <Logs>
          <h2>Logs</h2>
          <div>
            {!loading ? logData && logData.logs && logData.logs.map(log =>
            <Link key={log.id} href={`/body/log/${log.id}`}>
              <a>
                <Log>
                  <div className="when">
                    <h5>{log.month}/{log.day}</h5>
                  </div>
                  <div className="name-and-quantity">
                    <h4>{log.weight}</h4>
                    <h5>kilos</h5>
                  </div>
                  <div className="macros">
                    <h5>M{log.muscle}   W{log.water}   F{log.fat}</h5>
                  </div>
                </Log>
              </a>
            </Link>
            ) :
            <Skeleton count={4} duration={2} height={64} width='92.5%' style={{marginLeft: 16, marginRight: 16}}/>
            }
          </div>
          <div className="add-log">
            <Link href={`/body/log/add`}>
              <a>ADD LOG</a>
            </Link>
          </div>
        </Logs>

      </Container>
      <Link href="/settings">
        <a>
          <h4 style={{opacity: 0.5, fontWeight: 400, textAlign: 'center', paddingTop: 40, paddingBottom: 40}}>Settings</h4>
        </a>
      </Link>

      {/* {showCalendar &&
      <Calendar>
        <button type="button" onClick={e => handleCalendar(e)}/>
          <DayPicker
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
          />
        <button type="button" onClick={e => handleCalendar(e)}/>
      </Calendar>
      } */}
    </>
  )
}
