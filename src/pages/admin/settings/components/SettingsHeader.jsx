export default function SettingsHeader({ title, description }) {
  return (
    <div>
      <h1 className='text-xl sm:text-2xl font-playfair font-semibold text-gray-900'>
        {title}
      </h1>
      <p className='mt-2 text-base font-raleway text-gray-500'>{description}</p>
    </div>
  );
}
