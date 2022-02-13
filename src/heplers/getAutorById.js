
function getUserById(users, id) {
  const idx = users.findIndex( user => user.id === id )
  return users[idx]
}

export default getUserById;