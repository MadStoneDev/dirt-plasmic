"use client";

import { useState } from "react";
import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface FooterSectionProps {
  // Hero area
  backgroundImage?: string;
  mobileBackgroundImage?: string;
  backgroundColor?: string;
  heading1?: string;
  heading2?: string;
  description?: string;
  // Form settings
  submitButtonText?: string;
  recipientEmail?: string;
  // Footer columns
  footerLogo?: string;
  footerDescription?: string;
  // Newsletter column
  newsletterHeading?: string;
  newsletterDescription?: string;
  // Contact column
  contactHeading?: string;
  contactDescription?: string;
  // Links column
  linksHeading?: string;
  link1Text?: string;
  link1Url?: string;
  link2Text?: string;
  link2Url?: string;
  link3Text?: string;
  link3Url?: string;
  link4Text?: string;
  link4Url?: string;
  link5Text?: string;
  link5Url?: string;
  // Bottom bar
  separatorImage?: string;
  copyrightText?: string;
  bottomRightText?: string;
  bottomRightLink?: string;
}

export function FooterSection({
  backgroundImage,
  mobileBackgroundImage,
  backgroundColor = "#5C0004",
  heading1,
  heading2,
  description,
  submitButtonText = "Get Dirty",
  recipientEmail,
  footerLogo,
  footerDescription,
  newsletterHeading,
  newsletterDescription,
  contactHeading,
  contactDescription,
  linksHeading,
  link1Text,
  link1Url,
  link2Text,
  link2Url,
  link3Text,
  link3Url,
  link4Text,
  link4Url,
  link5Text,
  link5Url,
  separatorImage,
  copyrightText,
  bottomRightText,
  bottomRightLink,
}: FooterSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const links = [
    { text: link1Text, url: link1Url },
    { text: link2Text, url: link2Url },
    { text: link3Text, url: link3Url },
    { text: link4Text, url: link4Url },
    { text: link5Text, url: link5Url },
  ].filter((l) => l.text && l.url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData, "to:", recipientEmail);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", newsletterEmail);
  };

  return (
    <footer
      className="relative pt-16 md:pt-40 px-5 md:px-8 pb-8 overflow-hidden"
      style={{
        gridColumn: "1 / -1",
        backgroundColor: backgroundColor || "#5C0004",
      }}
    >
      {/* Background images — mobile vs desktop */}
      {(mobileBackgroundImage || backgroundImage) && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Mobile */}
          {(mobileBackgroundImage || backgroundImage) && (
            <Image
              src={mobileBackgroundImage || backgroundImage!}
              alt=""
              fill
              className="object-contain object-bottom md:hidden"
            />
          )}
          {/* Desktop */}
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-contain object-bottom hidden md:block"
            />
          )}
        </div>
      )}
      {/* Hero/Form Section */}
      <div className="pb-74 md:pb-235 relative flex flex-col justify-end">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {heading1 && (
            <h2
              className="mx-auto max-w-80 md:max-w-120 font-display font-bold text-5xl md:text-6xl text-dirt-off-white mb-2"
              style={{ lineHeight: "105%", letterSpacing: "-2%" }}
            >
              {fmt(heading1)}
            </h2>
          )}
          {heading2 && (
            <h2
              className="max-w-60 md:max-w-none mx-auto font-display font-bold text-5xl md:text-6xl text-dirt-pop mb-8"
              style={{ lineHeight: "105%", letterSpacing: "-2%" }}
            >
              {fmt(heading2)}
            </h2>
          )}
          {description && (
            <p className="text-dirt-off-white/80 font-sans text-lg mb-12">
              {description}
            </p>
          )}

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-6 max-w-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
            />
            <textarea
              placeholder="Tell us about your project"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop resize-none"
            />
            <button
              type="submit"
              className="px-8 py-4 flex items-center justify-center gap-1 bg-dirt-pop text-dirt-deep font-display font-bold uppercase text-lg hover:bg-dirt-pop-hover transition-all duration-300"
            >
              <Image
                src={`/90deg Arrow.png`}
                alt={`90 Degrees Arrow`}
                width={50}
                height={50}
                className={`w-6`}
              />
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Columns Section */}
      <div className="bg-dirt-deep p-6 md:p-12 relative">
        <div className="mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            {/* Column 1 - Logo & Description */}
            <div className={`col-span-2 md:col-span-1`}>
              {footerLogo && (
                <Image
                  src={footerLogo}
                  alt="Logo"
                  width={150}
                  height={50}
                  className="object-contain mb-4"
                />
              )}
              {footerDescription && (
                <p className="text-dirt-off-white/80 font-sans text-sm">
                  {footerDescription}
                </p>
              )}
            </div>

            {/* Column 2 - Newsletter */}
            <div className={`col-span-2`}>
              {newsletterHeading && (
                <h4 className="font-display font-bold text-lg text-dirt-pop uppercase mb-4">
                  {newsletterHeading}
                </h4>
              )}
              {newsletterDescription && (
                <p className="text-dirt-off-white/80 font-sans text-sm mb-4">
                  {newsletterDescription}
                </p>
              )}
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="grow px-3 py-2 bg-white text-dirt-deep font-sans text-sm placeholder:text-dirt-deep/50 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-dirt-pop text-dirt-deep font-display font-bold text-sm uppercase hover:bg-dirt-green transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Column 3 - Contact */}
            <div className={`col-span-2`}>
              {contactHeading && (
                <h4 className="font-display font-bold text-lg text-dirt-pop uppercase mb-4">
                  {contactHeading}
                </h4>
              )}
              {contactDescription && (
                <p className="text-dirt-off-white/80 font-sans text-sm whitespace-pre-line">
                  {contactDescription}
                </p>
              )}
            </div>

            {/* Column 4 - Links */}
            <div className={`col-span-2 md:col-span-1`}>
              {linksHeading && (
                <h4 className="font-display font-bold text-lg text-dirt-pop uppercase mb-4">
                  {linksHeading}
                </h4>
              )}
              <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-dirt-off-white/80 font-sans text-sm hover:text-dirt-pop transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          {separatorImage ? (
            <div className="relative h-0.5 mb-12">
              <Image
                src={separatorImage}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-px bg-dirt-off-white/20 mb-8" />
          )}

          {/* Copyright */}
          {copyrightText && (
            <p className="text-dirt-off-white/70 font-sans text-sm text-center">
              {copyrightText}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Right Badge */}
      {bottomRightText && bottomRightLink && (
          <a
              href={bottomRightLink}
              className="absolute right-0 bottom-0 px-3 py-2 max-w-48 bg-dirt-green text-dirt-deep text-center font-sans font-medium text-sm hover:bg-dirt-pop transition-colors"
              style={{ lineHeight: "115%", letterSpacing: "-2%" }}
          >
            {bottomRightText}
          </a>
      )}
    </footer>
  );
}
