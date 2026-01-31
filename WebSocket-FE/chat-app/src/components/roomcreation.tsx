import { useRef, useState } from "react"
import { ChatBubble } from "../icons/chatbubbles"
import { Button } from "./Button"
import { Input } from "./Input"
import { Copy } from "../icons/Copy"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
// import { ChatRoom } from "./ChatRoom"


function generateRoomCode(length = 6): string {
        const chars = "ABCDE2414FGHIJK24141LMNOPQRS214TUVWX3829031240YZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
}
export const createcode = generateRoomCode();

interface RoomProps{
    wsRefs: React.RefObject<WebSocket | null>;
    inpRef: React.RefObject<HTMLInputElement | null>;
    setRoomCode: (code: string) => void;
}


export function Roomcreation(props: RoomProps){
    const navigate = useNavigate();
    const [code,setCode] = useState<string>();
    const ref = useRef<HTMLDivElement>(null);

    return <div className="flex justify-center items-center w-screen h-screen bg-violet-300">

        <div className="bg-white gap-3 w-[650px] h-max p-6 border border-slate-400 shadow-xl rounded-xl flex flex-col">

            <div className="flex gap-2 items-center">
                <div>
                    <ChatBubble />
                </div>
                <div className="text-2xl font-medium">
                    Real Time Chat
                </div>
            </div>

            <div className="text-slate-500  text-base pb-3">temporary room that expires after all users exit</div>

            <Button onClick={()=>{
                setCode(createcode);
                toast.success("Room created successfully!");

            }} variant="primary" text="Create New Room" size="lg" />

            <div className="">
                <Input widthFull={true} placeholder="Enter your name" size="md" />
            </div>

            <div className="flex gap-2 ">
                <Input ref={props.inpRef} widthFull={true} placeholder="Enter Room Code" size="sm" />
                <Button onClick={()=>{
                    const ws = props.wsRefs.current;
                    if (!ws) {
                        toast.error("WebSocket is not connected");
                        return;
                    }
                    const value = props.inpRef.current?.value;
                    if(value)
                    props.setRoomCode(value);
                    const payload = JSON.stringify({
                        type: "join",
                        payload: {
                            roomId: value,
                        }
                    });
                    
                    if (ws.readyState === WebSocket.OPEN) {
                    // Connection is already open, send it
                    ws.send(payload);
                    navigate('/ChatRoom')
                    } else {
                    // Wait for the connection to open
                    ws.onopen = () => {
                        ws.send(payload);
                        navigate('/ChatRoom')
                    };
                    }

                }} width="w-56"  variant="primary" text="Join Room"  size ="md" />
            </div>

    
            {code && <div className=" w-full rounded-xl p-6 bg-indigo-100 flex flex-col justify-center items-center">
                <div className="text-slate-500">
                    Share this code with your friend
                </div>
                <div className="text-3xl font-semibold flex justify-center items-center space-x-2 p-1">
                    <div ref = {ref}>
                      {code}
                    </div>
                    <div onClick={()=>{
                        if (ref.current) {
                            const text = ref.current.textContent;
                            if (text) {
                                navigator.clipboard.writeText(text);
                                toast.success("Room code copied to clipboard!");
                            }
                        }
                    }} > 
                        <Copy/>
                    </div>
                </div>
                 </div>}
            

            
        </div>
    </div>
}
