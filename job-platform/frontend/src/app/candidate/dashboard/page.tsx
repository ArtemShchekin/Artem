'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Header from '@/components/Header';
import { PersonalInfoForm, ContactsForm, EducationForm, WorkExperienceForm, DriverInfoForm } from '@/components/Forms';
import { candidateApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CandidateDashboard() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      birthDate: '',
      status: 'actively_looking',
      contactsHidden: false,
      contacts: {
        phone: '',
        email: '',
        telegram: '',
        whatsapp: '',
        viber: '',
      },
      education: [],
      workExperiences: [],
      driverInfo: {
        hasOwnCar: false,
        licenseCategories: [] as string[],
      },
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'workExperiences',
  });

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    setMessage('');

    try {
      // Save profile
      await candidateApi.updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthDate: data.birthDate,
        status: data.status,
      });

      // Save contacts
      await candidateApi.updateContacts({
        ...data.contacts,
        contactsHidden: data.contactsHidden,
      });

      // Save education (add new ones)
      for (const edu of data.education) {
        if (!edu.id) {
          await candidateApi.addEducation(edu);
        }
      }

      // Save work experiences
      for (const exp of data.workExperiences) {
        if (!exp.id) {
          await candidateApi.addExperience(exp);
        } else {
          await candidateApi.updateExperience(exp.id, exp);
        }
      }

      // Save driver info
      await candidateApi.updateDriving(data.driverInfo);

      setMessage('Резюме успешно сохранено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Моё резюме</h1>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('успешно') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoForm register={register} errors={errors} />
            <ContactsForm register={register} errors={errors} />
            <EducationForm
              register={register}
              errors={errors}
              fields={educationFields}
              append={appendEducation}
              remove={removeEducation}
            />
            <WorkExperienceForm
              register={register}
              errors={errors}
              fields={experienceFields}
              append={appendExperience}
              remove={removeExperience}
            />
            <DriverInfoForm register={register} errors={errors} />

            <div className="flex justify-end pt-6 border-t">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSaving ? 'Сохранение...' : 'Сохранить резюме'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
