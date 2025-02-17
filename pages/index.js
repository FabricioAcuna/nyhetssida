import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.DIN_API_KEY}&language=en`
  );
  const data = await response.json();

  const filteredNews =
    data.results?.filter(
      (article) => article.description && article.description.trim() !== ""
    ) || [];

  return {
    props: { news: filteredNews },
  };
}

const getTeaser = (text, wordLimit = 20) => {
  const words = text.split(/\s+/).filter(Boolean);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

// export default function SSRNews({ news }) {
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Senaste Nyheter</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {news.map((newItem) => (
//           <div key={newItem.article_id} className="card bg-base-100 shadow-xl">
//             {newItem.image_url && (
//               <figure>
//                 <img
//                   src={newItem.image_url}
//                   alt={newItem.title}
//                   className="w-full h-52 object-cover"
//                 />
//               </figure>
//             )}
//             <div className="card-body">
//               <h2 className="card-title">{newItem.title}</h2>
//               <p className="text-sm text-gray-600">
//                 {newItem.description || "Ingen beskrivning tillgänglig."}
//               </p>
//               <div className="card-actions justify-end">
//                 <Link
//                   href={`/newsArticles/${newItem.category}/${newItem.article_id}`}
//                   className="btn btn-primary"
//                 >
//                   Läs mer
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function SSRNews({ news }) {
  const defaultImg =
    "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg";
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-black">
          Senaste Nyheter
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 p-20">
          {news.map((newItem) => (
            <div
              key={newItem.article_id}
              className="card bg-white shadow-xl border-t-2 border-red-500 flex flex-col  transform transition-transform duration-300 hover:scale-105"
            >
              <Link
                href={`/newsArticles/${newItem.category}/${newItem.article_id}`}
                className="flex-grow"
              >
                <div className="card-body">
                  <h2 className="card-title text-black text-3xl font-bold underline">
                    {newItem.title}
                  </h2>
                  <p className="text-sm text-gray-700">
                    {getTeaser(newItem.description)}
                  </p>
                </div>
              </Link>
              <figure className="mt-auto">
                <img
                  src={newItem.image_url || defaultImg}
                  alt={newItem.title}
                  className="w-full h-52 object-cover"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
