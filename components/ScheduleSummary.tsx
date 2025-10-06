import React, { JSX } from 'react';

interface ScheduleSummaryProps {
  summary: string;
}

export default function ScheduleSummary({ summary }: ScheduleSummaryProps) {
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        const content = line.slice(2, -2);
        elements.push(
          <div key={index} className="flex items-center space-x-3 mb-4 pt-4 border-t border-gray-200">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 flex-1">{content}</h3>
          </div>
        );
      } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('*   ')) {
        const content = line.slice(1, -1);
        elements.push(
          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
            <p className="text-sm italic text-yellow-800">{content}</p>
          </div>
        );
      } else if (line.startsWith('*   ')) {
        const content = line.slice(4).trim();
        const timeMatch = content.match(/(\d{1,2}:\d{2} (AM|PM) - \d{1,2}:\d{2} (AM|PM)): (.*)/);
        if (timeMatch) {
          const [, time, ampm1, ampm2, event] = timeMatch;
          elements.push(
            <div key={index} className="ml-12 mb-2 flex items-center space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{event}</p>
                <p className="text-xs text-gray-500">{time} {ampm1 === ampm2 ? ampm1 : `${ampm1} - ${ampm2}`}</p>
              </div>
            </div>
          );
        } else {
          elements.push(
            <div key={index} className="ml-12 mb-2">
              <span className="text-sm text-gray-700">• {content}</span>
            </div>
          );
        }
      } else {
        elements.push(
          <p key={index} className="text-base text-gray-700 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-200">
      <div className="p-8">
        <div className="prose prose-slate max-w-none space-y-0">
          {parseMarkdown(summary)}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}