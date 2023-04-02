//TMDB

const API_KEY = 'api_key=67b76838a7f6737ae54742330812baf0'; //clé
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// console.log("----------"+ API_URL);

const IMG_URL = "https://image.tmdb.org/t/p/w500"; 
// console.log(searchURL);
const searchURL = `${BASE_URL}/search/movie?${API_KEY}&language=fr-fr`;



const main = document.getElementById("main");
// console.log(main);
const form = document.getElementById("form");
const search = document.getElementById("search");




    fetch(API_URL)
    // then nous retourne la réponse de notre fetch, le 2eme fetch nous 
    //permet de rendre lisible notre réponses 
    .then((res) => res.json()).then((data) => {
    showMovies(data.results);    
    console.log(data.results);     
    });
     

// a partir de mes données 
function showMovies(data) {
    // console.log(data);
    /*main.innerHTML = "";*/
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        // console.log(movie);
    }    
    )}