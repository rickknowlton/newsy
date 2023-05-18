import { useState, useEffect } from "react";
import axios from "axios";

const useNewsAPI = (initialCountry) => {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState(initialCountry);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setCountryWithReset = (country) => {
    setCountry(country);
    setArticles([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const params = {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          pageSize: 15,
          page,
          country,
          q: searchQuery,
        };

        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines`,
          {
            params,
          }
        );

        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
        setHasMore(response.data.articles.length > 0);
        setIsLoading(false);
        setSearchQuery("");
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch news articles. Please try again later.");
      }
    };

    fetchNews();
  }, [country, page, searchQuery]);

  return {
    articles,
    country,
    setCountry: setCountryWithReset,
    hasMore,
    isLoading,
    error,
    setArticles,
    setPage,
    setSearchQuery,
  };
};

export default useNewsAPI;
