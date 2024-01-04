// components/Conversation.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getUser } from '../api/UserRequests';

const Conversation = ({ data, currentUser}) => {
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()


  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data)
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
    </>
  );
};

export default Conversation;
