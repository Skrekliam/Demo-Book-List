import React from "react";

const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy"];
const genresList = genres.map((el) => <option>{el}</option>);

export default function genreLists() {
  return genresList;
}
