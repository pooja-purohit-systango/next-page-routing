import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { getMovies } from "@/apis";
import { movie } from "@/types/movies";
import { LOADING_MESSAGE, MOVIE_NOT_FOUND_MESSAGE } from "@/constants/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { HOME_PAGE_ROUTE } from "@/constants/routes";
import { notFound } from "next/navigation";


export interface MovieDetailsProps {
  movie: movie | null;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const router = useRouter();
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-xl font-semibold text-red-500">{MOVIE_NOT_FOUND_MESSAGE}</p>
      </div>
    );
  }
  if (router.isFallback) {
    return <p className="text-center text-xl text-blue-500">{LOADING_MESSAGE}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link href={HOME_PAGE_ROUTE} className="text-blue-500 underline">
  Back
</Link>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">{movie.name}</h1>
        <div className="text-lg text-gray-700 mb-2">Released on: {movie.releaseDate}</div>
        <div className="text-lg text-gray-700 mb-6">Main Character: {movie.MainCharacter}</div>
        <div className="flex justify-center">
          <Image
            src={movie.image}
            alt={movie.name}
            width={300}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await getMovies();

  const paths = (movies).map((movie: movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
   // fallback: false, // fallbackfalse m new movies ki details m 404 aa rha h
   fallback: "blocking",
  // fallback: true,
  };
};
export const getStaticProps: GetStaticProps<MovieDetailsProps> = async (context) => {
  const { params } = context;

  if (!params || typeof params.id !== "string") {
    return {
      props: {
        movie: null,
      },
    };
  }

  const movies = await getMovies();
  const movie = movies.find((m : movie) => m.id === params.id) || null;

  return {
    props: {
      movie,
    },
    revalidate: 1, 
  };
};