import React from 'react';
import './style.scss'

function Table ({users}) {
  console.log(users, 'users from Table');

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>username</td>
            <td>name</td>
            <td>post created</td>
            <td>email</td>
            <td>website</td>
            <td>company</td>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => {
            return (
              <tr key={ user.id }>
                <td>{ index + 1 }</td>
                <td>{ user.username }</td>
                <td>{ user.name }</td>
                <td> -= number =-</td>
                <td>{ user.email }</td>
                <td>{ user.website }</td>
                <td>{ user.company.name }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table;