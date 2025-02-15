import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&category=politics`
  );
  const data = await response.json();

  return {
    props: { news: data.results || [] },
  };
}

export default function SSRNewsCategory1({ news }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Senaste Politiknyheter
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((newItem) => (
          <div key={newItem.article_id} className="card bg-base-100 shadow-xl">
            {newItem.image_url && (
              <figure>
                <img
                  src={newItem.image_url}
                  alt={newItem.title}
                  className="w-full h-52 object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{newItem.title}</h2>
              <p className="text-sm text-gray-600">
                {newItem.description || "Ingen beskrivning tillgänglig."}
              </p>
              <div className="card-actions justify-end">
                <Link
                  href={`/newsArticles/${newItem.article_id}`}
                  className="btn btn-primary"
                >
                  Läs mer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
