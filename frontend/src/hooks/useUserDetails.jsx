import React,{useState,useEffect} from 'react'
import axios from 'axios';

const useUserDetails = () => {
    const [userData, setUserData] = useState({
        username: "",
        email:""||null,
        createdAt:"",
      });
    
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const res = await axios.get("http://localhost:3000/user/get-userdetails", {
              withCredentials: true,
            });
            console.log(res);
            setUserData({
              username: res.data.username,
              email:res.data.email,
              createdAt:res.data.createdAt.split("T")[0].split("-").reverse().join("-")
            });
          } catch (err) {
            console.error("Failed to load user data", err);
          }
        };

        const fetchUserPosts = async()=>{
            try{
                const res=await get("http://localhost:3000/user/get-userposts",{
                    withCredentials:true,
                });
                console.log(res);
            }catch(err){

            }
        }
    
        fetchUserData();
      }, []);

      return {userData};
}

export default useUserDetails