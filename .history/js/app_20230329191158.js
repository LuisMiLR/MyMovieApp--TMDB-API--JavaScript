//TMDB

const API_KEY = 'api_key=67b76838a7f6737ae54742330812baf0'; //clé
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = Base_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// console.log("----------"+ API_URL);
// début de l'url avec le nom de domaine
const IMG_URL = "https://image.tmdb.org/t/p/w500"; 
const searchURL = `${BASE_URL}/search/movie?${API_KEY}&language=fr-fr`;
// console.log(searchURL);


const main = document.getElementById("main");
// console.log(main);
const form = document.getElementById("form");
const search = document.getElementById("search");




    fetch(API_URL).then((res) => res.json()).then((data) => {
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
        
        const movieE1 = document.createElement("div");
        movieE1.className ="movie";
        movieE1.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${(Math.round(vote_average))}</span>
            </div>
            <div class="overview">
                <h3>Synopsis</h3>
                ${overview}
                <br/> 
                <button class="moreinfo" id="${id}">
                <span>En savoir <i class="fa-solid fa-plus"></i></span>
                </button
            </div>
    
            `;
            movieE1.addEventListener('click', () => {
                showMovieDetails(id)
            });
    
            main.appendChild(movieE1);
            
        })
    
    }