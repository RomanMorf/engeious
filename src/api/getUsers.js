const axios = require('axios');

export const getUsers = async () => {
  try {
    let data = []

    await axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(res => {
        data = res.data
      })
      .catch(function (error) {
        console.log(error);
        throw error
      })

    return data
    
  } catch (error) {
    throw error
  }
} 

