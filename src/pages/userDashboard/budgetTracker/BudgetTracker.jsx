import React, { useState } from 'react';
import BudgetSummaryCards from './components/BudgetSummaryCards';
import BudgetItemsSection from './components/BudgetItemsSection';
import BudgetBreakdownChart from './components/BudgetBreakdownChart';
import AddExpenseModal from './components/AddExpenseModal';

const initialExpenseForm = {
  category: 'Photography',
  vendorName: '',
  vendorPhone: '',
  vendorEmail: '',
  expense: '$00.00',
  note: '',
};

const BudgetTracker = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState(initialExpenseForm);

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

  const handleExpenseSave = () => {
    console.log('Expense saved:', expenseForm);
    setIsExpenseModalOpen(false);
    setExpenseForm(initialExpenseForm);
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
        onSave={handleExpenseSave}
      />
    </>
  );
};

export default BudgetTracker;
