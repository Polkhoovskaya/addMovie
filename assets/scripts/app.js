const headerButton = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');

const userInputs = modal.querySelectorAll('input');
let movies = [];

const updateUI = () => {
    if(movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

const deleteM = (id) =>  {
    let movieIn = 0;
    for (const movie of movies) {
        if (movie.id === id) {
            break;
        }
        movieIn++;
    }
    movies.splice(movieIn, 1);
    listRoot.children[movieIn].remove();
    updateUI();
    // listRoot.removeChild(listRoot.children[movieIn]);
}

const deleteMovie = (id) => {
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.classList.add('visible');
    toggleBackdrop();

    let cancel = document.getElementById('delete-modal').querySelector('button.btn.btn--passive');
    let yes = cancel.nextElementSibling;
    // yes.removeEventListener('click', ()=>{deleteM(id); deleteModal.classList.remove('visible'); toggleBackdrop();});
    cancel.removeEventListener('click', () => {deleteModal.classList.remove('visible'); toggleBackdrop();});
    yes.replaceWith(yes.cloneNode(true));
    yes = cancel.nextElementSibling;
    cancel.replaceWith(cancel.cloneNode(true))
    cancel = document.getElementById('delete-modal').querySelector('button.btn.btn--passive');
    cancel.addEventListener('click', () => {deleteModal.classList.remove('visible'); toggleBackdrop();});
    yes.addEventListener('click', ()=>{deleteM(id); deleteModal.classList.remove('visible'); toggleBackdrop();})
}

const addNewMovieElem = (id, title, imageUrl, rating) => {
    const newMovie = document.createElement('li');
    newMovie.className = 'movie-element';
    newMovie.innerHTML = newMovie.innerHTML + `<div class="movie-element__element"><img src="${imageUrl}" alt="${title}"></div><div class="movie-element__info"><h2>${title}</h2><p>${rating}</p></div>`
    newMovie.addEventListener('click', deleteMovie.bind(this, id));
    listRoot.append(newMovie);
}

const toggleMovieModal = () => {
     // modal.className=`${modal.className} visible`;
    modal.classList.toggle('visible');
    toggleBackdrop();
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const cancelAdding = () => {
    toggleMovieModal();
}

const clearInput = () => {
    // userInputs[0].value = '';
    // userInputs[1].value = '';
    // userInputs[2].value = '';
    for(const input of userInputs) {
        input.value = '';
    }
}

const addMovie = () => {
    const title = userInputs[0].value;
    const imageUrl = userInputs[1].value;
    const rating = userInputs[2].value;

    if (title.trim() === '' || imageUrl.trim() === '' || rating.trim() === '' || +rating < 1 || +rating > 5) {
           alert('Please enter valid value'); 
    } else {
        const movie = {
            id: Math.random().toString(),
            title: title,
            imageUrl: imageUrl,
            rating: rating
        };
        movies.push(movie);
        toggleMovieModal();
        clearInput();
        addNewMovieElem(movie.id, movie.title, movie.imageUrl, movie.rating);
        updateUI();
    }
}

headerButton.addEventListener('click', toggleMovieModal);
modal.querySelector('button.btn.btn--passive').addEventListener('click', cancelAdding);
// backdrop.addEventListener('click', cancelAdding);
modal.querySelector('button.btn.btn--success').addEventListener('click', addMovie);