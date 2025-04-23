import { GetServerSideProps } from "next";
import LatestMovies from "../components/LatestMovies";
import { getMovies } from "../apis/index";
import { POPULAR_MOVIES_MESSAGE, WELCOME_MESSAGE } from "@/constants/constants";
import { MoviesProps } from "@/types/movies";
import Link from "next/link";

const HomePage = ({ movies }: MoviesProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-12 drop-shadow-md">
        {WELCOME_MESSAGE}
      </h1>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎬 Latest Movies</h2>
        <LatestMovies movies={movies} />
      </div>

      <div className="text-center mt-14">
        <Link
          href="/movies"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
        >
          {POPULAR_MOVIES_MESSAGE}
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<MoviesProps> = async () => {
  const movies = await getMovies();

  return {
    props: {
      movies,
    },
  };
};

export default HomePage;
