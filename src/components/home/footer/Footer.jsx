import React, { memo } from "react";
import { Link } from "react-router-dom";
import {  ROUTES } from "../../../config";

const QUICK_LINKS = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Browse Vendors", href: ROUTES.BROWSE_VENDORS },
  { label: "How It Works", href: ROUTES.HOW_IT_WORKS },
  { label: "Pricing", href: ROUTES.PRICING },
];

const SUPPORT_LINKS = [
  { label: "FAQ", href: "/contact" }, 
  { label: "Help Center", href: "/contact" },
  { label: "Contact Support", href: "/contact" },
  { label: "Privacy Policy", href: "/about-us" },
  { label: "Terms of Service", href: "/about-us" },
];

const Footer = memo(() => {
  return (
    <footer className="relative  text-white bg-[#3f493f] ">
      <img
        src="/Footer_img.png"
        alt="decor left"
        className="hidden sm:block absolute left-0 -top-72 w-80 z-0 pointer-events-none"
      />
      <img
        src="/Footer_img2.png"
        alt="decor right"
        className="hidden sm:block absolute right-0 -top-72 w-80 z-0 pointer-events-none"
      />
      <div className="mx-auto container px-4 pb-4 pt-6 sm:px-6 relative z-10 lg:px-8 ">
        <div className="grid gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] z-9999">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/Footer_logo.png"
                alt="logo"
                className="w-20 h-18  md:w-30 md:h-25"
              />
            </div>
            <p className="text-justify mt-1 max-w-xs text-sm leading-7 text-white">
              Helping brides plan their dream wedding while connecting with
              trusted local vendors. Your journey to a perfect celebration
              starts here.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold  text-white">Quick Links</h3>
            <ul className="mt-3 md:mt-5 space-y-1.5 md:space-y-2.5 text-sm text-white">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold  text-white">
              Contact Info
            </h3>
            <ul className="mt-3 md:mt-5 space-y-1.5 md:space-y-2.5 text-sm text-white">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Charleston,+SC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Charleston, SC
                </a>
              </li>
              <li>
                <a
                  href="mailto:team@vowandvendor.com"
                  className="hover:underline"
                >
                  team@vowandvendor.com
                </a>
              </li>
              {/* <li>(555) 012-3456</li>
              <li>Mon - Fri, 9am - 6pm</li> */}
            </ul>
          </div>

       <div>
  <h3 className="text-base font-semibold text-white">Support</h3>
  <ul className="mt-3 md:mt-5 space-y-1.5 md:space-y-2.5 text-sm text-white">
    {SUPPORT_LINKS.map((link) => (
      <li key={link.label}>
        {link.href.startsWith("#") ? (
          <a
            href={link.href}
            className="transition-colors hover:text-white hover:underline"
          >
            {link.label}
          </a>
        ) : (
          <Link
            to={link.href}
            className="transition-colors hover:text-white hover:underline"
          >
            {link.label}
          </Link>
        )}
      </li>
    ))}
  </ul>
</div>
        </div>

   
        <div className="text-center text-sm text-white mt-2 py-2">
         &copy; {new Date().getFullYear()} Vow & Vendor. All rights reserved.
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
