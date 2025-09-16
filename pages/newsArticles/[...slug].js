
import { useRouter } from "next/router";
import { useSavedArticles } from "@/context/SavedArticlesContext";
import { FiArrowLeft, FiBookmark } from 'react-icons/fi';

export default function ModernArticlePage() {
  const router = useRouter();
  const { article } = router.query;
  const { saveArticle, removeArticle, savedArticles } = useSavedArticles();
  const defaultImg =
    "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <p className="text-2xl font-semibold mb-6">Article not found</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg flex items-center"
          onClick={() => window.history.back()}
        >
          <FiArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }
  
  const parsedArticle = JSON.parse(article);
  const isSaved = savedArticles.some((a) => a.article_id === parsedArticle.article_id);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-20">
            {/* <div className="text-2xl font-bold tracking-wider">NewsWave</div> */}
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg flex items-center"
                onClick={() => window.history.back()}
            >
                <FiArrowLeft className="mr-2" />
                Back to News
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter">{parsedArticle.title}</h1>
            <p className="text-gray-400 text-lg">Published on: {new Date(parsedArticle.pubDate).toLocaleDateString()}</p>
          </div>

          {/* Article Image */}
          <figure className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={parsedArticle.image_url || defaultImg}
              alt={parsedArticle.title}
              className="w-full h-auto object-cover"
            />
          </figure>

          {/* Article Body */}
          <div className="prose prose-invert prose-lg max-w-none mx-auto leading-relaxed">
            <p>{parsedArticle.description}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
                className={`${isSaved ? 'bg-red-600/80 hover:bg-red-600' : 'bg-green-600/80 hover:bg-green-600'} text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center transform hover:-translate-y-1`}
                onClick={() =>
                    isSaved ? removeArticle(parsedArticle.article_id) : saveArticle(parsedArticle)
                }
            >
                <FiBookmark className="mr-3" />
                {isSaved ? "Remove Bookmark" : "Bookmark for Later"}
            </button>
        </div>
        </article>
      </main>

     
    
    </div>
  );
}
