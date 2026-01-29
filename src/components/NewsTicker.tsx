import { motion } from 'framer-motion';

const NEWS_UPDATES = [
  {
    icon: '📰',
    text: 'Partnership Announcement: Yoki Green Energy commits 50,000 metric tons of SAF from 2027',
    link: '/newsletter'
  }
];

const NewsTicker = () => {
  // Calculate total width needed for smooth loop
  const newsItemWidth = 600; // Approximate width per news item
  const totalWidth = NEWS_UPDATES.length * newsItemWidth;

  return (
    <div className="relative overflow-hidden py-2.5">
      {/* Scrolling News Container - Full Width */}
      <div className="overflow-hidden">
        <motion.div
          className="flex items-center gap-16"
          animate={{
            x: [0, -totalWidth]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {/* Render news items multiple times for seamless infinite loop */}
          {[...NEWS_UPDATES, ...NEWS_UPDATES, ...NEWS_UPDATES, ...NEWS_UPDATES, ...NEWS_UPDATES].map((news, index) => (
            <a
              key={index}
              href={news.link}
              className="flex items-center gap-2.5 whitespace-nowrap group flex-shrink-0"
            >
              <span className="text-base leading-none">{news.icon}</span>
              <span className="text-white/90 text-sm font-medium leading-none group-hover:text-sustainability transition-colors duration-200">
                {news.text}
              </span>
              <span className="text-white/15 mx-4 leading-none">•</span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsTicker;
