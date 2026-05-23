import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, logout } from '../../../store/slices/authSlice';
import { ROUTES } from '../../../config';
import { CalendarDays, DollarSign } from 'lucide-react';
import DashboardHeader from './components/DashboardHeader';
import StatsGrid from './components/StatsGrid';
import SuggestedForYou from './components/SuggestedForYou';

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const headlineName = user?.firstName || user?.name || 'Emma';

  const topStats = [
    {
      label: 'Wedding Countdown',
      value: '97',
      sub: 'days remaining',
      icon: CalendarDays,
    },
    {
      label: 'Total Budget',
      value: '$128,430',
      sub: '',
      icon: DollarSign,
    },
    {
      label: 'Expend Budget',
      value: '$28,430',
      sub: '',
      icon: DollarSign,
    },
    {
      label: 'Remaining Budget',
      value: '$100,000',
      sub: '',
      icon: DollarSign,
    },
  ];

  const suggested = [
    { id: 1, category: 'Catering', name: 'Luxe Catering Co.', price: '$8,000', match: '95% match' },
    { id: 2, category: 'Music', name: 'String Quartet Harmony', price: '$2,500', match: '92% match' },
    { id: 3, category: 'Cake', name: 'Sweet Moments Bakery', price: '$1,200', match: '88% match' },
    { id: 4, category: 'Cake', name: 'Sweet Moments Bakery', price: '$1,200', match: '88% match' },
    { id: 5, category: 'Catering', name: 'Luxe Catering Co.', price: '$8,000', match: '95% match' },
    { id: 6, category: 'Music', name: 'String Quartet Harmony', price: '$2,500', match: '92% match' },
    { id: 7, category: 'Cake', name: 'Sweet Moments Bakery', price: '$1,200', match: '88% match' },
    { id: 8, category: 'Cake', name: 'Sweet Moments Bakery', price: '$1,200', match: '88% match' },
  ];

  return (
    <main className=' font-playfair'>
      
        <DashboardHeader headlineName={headlineName} />
        <StatsGrid stats={topStats} />
        <SuggestedForYou items={suggested} />
   
    </main>
  );
};

export default UserDashboard;
