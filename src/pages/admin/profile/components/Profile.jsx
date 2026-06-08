import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProfileHeader from './ProfileHeader';
import AdminProfileCard from './AdminProfileCard';
import PersonalInformationSection from './PersonalInformationSection';
import ChangePasswordSection from './ChangePasswordSection';
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../../../store/features/auth/authApi';

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data: profileResponse, isLoading: isProfileLoading, refetch } =
    useGetProfileQuery();

  useEffect(() => {
    const profile = profileResponse?.data;
    if (!profile) return;

    setPersonalInfo({
      fullName: profile.name || '',
      phone: profile.phone || '',
      email: profile.email || '',
    });
  }, [profileResponse]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePersonalInfo = async () => {
    const name = personalInfo.fullName?.trim();
    const phone = personalInfo.phone?.trim();

    if (!name || !phone) {
      toast.error('Name and phone are required.');
      return;
    }

    try {
      await updateProfile({ name, phone }).unwrap();
      toast.success('Profile updated successfully.');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile.');
    }
  };

  const handleSavePassword = async () => {
    const currentPassword = passwords.oldPassword?.trim();
    const newPassword = passwords.newPassword?.trim();
    const confirmPassword = passwords.confirmPassword?.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      toast.success('Password changed successfully.');
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className='space-y-8'>
      <ProfileHeader />
      <AdminProfileCard />
      <PersonalInformationSection
        personalInfo={personalInfo}
        onPersonalInfoChange={handlePersonalInfoChange}
        onSave={handleSavePersonalInfo}
        isLoading={isProfileLoading}
        isSaving={isUpdatingProfile}
      />
      <ChangePasswordSection
        passwords={passwords}
        onPasswordChange={handlePasswordChange}
        onSave={handleSavePassword}
        isSaving={isChangingPassword}
      />
    </div>
  );
}
