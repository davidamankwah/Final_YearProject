import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";


const Conversation = ({ data, currentUser})  => {
    const [userData, setUserData] = useState(null)
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user);

    useEffect(()=> {
        const userId = data.members.find((id)=>id!==currentUser)
        console.log(userId)
        const  getUserData = async () => {
            try
            {
            const response = await fetch(`http://localhost:4000/users/${userId}`, {
                method: "GET",
                headers: { Permitted: `Bearer ${token}` },
              });
              console.log(response); // Log the response
              const data = await response.json();
              setUserData(data);
              dispatch({type:"SAVE_USER", data:data}) //modify
          }
          catch(error)
          {
            console.log(error)
          }
        }
        getUserData();
    }, [userId])

    return (
        <>
        <div className="follower conversation">
          <div>
          <ProfileImage image={userData.profilePicture} />
            <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData.userName}</span>
            </div>
          </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
    )
}

export default Conversation;