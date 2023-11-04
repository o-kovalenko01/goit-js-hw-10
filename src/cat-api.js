import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import axios from 'axios';

export const fetchBreeds = async () => {
  const select = new SlimSelect({
    select: '#breed-select',

    events: {
      afterChange: async newVal => {
        const loader = document.querySelector('.loader');
        const info = document.querySelector('.cat-info');
        // console.log(newVal);
        if (newVal[0].value === 'Select a cat') {
          return false;
        }
        try {
          loader.style.display = 'block';
          info.style.display = 'none';
          const result = await axios.get(
            `https://api.thecatapi.com/v1/images/search?breed_ids=${newVal[0].id}`
          );
          loader.style.display = 'none';
          info.style.display = 'block';

          info.innerHTML = `<div class = 'image'><img src="${result.data[0].url}" alt=""></div><div><h2>${result.data[0].breeds[0].name}</h2><p>${result.data[0].breeds[0].description}</p><p><b>Temperament: </b>${result.data[0].breeds[0].temperament}</p></div>`;
        } catch (e) {
          Notiflix.Notify.failure(
            ' Oops! Something went wrong! Try reloading the page!'
          );
          info.style.display = 'none';
          loader.style.display = 'none';
        }
      },
    },
  });

  try {
    const res = await axios.get('https://api.thecatapi.com/v1/breeds');
    select.setData([
      { id: '', text: 'Select a cat' },
      ...res.data.map(el => {
        return {
          text: el.name,
          id: el.id,
        };
      }),
    ]);

    // console.log(res.data);
  } catch (e) {
    Notiflix.Notify.failure(
      ' Oops! Something went wrong! Try reloading the page!'
    );
  }
};
