import React from 'react';
import LoginButton from '@/components/LoginButton';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Schedule AI</h1>
          <p className="text-lg text-gray-600">Effortlessly manage your meetings with intelligent scheduling.</p>
        </div>
        <LoginButton />
      </div>
    </div>
  );
}