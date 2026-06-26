import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

/**
 * Skenario pengujian untuk CategoryFilter:
 * 
 * - harus merender tombol "semua" dan daftar kategori popular
 * - harus menandai tombol kategori terpilih dengan class 'active'
 * - harus memanggil onCategoryChange dengan parameter string kosong ketika tombol "semua" diklik
 * - harus memanggil onCategoryChange dengan parameter kategori terpilih ketika tombol kategori diklik
 */
describe('CategoryFilter component', () => {
  it('should render "semua" button and popular categories', () => {
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory=""
        onCategoryChange={() => {}}
      />
    );

    expect(screen.getByText('semua')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#redux')).toBeInTheDocument();
  });

  it('should mark the selected category button with active class', () => {
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="react"
        onCategoryChange={() => {}}
      />
    );

    const reactBtn = screen.getByText('#react');
    const reduxBtn = screen.getByText('#redux');
    const allBtn = screen.getByText('semua');

    expect(reactBtn).toHaveClass('active');
    expect(reduxBtn).not.toHaveClass('active');
    expect(allBtn).not.toHaveClass('active');
  });

  it('should call onCategoryChange with empty string when "semua" button clicked', async () => {
    const onCategoryChangeMock = vi.fn();
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="react"
        onCategoryChange={onCategoryChangeMock}
      />
    );

    const allBtn = screen.getByText('semua');
    await userEvent.click(allBtn);

    expect(onCategoryChangeMock).toHaveBeenCalledWith('');
  });

  it('should call onCategoryChange with category name when a category button clicked', async () => {
    const onCategoryChangeMock = vi.fn();
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory=""
        onCategoryChange={onCategoryChangeMock}
      />
    );

    const reduxBtn = screen.getByText('#redux');
    await userEvent.click(reduxBtn);

    expect(onCategoryChangeMock).toHaveBeenCalledWith('redux');
  });
});
