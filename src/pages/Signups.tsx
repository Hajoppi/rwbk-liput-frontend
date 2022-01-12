import { useEffect, useState } from "react";
import { proxy } from "../utils/axios";

type Signup = {
  firstName: string,
  lastName: string,
  created: string,
  ticket: string,
  orderNumber: number,
}
const Signups = () => {
  const [signups, setSignups] = useState<Signup[]>([]);
  useEffect(() => {
    proxy.get('/signups').then(response => {
      setSignups(response.data);
    })
  },[]);
  return (
    <div>
      {signups.map(signup => 
        <div key={`${signup.orderNumber}`}>{signup.orderNumber} {signup.firstName} {signup.lastName}</div>
      )}
    </div>
  )
}

export default Signups;