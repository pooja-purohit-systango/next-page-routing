import Link from "next/link";
import Image from 'next/image';


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
            <div>
              <h2>{movie.name}</h2>
              {movie.image && (
                <Image src={movie.image} alt={movie.name} width="150" height="200" />
              )}
            </div>
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