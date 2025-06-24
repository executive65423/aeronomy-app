import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, 
  FiCalendar, 
  FiTag, 
  FiExternalLink,
  FiArrowRight
} from 'react-icons/fi'

// News Article interface
interface NewsArticle {
  id: string;
  title: string;
  source: string;
  description: string;
  imageUrl: string;
  url: string;
  publishedAt: string;
  category: string;
  readTime: string;
}

// Format date to readable string
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Static news articles data
const staticNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "United Airlines Invests $100M in New SAF Production Facility",
    source: "Aviation Today",
    description: "United Airlines announced a significant investment in a new sustainable aviation fuel production facility, aiming to reduce its carbon footprint by 50% by 2035.",
    imageUrl: "/images/aviation.jpg",
    url: "https://example.com/united-saf-investment",
    publishedAt: "2023-09-15T09:00:00Z",
    category: "Industry News",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "EU Proposes Stricter SAF Blend Mandates for Airlines",
    source: "European Aviation Journal",
    description: "The European Union has proposed new regulations requiring airlines to use at least 5% sustainable aviation fuel blend by 2025, increasing to 20% by 2030.",
    imageUrl: "/images/hanger.jpg",
    url: "https://example.com/eu-saf-regulations",
    publishedAt: "2023-09-10T08:30:00Z",
    category: "Regulations",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "New Algae-Based SAF Shows Promise in Reducing Carbon Emissions",
    source: "Sustainable Energy Research",
    description: "Researchers have developed a new algae-based sustainable aviation fuel that shows a 70% reduction in lifecycle carbon emissions compared to conventional jet fuel.",
    imageUrl: "/images/data.jpg",
    url: "https://example.com/algae-saf-research",
    publishedAt: "2023-09-05T14:15:00Z",
    category: "SAF Technology",
    readTime: "8 min read"
  },
  {
    id: "4",
    title: "Global SAF Market Expected to Reach $15B by 2030",
    source: "Aviation Market Research",
    description: "A new market analysis report suggests that the global sustainable aviation fuel market will grow at a CAGR of 28% to reach $15 billion by 2030.",
    imageUrl: "/images/plane.jpg",
    url: "https://example.com/saf-market-growth",
    publishedAt: "2023-09-01T11:45:00Z",
    category: "Market Analysis",
    readTime: "6 min read"
  },
  {
    id: "5",
    title: "Airlines Alliance Forms Sustainable Fuel Purchasing Coalition",
    source: "Global Aviation News",
    description: "Major international airlines have formed a coalition to collectively purchase sustainable aviation fuel, aiming to accelerate production and reduce costs.",
    imageUrl: "/images/world.jpg",
    url: "https://example.com/airlines-saf-coalition",
    publishedAt: "2023-08-28T10:20:00Z",
    category: "Industry News",
    readTime: "4 min read"
  },
  {
    id: "6",
    title: "Carbon Capture Technology Being Integrated Into SAF Production",
    source: "Clean Tech Innovation",
    description: "New carbon capture technology is being integrated into sustainable aviation fuel production plants, potentially creating carbon-negative flight options.",
    imageUrl: "/images/solution.jpg",
    url: "https://example.com/carbon-capture-saf",
    publishedAt: "2023-08-22T13:10:00Z",
    category: "SAF Technology",
    readTime: "9 min read"
  },
  {
    id: "7",
    title: "IATA Publishes New Guidelines for SAF Sustainability Certification",
    source: "Aviation Standards Journal",
    description: "The International Air Transport Association has published new guidelines for sustainability certification of aviation fuels to ensure environmental benefits.",
    imageUrl: "/images/evening.jpg",
    url: "https://example.com/iata-saf-guidelines",
    publishedAt: "2023-08-18T09:30:00Z",
    category: "Regulations",
    readTime: "6 min read"
  },
  {
    id: "8",
    title: "UK Government Announces Tax Incentives for SAF Production",
    source: "British Aviation News",
    description: "The UK government has announced new tax incentives for companies investing in sustainable aviation fuel production facilities within the country.",
    imageUrl: "/images/bg.jpg",
    url: "https://example.com/uk-saf-incentives",
    publishedAt: "2023-08-15T15:45:00Z",
    category: "Sustainability",
    readTime: "5 min read"
  },
  {
    id: "9",
    title: "Waste-to-Fuel Technology Breakthrough for Sustainable Aviation",
    source: "Renewable Energy Today",
    description: "A technological breakthrough in converting municipal waste to sustainable aviation fuel could reduce production costs by up to 30%.",
    imageUrl: "/images/planeoutline.jpg",
    url: "https://example.com/waste-to-saf",
    publishedAt: "2023-08-10T12:00:00Z",
    category: "SAF Technology",
    readTime: "7 min read"
  }
];

const Resources = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Categories for filtering
  const categories = [
    'All',
    'SAF Technology',
    'Market Analysis',
    'Regulations',
    'Industry News',
    'Sustainability'
  ];

  // Load news articles
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setArticles(staticNewsArticles);
        setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || !selectedCategory || article.category === selectedCategory;
      const matchesSearch = searchQuery 
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-navy text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest News & Insights</h1>
            <p className="text-xl text-white/90">
              Stay updated with the latest developments in sustainable aviation fuels and industry trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96">
              <div className="relative">
              <input
                type="text"
                  placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sustainability"
                />
                <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    (selectedCategory === category) || (!selectedCategory && category === 'All')
                      ? 'bg-sustainability text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sustainability mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <div className="relative h-48">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to a default image if the image fails to load
                          (e.target as HTMLImageElement).src = '/images/aviation.jpg';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-sustainability text-white text-sm rounded-full">
                          {article.category}
                            </span>
                          </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {formatDate(article.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiTag className="w-4 h-4" />
                          {article.readTime}
                                </span>
                  </div>
                      <h3 className="text-xl font-semibold text-navy mb-2 line-clamp-2">
                        {article.title}
                              </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.source}</span>
                        <span className="text-sustainability flex items-center gap-1">
                          Read More <FiArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                    </div>
                  </a>
                </motion.article>
                    ))}
                  </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources; 