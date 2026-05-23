import React, { memo } from "react";
import { Link } from "react-router-dom";
import { APP_CONFIG, ROUTES } from "../../../config";

const QUICK_LINKS = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Browse Vendors", href: "#vendors" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const SUPPORT_LINKS = [
  "FAQ",
  "Help Center",
  "Contact Support",
  "Privacy Policy",
  "Terms of Service",
];

const Footer = memo(() => {
  return (
    <footer className="relative  text-white bg-[#3f493f] ">
         <img
        src="/Footer_img.png"
        alt="decor left"
        className="hidden sm:block absolute -left-4 -top-60 w-80 z-0 pointer-events-none"
      />
      <img
        src="/Footer_img2.png"
        alt="decor right"
        className="hidden sm:block absolute -right-2 -top-60 w-80 z-0 pointer-events-none"
      />
      <div className="mx-auto container px-4 pb-4 pt-6 sm:px-6 relative z-10 lg:px-8 ">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] z-9999">
          <div>
            <div className="flex items-center gap-3">
              <img src="/Footer_logo.png" alt="logo" className="" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white">
              Helping brides plan their dream wedding while connecting with
              trusted local vendors. Your journey to a perfect celebration
              starts here.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold  text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="transition-colors hover:text-white"
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
            <ul className="mt-5 space-y-3 text-sm text-white">
              <li>123 Wedding Lane, Suite 200</li>
              <li>hello@vowandvendor.com</li>
              <li>(555) 012-3456</li>
              <li>Mon - Fri, 9am - 6pm</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold  text-white">
              Support
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white">
              {SUPPORT_LINKS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className=" text-center text-sm text-white">
          &copy; {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
