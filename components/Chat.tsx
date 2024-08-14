'use client'

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2Icon } from "lucide-react";
// import ChatMessage from "./ChatMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { askQuestion } from "@/actions/askQuestion";
// import { askQuestion } from "@/actions/askQuestion";
// import ChatMessage from "./ChatMessage";
// import { useToast } from "./ui/use-toast";
export type Message = {
    id?: string;
    role: "human" | "ai" | "placeholder";
    message: string;
    createdAt: Date;
  };
  
const Chat = ({ id }: { id: string }) => {

const {user}=useUser()
const [input, setInput] = useState("");
const [messages, setMessages] = useState<Message[]>([]);
const [isPending, startTransition] = useTransition();

const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );


  useEffect(() => {
    if(!snapshot) return
    
  }, [snapshot]);


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); 

  const q=input;
  setInput('');

  setMessages((prev) => [...prev, { role: "human", message: q, createdAt: new Date() }

    ,{ role: "ai", message: "Thinking...", createdAt: new Date() }
  ]);
startTransition(async()=>{


  const { success, message } = await askQuestion(id, q);

   
    setMessages((prev) =>
        prev.slice(0, prev.length - 1).concat([
          {
            role: "ai",
            message: `Whoops... ${message}`,
            createdAt: new Date(),
          },
        ])
      );



    }
  );
}

  return (
    <div className="h-full flex flex-col overflow-scroll">
        {/* Chat contents  */}
        <div className="flex-1 w-full">
{/* chat contents */}




        </div>
    {/* form  */}
    <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
      >
        <Input
          placeholder="Ask a Question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button type="submit" className=" bg-black rounded-lg  "  disabled={!input || isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin text-indigo-600  " />
          ) : (
            "Ask"
          )}
        </Button>
      </form>
    </div>
  )
}
export default Chat