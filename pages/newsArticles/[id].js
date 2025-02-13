// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   const response = await fetch(
//     `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&category=sports,top&id=${id}`
//   );
//   const data = await response.json();

//   return {
//     props: {
//       article,
//     },
//   };
// }

// export default function SSRArticle({ article }) {
//   return (
//     <div>
//       <h1>{article.title}</h1>
//       <img src={article.image_url} />
//       <p>{article.description}</p>
//     </div>
//   );
// }
export async function getServerSideProps(context) {
  // Fetch the latest news in sports and top categories
  const response = await fetch(
    `https://newsdata.io/api/1/latest?apikey=pub_693775b850da01d9f5c745004ebd3ecdba63b&category=sports,top`
  );
  const data = await response.json();

  // Extract the first article, or you could modify it to fetch more or specific articles
  const article = data.results ? data.results[0] : null;

  return {
    props: {
      article,
    },
  };
}

export default function SSRArticle({ article }) {
  if (!article) {
    return <p>Loading or no articles found.</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <img
        src={article.image_url}
        alt={article.title}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>{article.description}</p>
    </div>
  );
}
