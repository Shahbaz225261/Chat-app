import { useEffect, useRef, useState } from 'react';
import './App.css'
import { ChatRoom } from './components/ChatRoom';
import { Roomcreation } from './components/roomcreation'
import { Toaster } from "react-hot-toast";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  const [messages,setMessages] = useState([""]);
  const [roomCode, setRoomCode] = useState<string>(""); 
  const wsRef  = useRef<WebSocket | null>(null);
  const inpRef = useRef<HTMLInputElement>(null);
  
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:1010");
    ws.onmessage=(event)=>{
      setMessages(m=>[...m,event.data]);
    }
    wsRef.current = ws;
    return ()=>{
      ws.close();
    }
  },[])
  return <div>
    <Toaster/>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Roomcreation wsRefs={wsRef} setRoomCode={setRoomCode} inpRef = {inpRef} />} />
        <Route path='/ChatRoom' element={<ChatRoom wsRefs = {wsRef} messages= {messages} inpRef={inpRef} roomCode={roomCode} />} />
      </Routes>
    </BrowserRouter>

  </div> 
}
export default App
