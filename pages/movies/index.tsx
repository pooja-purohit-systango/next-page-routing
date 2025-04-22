import Link from "next/link";


interface PopularMovie {
  id: number;
  name: string;
  image: string;
}

interface MoviesProps {
  popularMovies: PopularMovie[];
}

const Movies = ({ popularMovies }: MoviesProps) => {


  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
            <h2>{movie.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;


export async function getStaticProps() {

    const response = await fetch ('https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/movies');
    const data = await response.json();
    console.log(data);

    return {
        props : {
            popularMovies : data,
        },
    }
}