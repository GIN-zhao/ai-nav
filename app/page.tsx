'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { ToolImage } from '@/components/tool-image';
import { Tool, tools, categories } from '@/config/tools';

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 预加载所有工具图标
    tools.forEach(tool => {
      const img = new Image();
      img.src = tool.icon;
    });
  }, []);

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === '全部' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const themeStyles = {
    light: {
      background: 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5',
      container: 'bg-white/80 backdrop-blur-xl',
      card: `group relative overflow-hidden bg-white rounded-2xl p-6
             hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50
             shadow-[0_4px_12px_rgba(0,0,0,0.03)]
             hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
             border border-[#f5f5f5]
             transition-all duration-300 ease-out
             cursor-pointer`,
      iconContainer: `relative flex-shrink-0 w-14 h-14 rounded-2xl
                     bg-gradient-to-br from-blue-50 to-purple-50
                     flex items-center justify-center
                     before:absolute before:inset-0
                     before:rounded-2xl before:p-[1px]
                     before:bg-gradient-to-r before:from-blue-200/40 before:to-purple-200/40
                     group-hover:scale-105 group-hover:shadow-xl
                     transition-all duration-300 ease-out`,
      searchContainer: `group
                       rounded-full
                       bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                       p-[1px]
                       shadow-[0_20px_40px_rgba(37,99,235,0.2)]
                       hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)]
                       transition-all duration-500`,
      searchInput: `h-14 pl-14 pr-6 rounded-full
                    bg-white
                    text-gray-900 placeholder:text-gray-400
                    border-0 ring-0
                    focus:ring-2 focus:ring-blue-200
                    transition-all duration-300`,
      categoryButton: `rounded-full px-6 py-2.5 text-sm font-medium
                      transition-all duration-300
                      hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                      hover:text-white hover:shadow-lg`,
      categoryButtonActive: `bg-gradient-to-r from-blue-500 to-purple-500 text-white
                           shadow-[0_8px_16px_rgba(37,99,235,0.3)]`,
      title: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600',
      subtitle: 'text-gray-500',
      badge: `inline-flex items-center h-6 px-3 text-xs font-medium
              bg-gradient-to-r from-blue-50 to-purple-50
              text-blue-600/90 rounded-full
              border border-blue-100/20
              transition-colors duration-300
              group-hover:border-blue-200/30`,
      toolName: `text-lg font-semibold mb-2.5
                 text-gray-800
                 group-hover:text-blue-600
                 transition-colors duration-300`,
      toolDesc: `text-[13px] leading-relaxed text-gray-500/90
                 group-hover:text-gray-600/90
                 transition-colors duration-300`,
      iconImage: `w-7 h-7 opacity-90
                  group-hover:opacity-100
                  transition-opacity duration-300`,
    },
    dark: {
      background: 'bg-black',
      gridBg: 'opacity-[0.03]',
      container: 'bg-black/80 backdrop-blur-2xl',
      card: `group relative bg-[#141414] rounded-3xl p-8
             hover:bg-[#1a1a1a] backdrop-blur-xl
             shadow-[0_1px_2px_rgba(255,255,255,0.02),0_4px_12px_rgba(0,0,0,0.1)]
             hover:shadow-[0_2px_4px_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.2)]
             border border-white/[0.05]
             transition-all duration-300 ease-out`,
      cardGlow: 'from-transparent via-indigo-500/10 to-transparent',
      iconContainer: `flex-shrink-0 w-16 h-16 rounded-2xl
                     bg-gradient-to-br from-gray-800 to-gray-900
                     shadow-[0_2px_8px_rgba(0,0,0,0.2)]
                     flex items-center justify-center p-2.5
                     group-hover:scale-105 group-hover:shadow-lg
                     transition-all duration-300 ease-out`,
      title: 'text-white tracking-tight',
      subtitle: 'text-gray-400/90',
      searchBg: 'bg-[#141414]/90',
      searchText: 'text-white placeholder:text-gray-500/80',
      searchFocus: `ring-1 ring-gray-800
                   border-transparent
                   !shadow-[0_2px_8px_rgba(0,0,0,0.24),0_1px_2px_rgba(0,0,0,0.12)]`,
      searchContainer: `group
                       rounded-2xl
                       bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800
                       p-[1px]
                       shadow-[0_2px_8px_rgba(0,0,0,0.24),inset_0_1px_2px_rgba(255,255,255,0.03)]
                       hover:shadow-[0_4px_16px_rgba(0,0,0,0.32),inset_0_1px_2px_rgba(255,255,255,0.03)]
                       focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.40),inset_0_1px_2px_rgba(255,255,255,0.03)]
                       focus-within:bg-gradient-to-r
                       focus-within:from-indigo-900/30
                       focus-within:via-gray-900
                       focus-within:to-indigo-900/30
                       transition-all duration-500`,
      searchIconWrapper: `absolute left-5 top-1/2 -translate-y-1/2
                         p-1 rounded-full
                         group-hover:bg-gray-800
                         group-focus-within:bg-indigo-900/50
                         transition-all duration-300`,
      searchIcon: `h-5 w-5 text-gray-500
                  group-hover:text-gray-400
                  group-focus-within:text-indigo-400
                  transition-colors duration-300`,
      buttonActive: `bg-indigo-500/10 text-indigo-400
                    hover:bg-indigo-500/15 hover:text-indigo-300`,
      buttonInactive: `text-gray-400 hover:text-white
                      hover:bg-white/[0.06]`,
      cardTitle: 'text-white group-hover:text-indigo-400',
      cardBadge: `bg-indigo-500/10 text-indigo-400 border-none
                 font-medium text-xs px-3 py-1`,
      cardText: 'text-gray-400/90 leading-relaxed'
    }
  }[theme];

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

      <div className={`relative min-h-screen ${themeStyles.container}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-4
                           bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                           bg-clip-text text-transparent
                           animate-gradient-x`}>
              AI工具宇宙
            </h1>
            <p className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto
                          bg-gradient-to-r from-blue-600 to-purple-600
                          bg-clip-text text-transparent`}>
              发现和探索最强大的AI工具
              <br />
              塑造我们的未来
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className={themeStyles.searchContainer}>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                <Input
                  placeholder="搜索工具名称、描述或分类..."
                  className={themeStyles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant="ghost"
                className={`${themeStyles.categoryButton}
                           ${selectedCategory === category ? themeStyles.categoryButtonActive : ''}`}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={themeStyles.card}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className={themeStyles.toolName}>
                      {tool.name}
                    </h3>
                    <Badge className={themeStyles.badge}>
                      {tool.category}
                    </Badge>
                  </div>
                  <p className={themeStyles.toolDesc}>
                    {tool.description}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-200/10 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
