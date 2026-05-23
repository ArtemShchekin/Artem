'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { employerApi, searchApi } from '@/lib/api';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { Lock, Unlock } from 'lucide-react';

export default function EmployerSearchPage() {
  const router = useRouter();
  const { user } = useAppStore();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      router.push('/auth');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [balanceRes, candidatesRes] = await Promise.all([
        employerApi.getBalance(),
        searchApi.searchCandidates({}),
      ]);
      setBalance(balanceRes.data.data?.balance || 0);
      setCandidates(candidatesRes.data.data?.candidates || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async (candidateId: string, price: number) => {
    if (balance < price) {
      alert('Недостаточно средств на балансе. Пожалуйста, пополните баланс.');
      router.push('/employer/dashboard');
      return;
    }

    if (!confirm(`Разблокировать контакты за ${price}?`)) {
      return;
    }

    try {
      await employerApi.unlockCandidate(candidateId);
      alert('Контакты разблокированы!');
      loadData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Ошибка при разблокировке');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance info */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Поиск кандидатов</h2>
            <p className="text-sm text-gray-600">Найдите подходящих сотрудников для вашей компании</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Ваш баланс</p>
            <p className="text-2xl font-bold text-blue-600">{balance} IQD</p>
            <button
              onClick={() => router.push('/employer/dashboard')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Пополнить →
            </button>
          </div>
        </div>

        {/* Candidates list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Кандидаты не найдены
            </div>
          ) : (
            candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {candidate.lastName} {candidate.firstName}
                  </h3>
                  <p className="text-sm text-gray-600">{candidate.position || 'Ищет работу'}</p>
                  <p className="text-sm text-gray-500">{candidate.city?.name || 'Не указан'}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Статус:</span>
                    {candidate.status === 'actively_looking' ? (
                      <span className="text-green-600">Активно ищу работу</span>
                    ) : (
                      <span className="text-gray-500">Не ищу работу</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Образование:</span>
                    <span>{candidate.education?.[0]?.level || 'Не указано'}</span>
                  </div>
                </div>

                {candidate.isUnlocked ? (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Контакты:</p>
                    <p className="text-sm text-gray-600">Телефон: {candidate.contacts?.phone}</p>
                    <p className="text-sm text-gray-600">Email: {candidate.contacts?.email}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => handleUnlock(candidate.id, candidate.unlockPrice || 1000)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Разблокировать за {candidate.unlockPrice || 1000} IQD
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
