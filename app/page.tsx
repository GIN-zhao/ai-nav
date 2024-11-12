'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    icon: '/logos/ChatGPT_logo.svg',
    category: 'AI Chat',
    description: "The world's most famous conversational assistant. Ask questions and get precise answers",
  },
  {
    id: '2',
    name: 'Claude AI',
    icon: '/logos/Claude_logo.ico',
    category: 'AI Chat',
    description: 'An AI assistant with growing capabilities and impressive performance',
  },
  {
    id: '3',
    name: 'Gemini AI',
    icon: '/logos/Gemini_logo.webp',
    category: 'AI Chat',
    description: 'A powerful AI chat assistant from Google that rivals ChatGPT in performance',
  },
  {
    id: '4',
    name: 'Microsoft Copilot',
    icon: '/logos/MicrosoftCopilot_logo.png',
    category: 'AI Chat',
    description:
      'A versatile assistant to help you every day. Get customized solutions and useful information at any time',
  },
  {
    id: '5',
    name: 'Poe',
    icon: '/logos/Poe_logo.png',
    category: 'AI Chat',
    description: 'An AI powered by Quora that can answer any question you have',
  },
  {
    id: '6',
    name: 'Midjourney',
    icon: '/logos/Midjourney_logo.png',
    category: 'AI Art',
    description: 'The most powerful AI art generation tool',
  },
  {
    id: '7',
    name: 'Suno',
    icon: '/logos/StableDiffusion_logo.png',
    category: 'AI Music',
    description: 'The most powerful AI music creation tool',
  },
  {
    id: '8',
    name: 'Cursor',
    icon: '/logos/cursor_logo.jpeg',
    category: 'AI Code',
    description: 'An AI-first code editor that helps you code 10x faster with AI built in at every layer',
  },
  {
    id: '9',
    name: 'GitHub Copilot',
    icon: '/logos/copilot.png',
    category: 'AI Code',
    description: 'Your AI pair programmer that helps you write code faster and with less work',
  },
  {
    id: '10',
    name: '通义千问',
    icon: '/logos/tongyi_logo.svg',
    category: 'AI Code',
    description: '阿里云推出的AI编程助手，提供代码补全、代码生成、代码解释等功能',
  },
  {
    id: '11',
    name: 'DeepSeek Coder',
    icon: '/logos/deepseek_logo.jpeg',
    category: 'AI Code',
    description:
      'A powerful AI code assistant that helps you write better code with deep understanding of your codebase',
  },
];

const categories = ['All', 'AI Chat', 'AI Code', 'AI Art', 'AI Writing', 'AI Music', 'AI Video'];

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Professional AI Tools Navigation</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, description or category..."
            className="w-full h-12 pl-12 pr-4 rounded-full bg-white/90 border-0"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'secondary' : 'ghost'}
              className={`rounded-full ${
                selectedCategory === category ? 'bg-white text-purple-600' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setSelectedCategory(category)}>
              {category}
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="group bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                  <img
                    src={tool.icon}
                    alt={`${tool.name} icon`}
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                  <Badge variant="secondary" className="mt-1 font-normal bg-gray-100 text-gray-600 hover:bg-gray-200">
                    {tool.category}
                  </Badge>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{tool.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
