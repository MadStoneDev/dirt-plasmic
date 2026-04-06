import type { FooterSectionProps } from "@/components/sections/FooterSection";

/**
 * Global defaults for section components.
 *
 * These values are used when no prop is supplied from Plasmic.
 * To override on a specific page, simply set the prop in Plasmic Studio —
 * any explicitly provided value takes priority over these defaults.
 */

export const footerDefaults: Partial<FooterSectionProps> = {
  backgroundColor: "#5C0004",
  backgroundImage: "/plasmic/dirt/images/footerImagePng.png",
  mobileBackgroundImage: "/plasmic/dirt/images/mobileFooterDirtBackgroundPng.png",

  // Hero / Form
  heading1: "Brilliant brands don\u2019t grow on trees.",
  heading2: "They grow in the DIRT.",
  description: "Tell us your DIRTiest dreams and we\u2019ll make them come true:",
  submitButtonText: "Get Dirty",
  recipientEmail: "hello@thedirtagency.com",

  // Footer columns
  footerLogo: "/plasmic/dirt/images/dirtLogoPng.png",
  footerDescription: "Fresh messaging, branding, and positioning from the ground up.",

  // Newsletter
  newsletterHeading: "Get DIRT Dispatch",
  newsletterDescription:
    "Gritty strategic insights to help you win more clients. Delivered with love (and a smidge of mud) once monthly.",

  // Contact
  contactHeading: "Refer & Earn",
  contactDescription:
    "Dig what we\u2019re doing but don\u2019t need us at the moment? Refer a client to DIRT. \n\nWhen they sign on, we\u2019ll send you a 5% referral fee. (A little thank you for spreading the DIRT)",

  // Links
  linksHeading: "Get your hands Dirty",
  link1Text: "About",
  link1Url: "/about",
  link2Text: "Contact",
  link2Url: "/contact",

  // Bottom bar
  separatorImage: "/plasmic/dirt/images/line2Png.png",
  copyrightText: "\u00a9 2026 DIRT Agency. All rights reserved. Built from the ground up.",
  bottomRightText: "Click here to toss some DIRT on the competition",
  bottomRightLink: "/",
};
