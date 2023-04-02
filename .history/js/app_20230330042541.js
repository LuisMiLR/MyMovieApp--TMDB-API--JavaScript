                    //--------------------------------------------------------- - TMDB - --------------------------------------------------------------------\\

const API_KEY = 'api_key=67b76838a7f6737ae54742330812baf0'; // clé
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// console.log("----------"+ API_URL);

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = `${BASE_URL}/search/movie?${API_KEY}&language=fr-fr`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);
// pour fonction pour obtenir les films  
function getMovies(url) {
    fetch(url).then((res) => res.json()).then((data) => {
        // then nous retourne la réponse de notre fetch, le 2eme fetch nous 
        // permet de rendre lisible notre réponses au format json, utilsable   

        //.results pour montrer results de l'object 
        showMovies(data.results);
    })
}
// a partir de mes données 
function showMovies(data) {

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        
        const leftMain1 = document.createElement('div');
        leftMain1.className = 'left-Main1';
        main.appendChild(leftMain1);

        const leftMain2 = document.createElement('div');
        leftMain2.className = 'left-Main2';
        main.appendChild(leftMain2);
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        main.appendChild(movieEl);

        const imgC = document.createElement('img');
        imgC.src = (poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580");
        imgC.alt = title;
        movieEl.appendChild(imgC);

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';
        movieEl.appendChild(movieInfo);

        const h3 = document.createElement('h3');
        h3.className = 'h3Title';
        h3.textContent = title;
        movieInfo.appendChild(h3);

        const span = document.createElement('span');
        span.className = 'green';
        span.textContent = vote_average;
        movieEl.appendChild(span);

        const overviewC = document.createElement('div');
        overviewC.className = 'overview';
        movieEl.appendChild(overviewC);

        const h3O = document.createElement('h3');
        h3O.className = 'h3text';
        h3O.textContent = overview;
        overviewC.appendChild(h3O);

        const buttonC = document.createElement('button');
        buttonC.className = 'know-more';
        buttonC.id = id;
        buttonC.textContent = "C";
        overviewC.appendChild(buttonC);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
            openNav(movie)
        })
    })
}
