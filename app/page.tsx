'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { ToolImage } from '@/components/tool-image';

interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  url: string;
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    icon: '/logos/ChatGPT_logo.svg',
    category: 'AI Chat',
    description: "The world's most famous conversational assistant. Ask questions and get precise answers",
    url: 'https://chat.openai.com'
  },
  {
    id: '2',
    name: 'Claude AI',
    icon: '/logos/Claude_logo.ico',
    category: 'AI Chat',
    description: 'An AI assistant with growing capabilities and impressive performance',
    url: 'https://claude.ai'
  },
  {
    id: '3',
    name: 'Gemini AI',
    icon: '/logos/Gemini_logo.webp',
    category: 'AI Chat',
    description: 'A powerful AI chat assistant from Google that rivals ChatGPT in performance',
    url: 'https://gemini.google.com'
  },
  {
    id: '4',
    name: 'Microsoft Copilot',
    icon: '/logos/MicrosoftCopilot_logo.png',
    category: 'AI Chat',
    description: 'A versatile assistant to help you every day. Get customized solutions and useful information at any time',
    url: 'https://copilot.microsoft.com'
  },
  {
    id: '5',
    name: 'Poe',
    icon: '/logos/Poe_logo.png',
    category: 'AI Chat',
    description: 'An AI powered by Quora that can answer any question you have',
    url: 'https://poe.com'
  },
  {
    id: '6',
    name: 'Midjourney',
    icon: '/logos/Midjourney_logo.png',
    category: 'AI Art',
    description: 'The most powerful AI art generation tool',
    url: 'https://www.midjourney.com'
  },
  {
    id: '7',
    name: 'Suno',
    icon: '/logos/StableDiffusion_logo.png',
    category: 'AI Music',
    description: 'The most powerful AI music creation tool',
    url: 'https://www.suno.ai'
  },
  {
    id: '8',
    name: 'Cursor',
    icon: '/logos/cursor_logo.jpeg',
    category: 'AI Code',
    description: 'An AI-first code editor that helps you code 10x faster with AI built in at every layer',
    url: 'https://cursor.sh'
  },
  {
    id: '9',
    name: 'GitHub Copilot',
    icon: '/logos/copilot.png',
    category: 'AI Code',
    description: 'Your AI pair programmer that helps you write code faster and with less work',
    url: 'https://github.com/features/copilot'
  },
  {
    id: '10',
    name: '通义千问',
    icon: '/logos/tongyi_logo.svg',
    category: 'AI Code',
    description: '阿里云推出的AI编程助手，提供代码补全、代码生成、代码解释等功能',
    url: 'https://tongyi.aliyun.com'
  },
  {
    id: '11',
    name: 'DeepSeek Coder',
    icon: '/logos/deepseek_logo.jpeg',
    category: 'AI Code',
    description: 'A powerful AI code assistant that helps you write better code with deep understanding of your codebase',
    url: 'https://www.deepseek.com'
  },
  {
    id: '12',
    name: 'Leonardo.ai',
    icon: '/logos/leonardo_logo.png',
    category: 'AI Art',
    description: 'AI-powered creative studio for generating and editing professional quality images',
    url: 'https://leonardo.ai'
  },
  {
    id: '13',
    name: 'Jasper',
    icon: '/logos/jasper_logo.png',
    category: 'AI Writing',
    description: 'AI writing assistant that helps create original content for blogs, social media, and marketing',
    url: 'https://www.jasper.ai'
  },
  {
    id: '14',
    name: 'Copy.ai',
    icon: '/logos/copyai_logo.png',
    category: 'AI Writing',
    description: 'AI-powered copywriting tool that generates high-converting marketing copy',
    url: 'https://www.copy.ai'
  },
  {
    id: '15',
    name: 'Grammarly',
    icon: '/logos/grammarly_logo.ico',
    category: 'AI Writing',
    description: 'AI writing assistant that helps improve grammar, clarity, and writing style',
    url: 'https://www.grammarly.com'
  },
  {
    id: '16',
    name: 'Runway',
    icon: '/logos/runway_logo.png',
    category: 'AI Video',
    description: 'AI-powered creative suite for editing and generating videos',
    url: 'https://runway.ml'
  },
  {
    id: '17',
    name: 'Synthesia',
    icon: '/logos/synthesia_logo.png',
    category: 'AI Video',
    description: 'AI video generation platform that turns text into professional-looking videos',
    url: 'https://www.synthesia.io'
  },
  {
    id: '18',
    name: 'Amazon CodeWhisperer',
    icon: '/logos/codewhisperer_logo.ico',
    category: 'AI Code',
    description: 'AI coding companion that provides code suggestions based on comments and existing code',
    url: 'https://aws.amazon.com/codewhisperer'
  },
  {
    id: '19',
    name: 'Tabnine',
    icon: '/logos/tabnine_logo.ico',
    category: 'AI Code',
    description: 'AI code completion tool that helps developers write code faster and with fewer errors',
    url: 'https://www.tabnine.com'
  },
  {
    id: '20',
    name: 'Replit',
    icon: '/logos/replit_logo.png',
    category: 'AI Code',
    description: 'Browser-based IDE with AI pair programming features to help you code better',
    url: 'https://replit.com'
  }
];

const categories = ['All', 'AI Chat', 'AI Code', 'AI Art', 'AI Writing', 'AI Music', 'AI Video'];

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
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const themeStyles = {
    light: {
      background: 'bg-gradient-to-br from-rose-50 via-sky-50 to-indigo-50',
      gridBg: 'opacity-[0.02]',
      container: 'bg-white/40 backdrop-blur-2xl',
      card: `group relative bg-white/60 rounded-3xl p-8
             hover:bg-white/80 backdrop-blur-xl
             shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]
             hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)]
             border border-white/60
             transition-all duration-300 ease-out`,
      cardGlow: 'from-transparent via-sky-400/5 to-transparent',
      iconContainer: `flex-shrink-0 w-16 h-16 rounded-2xl
                     bg-gradient-to-br from-white to-gray-50/80
                     shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                     flex items-center justify-center p-2.5
                     group-hover:scale-105 group-hover:shadow-lg
                     transition-all duration-300 ease-out`,
      title: 'text-gray-900 tracking-tight',
      subtitle: 'text-gray-500/90',
      searchBg: 'bg-white/90',
      searchText: 'text-gray-900 placeholder:text-gray-400/80',
      searchFocus: `ring-1 ring-gray-200
                   border-transparent
                   !shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.02)]`,
      searchContainer: `group
                       rounded-2xl
                       bg-gradient-to-r from-gray-50 via-white to-gray-50
                       p-[1px]
                       shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)]
                       hover:shadow-[0_4px_16px_rgba(0,0,0,0.09),inset_0_1px_2px_rgba(255,255,255,0.9)]
                       focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)]
                       focus-within:bg-gradient-to-r
                       focus-within:from-blue-50
                       focus-within:via-sky-50
                       focus-within:to-blue-50
                       transition-all duration-500`,
      searchIconWrapper: `absolute left-5 top-1/2 -translate-y-1/2
                         p-1 rounded-full
                         group-hover:bg-gray-100/80
                         group-focus-within:bg-blue-50
                         transition-all duration-300`,
      searchIcon: `h-5 w-5 text-gray-400/90
                  group-hover:text-gray-500
                  group-focus-within:text-blue-500
                  transition-colors duration-300`,
      buttonActive: `bg-blue-500/10 text-blue-600
                    hover:bg-blue-500/15 hover:text-blue-700`,
      buttonInactive: `text-gray-600 hover:text-gray-900
                      hover:bg-gray-100/80`,
      cardTitle: 'text-gray-900 group-hover:text-blue-600',
      cardBadge: `bg-blue-50/50 text-blue-600 border-none
                 font-medium text-xs px-3 py-1`,
      cardText: 'text-gray-500/90 leading-relaxed'
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
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.05] to-transparent" />

      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-sky-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-rose-100/20 rounded-full blur-3xl" />

      <div className={`relative min-h-screen ${themeStyles.container}`}>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative">
          <div className="absolute right-4 sm:right-6 top-4 sm:top-6 z-10">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          </div>

          <div className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-5">
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold ${themeStyles.title}
                           leading-tight`}>
              AI Tools Universe
            </h1>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto px-4 ${themeStyles.subtitle}`}>
              Discover and explore the most powerful AI tools
              <br className="hidden sm:block" />
              that are shaping our future
            </p>
          </div>

          <div className="relative mb-12 sm:mb-20 max-w-3xl mx-auto px-4 sm:px-0">
            <div className={themeStyles.searchContainer}>
              <div className="relative">
                <div className={themeStyles.searchIconWrapper}>
                  <Search className={themeStyles.searchIcon} />
                </div>
                <Input
                  placeholder="Search by name, description or category..."
                  className={`w-full h-12 sm:h-14 pl-14 pr-6 rounded-2xl text-base sm:text-lg
                             ${themeStyles.searchBg}
                             ${themeStyles.searchText}
                             border-0
                             transition-all duration-300 ease-out
                             focus:outline-none
                             focus:${themeStyles.searchFocus}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-20 px-4">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'ghost'}
                className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-sm font-medium
                           transition-all duration-300 ease-out
                           ${selectedCategory === category
                             ? themeStyles.buttonActive
                             : themeStyles.buttonInactive
                           }`}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {filteredTools.map(tool => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block group cursor-pointer ${themeStyles.card}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(tool.url, '_blank', 'noopener,noreferrer');
                }}
              >
                <div className={`absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r
                              ${themeStyles.cardGlow}
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`${themeStyles.iconContainer} w-14 h-14 sm:w-16 sm:h-16`}>
                    <ToolImage
                      src={tool.icon}
                      alt={`${tool.name} icon`}
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3
                                  transition-colors duration-300
                                  ${themeStyles.cardTitle}`}>
                      {tool.name}
                    </h3>
                    <Badge variant="secondary" className={`${themeStyles.cardBadge} text-xs`}>
                      {tool.category}
                    </Badge>
                    <p className={`mt-2 sm:mt-3 text-sm ${themeStyles.cardText} line-clamp-2`}>
                      {tool.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
