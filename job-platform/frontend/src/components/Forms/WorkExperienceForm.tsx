'use client';

import React from 'react';
import { UseFormRegister, FieldErrors, UseFieldArrayRemove } from 'react-hook-form';
import { X } from 'lucide-react';

interface WorkExperienceFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  fields: any[];
  remove: UseFieldArrayRemove;
  append: (experience: any) => void;
}

const months = [
  { value: 1, label: 'Январь' },
  { value: 2, label: 'Февраль' },
  { value: 3, label: 'Март' },
  { value: 4, label: 'Апрель' },
  { value: 5, label: 'Май' },
  { value: 6, label: 'Июнь' },
  { value: 7, label: 'Июль' },
  { value: 8, label: 'Август' },
  { value: 9, label: 'Сентябрь' },
  { value: 10, label: 'Октябрь' },
  { value: 11, label: 'Ноябрь' },
  { value: 12, label: 'Декабрь' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export function WorkExperienceForm({ register, errors, fields, remove, append }: WorkExperienceFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Опыт работы</h3>
        <button
          type="button"
          onClick={() => append({
            companyName: '',
            position: '',
            startMonth: 1,
            startYear: currentYear,
            endMonth: 1,
            endYear: currentYear,
            isCurrentJob: false,
            responsibilities: '',
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Наименование компании</label>
              <input
                {...register(`workExperiences.${index}.companyName`, { required: 'Обязательное поле' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.workExperiences?.[index]?.companyName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.workExperiences[index]?.companyName?.message as string}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Должность или профессия</label>
              <input
                {...register(`workExperiences.${index}.position`, { required: 'Обязательное поле' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.workExperiences?.[index]?.position && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.workExperiences[index]?.position?.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Начало работы (месяц)</label>
              <select
                {...register(`workExperiences.${index}.startMonth`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Начало работы (год)</label>
              <select
                {...register(`workExperiences.${index}.startYear`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register(`workExperiences.${index}.isCurrentJob`)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Работаю сейчас</span>
              </label>
            </div>

            {!fields[index].isCurrentJob && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Окончание (месяц)</label>
                  <select
                    {...register(`workExperiences.${index}.endMonth`)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Окончание (год)</label>
                  <select
                    {...register(`workExperiences.${index}.endYear`)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Обязанности и достижения
              </label>
              <textarea
                {...register(`workExperiences.${index}.responsibilities`)}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Опишите ваши обязанности и достижения на этом месте работы..."
              />
            </div>
          </div>
        </div>
      ))}

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          Добавьте информацию об опыте работы
        </p>
      )}
    </div>
  );
}
