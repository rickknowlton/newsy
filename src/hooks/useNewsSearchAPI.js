import { useState, useEffect } from "react";

const useNewsSearchAPI = (initialQuery = "") => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("relevancy");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [searchQuery, sortBy]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/news-search?query=${encodeURIComponent(
            searchQuery
          )}&sortBy=${sortBy}&page=${page}`
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

    if (searchQuery && searchQuery !== "") {
      fetchNews();
    }
  }, [searchQuery, sortBy, page]);

  return {
    articles,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    hasMore,
    isLoading,
    error,
    setPage,
  };
};

export default useNewsSearchAPI;
