import FieldDisplay from './FieldDisplay';

const ProfileDetailsRightPanel = () => (
  <div className='space-y-5'>
    <div className='space-y-3 rounded-lg border border-[#e2e7e2] bg-[#f7f9f7] p-4 sm:p-5'>
      <FieldDisplay label='Company Name' value='SantAmbrogio Clinic' />
      <FieldDisplay label='Location' value='Washington' />
      <FieldDisplay label='Specialty' value='Plastic and Reconstructive Surgeon' />
      <FieldDisplay label='Years of Experience' value='15 years of experience' />
      <FieldDisplay
        label='Highlighted Services'
        multiline
        value='Personalized consultation, active listening, and constant support at every stage of the surgical journey. Personalized consultation, active listening, and constant support at every stage of the journey...'
      />
    </div>

    <div className='rounded-lg border border-[#e2e7e2] bg-[#eef2ee] p-3 sm:p-4'>
      <p className='mb-3 font-playfair text-2xl text-[#1f2522]'>Set Your Password</p>
      <div className='space-y-3'>
        <FieldDisplay label='Password' value='****** *****' />
        <FieldDisplay label='Confirm Password' value='****** *****' />
      </div>
      <button className='mt-4 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white'>Save</button>
    </div>
  </div>
);

export default ProfileDetailsRightPanel;
