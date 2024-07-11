import { Keyword, Movie } from "@/types/movie-types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
  },
};

export const getMovieByID = async (id: number): Promise<Movie> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieKeywordsByID = async (id: number): Promise<Keyword[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/keywords?language=en-US`,
      options
    );
    const data = await response.json();
    const keywords: Keyword[] = data.keywords;
    return keywords;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US`,
      options
    );
    const data = await response.json();
    const movies: Movie[] = data.results;
    return movies;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US`,
      options
    );
    const data = await response.json();
    const movies: Movie[] = data.results;
    return movies;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMoviesBySearch = async (term: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIxODc3MTE5MWM2YTRkMjMwZTEwNjBjYmJhODZhOCIsIm5iZiI6MTcyMDU3OTk0Mi4yMjI5ODcsInN1YiI6IjY2ODM4ZmZhYTlhZTcyNzZmYTgxNWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Y-PDqpdSJ38QxK7JWd2yDRmXP21xEhWtUzoqml9ABQ`,
        },
      }
    );
    const data = await response.json();
    const movies: Movie[] = data.results;
    return movies;
  } catch (error) {
    console.error(error);
    return [];
  }
};
