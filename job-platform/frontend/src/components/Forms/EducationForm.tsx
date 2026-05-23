'use client';

import React from 'react';
import { UseFormRegister, FieldErrors, UseFieldArrayRemove } from 'react-hook-form';
import { EducationLevel } from '@/types';
import { X } from 'lucide-react';

interface EducationFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  fields: any[];
  remove: UseFieldArrayRemove;
  append: (education: any) => void;
}

const educationLevels: { value: EducationLevel; label: string }[] = [
  { value: 'secondary', label: 'Среднее' },
  { value: 'secondary_special', label: 'Среднее специальное' },
  { value: 'incomplete_higher', label: 'Неоконченное высшее' },
  { value: 'higher', label: 'Высшее' },
  { value: 'bachelor', label: 'Бакалавр' },
  { value: 'master', label: 'Магистр' },
  { value: 'phd', label: 'Кандидат наук' },
  { value: 'doctor', label: 'Доктор наук' },
];

export function EducationForm({ register, errors, fields, remove, append }: EducationFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Образование</h3>
        <button
          type="button"
          onClick={() => append({
            level: 'higher',
            institutionName: '',
            faculty: '',
            specialization: '',
            graduationCode: '',
          })}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          + Добавить
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-4 bg-gray-50 relative">
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Уровень образования</label>
              <select
                {...register(`education.${index}.level`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {educationLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Название учебного заведения</label>
              <input
                {...register(`education.${index}.institutionName`, { required: 'Обязательное поле' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.education?.[index]?.institutionName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.education[index]?.institutionName?.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Факультет</label>
              <input
                {...register(`education.${index}.faculty`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Специализация</label>
              <input
                {...register(`education.${index}.specialization`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Код окончания (год)</label>
              <input
                type="number"
                {...register(`education.${index}.graduationCode`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          Добавьте информацию об образовании
        </p>
      )}
    </div>
  );
}
