import Link from "next/link";
import React, {useEffect, useState} from "react";
import {withRedux} from "../redux/redux";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, fetchMessages} from "../redux/reduxStore";

function Messages() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const [nick, setNick] = useState("");
  const [content, setContent] = useState("");

  const sendData = async (event) => {
    const message = {
      nick,
      content
    };
    dispatch(sendMessage(message));
    setContent("");
  };

  useEffect(() => {
    const intervalID = setInterval(() => dispatch(fetchMessages()), 1000);
    return () => clearInterval(intervalID);
  }, []);

  return <>
    <Link href="/"><a>Back</a></Link>
    <div>
      <ul>
        {messages.map((message, index) => (<li key={index}>{message.nick}: {message.content}</li>))}
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

export default withRedux(Messages);
