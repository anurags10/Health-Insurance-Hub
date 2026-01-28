'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
  userQuerySchema,
  UserQueryFormData,
} from '@/src/lib/schemas/userQuery.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import apiClient from '@/src/lib/apiClient/apiClient';

const DISEASE_OPTIONS = [
  'diabetes',
  'hypertension',
  'asthma',
  'heart disease',
  'thyroid',
  'cancer',
];

export function UserQueryForm() {
  const form = useForm<UserQueryFormData>({
    resolver: zodResolver(userQuerySchema),
    defaultValues: {
      maternityRequired: false,
      hospitalPreferences: 'any',
      diseases: [],
    },
  });

  const { register, handleSubmit, formState } = form;

  const mutation = useMutation({
    mutationFn: async (data: UserQueryFormData) =>
      apiClient('/api/plans/recommend', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      alert('Recommendations generated successfully');
    },
  });

  const onSubmit = (data: UserQueryFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-6 rounded-xl border bg-background p-6 shadow-sm"
    >
      {/* Age */}
      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min={0}
          step={1}
          {...register('age', {
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Age must be 0 or greater',
            },
          })}
        />
        {formState.errors.age && (
          <p className="text-sm text-red-500">{formState.errors.age.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-1">
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          {...register('gender')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>
      </div>

      {/* Income */}
      <div className="space-y-1">
        <Label htmlFor="annualIncome">Yearly Income</Label>
        <Input
          id="annualIncome"
          type="number"
          min={10000}
          step={1}
          {...register('annualIncome', {
            valueAsNumber: true,
            min: {
              value: 10000,
              message: 'Annual Income must be 10000 or greater',
            },
          })}
        />
      </div>

      {/* Premium */}
      <div className="space-y-1">
        <Label htmlFor="maxYearlyPremium">Max Yearly Premium</Label>
        <Input
          id="maxYearlyPremium"
          type="number"
          min={10000}
          step={1}
          {...register('maxYearlyPremium', {
            valueAsNumber: true,
            min: {
              value: 10000,
              message: 'maxYearlyPremium must be 10000 or greater',
            },
          })}
        />
      </div>

      {/* Diseases */}
      <fieldset className="space-y-2">
        <Label>Existing Diseases</Label>
        <div className="grid grid-cols-2 gap-2">
          {DISEASE_OPTIONS.map(disease => (
            <label
              key={disease}
              htmlFor={`disease-${disease}`}
              className="flex items-center gap-2 text-sm"
            >
              <input
                id={`disease-${disease}`}
                type="checkbox"
                value={disease}
                {...register('diseases')}
              />
              {disease}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Hospital Preference */}
      <div className="space-y-1">
        <Label htmlFor="hospitalPreferences">Hospital Preference</Label>
        <select
          id="hospitalPreferences"
          {...register('hospitalPreferences')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="any">Any</option>
          <option value="yes">Private Hospital</option>
          <option value="no">Government Hospital</option>
        </select>
      </div>

      {/* Maternity */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register('maternityRequired')} />
        Maternity Required
      </label>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? 'Submitting...' : 'Get Recommendations'}
      </Button>
    </form>
  );
}
