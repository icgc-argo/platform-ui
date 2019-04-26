import React from "react";
import fetch from "isomorphic-unfetch";
import Axios from "axios";

const test = x => alert(x);

class ABC extends React.Component {
  componentDidMount() {
    fetch(
      "https://ego.qa.cancercollaboratory.org/api/oauth/ego-token?client_id=argo-client",
      {
        credentials: "include",
        headers: { accept: "*/*" },
        body: null,
        method: "GET",
        mode: "cors"
      }
    )
      .then(resp => {
        return resp.text();
        // console.log("resp", resp);
      })
      .catch(err => console.log("err", err))
      // .then(console.log)
      .then(test);
    /* Axios.create()
      .post(
        "https://ego.qa.cancercollaboratory.org/api/oauth/ego-token?client_id=argo-client",
        null,
        {
          withCredentials: true
        }
      )
      .then(resp => {
        console.log("fetch resp", resp, resp.data, resp.status);

        if (resp.status === 200) {
          return resp.data;
        } else {
          return "";
        }
      })
      .catch(err => console.log("fetch err", err));*/
  }
  render() {
    return <div>ABC</div>;
  }
}

export default ABC;
