import React from 'react';
import { css, styled } from 'uikit';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from './DefaultLayout';
import Link from 'next/link';
import Typography from 'uikit/Typography';
import TitleBorder from 'uikit/TitleBorder';

const SectionTitle = props => (
  <Typography
    css={css`
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
    `}
    variant="subtitle"
    {...props}
  />
);

export default function ContactPage() {
  const theme = useTheme();
  return (
    <DefaultLayout>
      <div
        css={css`
          display: flex;
          justify-content: center;
          padding: 0 20px;
        `}
      >
        <div
          css={css`
            width: 100%;
            max-width: 875px;
            padding: 44px 0;
            & ul {
              padding-left: 18px;
              margin: 0;
            }
          `}
        >
          <Typography
            as="h1"
            css={css`
              font-size: 40px;
              margin-top: 0;
              text-align: center;
            `}
          >
            Privacy Policy
          </Typography>
          <SectionTitle>The Platform</SectionTitle>
          <TitleBorder color="accent1" />
          <Typography>
            Any of your personal information which OICR collects via this Platform is subject to the
            OICR Privacy Policies, which is incorporated into these Terms and Conditions by
            reference.
            <br />
            <br />
            We are concerned about privacy and committed to your privacy while accessing the
            Platform and using its Content. The approach to communications on the Internet taken by
            OICR and the participants of the ICGC research projects is to respect, and protect your
            privacy rights. Our privacy policy outlines our Site information practices including our
            utilization of personal information we may learn about you when visiting our Site.
          </Typography>
          <SectionTitle>What is Personal Information?</SectionTitle>
          <TitleBorder color="accent3" />
          <Typography>
            Personal information is any information about an identifiable person.
            <br />
            <br />
            If the OICR or other participants in the ICGC ARGO research projects collects your
            personal information on its Platform from you, it is to be used for the purposes
            identified to you at the time of collection. For example, the International Cancer
            Genome Consortium may collect your first and last name, e-mail address and subject of
            inquiry, for the purpose of responding to your specific request for information. If you
            choose to provide us with additional information about yourself through an email
            message, we will only maintain the identifying information as long as needed to respond
            to your question.
          </Typography>
          <SectionTitle>Disclosure</SectionTitle>
          <TitleBorder color="accent4" />
          <Typography>
            <b>To whom does OICR disclose Personal Information?</b>
            <br />
            OICR will not disclose such information to other persons, other than as follows:
            <br />
            <ul>
              <li>
                To the extent required for the Identified Purposes, as described to you at the time
                of collection; and
              </li>
              <li>
                To other third parties, such as sponsors and web site content partners, but only
                where and to the extent you give us your permission to do so.
              </li>
            </ul>
            <br />
            <b>What about practices of linked sites?</b> <br />
            This privacy statement applies only to the Site of the International Cancer Genome
            Consortium. Please be aware that neither OICR nor the ICGC is responsible for the
            privacy practices of other websites to which the Platform has links. We encourage you to
            read the privacy statements of each and every website that requests personal information
            from you.
          </Typography>
          <SectionTitle>Collection and Use</SectionTitle>
          <TitleBorder color="secondary" />
          <Typography>
            <b>What is Aggregate Information?</b> <br />
            "Aggregate information" is standard web server/visitor traffic information, commonly
            referred to as 'aggregate information', regarding overall website traffic patterns. We
            do not report on individual user sessions. Web servers normally collect this type of
            basic information as part of their web log processes. This aggregate information does
            not identify you and thus does not constitute personal information.
            <br />
            <br />
            In addition to information provided by our visitors we use the normal Internet tracking
            tools associated with standard Internet protocols and web-based systems. This system
            information is typically stored in log files and the information is used for aggregate
            reporting. Aggregate reporting includes total number of visitors, most visited sections,
            peak traffic times, etc. Log files are simply transaction records web servers maintain.
            Those logs are used for recording information, such as: Service provider IP addresses;
            <br />
            <ul>
              <li>Browser versions;</li>
              <li>Referring websites;</li>
              <li>Search terms used;</li>
              <li>Average number of pages requested;</li>
              <li>Average duration of visit;</li>
              <li>Total visitor traffic.</li>
            </ul>
            <br />
            We use aggregate information gathered from your visit to better design our Platform.
            This information supplies us with a broad picture of how people use our website in order
            to help the management of our systems and to better serve our stakeholders. How do we
            protect your Personal Information? We are committed to data security. In order to
            prevent unauthorized access, maintain the accuracy of your personal information and
            ensure that your personal information is used and disclosed only pursuant to this
            Policy, the OICR strives to maintain physical, electronic, contractual and
            administrative safeguards to secure your personal information we collect from the
            Platform with a level of security that is appropriate to the sensitivity of the personal
            information collected.
          </Typography>
          <SectionTitle>Additional Information</SectionTitle>
          <TitleBorder color="accent2" />
          <Typography>
            <b>Who do I contact with questions or concerns about the Platform's privacy policy?</b>
            <br />
            For all inquires about your personal information, including requests to access or
            correct personal information, please send a written request through our{' '}
            <Link href="/contact">
              <a>
                <b>Contact Form</b>
              </a>
            </Link>
          </Typography>
          <Typography
            css={css`
              color: ${theme.colors.grey};
            `}
          >
            Last updated: March 2020
          </Typography>
        </div>
      </div>
    </DefaultLayout>
  );
}
