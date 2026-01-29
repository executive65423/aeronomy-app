const NEWS_UPDATES = [
  {
    icon: '📰',
    text: 'Partnership Announcement: Yoki Green Energy commits 50,000 metric tons of SAF from 2027',
    link: '/newsletter'
  }
];

const NewsTicker = () => {
  return (
    <div className="relative py-2.5">
      {/* Static News Display - Centered */}
      <div className="flex items-center justify-center px-4">
        {NEWS_UPDATES.map((news, index) => (
          <a
            key={index}
            href={news.link}
            className="flex items-center gap-2.5 group"
          >
            <span className="text-base leading-none">{news.icon}</span>
            <span className="text-white/90 text-sm font-medium leading-none group-hover:text-sustainability transition-colors duration-200">
              {news.text}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
