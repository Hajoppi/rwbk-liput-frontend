import { useContext, useEffect, useState } from "react"
import { CartContext } from "../contexts/CartContext"

const padNumber = (number: number) => String(number).length > 1 ? String(number) : `0${number}`;

const Timer = () => {
  const { created, status } = useContext(CartContext);
  const [interval, setIntervalValue] = useState<NodeJS.Timeout>();
  const [ time, setTime ] = useState(0);
  const minutes = Math.floor(time/60);
  const seconds = Math.floor(time-minutes*60);
  useEffect(() => {
    if (!created || status === 'ok') return;
    const totalAmountOfMinutes = status === 'new' ? 1 : 30;
    setTime(Math.floor((created.getTime() + totalAmountOfMinutes * 1000*60 - Date.now())/1000));
    const intervalValue = setInterval(() => {
      const newTime = Math.floor((created.getTime() + totalAmountOfMinutes * 1000 * 60 - Date.now())/1000);
      setTime(newTime);
    },1000);
    setIntervalValue(intervalValue);
  },[created, status]);
  if (!created || time <= 0 ) {
    if(interval) clearInterval(interval);
    return null;
  }

  return (
    <div>
      Aikaa suorittaa tilaus: {`${padNumber(minutes)}:${padNumber(seconds)}`}
    </div>
  )
}

export default Timer;