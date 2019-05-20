import axios from 'axios';

const api = 'https://opentdb.com/api.php?amount=10&encode=url3986';

const getQuestions = () => {
  return new Promise((resolve, reject) => {
    axios.get(api)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error('Server error');
      })
      .then(data => {
        if (data.results.length) resolve(data.results);
        throw new Error('Oops, no questions received from server');
      })
      .catch(err => reject(err));
  });
};

export default getQuestions;
