'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Calendar, FileText, RefreshCw, Clock } from 'lucide-react';

interface ScheduleSummaryProps {
  summary: string;
  title?: string;
  onUpdate?: () => void;
}

export default function ScheduleSummary({
  summary,
  title = 'Schedule Summary',
  onUpdate,
}: ScheduleSummaryProps) {
  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden ring-1 ring-gray-100/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-indigo-600" />
          <span>{title}</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          AI-generated overview of your upcoming events and tasks
        </p>
      </div>

      {/* Markdown Content */}
      <div className="p-6 lg:p-8 font-sans mx-auto max-w-none prose prose-indigo">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 flex items-center gap-3 border-b border-indigo-100 pb-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <span>{children}</span>
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>{children}</span>
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 text-[1.05rem] leading-relaxed mb-5">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                {children}
              </em>
            ),
            ul: ({ children }) => (
              <ul className="mt-6 mb-6 space-y-3 list-none">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-3 p-3 bg-indigo-50/40 rounded-xl hover:bg-indigo-50 transition-colors duration-200 border border-indigo-100">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                <span className="text-gray-700 leading-snug">{children}</span>
              </li>
            ),
            ol: ({ children }) => (
              <ol className="mt-6 mb-6 list-decimal list-inside space-y-2 text-gray-700">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-indigo-300 pl-6 italic text-gray-600 bg-indigo-50/50 p-4 rounded-r-xl my-6">
                {children}
              </blockquote>
            ),
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 px-6 py-5 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              SADASOL • Generated on {new Date().toISOString().split('T')[0]}
            </span>
          </div>

          {onUpdate && (
            <button
              onClick={onUpdate}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Summary</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
