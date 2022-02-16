import React from 'react';
import './style.scss'
import useUser from '../../hooks/Users';
import EditorModal from '../EditorModal';
import { useModalState } from '../../context/Modal';

function Table ({users}) {
  const { showModal, setShowModal } = useModalState(false)
  const { 
    currentUser,
    setCurrentUser } = useUser()

  function chooseCurrentUser(user) {
    setCurrentUser(user)
    setShowModal(true)
  }

  return (
    <>
      {showModal && <EditorModal user={currentUser} type={'user'} closeModal={() => setShowModal(false)}/> }
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
              <tr key={ user.id } onClick={() => chooseCurrentUser(user)}>
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