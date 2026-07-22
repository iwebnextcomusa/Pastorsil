import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/blog';
import { BlogArticle } from '../types';
import { BookOpen, Calendar, Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const categories = ['All', 'Buying Tips', 'Selling Tips', 'Market Trends', 'Investment'];

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-16 space-y-12">
      {activeArticle ? (
        /* Full Article Reader View */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to All Articles</span>
          </button>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              {activeArticle.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-white">
              {activeArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-slate-800 py-3">
              <div className="flex items-center gap-2">
                <img src={activeArticle.author.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-white font-medium">{activeArticle.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeArticle.publishedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeArticle.readTime}</span>
              </div>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <img src={activeArticle.coverImage} alt={activeArticle.title} className="w-full h-full object-cover" />
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl text-slate-200 text-sm leading-relaxed space-y-4 whitespace-pre-line border border-slate-800">
            {activeArticle.content}
          </div>
        </div>
      ) : (
        /* Blog List */
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Cincinnati Real Estate Market Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
              Market Intelligence & <span className="text-gold-gradient">Expert Tips</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
              Stay ahead of market trends, interest rates, valuation strategies, and neighborhood guides curated by Broker Pastor Sil.
            </p>

            {/* Category Filter Chips */}
            <div className="flex justify-center gap-2 flex-wrap pt-4">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === c
                      ? 'bg-gold-gradient text-slate-950 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/85 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-white font-serif-display font-bold text-lg group-hover:text-amber-300 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>Read Full Article</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
