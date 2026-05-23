'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { MapPin, LogOut, User as UserIcon } from 'lucide-react';

export default function Header() {
  const { user, role, currentCity, logout, openCityModal } = useAppStore();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              JobPlatform
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <Link
              href={role === 'employer' ? '/employer/search' : '/public/search'}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Поиск
            </Link>

            {/* City button */}
            <button
              onClick={openCityModal}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MapPin className="w-4 h-4 mr-1" />
              {currentCity?.name || 'Определить город'}
            </button>

            {/* Auth button or User menu */}
            {!user ? (
              <Link
                href="/auth"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Войти
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href={role === 'candidate' ? '/candidate/dashboard' : '/employer/dashboard'}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-1" />
                  {role === 'candidate' ? 'Кандидат' : 'Работодатель'}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
