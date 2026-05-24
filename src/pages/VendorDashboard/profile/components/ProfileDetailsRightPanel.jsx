const ProfileDetailsRightPanel = () => (
  <div className='space-y-5'>
    <div className='space-y-3 rounded-lg border border-[#F6F8F6] bg-[#F6F8F6] p-4 sm:p-5'>
      <div>
        <label htmlFor='companyName' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Company Name</label>
        <input
          id='companyName'
          type='text'
          defaultValue='SantAmbrogio Clinic'
          className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
        />
      </div>
      <div>
        <label htmlFor='location' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Location</label>
        <input
          id='location'
          type='text'
          defaultValue='Washington'
          className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
        />
      </div>
      <div>
        <label htmlFor='specialty' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Specialty</label>
        <input
          id='specialty'
          type='text'
          defaultValue='Plastic and Reconstructive Surgeon'
          className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
        />
      </div>
      <div>
        <label htmlFor='experience' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Years of Experience</label>
        <input
          id='experience'
          type='text'
          defaultValue='15 years of experience'
          className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
        />
      </div>
      <div>
        <label htmlFor='highlightedServices' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Highlighted Services</label>
        <textarea
          id='highlightedServices'
          defaultValue='Personalized consultation, active listening, and constant support at every stage of the surgical journey. Personalized consultation, active listening, and constant support at every stage of the journey...'
          className='min-h-22 w-full resize-none rounded-md border border-transparent bg-[#e9eeea] px-3 py-2.5 text-sm leading-5 text-[#5d635f] outline-none focus:border-[#b9c3b8]'
        />
      </div>
      <button className='mt-4 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white'>Save</button>
    </div>

    <div className='rounded-lg border border-[#F6F8F6] bg-[#F6F8F6] p-3 sm:p-4'>
      <h3 className='mb-3 font-playfair text-2xl text-[#1f2522]'>Set Your Password</h3>
      <div className='space-y-3'>
        <div>
          <label htmlFor='password' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Password</label>
          <input
            id='password'
            type='password'
            defaultValue='*********'
            className='h-10 w-full rounded-md border border-transparent bg-[#E4E9E3] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
          />
        </div>
        <div>
          <label htmlFor='confirmPassword' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            defaultValue='*********'
            className='h-10 w-full rounded-md border border-transparent bg-[#E4E9E3] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
          />
        </div>
      </div>
      <button className='mt-4 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white'>Save</button>
    </div>
  </div>
);

export default ProfileDetailsRightPanel;
