
function getUserById(users, id) {
  const userId = parseInt(id)
  const idx = users.findIndex( user => user.id === userId )
  return users[idx]
}

export default getUserById;