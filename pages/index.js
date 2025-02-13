// import Link from "next/link";

// export async function getServerSideProps() {
//   const result = await fetch(
//     `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&category=sports,top`
//   );
//   const data = await result.json();

//   return {
//     props: { news: data.results },
//   };
// }

// export default function Home({ news }) {
//   return (
//     <div>
//       {news.map((article) => {
//         return (
//           <div>
//             <h2>
//               <Link href={`/newsArticles/${article.article_id}`}>
//                 {article.title}
//               </Link>
//             </h2>
//             <img src={article.image_url} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import Link from "next/link";

export async function getServerSideProps() {
  // Hämta data här
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&category=sports,top`
  );
  const data = await response.json();

  return {
    props: { news: data.results },
  };
}

export default function SSRNews({ news }) {
  return (
    <div>
      {news.map((newItem) => (
        <div>
          <Link href={`/newsArticles/${newItem.article_id}`}>
            {newItem.title}
          </Link>
          <img src={newItem.image_url} />
        </div>
      ))}
    </div>
  );
}
