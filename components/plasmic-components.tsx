import { registerComponent } from "@plasmicapp/host";
import { HeroSection } from "./sections/HeroSection";
import { CompanyCarouselSection } from "./sections/CompanyCarouselSection";
import { BrandItem } from "./sections/BrandItem";
import { TestimonialSection } from "./sections/TestimonialSection";
import { PainPointsSection } from "./sections/PainPointsSection";
import { PainPointCheckbox } from "./sections/PainPointCheckbox";
import { PainPointSlide } from "./sections/PainPointSlide";
import { InfoSection } from "./sections/InfoSection";
import { DirtRichText } from "./sections/DirtRichText";
import { ContactFormSection } from "./sections/ContactFormSection";
import { SignsCTASection } from "./sections/SignsCTASection";
import { SignsCTAItem } from "./sections/SignsCTAItem";
import { ThreeReasonsSection } from "./sections/ThreeReasonsSection";
import { ThreeReasonsItem } from "./sections/ThreeReasonsItem";
import { DirtFrameworkSection } from "./sections/DirtFrameworkSection";
import { DirtFrameworkBlock } from "./sections/DirtFrameworkBlock";
import { DirtProcessSection } from "./sections/DirtProcessSection";
import { DirtProcessStep } from "./sections/DirtProcessStep";
import { DirtFilesSection } from "./sections/DirtFilesSection";
import { DirtFile } from "./sections/DirtFile";
import { DirtFileSubItem } from "./sections/DirtFileSubItem";
import { ProsConsSection } from "./sections/ProsConsSection";
import { ProsConsItem } from "./sections/ProsConsItem";
import { FooterSection } from "./sections/FooterSection";
import { WhatWeBelieveSection } from "./sections/WhatWeBelieveSection";
import { WhatWeBelieveItem } from "./sections/WhatWeBelieveItem";
import { WhatWeBelieveDetail } from "./sections/WhatWeBelieveDetail";

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

// Brand Item - individual brand for the carousel
registerComponent(BrandItem, {
  name: "BrandItem",
  props: {
    title: "string",
    image: "imageUrl",
    altText: "string",
    link: "string",
  },
  importPath: "./components/sections/BrandItem",
});

// Company Carousel Section - horizontal scrolling brand logos
registerComponent(CompanyCarouselSection, {
  name: "CompanyCarouselSection",
  props: {
    heading: "string",
    highlightedWord: "string",
    backgroundImage: "imageUrl",
    children: {
      type: "slot",
      defaultValue: [
        {
          type: "component",
          name: "BrandItem",
          props: { title: "Brand 1" },
        },
        {
          type: "component",
          name: "BrandItem",
          props: { title: "Brand 2" },
        },
      ],
    },
  },
  importPath: "./components/sections/CompanyCarouselSection",
});

// Testimonial Section - quote with author info
registerComponent(TestimonialSection, {
  name: "TestimonialSection",
  props: {
    backgroundColor: {
      type: "choice",
      options: ["dirt-deep", "dirt-pop", "dirt-green", "dirt-blue", "dirt-off-white", "white", "black", "custom"],
    },
    customBackgroundColor: "string",
    textColor: {
      type: "choice",
      options: ["dirt-deep", "dirt-pop", "dirt-green", "dirt-blue", "dirt-off-white", "white", "black", "custom"],
    },
    customTextColor: "string",
    logo: "imageUrl",
    body: "string",
    authorName: "string",
    authorRole: "string",
    authorPhoto: "imageUrl",
  },
  importPath: "./components/sections/TestimonialSection",
});

// Pain Point Checkbox - branded checkbox for the PainPointsSection
registerComponent(PainPointCheckbox, {
  name: "PainPointCheckbox",
  props: {
    label: "string",
  },
  importPath: "./components/sections/PainPointCheckbox",
});

// Pain Point Slide - image with caption for the PainPointsSection
registerComponent(PainPointSlide, {
  name: "PainPointSlide",
  props: {
    image: "imageUrl",
    caption: "string",
  },
  importPath: "./components/sections/PainPointSlide",
});

// Pain Points Section - interactive checklist with changing images
registerComponent(PainPointsSection, {
  name: "PainPointsSection",
  props: {
    heading: "string",
    subheading: "string",
    children: {
      type: "slot",
      displayName: "Checkboxes",
      defaultValue: [
        {
          type: "component",
          name: "PainPointCheckbox",
          props: { label: "Pain point 1" },
        },
        {
          type: "component",
          name: "PainPointCheckbox",
          props: { label: "Pain point 2" },
        },
        {
          type: "component",
          name: "PainPointCheckbox",
          props: { label: "Pain point 3" },
        },
      ],
    },
    slides: {
      type: "slot",
      displayName: "Slides",
      defaultValue: [
        {
          type: "component",
          name: "PainPointSlide",
          props: { caption: "Default" },
        },
        {
          type: "component",
          name: "PainPointSlide",
          props: { caption: "Slide 2" },
        },
      ],
    },
  },
  importPath: "./components/sections/PainPointsSection",
});

// Info Section - h2 heading with two columns (image and info)
registerComponent(InfoSection, {
  name: "InfoSection",
  props: {
    heading: { type: "string", displayName: "Heading Start" },
    headingHighlight: { type: "string", displayName: "Heading Highlight" },
    headingEnd: { type: "string", displayName: "Heading End" },
    subheading: "string",
    richText: {
      type: "slot",
      defaultValue: [],
    },
    image: "imageUrl",
    ctaLabel: "string",
    ctaLink: "string",
    layout: {
      type: "choice",
      options: ["imageLeft", "imageRight"],
    },
  },
  importPath: "./components/sections/InfoSection",
});

// Dirt Rich Text - paragraph with highlighted words, grungy underlines & tooltips
registerComponent(DirtRichText, {
  name: "DirtRichText",
  props: {
    text: { type: "string", displayName: "Rich Text" },
    textColour: {
      type: "choice",
      displayName: "Text Colour",
      options: [
        "dirt-black",
        "dirt-deep",
        "dirt-pop",
        "dirt-green",
        "dirt-blue",
        "dirt-off-white",
        "white",
        "black",
        "custom",
      ],
      defaultValue: "dirt-black",
    },
    customTextColour: {
      type: "string",
      displayName: "Custom Text Colour (hex)",
      hidden: (props: any) => props.textColour !== "custom",
    },
  },
  importPath: "./components/sections/DirtRichText",
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

// Signs CTA Item - plus icon with text
registerComponent(SignsCTAItem, {
  name: "SignsCTAItem",
  props: {
    text: "string",
  },
  importPath: "./components/sections/SignsCTAItem",
});

// Signs CTA Section - heading with plus icons and CTA
registerComponent(SignsCTASection, {
  name: "SignsCTASection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    children: {
      type: "slot",
      displayName: "Items",
      defaultValue: [
        {
          type: "component",
          name: "SignsCTAItem",
          props: { text: "Sign 1" },
        },
        {
          type: "component",
          name: "SignsCTAItem",
          props: { text: "Sign 2" },
        },
        {
          type: "component",
          name: "SignsCTAItem",
          props: { text: "Sign 3" },
        },
      ],
    },
    ctaLabel: "string",
    ctaLink: "string",
  },
  importPath: "./components/sections/SignsCTASection",
});

// Three Reasons Item - numbered reason with heading and description
registerComponent(ThreeReasonsItem, {
  name: "ThreeReasonsItem",
  props: {
    heading: "string",
    description: "string",
  },
  importPath: "./components/sections/ThreeReasonsItem",
});

// Three Reasons Section - header with description and image, plus numbered reasons
registerComponent(ThreeReasonsSection, {
  name: "ThreeReasonsSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    description: "string",
    headerImage: "imageUrl",
    children: {
      type: "slot",
      displayName: "Reasons",
      defaultValue: [
        {
          type: "component",
          name: "ThreeReasonsItem",
          props: { heading: "Reason 1", description: "Description for reason 1" },
        },
        {
          type: "component",
          name: "ThreeReasonsItem",
          props: { heading: "Reason 2", description: "Description for reason 2" },
        },
        {
          type: "component",
          name: "ThreeReasonsItem",
          props: { heading: "Reason 3", description: "Description for reason 3" },
        },
      ],
    },
  },
  importPath: "./components/sections/ThreeReasonsSection",
});

// Dirt Framework Block - individual block for the framework section
registerComponent(DirtFrameworkBlock, {
  name: "DirtFrameworkBlock",
  props: {
    heading: "string",
    description: "string",
    backgroundImage: "imageUrl",
    overlayColor: {
      type: "choice",
      displayName: "Overlay Colour",
      options: ["dirt-deep", "dirt-pop", "dirt-green", "dirt-blue", "dirt-off-white", "dirt-black"],
      defaultValue: "dirt-deep",
    },
  },
  importPath: "./components/sections/DirtFrameworkBlock",
});

// Dirt Framework Section - stacked blocks that expand on scroll
registerComponent(DirtFrameworkSection, {
  name: "DirtFrameworkSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    description: "string",
    reversed: "boolean",
    children: {
      type: "slot",
      displayName: "Blocks",
      defaultValue: [
        {
          type: "component",
          name: "DirtFrameworkBlock",
          props: { heading: "Block 1" },
        },
        {
          type: "component",
          name: "DirtFrameworkBlock",
          props: { heading: "Block 2" },
        },
        {
          type: "component",
          name: "DirtFrameworkBlock",
          props: { heading: "Block 3" },
        },
      ],
    },
  },
  importPath: "./components/sections/DirtFrameworkSection",
});

// Dirt Process Step - individual step with heading, description, image and tags
registerComponent(DirtProcessStep, {
  name: "DirtProcessStep",
  props: {
    heading: "string",
    description: "string",
    image: "imageUrl",
    tags: { type: "string", displayName: "Tags (comma-separated)" },
  },
  importPath: "./components/sections/DirtProcessStep",
});

// Dirt Process Section - alternating image/info columns with tags
registerComponent(DirtProcessSection, {
  name: "DirtProcessSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    children: {
      type: "slot",
      displayName: "Steps",
      defaultValue: [
        {
          type: "component",
          name: "DirtProcessStep",
          props: { heading: "Step 1" },
        },
        {
          type: "component",
          name: "DirtProcessStep",
          props: { heading: "Step 2" },
        },
        {
          type: "component",
          name: "DirtProcessStep",
          props: { heading: "Step 3" },
        },
      ],
    },
    bottomHeading: "string",
    bottomDescription: "string",
  },
  importPath: "./components/sections/DirtProcessSection",
});

// Dirt File Sub Item - individual item inside a file accordion
registerComponent(DirtFileSubItem, {
  name: "DirtFileSubItem",
  props: {
    heading: "string",
    description: "string",
  },
  importPath: "./components/sections/DirtFileSubItem",
});

// Dirt File - individual file for the accordion
registerComponent(DirtFile, {
  name: "DirtFile",
  props: {
    heading: "string",
    tag1: "string",
    tag2: "string",
    buttonLabel: "string",
    buttonLink: "string",
    image: "imageUrl",
    children: {
      type: "slot",
      displayName: "Sub Items",
      defaultValue: [
        {
          type: "component",
          name: "DirtFileSubItem",
          props: { heading: "Item 1", description: "Description for item 1" },
        },
        {
          type: "component",
          name: "DirtFileSubItem",
          props: { heading: "Item 2", description: "Description for item 2" },
        },
      ],
    },
  },
  importPath: "./components/sections/DirtFile",
});

// Dirt Files Section - accordion with changing images
registerComponent(DirtFilesSection, {
  name: "DirtFilesSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    description: "string",
    children: {
      type: "slot",
      displayName: "Files",
      defaultValue: [
        {
          type: "component",
          name: "DirtFile",
          props: { heading: "File 1" },
        },
        {
          type: "component",
          name: "DirtFile",
          props: { heading: "File 2" },
        },
        {
          type: "component",
          name: "DirtFile",
          props: { heading: "File 3" },
        },
      ],
    },
  },
  importPath: "./components/sections/DirtFilesSection",
});

// Pros Cons Item - individual item for the pros/cons columns
registerComponent(ProsConsItem, {
  name: "ProsConsItem",
  props: {
    text: "string",
  },
  importPath: "./components/sections/ProsConsItem",
});

// Pros and Cons Section - two columns with x/check icons
registerComponent(ProsConsSection, {
  name: "ProsConsSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    consHeading: "string",
    prosHeading: "string",
    cons: {
      type: "slot",
      displayName: "Cons",
      defaultValue: [
        {
          type: "component",
          name: "ProsConsItem",
          props: { text: "Con 1" },
        },
        {
          type: "component",
          name: "ProsConsItem",
          props: { text: "Con 2" },
        },
        {
          type: "component",
          name: "ProsConsItem",
          props: { text: "Con 3" },
        },
      ],
    },
    pros: {
      type: "slot",
      displayName: "Pros",
      defaultValue: [
        {
          type: "component",
          name: "ProsConsItem",
          props: { text: "Pro 1" },
        },
        {
          type: "component",
          name: "ProsConsItem",
          props: { text: "Pro 2" },
        },
        {
          type: "component",
          name: "ProsConsItem",
          props: { text: "Pro 3" },
        },
      ],
    },
    ctaLabel: { type: "string", displayName: "CTA Label" },
    ctaLink: { type: "string", displayName: "CTA Link" },
    tagline: "string",
  },
  importPath: "./components/sections/ProsConsSection",
});

// What We Believe - list item (left column)
registerComponent(WhatWeBelieveItem, {
  name: "WhatWeBelieveItem",
  props: {
    label: "string",
  },
  importPath: "./components/sections/WhatWeBelieveItem",
});

// What We Believe - detail panel (right column)
registerComponent(WhatWeBelieveDetail, {
  name: "WhatWeBelieveDetail",
  props: {
    image: "imageUrl",
    heading: "string",
    description: "string",
  },
  importPath: "./components/sections/WhatWeBelieveDetail",
});

// What We Believe Section - interactive list with changing right column
registerComponent(WhatWeBelieveSection, {
  name: "WhatWeBelieveSection",
  props: {
    heading: "string",
    children: {
      type: "slot",
      displayName: "List Items",
      defaultValue: [
        {
          type: "component",
          name: "WhatWeBelieveItem",
          props: { label: "Belief 1" },
        },
        {
          type: "component",
          name: "WhatWeBelieveItem",
          props: { label: "Belief 2" },
        },
        {
          type: "component",
          name: "WhatWeBelieveItem",
          props: { label: "Belief 3" },
        },
      ],
    },
    details: {
      type: "slot",
      displayName: "Detail Panels",
      defaultValue: [
        {
          type: "component",
          name: "WhatWeBelieveDetail",
          props: { heading: "Detail 1", description: "Description for belief 1" },
        },
        {
          type: "component",
          name: "WhatWeBelieveDetail",
          props: { heading: "Detail 2", description: "Description for belief 2" },
        },
        {
          type: "component",
          name: "WhatWeBelieveDetail",
          props: { heading: "Detail 3", description: "Description for belief 3" },
        },
      ],
    },
  },
  importPath: "./components/sections/WhatWeBelieveSection",
});

// Footer Section - hero form with footer columns
registerComponent(FooterSection, {
  name: "FooterSection",
  props: {
    // Hero area
    backgroundImage: "imageUrl",
    backgroundColor: "string",
    heading1: "string",
    heading2: "string",
    description: "string",
    // Form settings
    submitButtonText: "string",
    recipientEmail: "string",
    // Footer columns
    footerLogo: "imageUrl",
    footerDescription: "string",
    // Newsletter column
    newsletterHeading: "string",
    newsletterDescription: "string",
    // Contact column
    contactHeading: "string",
    contactDescription: "string",
    // Links column
    linksHeading: "string",
    link1Text: "string",
    link1Url: "string",
    link2Text: "string",
    link2Url: "string",
    link3Text: "string",
    link3Url: "string",
    link4Text: "string",
    link4Url: "string",
    link5Text: "string",
    link5Url: "string",
    // Bottom bar
    separatorImage: "imageUrl",
    copyrightText: "string",
    bottomRightText: "string",
    bottomRightLink: "string",
  },
  importPath: "./components/sections/FooterSection",
});
