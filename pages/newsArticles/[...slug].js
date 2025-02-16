export async function getServerSideProps(context) {
  const { slug } = context.params;
  const category = slug[0];
  const articleID = slug[1];

  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&category=${category}`
  );
  const data = await response.json();

  const article =
    data.results.find((item) => item.article_id === articleID) || null;

  return {
    props: {
      article,
    },
  };
}

export default function SSRArticle({ article }) {
  const defaultImg =
    "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg";
  if (!article) {
    return (
      <p className="text-center text-xl font-semibold mt-10">Ingen artikel</p>
    );
  }

  return (
    <div className="container bg-gray-100 mx-auto p-6">
      <div className="card bg-base-100 shadow-xl p-6">
        {article.image_url && (
          <figure>
            <img
              src={article.image_url || defaultImg}
              alt={article.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </figure>
        )}
        <div className="card-body">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p className="text-lg text-gray-700 mt-4">
            {article.description || "Fungerar ej"}
          </p>

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
