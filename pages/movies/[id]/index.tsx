import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

interface Movie {
  id: string;
  name: string;
  image: string;
}

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div>
      <h1>{movie.name}</h1>
      <Image src={movie.image} alt={movie.name} width={200} height={200} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/moviesDetails"
  );
  const movies: Movie[] = await res.json();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: false,
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
    `https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/moviesDetails/${params.id}`
  );
  const movie: Movie = await res.json();

  return {
    props: {
      movie,
    },
  };
};
