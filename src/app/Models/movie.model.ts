type Movie = {
  tagline: string;
  id: number;
  original_title: string;
  imgUrl: string;
  overview: string;
  vote_average: string;
  vote_count: string;
  backdrop_path: string;
  release_date: string;
  genres: string[] | Object[];
  title: string;
  homepage: string;
  budget: number;
};

export default Movie;
