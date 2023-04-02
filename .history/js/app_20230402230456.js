                    //--------------------------------------------------------- - TMDB - --------------------------------------------------------------------\\
                    
const API_KEY = 'api_key=67b76838a7f6737ae54742330812baf0'; // clé
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=fr-fr';
//http protole 1ère partie
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + '/search/movie?' + API_KEY + '&language=fr-fr';


const main = document.getElementById("main");
const form = document.getElementById("form");



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
    //vide la page
    main.innerHTML = '';
    // mise en place de la méthode forEarc pour obtenir chaque informations souhaitez 
    //et mise en place du HTML en dynamique
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
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
        span.className = getColor(vote_average);
        span.textContent = vote_average;
        movieInfo.appendChild(span);

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
        buttonC.textContent = "+";
        overviewC.appendChild(buttonC);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav();
            movieEl.addEventListener('click', () => showMovieDetails(id));
            
              console.log("showMovieDetails executed for movie with id: ", id);
              // ...
            }
            
            const buttonC = document.createElement('button');
            buttonC.className = 'know-more';
            buttonC.id = id;
            buttonC.textContent = "+";
            overviewC.appendChild(buttonC);
            
            buttonC.addEventListener('click', () => {
                console.log(id)
                openNav();
                showMovieDetails(id);
            });
            

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}


// evolution de la couleur des nombres en fonction de la note : 
//au dessus de 8: vert, si égale à 5 ou sup. : orange,  sinon il seront rouge;



function getColor(vote) {
    if(vote>=8) {
        return "green"
        }else if(vote>=5) {
            return "orange"
        }else{
            return "red";
        }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // preventDefault, evite le comportement normale sur formulaire. 
    
    const searchTerm = search.value;
    // si trouvé on affiche 
    if(searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    }else {
        getMovies(API_URL);
    }
})
