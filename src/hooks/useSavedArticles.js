import { useState, useEffect } from "react";

const useSavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedArticlesInLocalStorage = localStorage.getItem("savedArticles");
      if (savedArticlesInLocalStorage) {
        setSavedArticles(JSON.parse(savedArticlesInLocalStorage));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    }
  }, [savedArticles]);

  const saveArticle = (article) => {
    setSavedArticles((prevSavedArticles) => {
      console.log('Saving article:', article);
      const updatedArticles = [...prevSavedArticles, article];
      console.log('Updated saved articles:', updatedArticles);
      return updatedArticles;
    });
  };
  
  const unsaveArticle = (articleUrl) => {
    setSavedArticles((prevSavedArticles) => {
      console.log('Unsaving article URL:', articleUrl);
      const updatedArticles = prevSavedArticles.filter((article) => article.url !== articleUrl);
      console.log('Updated saved articles:', updatedArticles);
      return updatedArticles;
    });
  };  

  const isArticleSaved = (articleUrl) => {
    return savedArticles.some(article => article.url === articleUrl);
  };

  return { savedArticles, saveArticle, unsaveArticle, isArticleSaved };
};

export default useSavedArticles;
