import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const loader = document.querySelector('.loader');
const info = document.querySelector('.cat-info');
const breed = document.querySelector('.breed-select');

async function selectCat() {
  try {
    breed.style.display = 'none';
    const res = await fetchBreeds();
    breed.style.display = 'flex';
    const select = new SlimSelect({
      select: '#breed-select',

      events: {
        afterChange: async newVal => {
          try {
            loader.style.display = 'block';
            info.style.display = 'none';

            const result = await fetchCatByBreed(newVal[0].id);

            loader.style.display = 'none';

            info.style.display = 'block';

            info.innerHTML = `<div class = 'image'><img src="${result.url}" alt=""></div><div><h2>${result.breeds[0].name}</h2><p>${result.breeds[0].description}</p><p><b>Temperament: </b>${result.breeds[0].temperament}</p></div>`;
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
    select.setData(
      res.map(el => {
        return {
          text: el.name,
          id: el.id,
        };
      })
    );

    console.log(res);
  } catch (e) {
    Notiflix.Notify.failure(
      ' Oops! Something went wrong! Try reloading the page!'
    );
  }
}

selectCat();
