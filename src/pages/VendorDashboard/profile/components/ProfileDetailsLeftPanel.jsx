import { Camera, ImagePlus } from 'lucide-react';
import FieldDisplay from './FieldDisplay';

const ProfileDetailsLeftPanel = ({ portfolio }) => (
  <div className='rounded-lg border border-[#e2e7e2] bg-[#f7f9f7] p-4 sm:p-5'>
    <p className='text-[15px] font-semibold text-[#444a46]'>Profile Photo</p>
    <div className='mt-2 flex items-center gap-3'>
      <div className='relative'>
        <img
          src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80'
          alt='Profile'
          className='h-14 w-14 rounded-full object-cover'
        />
        <span className='absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#cdd5cd] bg-white text-[#5f6661]'>
          <Camera size={10} />
        </span>
      </div>
    </div>

    <div className='mt-4 space-y-3'>
      <FieldDisplay label='Full Name' value='Sarah Jhonsen' />
      <FieldDisplay label='Phone Number' value='(201) 555-0124' />
      <FieldDisplay label='Email' value='georgiayoung@example.com' />
      <FieldDisplay
        label='About'
        multiline
        value='Sarah is a owner of a photography and wedding management company. She has a lot of positive reviews and completed 1500+ Wedding events since 2014.'
      />
    </div>

    <div className='mt-5'>
      <p className='mb-2 text-[30px] font-semibold capitalize text-[#2e322f] sm:text-[32px]'>portfolio</p>
      <div className='grid grid-cols-3 gap-2'>
        {portfolio.map((photo, index) => (
          <img key={photo} src={photo} alt={`Portfolio ${index + 1}`} className='h-24 w-full rounded-md object-cover' />
        ))}
        <button className='flex h-24 items-center justify-center rounded-md border border-dashed border-[#c0c8bf] bg-[#edf1ed] text-[#475247]'>
          <span className='flex flex-col items-center gap-1 text-[16px] font-medium'>
            <ImagePlus size={18} />
            Add Another Image
          </span>
        </button>
      </div>
    </div>
  </div>
);

export default ProfileDetailsLeftPanel;
