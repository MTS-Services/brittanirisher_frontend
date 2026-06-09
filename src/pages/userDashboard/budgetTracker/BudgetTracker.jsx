import React, { useEffect, useMemo, useState } from 'react';
import BudgetSummaryCards from './components/BudgetSummaryCards';
import BudgetItemsSection from './components/BudgetItemsSection';
import BudgetBreakdownChart from './components/BudgetBreakdownChart';
import AddExpenseModal from './components/AddExpenseModal';
import toast from 'react-hot-toast';
import {
  useCreateCoupleExpenseMutation,
  useGetCategoriesQuery,
} from '../../../store/features/couple/coupleDashboard';

const initialExpenseForm = {
  categoryId: '',
  vendorName: '',
  vendorPhone: '',
  vendorEmail: '',
  amount: '',
  note: '',
};

const BudgetTracker = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState(initialExpenseForm);
  const [createCoupleExpense, { isLoading }] = useCreateCoupleExpenseMutation();
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  const normalizedCategories = useMemo(
    () => (Array.isArray(categories) ? categories : []),
    [categories],
  );

  useEffect(() => {
    if (!expenseForm.categoryId && normalizedCategories.length > 0) {
      setExpenseForm((prev) => ({
        ...prev,
        categoryId: normalizedCategories[0].id || normalizedCategories[0]._id || '',
      }));
    }
  }, [expenseForm.categoryId, normalizedCategories]);

  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
    setExpenseForm(initialExpenseForm);
  };

  const handleFormFieldChange = (field, value) => {
    setExpenseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitExpense = async (event) => {
    event.preventDefault();

    const amount = Number.parseFloat(String(expenseForm.amount).replace(/[^0-9.]/g, ''));

    if (!expenseForm.vendorName.trim() || !expenseForm.categoryId || !Number.isFinite(amount)) {
      toast.error('Please fill in category, vendor name, and amount.');
      return;
    }

    try {
      await createCoupleExpense({
        vendorName: expenseForm.vendorName.trim(),
        categoryId: expenseForm.categoryId,
        vendorPhone: expenseForm.vendorPhone.trim(),
        vendorEmail: expenseForm.vendorEmail.trim(),
        amount,
        note: expenseForm.note.trim(),
      }).unwrap();

      toast.success('Expense added successfully');
      closeExpenseModal();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || 'Failed to add expense');
    }
  };

  return (
    <>
      <section className='w-full text-[#171717] font-playfair'>
        <header className='flex flex-col items-start justify-between gap-4 md:flex-row'>
          <div>
            <h1 className='m-0 text-2xl leading-tight text-[#1b1b1b] md:text-4xl'>Budget Tracker</h1>
            <p className='mt-2 text-base font-raleway text-[#6a6a6a]'>Manage your wedding expense with confidence</p>
          </div>
          <button
            type='button'
            onClick={openExpenseModal}
            className='rounded-md bg-[#b4c4b1] px-5 py-2.5 text-sm text-white transition hover:bg-[#a4b5a2]'
          >
            Add Expense
          </button>
        </header>

        <BudgetSummaryCards />
        <BudgetItemsSection />
        <BudgetBreakdownChart />
      </section>

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        expenseForm={expenseForm}
        onFormChange={handleFormFieldChange}
        onClose={closeExpenseModal}
        onSave={submitExpense}
        categories={normalizedCategories}
        categoriesLoading={isCategoriesLoading}
        isSaving={isLoading}
      />
    </>
  );
};

export default BudgetTracker;
