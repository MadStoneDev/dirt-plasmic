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

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms and Conditions - DIRT"
        description="Terms and Conditions for the provision of services by Dirt Creative Pty Ltd."
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
              Terms &amp; Conditions
            </h1>
            <p className="font-sans text-sm text-dirt-deep/50 mb-12">
              Last updated: 31 March 2026
            </p>

            <Section title="How to Accept the Proposal">
              <P>
                These Terms and Conditions form part of the agreement made
                between Dirt Creative Pty Ltd ABN 47690548942 (Dirt Creative) and
                you, the person who has asked for the supply of copywriting
                services. Once you sign the Proposal, these Terms and Conditions
                together with any additional terms in the Proposal will be
                binding between us.
              </P>
              <P>
                If you agree with the Proposal including these Terms and
                Conditions you can show your acceptance by signing the Proposal
                where indicated and clicking the &ldquo;Accept&rdquo; button. You
                agree that by so signing and accepting the Proposal you warrant
                that you are authorised to do so and that you understand the
                contents of the Proposal, that it accurately records all matters
                that are relevant to the supply of the Services and that you
                agree to be bound by these Terms and Conditions.
              </P>
            </Section>

            <Section title="Proposal">
              <P>
                The information in the Proposal is based on information that you
                have provided to Dirt Creative either in email or in our
                discussions as we scoped out the services that you would like Dirt
                Creative to provide (Services). Where appropriate the charges
                listed in the &ldquo;your investment&rdquo; section of the
                Proposal will be a fixed fee.
              </P>
              <P>
                The Proposal is valid for 7 days from the date on which Dirt
                Creative provides it to you.
              </P>
              <P>
                In order for Dirt Creative&rsquo;s Proposal to be accurate and
                for Dirt Creative to deliver the Services as requested, it is
                important that the Proposal accurately reflects the scope of the
                work.
              </P>
              <P>
                If there are any ambiguities in the Proposal, these ambiguities
                might be reflected in the work Dirt Creative does. You accept
                that if Dirt Creative has to make any revisions as a result of
                such ambiguities or because of incomplete information in the
                Proposal, additional charges may apply.
              </P>
              <P>
                You agree that the Services and documents provided to you will
                have been created in accordance with the Proposal and are
                appropriate for use at the time the Services are provided and for
                a reasonable time after that.
              </P>
              <P>
                If you have asked Dirt Creative to provide the Services so that
                you can provide Dirt Creative&rsquo;s copy to a third person, you
                must notify Dirt Creative so that this can be noted in the
                Proposal. The supply of Dirt Creative&rsquo;s copy to a third
                person may impact the Proposal. Your obligation to pay Dirt
                Creative for the provision of the Services (Fee) is not dependent
                on the third person paying you first.
              </P>
              <P>
                The Proposal includes the deliverables set out in the
                &ldquo;deliverables &amp; timeline&rdquo; section of the Proposal
                (Deliverables).
              </P>
              <P>
                Once you have received the Deliverables and the project is
                completed, you must within one month of completion, download all
                materials that you want to keep from the shared Google drive. If
                you want to retrieve any materials once Dirt Creative has
                archived them, you agree to pay Dirt Creative&rsquo;s then hourly
                rate for the work done in retrieving the materials and forwarding
                them to you.
              </P>
            </Section>

            <Section title="Retainer Engagements">
              <P>
                If the Proposal includes engaging Dirt Creative to provide
                Deliverables as part of a monthly retainer you must pay the fee
                (Retainer Fee) at the start of each month, in advance. Dirt
                Creative will not start providing Services until the Retainer Fee
                has been received.
              </P>
              <P>
                The retainer period will be 3, 6 or 12 months as agreed by the
                parties.
              </P>
              <P>
                The Deliverables will be scoped and agreed for each month at the
                start of the 3, 6 or 12 month period and only for that month.
                Any unused Deliverables cannot be carried over to the following
                month.
              </P>
              <P>
                To ensure that Dirt Creative can provide the Deliverables within
                the agreed month, you must provide all necessary information,
                materials, feedback and approvals in a timely manner. If you do
                not do this and Dirt Creative cannot provide the Deliverables
                within the month, those Deliverables will not be carried forward
                and subject to law, the Retainer Fee already paid will not be
                refunded.
              </P>
              <P>
                Additional months may be added to the retainer as agreed in
                writing by you and Dirt Creative. Any additional months will be
                subject to Dirt Creative&rsquo;s fees at the time of the new
                agreement.
              </P>
              <P>
                Either party may choose not to continue the retainer beyond the
                agreed term by giving at least 30 days&rsquo; written notice to
                the other party before the end of the relevant 3, 6 or 12 month
                period.
              </P>
              <P>
                The provisions of clauses 3.1, 3.3, 3.5, 3.6, 3.7, 3.8, 3.9,
                3.10 and 3.11 apply in relation to the Retainer Fee. For the
                avoidance of doubt, this means that if you wish to pause the
                retainer mid-term, a pause fee or restart fee may apply.
              </P>
            </Section>

            <Section title="Fee and Payment">
              <P>
                You agree to pay the Fee, which will be in USD, for the provision
                of the Services as set out in the Proposal or as amended by
                written agreement between us.
              </P>
              <P>
                If you require Dirt Creative to provide you with a first draft in
                less than 2 business days of your acceptance of the Proposal,
                then Dirt Creative may charge a rush loading of up to 40% of the
                Fee.
              </P>
              <P>
                Dirt Creative reserves the right to charge for additional
                services provided outside of the scope of this agreement at Dirt
                Creative&rsquo;s then hourly rate of $150 plus GST or $165
                including GST. Work outside the scope of this agreement might
                include additional meetings and revisions, liaising with third
                parties such as graphic designers, web developers or printers and
                work not included in the Proposal.
              </P>
              <P>
                You must pay the deposit on signing the Proposal. To the extent
                permitted by law, the deposit is non-refundable. The deposit is
                calculated as follows:
              </P>
              <List>
                <li>
                  Where the total Fee for the Services is $5,000 or more, the
                  non-refundable deposit will be for 50% of the total Fee. The
                  balance of the Fee will be payable after the final first draft
                  of the work is sent to you.
                </li>
                <li>
                  Where the total Fee is less than $5,000, the non-refundable
                  deposit is the total Fee.
                </li>
              </List>
              <P>
                Dirt Creative will give you details of how to pay the Fee when
                Dirt Creative sends you your tax invoice. All invoices must be
                paid within 7 days of their date.
              </P>
              <P>
                Unless stated in the Proposal, the Fee does not include the costs
                or charges of third parties such as graphic designers, web
                designers and developers, SEOs and SEMs or for subscriptions,
                printing, couriers, other media or travel costs. Dirt Creative
                will obtain your prior approval for any such third party costs.
                You will be and remain liable for payment of these third party
                costs.
              </P>
              <P>
                If the Services include the ongoing provision of a monthly
                service such as writing a regular newsletter or blog, Dirt
                Creative will require payment in advance of the agreed monthly
                retainer.
              </P>
              <P>
                If the Services include meetings with you, and you have not
                provided at least 24 hours of cancellation, Dirt Creative may
                charge a cancellation fee at its then hourly rate of $150 plus
                GST or $165 including GST.
              </P>
              <P>
                If at any time during the term of the agreement, you stop
                communicating with Dirt Creative in relation to the Deliverables,
                the Services will be put on hold. Dirt Creative may charge a
                pause fee when you put the Services on hold or a restart fee when
                you come back to restart the provision of Services.
              </P>
              <P>
                If you request to pause the project after it has commenced, a
                non-refundable pause fee of $500 (plus GST) will apply. This fee
                secures your place in Dirt Creative&rsquo;s calendar and covers
                the administration involved in pausing and rescheduling the work.
                You must provide a proposed restart date at the time of pausing.
                If the project is paused for more than 60 days, it may be treated
                as a terminated project, and a new Proposal may be required to
                recommence the work.
              </P>
              <P>
                Interest may be charged on late payments at an interest rate
                equal to the rate of the Reserve Bank of Australia at the time,
                calculated daily from the due date of payment on all overdue
                amounts.
              </P>
            </Section>

            <Section title="Changes in the Proposal">
              <P>
                If you want to change the Proposal, you must inform Dirt Creative
                as soon as possible. If you have already accepted the Proposal,
                Dirt Creative will need to formally amend the agreement. Dirt
                Creative will send you a revised Proposal which you must accept.
                Dirt Creative will not re-commence providing the Services until
                the revised deposit has been paid.
              </P>
              <P>
                Additional revisions or revisions based on a change in the scope
                of work including a change of direction or format will incur an
                additional fee at Dirt Creative&rsquo;s hourly rate. Dirt
                Creative will give you an estimate of the fee before commencing
                the work.
              </P>
            </Section>

            <Section title="Approval of Drafts and Revisions">
              <P>
                As part of providing the Services, Dirt Creative will provide two
                rounds of reasonable revisions. Reasonable revisions will not
                include revisions because the scope of the Services has changed,
                relevant information was not provided by you or included in the
                Proposal, or you have changed the way you would like to approach
                the project.
              </P>
              <P>
                If you want any additional revisions, Dirt Creative will charge
                its then hourly rate of $150 plus GST or $165 including GST.
              </P>
              <P>
                If you do not approve the drafts delivered to you within 7 days
                of delivery, then the last draft sent will be deemed to be the
                final draft and Dirt Creative&rsquo;s obligations to provide the
                Services will be deemed to have been completed. If you want to
                restart working on this draft after the 7 days, you may need to
                pay a restart fee.
              </P>
            </Section>

            <Section title="Our Obligations">
              <P>
                Dirt Creative will provide the Services using all reasonable skill
                and care.
              </P>
              <P>
                Unless a deadline for the provision of Services has been agreed,
                Dirt Creative will provide the Services within a reasonable time.
              </P>
              <P>
                Dirt Creative will deliver any documents that form part of the
                Services to you as word or excel documents or as otherwise agreed
                between the parties.
              </P>
              <P>
                Dirt Creative agrees to keep confidential any confidential
                information provided by you which you expressly tell Dirt
                Creative is confidential including the information in the
                Proposal.
              </P>
              <P>
                Dirt Creative may, from time to time, engage other people to help
                deliver the Services. Dirt Creative will review and amend their
                work and ensure it is of the same standard as the Services Nikita
                Morell, the founder of Dirt Creative, personally provides.
              </P>
              <P>
                If in the Proposal Dirt Creative has agreed to interview one or
                more of your customers to obtain reviews or quotes, Dirt Creative
                will follow up each customer twice to arrange the interview. If
                the customer does not fix an interview time or cancels, you must
                provide another customer to contact and additional fees may be
                charged. After the interview, any reviews or quotes will be sent
                to you for approval before inclusion in the Deliverables.
              </P>
            </Section>

            <Section title="Copyright">
              <P>
                Dirt Creative owns all copyright in any materials (Works)
                provided to you under the terms of this agreement.
              </P>
              <P>
                Once you have paid all the Fees and/or the Retainer Fee, Dirt
                Creative grants you a perpetual, royalty free, exclusive licence
                to reproduce and use the Works for the purpose set out in the
                Proposal. You do not have the right to use the Works for any
                other purpose including commercialising them for your own benefit
                or sub-licensing the Works to a third party without Dirt
                Creative&rsquo;s prior written consent.
              </P>
              <P>
                You agree that Dirt Creative can use selected extracts of the
                Works and your name as a client to promote and advertise its
                business provided that these extracts do not contain any of your
                confidential information.
              </P>
            </Section>

            <Section title="Term and Termination">
              <P>
                This agreement will continue for the term of the project as set
                out in the Proposal or until terminated by either party in
                accordance with this clause.
              </P>
              <P>
                Either party may terminate this agreement by giving the other
                party 30 days&rsquo; written notice if:
              </P>
              <List>
                <li>
                  The other party is in breach of any provision of this agreement
                  and has failed to remedy the breach within 14 days of receipt
                  of written notice.
                </li>
                <li>The breach is not capable of remedy.</li>
                <li>
                  The other party is unable to pay its debts in the ordinary
                  course of business.
                </li>
              </List>
              <P>
                You will remain liable to pay any outstanding Fees, including any
                Retainer Fee, no matter why this agreement was terminated. If
                this agreement is terminated after Dirt Creative has provided the
                Services, Dirt Creative retains the right to send you a final
                invoice and have it paid in full.
              </P>
              <P>
                All terms of this agreement that are expressly or by their nature
                impliedly intended to survive termination shall not be affected
                by such termination.
              </P>
            </Section>

            <Section title="Limitation of Liability">
              <P>
                Dirt Creative provides the Services in good faith but cannot
                guarantee that the Services provided will have the outcome you
                wanted to achieve. You are also responsible for checking the work
                Dirt Creative submits and ensuring it is satisfactory including
                free from grammatical and spelling errors. Dirt Creative will not
                be responsible for any costs you incur as a result of wrong copy
                being printed, published or otherwise used by you.
              </P>
              <P>
                To the extent permitted by law, all express or implied
                guarantees, warranties, terms and conditions are excluded from
                this agreement.
              </P>
              <P>
                If any guarantee, warranty, term or condition is implied or
                imposed under any applicable legislation and cannot be excluded
                but can be limited, then Dirt Creative&rsquo;s liability is
                limited to supplying the Services again or paying for the
                Services to be supplied again.
              </P>
              <P>
                To the extent permitted by law, Dirt Creative is not liable for
                any special, indirect or consequential loss or damage (including
                personal injury), loss of profit or opportunity arising out of or
                in connection with the Services.
              </P>
              <P>
                You agree to defend, indemnify and hold Dirt Creative, its
                employees, agents and independent contractors harmless against
                any claims, damages, costs, liabilities and expenses arising out
                of or related to any claims made by third parties as a direct or
                indirect result of the use of any information or materials
                provided by you for delivering the Services.
              </P>
            </Section>

            <Section title="General">
              <P>
                This agreement is governed by the laws of New South Wales and the
                parties irrevocably and unconditionally submit to the exclusive
                jurisdiction of the courts of New South Wales.
              </P>
              <P>
                If part or all of any of this agreement is illegal or
                unenforceable it will be severed from the agreement and will not
                affect the continued operation of the remaining provisions.
              </P>
              <P>
                This agreement can only be amended, supplemented or waived in
                writing signed by both parties.
              </P>
              <P>
                The failure of either party to enforce, or the delay by either
                party in enforcing, any of its rights shall not be deemed a
                continuing waiver or a modification of this agreement.
              </P>
              <P>
                This agreement together with the Proposal contains the entire
                agreement of the parties with respect to its subject matter.
              </P>
            </Section>
          </div>
        </main>

        <FooterSection showHeroForm={false} />
      </div>
    </>
  );
}
