import { useState, useEffect, useRef } from 'react'
import './App.css'
import { io } from "socket.io-client";

function App() {
  const [msg, setMsg] = useState(""); 
  const socket = useRef();  
  useEffect(() => {
    socket.current = io("ws://localhost:3000"); 
  }, []);

  const sendMsg = async(event) => {
    event.preventDefault();
    await socket.current.emit("msg", msg);
    setMsg("");
  }
  return (
      <div className="container">
          <div className="msgs-container">
            {/* <div className="others-msg">left</div>
            <div className="my-msg">right</div> */}
            <div className="msgs">
              hello
            </div>
          </div>
          <div className="inputs" >
              <input type="text" name="msg" value={msg} id="msg" onChange={(e) => setMsg(e.target.value)}/>
              <button onClick={sendMsg}>Send</button>
          </div>
      </div>
  )
}

export default App
