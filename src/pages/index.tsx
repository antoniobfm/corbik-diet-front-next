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
	calories: number;
	carbohydrates: number;
	fats: number;
	proteins: number;
	quantity_amount: number;
	quantity_type: string;
  when: Date;

  hour: number;
  minute: number;

	food_id: string;
	created_at: Date;
	updated_at: Date;
	user_id: string;
}

interface IDayResume {
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
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
  const [logData, setLogData] = useState<IDayResume | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const day = new Date().getTime();

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  console.log(router.query.when);

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);

    router.push(`/?when=${day.getTime()}`)
  }, []);

  useEffect(() => {
    async function loadDay() {
      if (api.defaults.headers.authorization) {
      const response = await api.get(`/food/log/${selectedDate.getTime()}`);
    
      if (!response.data)
      {
        setLogData({
          carbohydrates: 0,
          proteins: 0,
          fats: 0,
          calories: 0,
          logs: undefined,
        });

        return;
      }

      const formatLogs: ILog[] = response.data.logs.map(item => 
        {
        return {
        ...item,
        carbohydrates: parseInt(item.carbohydrates),
        proteins: parseInt(item.proteins),
        fats: parseInt(item.fats),
        calories: parseInt(item.calories),
        quantity_amount: parseInt(item.quantity_amount),
        hour: addZeroBefore(new Date(item.when).getHours()),
        minute: addZeroBefore(new Date(item.when).getMinutes()),
        }
      });

      const sortIt = formatLogs.sort(byProperty("when"));

      const formatDay: IDayResume = {
        carbohydrates: toFixedNumber(parseFloat(response.data.carbohydrates), 1, 10),
        proteins: toFixedNumber(parseFloat(response.data.proteins), 1, 10),
        fats: toFixedNumber(parseFloat(response.data.fats), 1, 10),
        calories: toFixedNumber(parseFloat(response.data.calories), 1, 10),
        logs: sortIt
      }

      console.log(formatDay);
  
      setLogData(formatDay);
    }
    }

    loadDay();
  }, [selectedDate]);

  const handleData = useCallback((data: any) => {
    data = data.data;
    const formatLogs: ILog[] = data.logs.map(item => 
      {
      return {
      ...item,
      carbohydrates: parseInt(item.carbohydrates),
      proteins: parseInt(item.proteins),
      fats: parseInt(item.fats),
      calories: parseInt(item.calories),
      quantity_amount: parseInt(item.quantity_amount),
      hour: addZeroBefore(new Date(item.when).getHours()),
      minute: addZeroBefore(new Date(item.when).getMinutes()),
      }
    });

    const sortIt = formatLogs.sort(byProperty("when"));

    console.log(sortIt);

    const formatDay: IDayResume = {
      carbohydrates: toFixedNumber(parseFloat(data.carbohydrates), 1, 10),
      proteins: toFixedNumber(parseFloat(data.proteins), 1, 10),
      fats: toFixedNumber(parseFloat(data.fats), 1, 10),
      calories: toFixedNumber(parseFloat(data.calories), 1, 10),
      logs: sortIt
    }

    console.log(formatDay);

    setLogData(formatDay);
  }, []);

  const { data: { data: logsData } = {}, isValidating } = useSWR(
    `/food/log/${day}`, 
    api.get, {
      revalidateOnFocus: false,
      revalidateOnMount:false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      onSuccess: (data, key, config) => {
        handleData(data);
      }
   });

  return (
    <>
      {!isAuthenticated && <LoginModal />}
      <Container>
        <Header>
          <h1>{isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM, dd')}</h1>
        </Header>
        <Macros>
          <Macro macro="carb">
            <h3>Carbs</h3>
            <span>{logData && logData.carbohydrates}<span>/{user && parseInt(user.carbohydrates)}</span></span>
            <progress id="carbs" value={logData ? logData.carbohydrates : `0`} max={user && user.carbohydrates}>30%</progress>
          </Macro>
          <Macro macro="protein">
            <h3>Protein</h3>
            <span>{logData && logData.proteins}<span>/{user && parseInt(user.proteins)}</span></span>
            <progress id="carbs" value={logData ? logData.proteins: `0`} max={user && user.proteins}>30%</progress>
          </Macro>
          <Macro macro="fat">
            <h3>Fat</h3>
            <span>{logData && logData.fats}<span>/{user && parseInt(user.fats)}</span></span>
            <progress id="carbs" value={logData ? logData.fats: `0`} max={user && user.fats}>30%</progress>
          </Macro>
        </Macros>
        <Calories>
          <div>
            <h3>Calories</h3>
            <span>{logData && logData.calories}<span>/{user && parseInt(user.calories)}</span></span>
          </div>
          <progress id="carbs" value={logData ? logData.calories : `0`} max={user && user.calories}>30%</progress>
        </Calories>
        <Logs>
          <h2>Logs</h2>
          <div>
            {logData ? logData.logs && logData.logs.map(log => 
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
      <Calendar>
        <DayPicker
          onDayClick={handleDateChange}
          selectedDays={selectedDate}
        />
      </Calendar>
      <Link href="/settings">
        <a>
          <h4 style={{opacity: 0.5, fontWeight: 400, textAlign: 'center', paddingBottom: 40}}>Settings</h4>
        </a>
      </Link>
    </>
  )
}
