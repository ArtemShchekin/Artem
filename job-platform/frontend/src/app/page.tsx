'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import CityModal from '@/components/CityModal';
import { useAppStore } from '@/store/useAppStore';
import { citiesApi } from '@/lib/api';

export default function HomePage() {
  const { setCurrentCity, setPopularCities } = useAppStore();

  useEffect(() => {
    // Detect city by IP on mount
    const detectCity = async () => {
      try {
        const response = await citiesApi.detectByIp();
        if (response.data.data) {
          setCurrentCity(response.data.data);
        }
      } catch (error) {
        console.log('Could not detect city by IP');
      }
    };

    detectCity();
  }, [setCurrentCity]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CityModal />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Найдите работу своей мечты в Ираке
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Тысячи вакансий и кандидатов в одном месте
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/auth"
              className="px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Я ищу работу
            </a>
            <a
              href="/auth"
              className="px-8 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Я ищу сотрудников
            </a>
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Для соискателей
            </h3>
            <p className="text-gray-600">
              Создайте резюме, найдите подходящие вакансии и откликайтесь напрямую работодателям
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Для работодателей
            </h3>
            <p className="text-gray-600">
              Размещайте вакансии, ищите кандидатов и управляйте откликами в удобном интерфейсе
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Безопасность
            </h3>
            <p className="text-gray-600">
              Ваши контакты под защитой. Работодатели видят их только после разблокировки
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
