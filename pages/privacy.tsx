import React from "react";
import { SEO } from "../components/SEO";
import { DirtNav } from "../components/sections/DirtNav";
import { DirtNavLink } from "../components/sections/DirtNavLink";
import { FooterSection } from "../components/sections/FooterSection";

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-4 flex flex-col gap-2">{children}</ul>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-dirt-deep mb-4">
        {title}
      </h2>
      <div className="font-sans text-base md:text-lg text-dirt-black/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - DIRT"
        description="How DIRT Creative collects, uses and protects your personal information."
      />
      <div className="min-h-screen flex flex-col">
        <DirtNav
          logo="/plasmic/dirt/images/dirtFinalIdentityLogos06Png.png"
          menuBackground="dirt-pop"
          menuImage="/plasmic/dirt/images/menuImagePng.png"
          navBackground="dirt-deep"
          stickyOnScroll={true}
          actions={
            <a
              href="/contact"
              data-custom-hover
              className="font-display font-bold uppercase text-dirt-deep bg-dirt-pop hover:bg-dirt-pop-hover px-5 py-2 text-sm transition-colors"
            >
              Contact Us
            </a>
          }
          menuLinks={
            <>
              <DirtNavLink href="/about" label="About" />
              <DirtNavLink href="/contact" label="Contact" />
            </>
          }
        />

        <main className="grow bg-dirt-off-white px-5 md:px-8 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h1
              className="font-display font-bold uppercase text-dirt-pop text-4xl md:text-7xl mb-2"
              style={{ lineHeight: "105%", letterSpacing: "-2%" }}
            >
              Privacy Policy
            </h1>
            <p className="font-sans text-sm text-dirt-deep/50 mb-12">
              Last updated: 31 March 2026
            </p>

            <Section title="What Information is Collected?">
              <P>
                This Privacy Policy is designed to help you understand how we
                collect and use the personal information you provide to us and to
                assist you in making informed decisions when using our site and
                our products and services. References in this document to
                &ldquo;us,&rdquo; &ldquo;our,&rdquo; and &ldquo;we&rdquo; refer
                to Dirt Creative Pty Ltd.
              </P>
              <P>
                When you visit this website you may provide two types of
                information: personal information (such as your first name and
                email address) you knowingly choose to disclose that is collected
                on an individual basis and website use information collected on
                an aggregate basis as you and others browse the site.
              </P>
              <P><strong>Personal Information You Choose to Provide</strong></P>
              <P>
                <em>Registration Information</em> &ndash; you will provide
                information about yourself, your firm or company, and your
                practices when you purchase our products and services, register
                for community support, or register for email newsletters and
                alerts.
              </P>
              <P>
                <em>Email Information</em> &ndash; if you choose to correspond
                via email, we may retain the content of your email messages
                together with your email address and the responses.
              </P>
            </Section>

            <Section title="How Do We Use the Information That You Provide to Us?">
              <P>
                Broadly speaking, we use personal information for purposes of
                administering and expanding our business activities, providing
                customer service and making available other products and services
                to our customers and prospective customers. Occasionally, we may
                also use the information we collect to notify you about important
                changes to this website, new services and special offers we think
                you will find valuable. You may notify us of your desire not to
                receive these offers by clicking the unsubscribe link contained
                in each such email.
              </P>
            </Section>

            <Section title="Website Use Information">
              <P>
                Similar to other commercial websites, this site utilises a
                standard technology called &ldquo;cookies&rdquo; and Web server
                logs to collect information about how this site is used.
                Information gathered through cookies and web server logs may
                include the date and time of visits, the pages viewed, time spent
                at this site, and the websites visited just before and just after
                our site.
              </P>
              <P>
                <strong>What Are Cookies?</strong> A cookie is a very small text
                document, which often includes an anonymous unique identifier.
                When you visit a website, that site&rsquo;s computer asks your
                computer for permission to store this file in a part of your hard
                drive specifically designated for cookies. Each website can send
                its own cookie to your browser if your browser&rsquo;s
                preferences allow it, but (to protect your privacy) your browser
                only permits a website to access the cookies it has already sent
                to you, not the cookies sent to you by other sites. Some of our
                business partners (e.g., advertisers) use cookies that originate
                from their sites. We have no access or control over those
                cookies.
              </P>
              <P>
                <strong>How Do We Use Information We Collect from Cookies?</strong>{" "}
                As you use this website, the site uses its cookies to
                differentiate you from other users. In some cases, we also use
                cookies to prevent you from seeing unnecessary advertisements or
                requiring you to log in more than is necessary for security.
                Cookies, in conjunction with our web server&rsquo;s log files,
                allow us to calculate the aggregate number of people visiting
                this site and which parts of the site are most popular. Cookies
                do not allow us to gather any personal information about you and
                we do not generally store any personal information that you
                provided to us in your cookies. By consenting and continuing to
                visit our site, you consent to the placement of cookies on your
                device.
              </P>
            </Section>

            <Section title="Sharing Information with Third Parties">
              <P>
                The information we collect is used to improve the content of this
                site and the quality of our service, and is not shared with or
                sold to other organisations for commercial purposes. That being
                said, your information could be shared under the following
                circumstances:
              </P>
              <List>
                <li>
                  We use third parties to facilitate our business, including, but
                  not limited to, sending email and processing payments. These
                  third parties may have access to your personal information for
                  use in connection with those business activities.
                </li>
                <li>
                  As we develop our business, we may buy or sell assets or
                  business offerings. Customer, email, and visitor information is
                  generally one of the transferred business assets in these types
                  of transactions.
                </li>
                <li>
                  We may also transfer such information in the course of
                  corporate divestitures, mergers, or any dissolution.
                </li>
                <li>
                  If it becomes necessary to share information in order to
                  investigate, prevent, or take action regarding illegal
                  activities, suspected fraud, situations involving potential
                  threats to the physical safety of any person, violations of our
                  Terms of Service, or as otherwise required by law.
                </li>
              </List>
            </Section>

            <Section title="Notice of New Services and Changes">
              <P>
                Occasionally, we may also use the information we collect to
                notify you about important changes to this website, new services,
                and special offers we think you will find valuable. As our
                customer, you will be given the opportunity to notify us of your
                desire not to receive these offers by clicking the unsubscribe
                link contained in each such email.
              </P>
            </Section>

            <Section title="How Do We Secure Information Transmissions?">
              <P>
                Email is not recognised as a secure medium of communication. For
                this reason, we request that you do not send private information
                to us by email. Some of the information you may enter on this
                site may be transmitted securely via Secure Sockets Layer SSL,
                128 bit encryption services. Pages utilising this technology will
                have URLs that start with HTTPS instead of HTTP.
              </P>
            </Section>

            <Section title="Certain Disclosures">
              <P>
                We may disclose your personal information if required to do so by
                law or subpoena or if we believe that such action is necessary to
                (a) conform to the law or comply with legal process served on us
                or affiliated parties; (b) protect and defend our rights and
                property, our site, the users of our site, and/or our affiliated
                parties; (c) act under circumstances to protect the safety of
                users of our site, us, or third parties.
              </P>
            </Section>

            <Section title="What About Other Websites Linked to This Site?">
              <P>
                We are not responsible for the practices employed by websites
                linked to or from our site nor the information or content
                contained therein. Often links to other websites are provided
                solely as pointers to information on topics that may be useful to
                the users of our site. Please remember that when you use a link
                to go from our site to another website, our Privacy Policy is no
                longer in effect. Your browsing and interaction on any other
                website, including sites which have a link on our site, is
                subject to that website&rsquo;s own rules and policies. Please
                read over those rules and policies before proceeding.
              </P>
            </Section>

            <Section title="Our Responsibilities Under the GDPR and UK Data Protection Regulations">
              <P>
                If you are a resident of the European Economic Area (EEA) or the
                UK you have certain rights and protections under the GDPR and UK
                Regulations regarding the processing of your personal
                information. We are a controller under the GDPR and UK
                Regulations as we collect, use and store your personal
                information to enable us to provide you with our goods and/or
                services and information about them.
              </P>
              <P>We rely on the following lawful means of processing your personal information:</P>
              <List>
                <li>
                  Where it is necessary to fulfil a contract with you. This
                  includes where we collect your personal information to enable
                  us to send you course materials.
                </li>
                <li>
                  Where you have given us valid consent to use your personal
                  information, we will rely on that consent, and only use the
                  personal information for the specific purpose for which you
                  have given consent.
                </li>
                <li>
                  We may also process your personal information where it is to
                  further our legitimate interests where they are overridden by
                  your rights or interests.
                </li>
              </List>
            </Section>

            <Section title="Your Rights">
              <P>If you are an EEA or UK resident, you have various rights including the:</P>
              <List>
                <li>Right to be informed</li>
                <li>Right of access</li>
                <li>Right to rectification</li>
                <li>Right to object</li>
                <li>Right to restriction of processing</li>
                <li>Right to erasure or to be forgotten</li>
                <li>Right to data portability</li>
                <li>Right not to be subject to automated processing</li>
              </List>
            </Section>

            <Section title="Access and Changes to Your Personal Information">
              <P>
                If you want to access personal information we hold about you, or
                ask that the information be corrected, please contact us. In some
                circumstances, you also have a right to object to or ask that we
                restrict certain processing activities or delete your personal
                information. If you would like to limit or request deletion of
                your personal information or exercise any other rights you can do
                so by contacting us.
              </P>
            </Section>

            <Section title="Withdrawing Your Consent">
              <P>
                You can withdraw your consent to our collection or processing of
                your personal information. You can do so by contacting us or by
                opting out of email newsletter communications by following the
                instructions in those emails or by clicking unsubscribe. If you
                withdraw your consent to the use of your personal information,
                you may not have access to our services, and we might not be able
                to provide you with our services. In some circumstances where we
                have a legal basis to do so we may continue to process your
                information after you have withdrawn consent, for example if it
                is necessary to comply with an independent legal obligation or if
                it is necessary to do so to protect our legitimate interest in
                keeping our services secure.
              </P>
            </Section>

            <Section title="Our Compliance">
              <P>
                All personal information stored on our platform is treated as
                confidential. It is stored securely and is accessed by authorised
                personnel only. Our collection is limited in relation to what is
                necessary, for the purpose for which the personal information is
                processed, and kept only for so long as is necessary for the
                purpose for which the personal information was collected. We
                implement and maintain appropriate technical, security and
                organisational measures to protect personal information against
                unauthorized or unlawful processing and use, and against
                accidental loss, destruction, damage, theft or disclosure.
              </P>
            </Section>

            <Section title="Your Acknowledgement">
              <P>
                By providing us with your personal information, you consent to us
                disclosing it to third parties who reside outside the EU or UK.
                We will try to ensure that those third parties are GDPR and UKDPR
                compliant.
              </P>
            </Section>

            <Section title="Your Consent">
              <P>
                By using this site you consent to our collection and use of your
                personal information as described in this Privacy Policy. If we
                change our privacy policies and procedures, we will post those
                changes on this site to keep you aware of what information we
                collect, how we use it and under what circumstances we may
                disclose it.
              </P>
            </Section>

            <Section title="Contacting Us">
              <P>
                We welcome any queries, comments or requests you may have
                regarding this policy &mdash; please do not hesitate to contact
                us at{" "}
                <a
                  href="mailto:hello@nikitamorell.com"
                  data-custom-hover
                  className="text-dirt-pop hover:text-dirt-deep underline transition-colors"
                >
                  hello@nikitamorell.com
                </a>
              </P>
            </Section>
          </div>
        </main>

        <FooterSection showHeroForm={false} />
      </div>
    </>
  );
}
