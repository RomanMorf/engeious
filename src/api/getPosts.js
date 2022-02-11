const axios = require('axios');

export const getPosts = async () => {
  try {
    let data = []

    await axios.get('https://jsonplaceholder.typicode.com/posts/')
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

