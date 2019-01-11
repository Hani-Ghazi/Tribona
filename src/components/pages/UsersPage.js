import React, { Component } from "react";
import UsersList from '../users/usersList';

class UsersPage extends Component {
  render() {
    const {users} = this.props;
    return <UsersList users={users}/>
  }
}

export default UsersPage;