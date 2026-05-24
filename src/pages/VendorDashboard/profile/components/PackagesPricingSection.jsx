import { Check, Pencil, Trash2 } from 'lucide-react';

const PackagesPricingSection = ({ packages }) => (
  <section className='mt-6'>
    <div className='mb-3 flex items-center justify-between'>
      <h2 className='font-playfair text-[28px] text-[#2b221d]'>Packages &amp; Pricing</h2>
      <button className='rounded-sm bg-[#dce8db] px-3 py-1 text-[10px] text-[#475247]'>+ Add Price</button>
    </div>

    <div className='grid gap-3 xl:grid-cols-3'>
      {packages.map((item) => (
        <article
          key={item.name}
          className={`rounded-md border p-4 ${
            item.featured ? 'border-[#4e5a4c] bg-[#4e5a4c] text-white' : 'border-[#e1e5e1] bg-white text-[#2f3531]'
          }`}
        >
          <h3 className='font-playfair text-[34px] leading-none'>{item.name}</h3>
          <p className='mt-2 text-[40px] leading-none'>{item.price}</p>
          <p className={`mt-2 text-[13px] ${item.featured ? 'text-[#dde3dc]' : 'text-[#5f6661]'}`}>{item.subtitle}</p>

          <div className={`my-3 border-t ${item.featured ? 'border-[#7d897b]' : 'border-[#e4e8e4]'}`} />

          <ul className='space-y-1.5 text-[11px]'>
            {item.features.map((feature) => (
              <li key={feature} className='flex items-start gap-2'>
                <Check size={12} className={`mt-0.5 ${item.featured ? 'text-[#dbe2da]' : 'text-[#7b8679]'}`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className='mt-5 grid grid-cols-2 gap-2'>
            <button
              className={`inline-flex items-center justify-center gap-1.5 rounded-sm py-2 text-[11px] ${
                item.featured ? 'bg-[#8ea08b] text-white' : 'bg-[#dce8db] text-[#445043]'
              }`}
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              className={`inline-flex items-center justify-center gap-1.5 rounded-sm border py-2 text-[11px] ${
                item.featured ? 'border-[#93a091] text-[#dbe2da]' : 'border-[#c7ceca] text-[#445043]'
              }`}
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default PackagesPricingSection;
