import { useState, useEffect } from "react";

const useNewsSearchAPI = (initialQuery = "") => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/news-search?query=${encodeURIComponent(
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
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    if (searchQuery !== "") {
      fetchNews();
    }
  }, [searchQuery, page]);

  return {
    articles,
    searchQuery,
    setSearchQuery,
    hasMore,
    isLoading,
    error,
    setPage,
  };
};

export default useNewsSearchAPI;