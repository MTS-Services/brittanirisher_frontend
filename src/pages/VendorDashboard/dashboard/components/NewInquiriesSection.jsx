import React from 'react';
import { Link } from 'react-router-dom';

const NewInquiriesSection = ({ inquiries = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <aside className="rounded-[2rem] border border-[#f3f3f3] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-playfair text-2xl font-medium tracking-wide text-[#1c1c1c] md:text-[28px]">
          New Inquiries
        </h2>
        <Link to="/vendor/leads"
          type="button"
          className="font-raleway text-sm tracking-wide text-[#707070] underline underline-offset-4 hover:text-[#1c1c1c]"
        >
          See all inquiries
        </Link>
      </div>

      <div className="space-y-6">
        {inquiries.length === 0 ? (
          <div className="py-8 text-center font-raleway text-sm text-[#7a827a]">
            No new inquiries found.
          </div>
        ) : (
          inquiries.map((item) => (
            <article
              key={item.id}
              className="border-b border-[#f3f3f3] pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-raleway">
                    <span className="font-semibold text-[#1c1c1c] text-lg">
                      {item.senderName}
                    </span>
                    <span>•</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'NEW'
                          ? 'bg-[#e3ece2] text-[#3a4439]'
                          : 'bg-[#f7f7f7] text-[#707070]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2.5 line-clamp-2 font-raleway text-sm italic font-medium leading-relaxed tracking-wide text-[#7e857e]">
                    "{item.message}"
                  </p>

                  {/* <button
                    type="button"
                    className="mt-4 inline-flex items-center rounded-xl bg-[#434d42] px-5 py-2 font-raleway text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#343c33]"
                  >
                    See Details
                  </button> */}
                </div>

                <div className="shrink-0 pt-0.5 text-right font-raleway text-xs font-bold uppercase tracking-wide text-[#707070]">
                  {formatDate(item.createdAt)}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </aside>
  );
};

export default NewInquiriesSection;