const BASE_URL = 'https://pokeapi.co/api/v2/';

/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch

const getButton = document.getElementById('get-btn');
const inputPokemon = document.getElementById('poke-name');
const previousButton = document.getElementById('previous-btn');
const nextButton = document.getElementById('next-btn');
const cardContainer = document.getElementById('card-container');

const capitalizeWord = (word = '') => {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLocaleLowerCase();
};

const createElementWithText = (text, elementType) => {
  const el = document.createElement(elementType);
  el.textContent = text;
  return el;
};

const createUlList = (items = []) => {
  const ul = document.createElement('ul');

  items.forEach((item) => {
    const li = createElementWithText(item, 'li');
    ul.appendChild(li);
  });

  return ul;
};

const updatePokeCard = (poke) => {
  const title = createElementWithText(capitalizeWord(poke.name), 'h2');
  const id = createElementWithText(`id: ${poke.id}`, 'h4');
  const types = createElementWithText('types:', 'h5');
  const img = document.createElement('img');
  img.src = poke.sprites.front_default;

  const typesul = createUlList(poke.types.map((type) => type.type.name));

  const elements = [title, id, types, typesul, img];

  cardContainer.innerHTML = '';

  elements.forEach((el) => {
    cardContainer.appendChild(el);
  });
};

const fetchPokemon = async (pokemon) => {
  const endpoint = `${BASE_URL}pokemon/${pokemon}`;

  try {
    const resJson = await (await fetch(endpoint)).json();
    console.log(resJson);
    return resJson;
  } catch (error) {
    console.log(error);
    return null;
  }
};

getButton.addEventListener('click', async () => {
  if (!inputPokemon.value) {
    return;
  }

  const poke = await fetchPokemon(inputPokemon.value.toLowerCase());

  if (!poke) return;

  localStorage.setItem('currentPokeId', poke.id);
  updatePokeCard(poke);
});

document.addEventListener('DOMContentLoaded', async () => {
  const storedId = localStorage.getItem('currentPokeId') || 1;

  const poke = await fetchPokemon(storedId);
  if (!poke) return;
  updatePokeCard(poke);
  localStorage.setItem('currentPokeId', poke.id);
});

previousButton.addEventListener('click', async () => {
  const currentPokeId = Number.parseInt(
    localStorage.getItem('currentPokeId') || 1
  );
  const newId = Math.max(1, currentPokeId - 1);

  const poke = await fetchPokemon(newId);
  if (!poke) return;
  localStorage.setItem('currentPokeId', poke.id);
  updatePokeCard(poke);
});

nextButton.addEventListener('click', async () => {
  const currentPokeId = Number.parseInt(
    localStorage.getItem('currentPokeId') || 1
  );
  const newId = currentPokeId + 1;

  const poke = await fetchPokemon(newId);
  if (!poke) return;
  localStorage.setItem('currentPokeId', poke.id);
  updatePokeCard(poke);
});
