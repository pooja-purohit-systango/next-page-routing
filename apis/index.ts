export const getMovies = async () => {
  try {
//    const response = await fetch('https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/movies');
const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL as string);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No data returned from API");
    }

    return data;

  } catch (error) {
    console.error("Error occurred while fetching movies:", error);
    return []; // return fallback data or [] to avoid crashing the app
  
  }
};
