import fetch from "node-fetch";
import * as fs from "fs";
import * as zlib from "zlib";
import { promisify } from "util";

interface MovieRecord {
  movie_id: number;
}

// Promisify the unzip function
const gunzip = promisify(zlib.gunzip);

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const TABLE_NAME = "keyword_movie_of_the_day";

async function downloadAndProcessMovies() {
  // Download the JSON file
  const response = await fetch(
    "http://files.tmdb.org/p/exports/movie_ids_05_15_2024.json.gz"
  );
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Unzip the JSON file
  const jsonData = await gunzip(buffer);
  const movies = JSON.parse(jsonData.toString());

  // Select a random movie
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const movieId = randomMovie.id;

  // Define Supabase API endpoint and headers
  const headers = {
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  // Check if the movie_id exists in the Supabase table
  const checkResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?movie_id=eq.${movieId}`,
    { headers }
  );
  const data = await checkResponse.json();
  const movieRecords = data as MovieRecord[];

  if (movieRecords.length === 0) {
    // Movie ID not found, insert it
    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/${TABLE_NAME}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ movie_id: movieId }),
      }
    );
    if (insertResponse.ok) {
      console.log("Movie ID added successfully.");
    } else {
      console.error("Failed to add Movie ID:", await insertResponse.text());
    }
  } else {
    console.log("Movie ID already exists.");
  }
}

downloadAndProcessMovies().catch((err) => console.error(err));
