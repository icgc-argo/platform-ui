import React from "react";
import Link from "next/link";
import _ from "lodash";
import gql from "graphql-tag";

import Head from "../head";
import Nav from "../nav";
import runQuery from "../../utils/runQuery";

const Root = ({ name }) => (
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
    {
      <div className="hero">
        <h1 className="title">Welcome to Next! {name}</h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <div className="row">
          {[1, 2, 3].map(id => (
            <Link href={`/?id=${id}`}>
              <a className="card">
                <h3>User {id}</h3>
                <p>User name</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    }
  </div>
);

export const query = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      name
      id
    }
  }
`;

Root.getInitialProps = async context => {
  const { id } = context.query;
  const { data } = await runQuery({
    query,
    variables: {
      userId: id
    }
  });
  return {
    name: _.get(data, `user.name`)
  };
};

export default Root;
