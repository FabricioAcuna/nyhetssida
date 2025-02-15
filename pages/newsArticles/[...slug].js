export async function getServerSideProps(context) {
  const { slug } = context.params;

  let articleID
  let url 

  if (slug.length === 1) {
    url = `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}`
    articleID = slug[0]
  } else {
    url = `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&category=${slug[0]}`
    articleID = slug[1] 
  }

  const response = await fetch(
    url
  );
  const data = await response.json();
  
  const article = data.results.find((item) => item.article_id === articleID) || null;

  return {
    props: {
      article,
    },
  };
}

export default function SSRArticle({ article }) {
  if (!article) {
    return <p className="text-center text-xl font-semibold mt-10">Ingen artikel</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl p-6">
        {article.image_url && (
          <figure>
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </figure>
        )}

        <div className="card-body">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p className="text-lg text-gray-700 mt-4">{article.description || "Fungerar ej"}</p>
          
          <div className="mt-6">
            <button
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              Tillbaka
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
