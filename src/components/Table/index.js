import React from 'react';
import './style.scss'
import Paginated from '../Paginated';

import { useUserState } from '../../context/Users';
import { useCurrentItemsState } from '../../context/CurrentItems';
import { useModalState } from '../../context/Modal';
import EditorModal from '../EditorModal';
import useUser from '../../hooks/Users';

function Table ({users}) {
  const { showModal, setShowModal } = useModalState()
  // const { users } = useUserState()
  const { currentItems } = useCurrentItemsState(null)
  const { currentUser, setCurrentUser } = useUser()

  function chooseCurrentUser(user) {
    setCurrentUser(user)
    setShowModal(true)
  }

  return (
    <>
      {showModal && currentUser && 
        <EditorModal 
          user={currentUser} 
          closeModal={() => setShowModal(false)}
        />
      }

      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>username</td>
            <td>name</td>
            <td>post created</td>
            <td>email</td>
            <td>website</td>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map( user => {
            return (
              <tr key={ user.id } onClick={() => chooseCurrentUser(user)}>
                <td>{ user.id || '' }</td>
                <td>{ user.username || '' }</td>
                <td>{ user.name || '' }</td>
                <td> -= number =-</td>
                <td>{ user.email || '' }</td>
                <td>{ user.website || '' }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Paginated items={users} itemsPerPage={5}/>
    </>
  )
}

export default Table;