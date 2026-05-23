'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ContactsFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function ContactsForm({ register, errors }: ContactsFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Контакты</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
          <input
            type="tel"
            {...register('contacts.phone')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="+964 XXX XXX XXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Электронная почта</label>
          <input
            type="email"
            {...register('contacts.email')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telegram</label>
          <input
            {...register('contacts.telegram')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="@username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
          <input
            type="tel"
            {...register('contacts.whatsapp')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="+964 XXX XXX XXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Viber</label>
          <input
            type="tel"
            {...register('contacts.viber')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="+964 XXX XXX XXXX"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('contactsHidden')}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Скрыть контакты до разблокировки работодателем
          </span>
        </label>
      </div>
    </div>
  );
}
