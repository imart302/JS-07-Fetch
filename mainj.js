function waitToResolveMs(milli){
  return new Promise((resolve) => {
    setTimeout(resolve, milli);
  });
}

async function f(){
  console.log('funcion asincrona');
  waitToResolveMs(3000);
  console.log('Exit');
}



const COUNTER_P = document.getElementById('counter');
let counter = 0;


document
  .getElementById('btn-counter')
  .addEventListener('click', async (ev) => {
    await setTimeout(() => {
      counter++;
      COUNTER_P.textContent = counter;
    }, 2000);
})

