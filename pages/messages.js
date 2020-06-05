import Link from "next/link";
import React, {useEffect, useState} from "react";
import {messages} from "../store";

function Messages({messages}) {
  const [actualMessages, setMessages] = useState(messages);
  const [nick, setNick] = useState("");
  const [content, setContent] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/messages");
    const messages = await res.json();
    setMessages(messages);
  };

  const sendData = async (event) => {
    const message = {
      nick,
      content
    };
    const res = await fetch("/api/messages/send", {method: "post", body: JSON.stringify(message)});
    const messages = await res.json();
    setMessages(messages);
    setContent("");
  };

  useEffect(() => {
    const intervalID = setInterval(fetchData, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return <>
    <Link href="/"><a>Back</a></Link>
    <div>
      <ul>
        {actualMessages.map((message, index) => (<li key={index}>{message.nick}: {message.content}</li>))}
      </ul>
    </div>
    <div>
      <div>
        <label>
          Nick:
          <input type="text" value={nick} onChange={(e) => setNick(event.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Message:
          <input type="text" value={content} onChange={(e) => setContent(event.target.value)}/>
        </label>
      </div>
      <div>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
    </>;
}

export function getStaticProps() {
  return {
    props: {
      messages,
    }
  };
}

export default Messages;
