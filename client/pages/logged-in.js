import React from "react";
import fetch from "isomorphic-fetch";
import jwtDecode from "jwt-decode";

class LoggedIn extends React.Component {
  state = {
    name: ""
  };

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
      .then(resp => resp.text())
      .then(token => jwtDecode(token))
      .then(data => {
        this.setState({
          name: `${data.context.user.firstName} ${data.context.user.lastName}`
        });

        return data;
      })
      .catch(err => console.log("err", err));
  }
  render() {
    return <div>Logged in user: {this.state.name}</div>;
  }
}

export default LoggedIn;
