'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppStore } from '@/store/useAppStore';
import { citiesApi } from '@/lib/api';
import { X, Search } from 'lucide-react';
import { City } from '@/types';

export default function CityModal() {
  const { isCityModalOpen, closeCityModal, setCurrentCity, setPopularCities, popularCities } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isCityModalOpen && popularCities.length === 0) {
      loadPopularCities();
    }
  }, [isCityModalOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = popularCities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(popularCities);
    }
  }, [searchQuery, popularCities]);

  const loadPopularCities = async () => {
    setIsLoading(true);
    try {
      const response = await citiesApi.getPopular('IQ');
      setPopularCities(response.data.data || []);
    } catch (error) {
      console.error('Failed to load cities:', error);
      // Mock data for demo
      const mockCities: City[] = [
        { id: '1', name: 'Багдад', country: 'Ирак', isPopular: true },
        { id: '2', name: 'Басра', country: 'Ирак', isPopular: true },
        { id: '3', name: 'Мосул', country: 'Ирак', isPopular: true },
        { id: '4', name: 'Эрбиль', country: 'Ирак', isPopular: true },
        { id: '5', name: 'Наджаф', country: 'Ирак', isPopular: true },
        { id: '6', name: 'Кербела', country: 'Ирак', isPopular: true },
        { id: '7', name: 'Киркук', country: 'Ирак', isPopular: true },
        { id: '8', name: 'Сулеймания', country: 'Ирак', isPopular: true },
      ];
      setPopularCities(mockCities);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = (city: City) => {
    setCurrentCity(city);
    closeCityModal();
  };

  if (!mounted || !isCityModalOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCityModal}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Найдите ваш город
            </h3>
            <button
              onClick={closeCityModal}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search input */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск города..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Cities list */}
          <div className="px-4 pb-4 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Загрузка...
              </div>
            ) : filteredCities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Города не найдены
              </div>
            ) : (
              <ul className="space-y-2">
                {filteredCities.map((city) => (
                  <li key={city.id}>
                    <button
                      onClick={() => handleSelectCity(city)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900">{city.name}</span>
                      {city.isPopular && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Популярный
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
