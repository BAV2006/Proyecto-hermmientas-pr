'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { aroma } from '@/src/commons/localizations';
import { Category } from '../domain/category.entity';
import CategoryForm from './CategoryForm';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);

  const loadCategories = useCallback(async () => {
    const response = await fetch('/api/categoria');
    if (response.ok) setCategories(await response.json());
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/categoria/${id}`, { method: 'DELETE' });
    if (response.ok) loadCategories();
  };

  const handleSuccess = () => {
    setSelected(null);
    loadCategories();
  };

  return (
    <div className="flex flex-col gap-6">
      <CategoryForm category={selected} onSuccess={handleSuccess} onCancel={() => setSelected(null)} />

      <Table aria-label={aroma.category.title}>
        <TableHeader>
          <TableColumn>{aroma.category.name}</TableColumn>
          <TableColumn>{aroma.category.url}</TableColumn>
          <TableColumn>{aroma.category.actions}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={aroma.category.empty}>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.url}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="flat" onPress={() => setSelected(category)}>
                    {aroma.category.edit}
                  </Button>
                  <Button size="sm" color="danger" variant="flat" onPress={() => handleDelete(category.id)}>
                    {aroma.category.delete}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
