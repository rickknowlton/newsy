import { useState, useEffect } from "react";
import axios from "axios";

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
        const params = {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          pageSize: 12,
          page,
          q: searchQuery,
        };

        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params,
        });

        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
        setHasMore(response.data.articles.length > 0);
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
