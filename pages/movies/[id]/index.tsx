import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

interface Movie {
  id: string;
  name: string;
  image: string;
  MainCharacter : string;
  releaseDate : string;
}

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
    
  return (
    <div>
      <h1>{movie.name}</h1>
      <div> Released on : {movie.releaseDate}</div>
      <div>Main Character : {movie.MainCharacter}</div>
      <Image src={movie.image} alt={movie.name} width={150} height={200} />
      {/* <img src={movie.image} alt={movie.name} width="150" height="200" /> */}

    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/movies"
  );
  const movies: Movie[] = await res.json();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: "blocking",
    
  };
};

export const getStaticProps: GetStaticProps<MovieDetailsProps> = async (context) => {
  const { params } = context;

  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/movies/${params.id}`
  );
  const movie: Movie = await res.json();

  return {
    props: {
      movie,
    },
    revalidate: 1
  };
};
