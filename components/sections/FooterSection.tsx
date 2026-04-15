"use client";

import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { fmt } from "@/utils/formatText";
import { footerDefaults } from "@/config/section-defaults";

export interface FooterSectionProps {
  // Visibility
  showHeroForm?: boolean;
  // Hero area
  backgroundImage?: string;
  mobileBackgroundImage?: string;
  midgroundImage?: string;
  backgroundColor?: string;
  heading1?: string;
  heading1Uppercase?: boolean;
  heading2?: string;
  description?: string;
  // Form settings
  submitButtonText?: string;
  recipientEmail?: string;
  // Contact form delivery
  contactFormMode?: "smtp" | "activecampaign";
  contactListId?: string;
  contactTags?: string;
  // Footer columns
  footerLogo?: string;
  footerDescription?: string;
  // Newsletter column
  newsletterHeading?: string;
  newsletterChildren?: ReactNode;
  newsletterDescription?: string;
  newsletterListId?: string;
  newsletterTags?: string;
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

export function FooterSection(plasmicProps: FooterSectionProps) {
  // Merge: global defaults < Plasmic-provided props
  // Only non-undefined Plasmic props override the defaults
  const mergedProps = { ...footerDefaults };
  for (const [key, value] of Object.entries(plasmicProps)) {
    if (value !== undefined) {
      (mergedProps as Record<string, unknown>)[key] = value;
    }
  }

  const {
    showHeroForm = true,
    backgroundImage,
    mobileBackgroundImage,
    midgroundImage,
    backgroundColor,
    heading1,
    heading1Uppercase = false,
    heading2,
    description,
    submitButtonText,
    recipientEmail,
    contactFormMode = "smtp",
    contactListId,
    contactTags,
    footerLogo,
    footerDescription,
    newsletterHeading,
    newsletterChildren,
    newsletterDescription,
    newsletterListId,
    newsletterTags,
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
  } = mergedProps;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    heardAbout: "",
    referralName: "",
    message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [newsletterFirstName, setNewsletterFirstName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Midground positioning: start at desired top, but if image doesn't reach
  // the bottom of the footer, pin it to the bottom instead
  const footerRef = useRef<HTMLElement>(null);
  const [midgroundPos, setMidgroundPos] = useState<{ top: string } | { bottom: string }>({ bottom: "0" });
  const updateMidground = useCallback(() => {
    if (!footerRef.current || !midgroundImage) return;
    const footerHeight = footerRef.current.offsetHeight;
    const footerWidth = footerRef.current.offsetWidth;
    const desiredTop = Math.round(footerHeight * 0.15);
    const img = footerRef.current.querySelector<HTMLImageElement>("[data-midground]");
    const natW = img?.naturalWidth || 1920;
    const natH = img?.naturalHeight || 800;
    const imgScaledHeight = (footerWidth / natW) * natH;

    const imgBottom = desiredTop + imgScaledHeight;
    if (imgBottom < footerHeight) {
      // Image doesn't reach the bottom — pin to bottom
      setMidgroundPos({ bottom: "0" });
    } else {
      // Image reaches or overflows — use desired top
      setMidgroundPos({ top: `${desiredTop}px` });
    }
  }, [midgroundImage]);

  useEffect(() => {
    updateMidground();
    window.addEventListener("resize", updateMidground);
    return () => window.removeEventListener("resize", updateMidground);
  }, [updateMidground]);

  const links = [
    { text: link1Text, url: link1Url },
    { text: link2Text, url: link2Url },
    { text: link3Text, url: link3Url },
    { text: link4Text, url: link4Url },
    { text: link5Text, url: link5Url },
  ].filter((l) => l.text && l.url);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactSubmitting(true);

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mode: contactFormMode,
          listId: contactListId,
          tags: contactTags,
          subscribeToNewsletter,
          newsletterTags,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setContactSubmitted(true);
    } catch (err: any) {
      setContactError(err.message || "Something went wrong. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");
    setNewsletterSubmitting(true);

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
          firstName: newsletterFirstName,
          listId: newsletterListId,
          tags: newsletterTags,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setNewsletterFirstName("");
      setNewsletterEmail("");
      setNewsletterSubmitted(true);
    } catch (err: any) {
      setNewsletterError(err.message || "Something went wrong. Please try again.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`relative ${
        showHeroForm ? "pt-16 md:pt-40" : "pt-0 md:pt-250 xl:pt-300"
      } px-5 md:px-8 pb-110 md:pb-8 overflow-hidden`}
      style={{
        gridColumn: "1 / -1",
        backgroundColor: backgroundColor || "#5C0004",
      }}
    >
      {/* Background images — mobile vs desktop */}
      {(mobileBackgroundImage || backgroundImage) && (
        <>
          {/* Mobile */}
          <div
            className={`absolute inset-0 ${
              showHeroForm ? "" : "top-100"
            } pointer-events-none sm:hidden z-0`}
          >
            <Image
              src={mobileBackgroundImage || backgroundImage!}
              alt=""
              fill
              className="w-full object-cover object-[50%_300px]"
            />
          </div>

          {/* Desktop */}
          {backgroundImage && (
            <div
              className="absolute inset-0 pointer-events-none hidden sm:block z-0"
            >
              <Image
                src={backgroundImage}
                alt=""
                fill
                className={`${
                  showHeroForm
                    ? "object-contain 2xl:object-cover object-[50%_650px] xl:object-[50%_580px]"
                    : "object-cover object-[center_68%]"
                }`}
              />
            </div>
          )}
        </>
      )}

      {/* Hero/Form Section */}
      {showHeroForm && (
        <div className="pb-74 md:pb-235 relative z-[2] flex flex-col justify-end">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {heading1 && (
              <h2
                className={`mx-auto max-w-80 font-display font-bold text-5xl md:text-6xl text-dirt-off-white mb-2 ${
                  heading1Uppercase ? "md:max-w-150 uppercase" : "md:max-w-120"
                }`}
                style={{ lineHeight: "105%", letterSpacing: "-2%" }}
              >
                {fmt(heading1)}
              </h2>
            )}
            {heading2 && (
              <h2
                className={`max-w-60 md:max-w-none mx-auto font-display font-bold text-5xl md:text-6xl text-dirt-pop mb-8 ${
                  heading1Uppercase ? "uppercase" : ""
                }`}
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
            {contactSubmitted ? (
              <p className="text-2xl md:text-3xl font-display font-bold uppercase text-dirt-green">
                Thanks for reaching out! We'll be in touch soon.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex flex-col gap-6 max-w-xl"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
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
                <input
                  type="url"
                  placeholder="Website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
                />
                <select
                  value={formData.heardAbout}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heardAbout: e.target.value,
                      referralName: e.target.value !== "Referral" ? "" : formData.referralName,
                    })
                  }
                  required
                  className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans outline-none focus:ring-2 focus:ring-dirt-pop appearance-none"
                  style={!formData.heardAbout ? { color: "rgba(92, 0, 4, 0.5)" } : undefined}
                >
                  <option value="" disabled>How did you hear about us?</option>
                  <option value="Google">Google</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Podcast">Podcast</option>
                  <option value="Referral">Referral</option>
                </select>
                {formData.heardAbout === "Referral" && (
                  <input
                    type="text"
                    placeholder="Who referred you?"
                    value={formData.referralName}
                    onChange={(e) =>
                      setFormData({ ...formData, referralName: e.target.value })
                    }
                    className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
                  />
                )}
                <textarea
                  placeholder="What are you hoping DIRT can help you change, fix, or build?"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop resize-none"
                />
                <label className="flex items-center gap-3 text-left text-dirt-off-white font-sans text-base cursor-pointer select-none bg-dirt-deep/60 px-4 py-3 rounded">
                  <input
                    type="checkbox"
                    checked={subscribeToNewsletter}
                    onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                    className="w-5 h-5 accent-dirt-pop cursor-pointer"
                  />
                  I would like to opt in to the DIRT newsletter
                </label>
                {contactError && (
                  <p className="text-red-400 font-sans text-sm">{contactError}</p>
                )}
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="px-8 py-4 flex items-center justify-center gap-1 bg-dirt-pop text-dirt-deep font-display font-bold uppercase text-lg hover:bg-dirt-pop-hover disabled:opacity-50 transition-all duration-300"
                >
                  <Image
                    src={`/90deg Arrow.png`}
                    alt={`90 Degrees Arrow`}
                    width={50}
                    height={50}
                    className={`w-6`}
                  />
                  {contactSubmitting ? "Sending..." : submitButtonText}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Midground image — desktop only, between background and content */}
      {midgroundImage && (
        <div className="absolute left-0 right-0 pointer-events-none hidden sm:block z-[1]" style={midgroundPos}>
          <Image
            data-midground
            src={midgroundImage}
            alt=""
            width={1920}
            height={800}
            className="w-full h-auto"
            onLoad={updateMidground}
          />
        </div>
      )}

      {/* Footer Columns Section */}
      <div className={`bg-dirt-deep p-6 md:p-12 relative z-[2]`}>
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
              {newsletterChildren}
              {newsletterDescription && (
                <p className="text-dirt-off-white/80 font-sans text-sm mb-4">
                  {newsletterDescription}
                </p>
              )}
              {newsletterSubmitted ? (
                <p className="text-dirt-green font-display font-bold text-sm uppercase">
                  Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="First name"
                    value={newsletterFirstName}
                    onChange={(e) => setNewsletterFirstName(e.target.value)}
                    required
                    className="px-3 py-2 bg-white text-dirt-deep font-sans text-sm placeholder:text-dirt-deep/50 outline-none"
                  />
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="grow px-3 py-2 bg-white text-dirt-deep font-sans text-sm placeholder:text-dirt-deep/50 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={newsletterSubmitting}
                      className="px-4 py-2 bg-dirt-pop text-dirt-deep font-display font-bold text-sm uppercase hover:bg-dirt-green disabled:opacity-50 transition-colors"
                    >
                      {newsletterSubmitting ? "..." : "Subscribe"}
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-red-400 font-sans text-xs">{newsletterError}</p>
                  )}
                </form>
              )}
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
            <div className="relative h-0.5 mb-6 md:mb-12">
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
            <p className="mx-auto max-w-md text-dirt-off-white/50 font-sans text-sm text-center">
              {copyrightText}
            </p>
          )}

          {/* Legal links */}
          <div className="flex items-center justify-center gap-3 mt-1 font-sans text-sm">
            <a href="/privacy" data-custom-hover className="text-dirt-off-white/50 hover:text-dirt-pop transition-colors">Privacy Policy</a>
            <span className="text-dirt-off-white/20">|</span>
            <a href="/terms" data-custom-hover className="text-dirt-off-white/50 hover:text-dirt-pop transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>

      {/* Dirt Mound */}
      <img
        src={`/Mobile Footer DIRT Mound with Shovel.png`}
        alt=""
        className={`md:hidden absolute bottom-0 left-0 right-0 w-full h-auto object-contain z-[2]`}
      />
      <img
        src={`/Dirt and Shovel.png`}
        alt=""
        className={`hidden md:block absolute bottom-0 left-auto right-0 w-120 h-auto object-contain z-[2]`}
      />

      {/* Bottom Right Badge */}
      {bottomRightText && bottomRightLink && (
        <a
          href={bottomRightLink}
          target="_blank"
          className="absolute right-0 bottom-0 px-3 py-2 max-w-48 bg-dirt-green text-dirt-deep text-center font-sans font-medium text-sm hover:bg-dirt-pop transition-colors z-[3]"
          style={{ lineHeight: "115%", letterSpacing: "-2%" }}
        >
          {bottomRightText}
        </a>
      )}
    </footer>
  );
}
