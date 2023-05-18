import { useState, useEffect } from "react";
import fetch from "node-fetch";

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
        const data = await response.json();

        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setHasMore(data.articles.length > 0);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch news articles. Please try again later.");
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
