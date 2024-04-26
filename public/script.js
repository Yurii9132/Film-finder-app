const tmdbKey = '20dc61eb4ea037b5d74f462e113c3619';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?include_adult=true&language=en&api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const respons = await fetch(urlToFetch);
        if(respons.ok) {
            const jsonResponse = await respons.json();
            const genres = jsonResponse.genres;
            // Object.values(genres).flat().forEach(genre => { console.log(genre); });
            return genres;
          }
    } catch (error) {
        console.log(error);
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const popular = '&sort_by=popularity.desc'
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}${popular}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
      console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
