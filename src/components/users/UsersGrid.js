import React, { Fragment } from "react";
import UesrCard from "./UserCard";

const UsersGrid = ({ users }) => {
  if (users && !users.length) {
    return (
      <div className="col-xs-12 col-md-12 col-lg-8 align-self-center">
        <div className="text-center">
          <h6>There is no data yet</h6>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      {
        (users || []).map((user, index) => <UesrCard key={index} user={user}/>)
      }
    </Fragment>
  );
};

export default UsersGrid;