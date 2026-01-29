import { useState, useEffect } from 'react';

const NEWS_UPDATES = [
  {
    icon: '📰',
    text: 'Partnership Announcement: Yoki Green Energy commits 50,000 metric tons of SAF from 2027',
    link: '/newsletter'
  }
];

const NewsTicker = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [highlightCount, setHighlightCount] = useState(0);
  const maxHighlights = 5; // Number of times to highlight

  useEffect(() => {
    if (highlightCount >= maxHighlights) return;

    const interval = setInterval(() => {
      setIsHighlighted(true);
      
      // Turn off highlight after 1 second
      setTimeout(() => {
        setIsHighlighted(false);
        setHighlightCount(prev => prev + 1);
      }, 1000);
    }, 5000);

    // Initial highlight on mount
    setIsHighlighted(true);
    setTimeout(() => {
      setIsHighlighted(false);
      setHighlightCount(1);
    }, 1000);

    return () => clearInterval(interval);
  }, [highlightCount]);

  return (
    <div className="flex items-center justify-center py-2 px-4">
      {NEWS_UPDATES.map((news, index) => (
        <a
          key={index}
          href={news.link}
          className="flex items-center gap-2.5 group"
        >
          <span className="text-base leading-none">
            {news.icon}
          </span>
          <span 
            className={`text-sm font-medium leading-none transition-colors duration-500 ease-in-out ${
              isHighlighted ? 'text-sustainability' : 'text-white/90 group-hover:text-sustainability'
            }`}
          >
            {news.text}
          </span>
        </a>
      ))}
    </div>
  );
};

export default NewsTicker;
