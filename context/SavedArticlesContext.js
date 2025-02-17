import { createContext, useContext, useState, useEffect } from "react";

const SavedArticlesContext = createContext();

export const SavedArticlesProvider = ({ children }) => {
    const [savedArticles, setSavedArticles] = useState([]);


    useEffect(() => {
        const storedArticles = localStorage.getItem("savedArticles");
        if (storedArticles) {
            setSavedArticles(JSON.parse(storedArticles));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    }, [savedArticles]);

    const saveArticle = (article) => {
        if (!savedArticles.some((a) => a.article_id === article.article_id)) {
            const updatedArticles = [...savedArticles, article];
            setSavedArticles(updatedArticles);
        }
    };

    const removeArticle = (articleId) => {
        const updatedArticles = savedArticles.filter((a) => a.article_id !== articleId);
        setSavedArticles(updatedArticles);
    };

    return (
        <SavedArticlesContext.Provider value={{ savedArticles, saveArticle, removeArticle }}>
            {children}
        </SavedArticlesContext.Provider>
    );
};

export const useSavedArticles = () => {
    return useContext(SavedArticlesContext);
};

