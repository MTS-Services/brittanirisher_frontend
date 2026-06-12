import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { ROUTES } from "../config";
import { useSendMessageMutation } from "../store/features/public/publicApi";

const HERO_IMAGE = "/Get_in_Touch.png";
const CONTACT_DECOR_LEFT = "/Get_in_Touch2.png";
const CONTACT_DECOR_RIGHT = "/Get_in_Touch3.png";
const FLOWER_LEFT = "/Footer_img.png";
const FLOWER_RIGHT = "/Footer_img2.png";
const Frequently_Asked_Questions = "/Frequently_Asked_Questions.png";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email Us",
    text: "Send us an email anytime",
    detail: "Team@vowandvendor.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    text: "Chat with our support team",
    detail: "Start Chat",
  },
  {
    icon: Phone,
    title: "Call Us",
    text: "Mon-Fri from 9am to 6pm EST",
    detail: "+1 (800) 123-4567",
  },
];

const FAQ_ITEMS = [
  {
    title: "How can I increase my profile visibility?",
    body: "Adjust your profile visibility by completing your bio, uploading high-quality images, and choosing the right service category. Verified and detailed profiles tend to appear higher in search results.",
  },
  {
    title: "Is it possible to list services in multiple locations?",
    body: "Yes, you can list your services in multiple locations. Simply add each location in your profile settings and manage your availability for each area separately.",
  },
  {
    title: "How do I handle payments with couples?",
    body: "All payments are processed securely through our platform. Couples can pay upfront or set up payment plans, and you will receive your payment according to your chosen payment schedule.",
  },
  {
    title: "Can I offer special discounts or packages?",
    body: "Absolutely! You can create custom packages and offer special discounts directly through your profile. Update your pricing and packages anytime to match your current offerings.",
  },
  {
    title: "What should I do if a wedding date is rescheduled?",
    body: "Contact the couple immediately to confirm the new date. Update your calendar availability and notify our support team if there are any changes to your booking agreement.",
  },
  {
    title: "Do you provide any analytics for my business?",
    body: "Yes, our dashboard provides detailed analytics including profile views, inquiry sources, booking trends, and customer demographics to help you grow your business.",
  },
  {
    title: "How can I report a fake inquiry or spam?",
    body: "Report any suspicious activity directly through your dashboard or contact our support team. We take fraud prevention seriously and investigate all reports promptly.",
  },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const ContactBlock = memo(({ icon: Icon, title, text, detail }) => (
  <article className="rounded-[14px] bg-[#f0e9e1] px-6 py-7 text-center shadow-sm">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#d8c3b4] text-[#464e46]">
      <Icon size={20} />
    </div>
    <h3 className="mt-4 font-playfair text-[28px] leading-none text-[#2d2d2d]">
      {title}
    </h3>
    <p className="mt-2 font-raleway text-[16px] leading-6 text-[#857f7a]">
      {text}
    </p>
    <p className="mt-2 font-raleway text-[16px] font-medium leading-6 text-[#464e46]">
      {detail}
    </p>
  </article>
));

ContactBlock.displayName = "ContactBlock";

const ContactPage = memo(() => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (Object.values(payload).some((value) => !value)) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await sendMessage(payload).unwrap();
      toast.success("Message sent successfully.");
      setFormData(INITIAL_FORM);
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to send message. Please try again.",
      );
    }
  };

  useSEO({
    title: "Contact Us",
    description:
      "Get in touch with Vow & Vendor for support, bookings, and vendor inquiries.",
    keywords: ["contact", "support", "email"],
  });

  return (
    <div className="overflow-hidden  text-[#2d2d2d]">
      <section className="relative h-150 w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* <div className="absolute inset-0 bg-[rgba(45,45,45,0.38)]" /> */}

        <div className="absolute inset-0 flex items-center justify-center  text-center text-white">
          <div className="space-y-3">
            <div className="mx-auto inline-flex items-center rounded-full bg-[rgba(255,255,255,0.47)] px-6 py-1.5 font-raleway text-[16px] font-medium leading-6 text-[#414141]">
              Get In Touch
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl leading-none">
              Get in Touch
            </h1>
            <p className="font-raleway text-base md:text-[20px] leading-8">
              Have questions? We&apos;re here to help. Reach out and we&apos;ll
              get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-visible px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <img
          src={CONTACT_DECOR_RIGHT}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-13  -bottom-50 z-10 hidden w-40 -translate-x-1/3 -translate-y-1/3 sm:block md:w-52 lg:w-40"
        />
        <img
          src={CONTACT_DECOR_LEFT}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-15 top-0 z-0 hidden w-40 translate-x-1/3 -translate-y-1/3 sm:block md:w-52 lg:w-45"
        />

        <div className="relative z-10 mx-auto container">
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_0.9fr]">
            <article className="rounded-[14px] bg-[#f0e9e1] px-6 py-6 sm:px-8 sm:py-8">
              <h2 className="font-playfair text-[28px] leading-none text-[#2d2d2d]">
                Send us a Message
              </h2>

              <form className="mt-6 space-y-4" onSubmit={handleSendMessage}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    aria-label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    className="h-11 rounded-sm border-0 bg-white px-4 font-raleway text-[16px] outline-none placeholder:text-[#8c8c8c]"
                  />
                  <input
                    aria-label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    className="h-11 rounded-sm border-0 bg-white px-4 font-raleway text-[16px] outline-none placeholder:text-[#8c8c8c]"
                  />
                </div>
                <input
                  aria-label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="h-11 w-full rounded-sm border-0 bg-white px-4 font-raleway text-[16px] outline-none placeholder:text-[#8c8c8c]"
                />
                <input
                  aria-label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="h-11 w-full rounded-sm border-0 bg-white px-4 font-raleway text-[16px] outline-none placeholder:text-[#8c8c8c]"
                />
                <textarea
                  aria-label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us how we can help."
                  required
                  className="w-full rounded-sm border-0 bg-white px-4 py-3 font-raleway text-[16px] outline-none placeholder:text-[#8c8c8c]"
                />

                <button
                  type="submit"
                  disabled={isSendingMessage}
                  className="inline-flex rounded-lg bg-[#a7b9a6] px-5 py-3 font-raleway text-[16px] leading-6 text-[#464e46] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSendingMessage ? "Sending..." : "Send Message"}
                </button>
              </form>
            </article>

            <div className="space-y-5">
              <article className="rounded-[14px] bg-[#f0e9e1] px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8c3b4] text-[#464e46]">
                    <MapPin size={18} />
                  </div>
                  <h3 className="font-playfair text-[28px] leading-none text-[#2d2d2d]">
                    Office
                  </h3>
                </div>
                <div className="mt-4 space-y-1 font-raleway text-[16px] leading-6 text-[#615d58]">
                  <p>123 Wedding Lane</p>
                  <p>Suite 100</p>
                  <p>San Francisco, CA 94102</p>
                  <p>United States</p>
                </div>
              </article>

              <article className="rounded-[14px] bg-[#f0e9e1] px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8c3b4] text-[#464e46]">
                    <Clock size={18} />
                  </div>
                  <h3 className="font-playfair text-[28px] leading-none text-[#2d2d2d]">
                    Business Hours
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 font-raleway text-[16px] leading-6 text-[#615d58]">
                  <p>Monday - Friday</p>
                  <p>9am - 6pm</p>
                  <p>Saturday</p>
                  <p>10am - 4pm</p>
                  <p>Sunday</p>
                  <p>Closed</p>
                  <p className="col-span-2 mt-2 text-[14px] text-[#8c8c8c]">
                    All times in Eastern Standard Time (EST)
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d7dfd6] px-4 py-20 sm:px-6 lg:px-48 lg:py-20">
        {/* <img
          src={FLOWER_LEFT}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 hidden w-64 opacity-75 lg:block"
        /> */}
        {/* <img
          src={FLOWER_RIGHT}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden w-64 opacity-75 lg:block"
        /> */}

        <div className="mx-auto text-center container">
          <img
            src={Frequently_Asked_Questions}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-16 z-10 block w-110 -translate-x-1/2 -translate-y-1/2 opacity-90"
          />
          <h2 className="mt-2 font-playfair text-3xl md:text-4xl lg:text-5xl leading-none text-[#2d2d2d]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 font-raleway text-[20px] leading-8 text-[#615d58]">
            Quick answers to common questions
          </p>

          <div className="mx-auto max-w-6xl mt-10 flex flex-col gap-4 text-left">
            {FAQ_ITEMS.map((item, index) => (
              <details
                key={item.title}
                open={openFaqIndex === index}
                className="group relative overflow-hidden bg-[#E4E9E3] px-5 py-4 rounded-sm transition-all duration-300"
              >
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-open:opacity-100">
                  <div className="absolute inset-[-500%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#2B543A_50%,#D1B48C_70%,transparent_100%)]" />
                </div>

                <div className="absolute inset-[1.5px] z-0 rounded-[inherit] bg-[#E4E9E3] opacity-0 transition-opacity duration-300 group-open:opacity-100" />

                <summary
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenFaqIndex((currentIndex) =>
                      currentIndex === index ? null : index,
                    );
                  }}
                  className="relative z-10 flex cursor-pointer list-none items-center justify-between gap-6 font-raleway text-[16px] font-medium leading-6 text-black outline-none select-none"
                >
                  <span className="text-base md:text-lg">{item.title}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-[#2B543A] transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                {item.body && (
                  <p className="relative z-10 mt-4 font-raleway text-base leading-6 text-[#615d58] opacity-90 transition-all duration-300 group-open:opacity-100">
                    {item.body}
                  </p>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-48 lg:py-24">
        <div
          style={{ maxWidth: 1536 }}
          className="mx-auto rounded-2xl bg-[#5c665b] px-6 py-14 text-center text-white shadow-[0_18px_40px_rgba(63,73,63,0.12)]"
        >
          <div style={{ maxWidth: 680 }} className="mx-auto">
            <div className="mx-auto inline-flex items-center rounded-full bg-[rgba(255,255,255,0.16)] px-5 py-1.5 font-raleway text-[16px] font-medium leading-6 text-white/90">
              Join Our Community
            </div>
            <h3 className="mt-5 font-playfair text-[48px] leading-none">
              Let&apos;s Talk About Your Vision
            </h3>
            <p className="mt-4 font-raleway text-[20px] leading-8 text-white/85">
              Share what you are planning and our team will help you find the
              right next step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to={ROUTES.BROWSE_VENDORS}
                className="inline-flex items-center justify-center rounded-lg bg-[#a7b9a6] px-5 py-3 font-raleway text-[16px] leading-6 text-[#464e46]"
              >
                Browse Vendors
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 font-raleway text-[16px] leading-6 text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

ContactPage.displayName = "ContactPage";

export default ContactPage;
