'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CandidateProfile, EducationLevel, LicenseCategory } from '@/types';

interface PersonalInfoFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function PersonalInfoForm({ register, errors }: PersonalInfoFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Личная информация</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Фамилия</label>
          <input
            {...register('lastName', { required: 'Обязательное поле' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Имя</label>
          <input
            {...register('firstName', { required: 'Обязательное поле' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Отчество</label>
          <input
            {...register('middleName')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Дата рождения</label>
          <input
            type="date"
            {...register('birthDate', { required: 'Обязательное поле' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate.message as string}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Статус</label>
        <select
          {...register('status', { required: 'Обязательное поле' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="actively_looking">Активно ищу работу</option>
          <option value="not_looking">Не ищу работу</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message as string}</p>
        )}
      </div>
    </div>
  );
}
