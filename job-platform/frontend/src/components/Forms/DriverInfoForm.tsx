'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LicenseCategory } from '@/types';

interface DriverInfoFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const licenseCategories: { value: LicenseCategory; label: string }[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'BE', label: 'BE' },
  { value: 'CE', label: 'CE' },
  { value: 'DE', label: 'DE' },
  { value: 'TM', label: 'TM' },
  { value: 'TB', label: 'TB' },
];

export function DriverInfoForm({ register, errors }: DriverInfoFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Водительская информация</h3>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('driverInfo.hasOwnCar')}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Есть своя машина</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Категория прав (можно выбрать несколько)
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {licenseCategories.map((category) => (
            <label
              key={category.value}
              className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                value={category.value}
                {...register('driverInfo.licenseCategories')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">{category.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
