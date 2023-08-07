import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [second, setSecond] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (second === 0) {
      navigate(-1);
    }
    const intervalId = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [second]);

  return (
    <section className="flex items-center p-16 dark:bg-gray-900 dark:text-gray-100 background-container h-[100vh]">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-[#D3B673] dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold text-white md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-10 text-white  dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="px-8 py-5 font-bold rounded bg-[#D3B673] text-white dark:bg-violet-400 dark:text-gray-900 hover:bg-white hover:text-[#D3B673] transition-all"
          >
            Go back after {second}s
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
