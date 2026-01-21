'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  userQuerySchema,
  UserQueryFormData,
} from '@/src/lib/schemas/userQuery.schema';

export function UserQueryForm() {
  const DISEASE_OPTIONS = [
    'diabetes',
    'hypertension',
    'asthma',
    'heart disease',
    'thyroid',
    'cancer',
  ];
  const form = useForm<UserQueryFormData>({
    resolver: zodResolver(userQuerySchema),
    defaultValues: {
      maternityRequired: false,
      hospitalPreferences: 'any',
      diseases: [],
    },
  });
  const { register, handleSubmit, formState } = form;
  const onSubmit = (data: UserQueryFormData): void => {
    console.log('FORM DATA 👉👉 ', data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="number"
        placeholder="AGE"
        {...register('age', { valueAsNumber: true })}
      />
      <select {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="any">Any</option>
      </select>
      <input
        type="number"
        placeholder="Yearly Income"
        {...register('annualIncome', { valueAsNumber: true })}
      />
      <input
        type="number"
        placeholder="Maximum Premium you can pay yearly"
        {...register('maxYearlyPremium', { valueAsNumber: true })}
      />
      <fieldset>
        <legend>Existing Diseases</legend>
        {DISEASE_OPTIONS.map(disease => (
          <label key={disease} className="block">
            <input type="checkbox" value={disease} {...register('diseases')} />
            {disease}
          </label>
        ))}
      </fieldset>

      <select {...register('hospitalPreferences')}>
        <option value="yes">Private Hospital</option>
        <option value="no">Government Hospital</option>
        <option value="any">Any</option>
      </select>
      <label>
        <input type="checkbox" {...register('maternityRequired')} />
        Maternity Required
      </label>
      <button type="submit">Get Recommendations</button>

      {formState.errors && (
        <pre className="text-red-500">
          {JSON.stringify(formState.errors, null, 2)}
        </pre>
      )}
    </form>
  );
}
