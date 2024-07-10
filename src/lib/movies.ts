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
    const keywords: Movie[] = data.results;
    return keywords;
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
    const keywords: Movie[] = data.results;
    return keywords;
  } catch (error) {
    console.error(error);
    return [];
  }
};
