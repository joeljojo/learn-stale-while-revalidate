const Article = ({ article }) => {
  return (
    <div className=" border border-gray-300 p-5 mb-5 flex-1">
      <h2 className=" text-2xl mb-3">{article.title}</h2>
      <p className=" text-base mb-3">{article.description}</p>
      <p className=" text-xs text-gray-600">Auther: {article.author}</p>
      <p className="text-xs text-gray-600 mb-3">
        Published At: {new Date(article.publishedAt).toLocaleString()}
      </p>
      <img
        className=" max-w-full h-auto mb-3"
        src={article.urlToImage}
        alt={article.title}
      />
      <a
        className=" inline-block px-4 py-2 bg-blue-500 rounded text-white no-underline"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read More
      </a>
    </div>
  );
};
export default Article;
