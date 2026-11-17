'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@heroui/react';
import { aroma } from '@/src/commons/localizations';
import { Category } from '../domain/category.entity';
import { categorySchema, CategoryFormData } from '../schema';

interface Props {
  category?: Category | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function CategoryForm({ category, onSuccess, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', url: '' },
  });

  useEffect(() => {
    reset({ name: category?.name ?? '', url: category?.url ?? '' });
  }, [category, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    const isEdit = Boolean(category);
    const response = await fetch(isEdit ? `/api/categoria/${category!.id}` : '/api/categoria', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset({ name: '', url: '' });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:flex-row md:items-start">
      <Input
        label={aroma.category.name}
        placeholder="Ej: Cafés calientes"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name')}
      />
      <Input
        label={aroma.category.url}
        placeholder="Ej: cafes-calientes"
        isInvalid={!!errors.url}
        errorMessage={errors.url?.message}
        {...register('url')}
      />
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting} className="bg-[#16123f] text-white">
          {category ? aroma.category.save : aroma.category.create}
        </Button>
        {category && onCancel && (
          <Button variant="bordered" onPress={onCancel}>
            {aroma.category.cancel}
          </Button>
        )}
      </div>
    </form>
  );
}
