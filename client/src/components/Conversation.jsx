// components/Conversation.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getUser } from '../api/UserRequests';

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()


  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data)
         console.log(data)
         dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])

  return (
    <>
   <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
         
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.userName}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
