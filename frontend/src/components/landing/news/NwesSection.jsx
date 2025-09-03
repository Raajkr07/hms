import React, { useEffect, useState, useRef } from 'react';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/everything?qInTitle=medicine+OR+donation+OR+healthcare&language=en&sortBy=publishedAt&pageSize=8&apiKey=${NEWS_API_KEY}`;

export default function NewsSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const underlineRefs = useRef([]);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        setError(err.message || 'Unexpected error');
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    if (!articles.length) return;
    const observers = [];

    underlineRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('underline-animated');
          } else {
            el.classList.remove('underline-animated');
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [articles]);

  if (loading) return <p className="text-center text-gray-500">Loading news...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="mb-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary-600">Latest News & Updates</h2>
      {articles.length === 0 && <p>No news found for your query.</p>}
      {articles.slice(0, 4).map((article, index) => (
        <article
          key={index}
          className="bg-white dark:bg-black rounded-lg p-6 mb-8 shadow hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <div
            ref={(el) => (underlineRefs.current[index] = el)}
            className="relative underline-wrapper mb-4"
          >
            <p className="text-gray-700 dark:text-gray-300">{article.description || 'No description available.'}</p>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            Read more
          </a>
        </article>
      ))}

      <style>{`
        .underline-wrapper {
          position: relative;
          padding-bottom: 4px;
        }
        .underline-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background-color: #14B8A6;
          border-radius: 2px;
          transform: translateX(-50%);
          transition: width 1.2s ease;
        }
        .underline-wrapper.underline-animated::after {
          width: 100%;
          animation: expandUnderline 1.2s forwards;
        }
        @keyframes expandUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}