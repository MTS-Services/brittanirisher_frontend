import { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import AdminProfileCard from './components/AdminProfileCard';
import PersonalInformationSection from './components/PersonalInformationSection';
import ChangePasswordSection from './components/ChangePasswordSection';

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'MD. ismail Molla',
    phone: '(918) 655-0116',
    email: 'jackson.graham@example.com',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePersonalInfo = () => {
    console.log('Saving personal info:', personalInfo);
  };

  const handleSavePassword = () => {
    console.log('Saving password:', passwords);
  };

  return (
    <div className='space-y-8'>
      <ProfileHeader />
      <AdminProfileCard />
      <PersonalInformationSection
        personalInfo={personalInfo}
        onPersonalInfoChange={handlePersonalInfoChange}
        onSave={handleSavePersonalInfo}
      />
      <ChangePasswordSection
        passwords={passwords}
        onPasswordChange={handlePasswordChange}
        onSave={handleSavePassword}
      />
    </div>
  );
}
