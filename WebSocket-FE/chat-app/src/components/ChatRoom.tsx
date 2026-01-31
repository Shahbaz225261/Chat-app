import { ChatBubble } from "../icons/chatbubbles"
import { Copy } from "../icons/Copy"
import { useRef } from "react"
import { toast } from "react-hot-toast";
import { Input } from "./Input";
import { Button } from "./Button";
interface msgprops{
    messages:string[];
    wsRefs: React.RefObject<WebSocket | null>;
    inpRef: React.RefObject<HTMLInputElement | null>;
    roomCode: string;
}

export function ChatRoom(props: msgprops){

    const msgRef = useRef<HTMLInputElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    return <div className="bg-violet-200 h-screen w-screen flex justify-center border items-center">

        <div className="h-[700px] border shadow-lg p-5 space-y-4 border-slate-400  bg-slate-100 w-[600px] rounded-2xl  ">

            <div className="flex justify-start items-center gap-2">
                <div>
                <ChatBubble/>
                </div>
                <div className="font-serif text-3xl">
                    Real Time Chat
                </div>
            </div>

            <div className="text-slate-600 font-mono pb-2">
                 temporary room that expires after all users exit
            </div>

            <div className="flex justify-between items-center p-2  rounded-lg  bg-slate-300 h-12">

                <div className="flex gap-2">
                    Room Code:
                    <div ref={ref}>
                         {props.roomCode}
                    </div> 


                    <div onClick={()=>{
                        if(ref.current){
                            const code = ref.current.textContent;
                            if(code){
                                navigator.clipboard.writeText(code);
                                toast.success("Room code copied to clipboard!");
                            }
                        }
                    }}>
                        <Copy/>
                    </div> 
                </div>

                <div>
                    Users 1
                </div>

            </div>


            <div className="h-[430px] flex flex-col justify-end items-end overflow-y-auto rounded-xl p-4 border border-slate-400 bg-white">
                {props.messages
                .filter(msg => msg.trim() !== "")
                .map((msg, index) => (
                    <div key={index} className="p-2 mb-1 rounded-xl bg-indigo-100 w-max max-w-[80%]">
                    {msg}
                    </div>
                ))}

            </div>

            <div className="flex gap-4">
                <Input ref={msgRef}  widthFull={true}  placeholder="Type a message..." size="md" />
                <Button onClick={()=>{
                    const msg = msgRef.current?.value;
                    if(props.wsRefs.current){
                        props.wsRefs.current.send(JSON.stringify({
                            type:"chat",
                            payload:{
                                message: msg
                            }
                        }))
                        if(msgRef.current)
                        msgRef.current.value = "";
                    }
                    
                }} size="sm" width="w-32" text="Send" variant="primary" />
            </div>
        </div>
    </div>
}