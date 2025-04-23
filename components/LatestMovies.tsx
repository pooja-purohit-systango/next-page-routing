import { MOVIES_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { MoviesProps } from "@/types/movies";

function LatestMovies({ movies }: MoviesProps) {
  const sortedMovies = movies.sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  const latestMovies = sortedMovies.slice(0, 5);

  if (!movies || movies.length === 0) {
    console.log("Movies array is empty");
    return (
      <>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center font-medium">
          Sorry, no movies to show...
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {latestMovies.map((movie) => (
        <Link href={`${MOVIES_ROUTE}/${movie.id}`} key={movie.id}>
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden">
            <Image
              src={movie.image}
              alt={movie.name}
              width={300}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {movie.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(movie.releaseDate).toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default LatestMovies;
