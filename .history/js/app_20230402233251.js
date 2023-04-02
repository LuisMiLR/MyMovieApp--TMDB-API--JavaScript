                    //--------------------------------------------------------- - TMDB - --------------------------------------------------------------------\\
                    
const API_KEY = 'api_key=67b76838a7f6737ae54742330812baf0'; // clé
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=fr-fr';
//http protole 1ère partie
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + '/search/movie?' + API_KEY + '&language=fr-fr';

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById('tags');

setGenre();// appel de la fonction setGenre()
function setGenre() {  // définition de la fonction setGenre
    tagsEl.innerHTML= ''; // Supprime tous les tags existants en vidant le contenu HTML de l'élément tagsEl
    genres.forEach(genre => {   // La boucle forEach parcourt chaque objet genre dans le tableau genres
        const t = document.createElement('div');  // Crée un nouvel élément HTML "div"
        t.classList.add('tag');  // Ajoute la classe "tag" à l'élément "div"
        t.id=genre.id;  // Définit l'identifiant de l'élément "div" en fonction de l'ID du genre
        t.innerText = genre.name;  // Définit le texte de l'élément "div" en fonction du genre
        t.addEventListener('click', () => {
          if(selectedGenre.length == 0){
              selectedGenre.push(genre.id);
          }else{
              if(selectedGenre.includes(genre.id)){
                  selectedGenre.forEach((id, idx) => {
                      if(id == genre.id){
                          selectedGenre.splice(idx, 1);
                      }
                  })
              }else{
                  selectedGenre.push(genre.id);
              }
          }
          console.log(selectedGenre)
          getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
          highlightSelection()
      })
        
        tagsEl.append(t);  // Ajoute l'élément "div" à l'élément parent tagsEl
    })
}

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
            function showMovieDetails(id) {
              console.log("showMovieDetails executed for movie with id: ", id);
              // ...
            }
            
        })
    })
}

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

// Cette fonction remplit les informations du film sélectionné dans myNav
function showMovieDetails(movieId) {
  // Appel à l'API TMBD pour récupérer les informations sur le film
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=67b76838a7f6737ae54742330812baf0'&language=fr`)
    .then(response => response.json()) 
    .then(data => {
      // Remplir le titre du film
      document.getElementById('movie-title').textContent = data.title;

      // Remplir l'aperçu du film
      document.getElementById('movie-overview').textContent = data.overview;

      // Remplir l'image du film
      const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      document.getElementById('movie-poster').setAttribute('src', posterUrl);

      // Appel à l'API TMBD pour récupérer les informations sur les acteurs du film
      return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=api_key=67b76838a7f6737ae54742330812baf0`);
    })
    .then(response => response.json())
    .then(data => {
      // Remplir les noms des acteurs du film
      const castList = data.cast.slice(0, 5).map(actor => `<li>${actor.name}</li>`).join('');
      document.getElementById('movie-cast').innerHTML = castList;

      // Afficher myNav
      openNav();
    })
    .catch(error => console.error(error));
}

