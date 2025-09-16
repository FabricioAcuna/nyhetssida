import Link from "next/link";
import { useSavedArticles } from "@/context/SavedArticlesContext";

export default function SavedArticlesPage() {
  const { savedArticles, removeArticle } = useSavedArticles();
  const defaultImg =
    "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-10 sm:mb-12 lg:mb-16 tracking-tight">
          Saved Articles
        </h1>

        {savedArticles.length === 0 ? (
          <p className="text-center text-xl text-gray-400">
            You have no saved articles.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {savedArticles.map((article) => (
              <div
                key={article.article_id}
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                <Link
                  href={{
                    pathname: `/newsArticles/${article.article_id}`,
                    query: { article: JSON.stringify(article) },
                  }}
                  className="block hover:opacity-90 transition-opacity duration-200"
                >
                  <figure>
                    <img
                      src={article.image_url || defaultImg}
                      alt={article.title}
                      className="w-full h-56 object-cover"
                    />
                  </figure>
                  <div className="p-5 sm:p-6 lg:p-7">
                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">
                      {article.title}
                    </h2>
                  </div>
                </Link>
                <div className="p-5 sm:p-6 lg:p-7 pt-0 mt-auto">
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                    onClick={() => removeArticle(article.article_id)}
                  >
                    Remove Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
