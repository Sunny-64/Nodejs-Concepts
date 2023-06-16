import { useState, useEffect, useRef } from 'react'
import './App.css'
import { io } from "socket.io-client";

function App() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:3000", { transports: ["websocket"] });
    socket.current.on("getMessages", (m) => {
      setMessages(m)
    })
  }, []);

  const sendMsg = (event) => {
    event.preventDefault();
    console.log(socket.current.emit("msg", msg));
    setMsg("");
  }

  console.log(messages)
  return (
    <>
    <h1>Chat System</h1>
    <div className="container">
      <div className="msgs-container">
        {/* <div className="others-msg">left</div>
            <div className="my-msg">right</div> */}
        <div className="msgs">
          {messages?.map((m, index) => {
            return <p className='singleMsg' key={index}>{m}</p>
          })}
        </div>

        <form className="inputs"  onSubmit={sendMsg} >
          <input type="text" name="msg" value={msg} id="msg" onChange={(e) => setMsg(e.target.value)} />
          <button type='submit'>Send</button>
        </form>

      </div>

    </div>
    </>
  )
}

export default App
