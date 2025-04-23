import Link from "next/link";
import { getMovies } from "../../apis/index";
import { MoviesProps } from "@/types/movies";
import { GetStaticProps } from "next";
import { POPULAR_MOVIES_MESSAGE } from "@/constants/constants";
import { HOME_PAGE_ROUTE, MOVIES_ROUTE } from "@/constants/routes";

const Movies = ({ movies }: MoviesProps) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
     <Link href={HOME_PAGE_ROUTE} className="text-blue-500 underline">
  Back
</Link>


      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        {POPULAR_MOVIES_MESSAGE}
      </h1>
      <ul className="space-y-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <Link href={`${MOVIES_ROUTE}/${movie.id}`} passHref>
              <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                {movie.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

export const getStaticProps: GetStaticProps<MoviesProps> = async () => {
  const movies = await getMovies();

  return {
    props: {
      movies,
    },
  };
};
