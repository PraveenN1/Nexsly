import React,{useEffect, useState} from "react";
import axios from "axios";

const useReplies=(id)=>{
    const [replyTree,setReplyTree]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchReplies = async () => {
            try {
              const res = await axios.get(`http://localhost:3000/reply/${id}`, {
                withCredentials: true,
              });
              setReplyTree(res.data.replies); // Already structured
            } catch (err) {
              console.error("Error fetching replies", err);
            }
          };
          if(id){
            fetchReplies();
          }
    },[id]);

    return {replyTree,loading,error};
}

export default useReplies;
