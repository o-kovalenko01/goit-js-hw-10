import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_N54J5qpyVgSbvNdXKCr9k0KONlFA7WiP5ogYMjvPQYDiJvnlRwJabi0QU3LpGQvc';

async function fetchBreeds() {
  const res = await axios.get('https://api.thecatapi.com/v1/breeds');

  return res.data;
}

async function fetchCatByBreed(breedId) {
  const res = await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  return res.data[0];
}

export { fetchBreeds, fetchCatByBreed };
