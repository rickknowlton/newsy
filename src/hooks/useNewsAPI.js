import { useState, useEffect } from "react";

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
        const response = await fetch(
          `/api/news?country=${country}&query=${encodeURIComponent(
            searchQuery
          )}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch news articles. Please try again later."
          );
        }
        
        const data = await response.json();

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
