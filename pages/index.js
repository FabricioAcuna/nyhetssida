
import Link from "next/link";
import { FiExternalLink } from 'react-icons/fi';

export async function getServerSideProps() {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&language=en`
    );

    if (!response.ok) {
      console.error(`API call failed with status: ${response.status}`);
      if (response.status === 429) {
        return { props: { news: [], error: "Too many requests. Please try again later." } };
      }
      return { props: { news: [], error: "Failed to fetch news." } };
    }

    const data = await response.json();

    if (data.status === 'error' || !Array.isArray(data.results)) {
        console.error('API returned an error or unexpected data structure:', data);
        return { props: { news: [], error: "Failed to parse news data." } };
    }

    const filteredNews =
      data.results.filter(
        (article) => article.description && article.description.trim() !== ""
      );

    return {
      props: { news: filteredNews, error: null },
    };
  } catch (error) {
    console.error('An error occurred during fetch:', error);
    return { props: { news: [], error: "An error occurred while fetching news." } };
  }
}

const getTeaser = (text, wordLimit = 30) => {
  if (!text) return "";
  const words = text.split(/\s+/).filter(Boolean);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

export default function ModernNewsPage({ news, error }) {
  const defaultImg =
    "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
  const featuredArticle = news.length > 0 ? news[0] : null;
  const otherArticles = news.length > 1 ? news.slice(1) : [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-2xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-12 md:mb-20 tracking-tighter">
          Latest News
        </h1>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12 md:mb-20 group">
            <Link href={{ pathname: `/newsArticles/${featuredArticle.article_id}`, query: { article: JSON.stringify(featuredArticle) } }} className="block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={featuredArticle.image_url || defaultImg}
                    alt={featuredArticle.title}
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300 tracking-tight">{featuredArticle.title}</h2>
                  <p className="text-lg text-white mb-6 leading-relaxed">{getTeaser(featuredArticle.description, 40)}</p>
                  <span className="inline-flex items-center text-blue-500 font-semibold group-hover:text-blue-300 transition-colors duration-300">
                    Read More
                    <FiExternalLink className="ml-2" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {otherArticles.map((newItem) => (
            <div
              key={newItem.article_id}
              className="rounded-2xl shadow-lg overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-800"
            >
              <Link href={{ pathname: `/newsArticles/${newItem.article_id}`, query: { article: JSON.stringify(newItem) } }} className="block">
                <figure className="overflow-hidden">
                  <img
                    src={newItem.image_url || defaultImg}
                    alt={newItem.title}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </figure>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">{newItem.title}</h2>
                  <p className="text-sm text-gray-400 mb-4 group-hover:text-white transition-colors duration-300">{getTeaser(newItem.description)}</p>
                  <span className="text-blue-500 text-sm font-semibold group-hover:text-blue-300 transition-colors duration-300">Read More</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
