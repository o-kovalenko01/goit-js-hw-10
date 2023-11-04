import axios from 'axios';
import { fetchBreeds } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_N54J5qpyVgSbvNdXKCr9k0KONlFA7WiP5ogYMjvPQYDiJvnlRwJabi0QU3LpGQvc';

fetchBreeds();
