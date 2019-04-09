import React from "react";
import Link from "next/link";
import _ from "lodash";

import Head from "components/head";
import Nav from "components/nav";
import runQuery from "utils/runQuery";
import UserQuery from "./UserQuery.gql";
import UserNameMutation from "./UserNameMutation.gql";

const Root = ({ user: { name, friends }, setUserName }) => {
  const [localUserName, setLocalUserName] = React.useState(name);
  return (
    <div>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
      <Head title="Home" />
      <Nav />
      <div className="hero">
        <h1 className="title">Welcome to Next! {localUserName}</h1>
        <p className="description">
          Name:{" "}
          <input
            value={localUserName}
            onChange={e => setLocalUserName(e.target.value)}
          />
          <button onClick={() => setUserName(localUserName)}>Submit</button>
        </p>
        <div className="row">
          {(friends || []).map(({ id, name }) => (
            <Link key={id} href={`/?id=${id}`}>
              <a className="card">
                <h3>User {id}</h3>
                <p>{name}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

Root.getInitialProps = async context => {
  const { id } = context.query;
  const {
    data: { user }
  } = await runQuery({
    query: UserQuery,
    variables: {
      userId: id
    }
  });
  const setUserName = name =>
    runQuery({
      query: UserNameMutation,
      variables: {
        id: id,
        name
      }
    });
  return { user, setUserName };
};

export default Root;
