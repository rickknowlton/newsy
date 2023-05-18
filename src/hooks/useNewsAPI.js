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
        const response = await axios.get(
          `/api/news`,
          {
            params: { country, page, query: searchQuery },
          }
        );

        const data = response.data;

        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setHasMore(data.articles.length > 0);
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
