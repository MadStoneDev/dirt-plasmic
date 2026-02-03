import { registerComponent } from "@plasmicapp/host";
import { HeroSection } from "./sections/HeroSection";
import { CompanyCarouselSection } from "./sections/CompanyCarouselSection";
import { TestimonialSection } from "./sections/TestimonialSection";
import { PainPointsSection } from "./sections/PainPointsSection";
import { InfoSection } from "./sections/InfoSection";
import { ContactFormSection } from "./sections/ContactFormSection";

// Hero Section - parallax hero with multiple image layers
registerComponent(HeroSection, {
  name: "HeroSection",
  props: {
    heading: "string",
    subheading: "string",
    description: "string",
    backgroundImage: "imageUrl",
    midgroundImage: "imageUrl",
    foregroundImage: "imageUrl",
    ctaLabel: "string",
    ctaLink: "string",
  },
  importPath: "./components/sections/HeroSection",
});

// Company Carousel Section - horizontal scrolling brand logos
// Note: brands array needs to be managed in code for now
registerComponent(CompanyCarouselSection, {
  name: "CompanyCarouselSection",
  props: {
    heading: "string",
    highlightedWord: "string",
    backgroundImage: "imageUrl",
  },
  importPath: "./components/sections/CompanyCarouselSection",
});

// Testimonial Section - quote with author info
registerComponent(TestimonialSection, {
  name: "TestimonialSection",
  props: {
    backgroundColor: {
      type: "choice",
      options: ["dirt-deep", "dirt-pop", "dirt-green", "white", "black", "custom"],
    },
    customBackgroundColor: "string",
    customTextColor: {
      type: "choice",
      options: ["light", "dark"],
    },
    logo: "imageUrl",
    body: "string",
    authorName: "string",
    authorRole: "string",
    authorPhoto: "imageUrl",
  },
  importPath: "./components/sections/TestimonialSection",
});

// Pain Points Section - interactive checklist with changing images
// Note: checkboxItems managed separately for simplicity
registerComponent(PainPointsSection, {
  name: "PainPointsSection",
  props: {
    heading: "string",
    subheading: "string",
    image0: "imageUrl",
    image1: "imageUrl",
    image2: "imageUrl",
    image3: "imageUrl",
    image4: "imageUrl",
    image5: "imageUrl",
  },
  importPath: "./components/sections/PainPointsSection",
});

// Info Section - text with optional image
registerComponent(InfoSection, {
  name: "InfoSection",
  props: {
    heading: "string",
    content: "string",
    image: "imageUrl",
    layout: {
      type: "choice",
      options: ["imageLeft", "imageRight", "noImage"],
    },
  },
  importPath: "./components/sections/InfoSection",
});

// Contact Form Section
registerComponent(ContactFormSection, {
  name: "ContactFormSection",
  props: {
    heading: "string",
    subheading: "string",
    submitButtonText: "string",
    successMessage: "string",
  },
  importPath: "./components/sections/ContactFormSection",
});
