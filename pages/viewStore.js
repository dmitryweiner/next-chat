import Link from "next/link";
import React from "react";
import {withRedux} from "../redux/redux";
import {useSelector} from "react-redux";

const codeStyle = {
  background: '#ebebeb',
  width: 400,
  padding: 10,
  border: '1px solid grey',
  marginBottom: 10,
};

function ViewStore() {
  const store = useSelector(state => state);
  return <>
    <Link href="/"><a>Back</a></Link>
    <pre style={codeStyle}>
      <code>{JSON.stringify(store, null, 4)}</code>
    </pre>
  </>;
}

export default withRedux(ViewStore);
