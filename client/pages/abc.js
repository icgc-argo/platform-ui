import React from "react";
import fetch from "isomorphic-unfetch";
import Axios from "axios";

class ABC extends React.Component {
  componentDidMount() {
    Axios.create()
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
      .catch(err => console.log("fetch err", err));
  }
  render() {
    return <div>ABC</div>;
  }
}

export default ABC;
