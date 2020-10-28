import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { Calendar, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
import { useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import addZeroBefore from '@/utils/addZeroBefore';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import toFixedNumber from '@/utils/formatNumbers';

const LoginModal = dynamic(() => import('@/components/LoginModal'),
{ loading: () => <div className="blurred__background"><h1>Loading</h1></div>})

interface ILog {
	id: number;
	name: string;
	calories: string;
	carbohydrates: string;
	fats: string;
	proteins: string;
	quantity_amount: string;
	quantity_type: string;

  hour?: string | number;
  minute?: string | number;

	food_id: string;
  user_id: string;
  when: Date;
	created_at: Date;
	updated_at: Date;
}

interface IDayResume {
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
	logs: ILog[] | undefined;
}

var byProperty = function(prop) {
  return function(a,b) {
      if (typeof a[prop] == "number") {
          return (a[prop] - b[prop]);
      } else {
          return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
      }
  };
};

export default function Home() {
  const router = useRouter();

  const [logData, setLogData] = useState<IDayResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
    console.log(data);
    if (!data) {
      setLogData(null);
      return setLoading(false);
    }

    const formatLogs: ILog[] = data.logs.map(item =>
      {
      return {
      ...item,
      hour: addZeroBefore(new Date(item.when).getHours()),
      minute: addZeroBefore(new Date(item.when).getMinutes()),
      }
    });

    const sortIt = formatLogs.sort(byProperty("when"));

    const formatDay: IDayResume = {
      carbohydrates: data.carbohydrates,
      proteins: data.proteins,
      fats: data.fats,
      calories: data.calories,
      logs: sortIt
    }

    setLogData(formatDay);
    setLoading(false);
  }, [logData]);

  useEffect(() => {
    async function loadData() {
      try {
        const {data} = await api.get('/food/log/' + selectedDate.getTime(), {withCredentials: true});

        handleData(data);
      } catch (err) {
        signOut();
      }
    }

    loadData();
  }, [selectedDate]);

  return (
    <>
      <Container>
        <Header>
          <button type="button" onClick={e => handleCalendar(e)}>{isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM, dd')}</button>
        </Header>
        <Macros>
          <Macro macro="carb">
            <h3>Carbs</h3>
            <span>{!loading && logData ? logData.carbohydrates : `0`}<span>/{user && parseInt(user.carbohydrates)}</span></span>
            <progress id="carbs" value={logData ? logData.carbohydrates : `0`} max={user && user.carbohydrates}>30%</progress>
          </Macro>
          <Macro macro="protein">
            <h3>Protein</h3>
            <span>{!loading && logData ? logData.proteins : `0`}<span>/{user && parseInt(user.proteins)}</span></span>
            <progress id="carbs" value={logData ? logData.proteins : `0`} max={user && user.proteins}>30%</progress>
          </Macro>
          <Macro macro="fat">
            <h3>Fat</h3>
            <span>{!loading && logData ? logData.fats : `0`}<span>/{user && parseInt(user.fats)}</span></span>
            <progress id="carbs" value={logData ? logData.fats: `0`} max={user && user.fats}>30%</progress>
          </Macro>
        </Macros>
        <Calories>
          <div>
            <h3>Calories</h3>
            <span>{!loading && logData ? logData.calories : `0`}<span>/{user && parseInt(user.calories)}</span></span>
          </div>
          <progress id="carbs" value={logData ? logData.calories : `0`} max={user && user.calories}>30%</progress>
        </Calories>
        <Logs>
          <h2>Logs</h2>
          <div>
            {!loading ? logData && logData.logs && logData.logs.map(log =>
            <Link key={log.id} href={`/log/edit/${log.id}`}>
              <a>
                <Log>
                  <div className="when">
                    <h5>{log.hour}:{log.minute}</h5>
                  </div>
                  <div className="name-and-quantity">
                    <h4>{log.name}</h4>
                    <h5>{log.quantity_amount}g</h5>
                  </div>
                  <div className="macros">
                    <h5>C{log.carbohydrates}   P{log.proteins}   F{log.fats}</h5>
                  </div>
                </Log>
              </a>
            </Link>
            ) :
            <Skeleton count={4} duration={2} height={64} width='92.5%' style={{marginLeft: 16, marginRight: 16}}/>
            }
            {/*<Link href={`/log/edit/1`}>
              <a>
                <Log>
                  <div className="when">
                    <h5>20:00</h5>
                  </div>
                  <div className="name-and-quantity">
                    <h4>Banana</h4>
                    <h5>120g</h5>
                  </div>
                  <div className="macros">
                    <h5>C26   P0.3   F0.6</h5>
                  </div>
                </Log>
              </a>
            </Link> */}
          </div>
          <div className="add-log">
            <Link href={`/food/search`}>
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

      {showCalendar &&
      <Calendar>
        <button type="button" onClick={e => handleCalendar(e)}/>
          <DayPicker
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
          />
        <button type="button" onClick={e => handleCalendar(e)}/>
      </Calendar>
      }
    </>
  )
}
