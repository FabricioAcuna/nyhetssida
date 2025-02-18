import Link from "next/link";
import { useSavedArticles } from "@/context/SavedArticlesContext";

export default function SavedArticlesPage() {
  const { savedArticles, removeArticle } = useSavedArticles();
  const defaultImg =
    "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg";

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">
        Saved articles
      </h1>

      {savedArticles.length === 0 ? (
        <p className="text-center text-xl text-gray-800">
          No saved articles yet
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {savedArticles.map((article) => (
            <div
              key={article.article_id}
              className="card bg-white shadow-xl p-4 border-y-2 border-red-500"
            >
              <Link
                href={`/newsArticles/${article.category}/${article.article_id}`}
              >
                <h2 className="text-2xl font-bold hover:underline text-black">
                  {article.title}
                </h2>
              </Link>
              <img
                src={article.image_url || defaultImg}
                alt={article.title}
                className="w-full h-40 object-cover mt-2"
              />
              <button
                className="btn btn-error mt-4 w-fit"
                onClick={() => removeArticle(article.article_id)}
              >
                Remove bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
