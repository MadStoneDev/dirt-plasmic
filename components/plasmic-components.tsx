import { registerComponent } from "@plasmicapp/host";
import { HeroSection } from "./sections/HeroSection";
import { CompanyCarouselSection } from "./sections/CompanyCarouselSection";
import { BrandItem } from "./sections/BrandItem";
import { TestimonialSection } from "./sections/TestimonialSection";
import { PainPointsSection } from "./sections/PainPointsSection";
import { InfoSection } from "./sections/InfoSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { SignsCTASection } from "./sections/SignsCTASection";
import { ThreeReasonsSection } from "./sections/ThreeReasonsSection";
import { DirtFrameworkSection } from "./sections/DirtFrameworkSection";
import { DirtProcessSection } from "./sections/DirtProcessSection";
import { DirtFilesSection } from "./sections/DirtFilesSection";
import { ProsConsSection } from "./sections/ProsConsSection";
import { FooterSection } from "./sections/FooterSection";

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

// Pain Points Section - interactive checklist with changing images
registerComponent(PainPointsSection, {
  name: "PainPointsSection",
  props: {
    heading: "string",
    subheading: "string",
    caption: "string",
    children: {
      type: "slot",
      defaultValue: [],
    },
    image0: "imageUrl",
    image1: "imageUrl",
    image2: "imageUrl",
    image3: "imageUrl",
    image4: "imageUrl",
    image5: "imageUrl",
    image6: "imageUrl",
    image7: "imageUrl",
    image8: "imageUrl",
    image9: "imageUrl",
  },
  importPath: "./components/sections/PainPointsSection",
});

// Info Section - h2 heading with two columns (image and info)
registerComponent(InfoSection, {
  name: "InfoSection",
  props: {
    heading: "string",
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

// Signs CTA Section - heading with 3 plus icons and CTA
registerComponent(SignsCTASection, {
  name: "SignsCTASection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    item1Text: "string",
    item2Text: "string",
    item3Text: "string",
    ctaLabel: "string",
    ctaLink: "string",
  },
  importPath: "./components/sections/SignsCTASection",
});

// Three Reasons Section - header with description and image, plus 3 numbered reasons
registerComponent(ThreeReasonsSection, {
  name: "ThreeReasonsSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    description: "string",
    headerImage: "imageUrl",
    reason1Heading: "string",
    reason1Description: "string",
    reason2Heading: "string",
    reason2Description: "string",
    reason3Heading: "string",
    reason3Description: "string",
  },
  importPath: "./components/sections/ThreeReasonsSection",
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
    block1Heading: "string",
    block1Description: "string",
    block1BackgroundImage: "imageUrl",
    block2Heading: "string",
    block2Description: "string",
    block2BackgroundImage: "imageUrl",
    block3Heading: "string",
    block3Description: "string",
    block3BackgroundImage: "imageUrl",
    block4Heading: "string",
    block4Description: "string",
    block4BackgroundImage: "imageUrl",
    block5Heading: "string",
    block5Description: "string",
    block5BackgroundImage: "imageUrl",
  },
  importPath: "./components/sections/DirtFrameworkSection",
});

// Dirt Process Section - alternating image/info columns with tags
registerComponent(DirtProcessSection, {
  name: "DirtProcessSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    step1Heading: "string",
    step1Description: "string",
    step1Image: "imageUrl",
    step1Tags: "string",
    step2Heading: "string",
    step2Description: "string",
    step2Image: "imageUrl",
    step2Tags: "string",
    step3Heading: "string",
    step3Description: "string",
    step3Image: "imageUrl",
    step3Tags: "string",
    step4Heading: "string",
    step4Description: "string",
    step4Image: "imageUrl",
    step4Tags: "string",
    step5Heading: "string",
    step5Description: "string",
    step5Image: "imageUrl",
    step5Tags: "string",
    bottomHeading: "string",
    bottomDescription: "string",
  },
  importPath: "./components/sections/DirtProcessSection",
});

// Dirt Files Section - accordion with changing images
registerComponent(DirtFilesSection, {
  name: "DirtFilesSection",
  props: {
    headingStart: "string",
    headingHighlight: "string",
    headingEnd: "string",
    description: "string",
    // File 1
    file1Heading: "string",
    file1Tag1: "string",
    file1Tag2: "string",
    file1ButtonLabel: "string",
    file1ButtonLink: "string",
    file1Image: "imageUrl",
    file1Item1Heading: "string",
    file1Item1Description: "string",
    file1Item2Heading: "string",
    file1Item2Description: "string",
    file1Item3Heading: "string",
    file1Item3Description: "string",
    // File 2
    file2Heading: "string",
    file2Tag1: "string",
    file2Tag2: "string",
    file2ButtonLabel: "string",
    file2ButtonLink: "string",
    file2Image: "imageUrl",
    file2Item1Heading: "string",
    file2Item1Description: "string",
    file2Item2Heading: "string",
    file2Item2Description: "string",
    file2Item3Heading: "string",
    file2Item3Description: "string",
    // File 3
    file3Heading: "string",
    file3Tag1: "string",
    file3Tag2: "string",
    file3ButtonLabel: "string",
    file3ButtonLink: "string",
    file3Image: "imageUrl",
    file3Item1Heading: "string",
    file3Item1Description: "string",
    file3Item2Heading: "string",
    file3Item2Description: "string",
    file3Item3Heading: "string",
    file3Item3Description: "string",
  },
  importPath: "./components/sections/DirtFilesSection",
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
    con1: "string",
    con2: "string",
    con3: "string",
    con4: "string",
    con5: "string",
    con6: "string",
    con7: "string",
    con8: "string",
    pro1: "string",
    pro2: "string",
    pro3: "string",
    pro4: "string",
    pro5: "string",
    pro6: "string",
    pro7: "string",
    pro8: "string",
  },
  importPath: "./components/sections/ProsConsSection",
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
