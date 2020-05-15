import React, { ReactNode } from 'react';
import { SimpleLink } from '../components/navigation/SimpleLink';
import { Banner } from '../components/display/Banner';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { Section } from '../components/display/Section';
import { Typography } from '@material-ui/core';
import { Policy } from '@material-ui/icons';

type PrivacyContent = {
    title: string;
    contents: ReactNode[];
};
const privacyData: PrivacyContent[] = [
    {
        title: '',
        contents: [
            'The terms and conditions governing your use of this Site are contained in a separate Terms of Use agreement available on this page at (“Terms of Use”). Swing Essentials LLC  (“Swing Essentials,” “Us,” “We,” or “Our”) respects the privacy of the visitors to the Site and users of the App. This Swing Essentials Privacy Policy between You and Us (the “Privacy Policy”) is intended to inform You of Our policies and practices regarding the collection, use and disclosure of any Personal Information and Anonymous Information You submit to Us through the Site and App.',
            `“Personal Information” is information about You that is personally identifiable to You, such as Your name, address, e-mail address, or phone number, payment and billing information, as well as other non-public information that is associated with the foregoing. “Anonymous Information” means information that is not associated with or linked to Your Personal Information; Anonymous Information does not permit the identification of individual persons.`,
        ],
    },
    {
        title: 'I. USER CONSENT',
        contents: [
            'By submitting Personal Information through the Site and App, You agree to the terms of this Privacy Policy and You expressly consent to the processing of Your Personal Information according to this Privacy Policy. Your Personal Information may be processed by Us in the country where it was collected as well as other countries (including the United States) where laws regarding processing of Personal Information may be less stringent than the laws in Your country.',
        ],
    },
    {
        title: 'II. COLLECTION OF PERSONAL INFORMATION',
        contents: [
            'The Personal Information We gather from you helps us learn about visitors to the Site and App, our customers and potential customers. We use this information to better tailor the features, performance and support of our products and services, to offer You additional information and opportunities, and to inform You of changes to this Privacy Policy and the Terms of Use of the Site.',
        ],
    },
    {
        title: 'III. PRODUCT PURCHASES',
        contents: [
            'If you purchase a lesson package  via this Site or App, We collect your personal information needed to conduct the sales transaction, and use the information to process Your payment and to deliver you the product you purchased.',
        ],
    },
    {
        title: 'IV. PAYMENT INFORMATION',
        contents: [
            `If you are submitting payment information via the Site and App, We collect your payment information for the purpose of allowing you to pay for products you purchase via the Site and App. To make any payments via the Site and App you will be required to give us (or our third party payment services providers) a valid credit card number and associated payment information at the time you are required to make such payments, including all of the following: (i) Your name as it appears on the card, (ii) the credit card type, (iii) the date of expiration of Your credit card, and (iv) any activation numbers or codes needed to charge Your card. You agree that no additional notice or consent is required before We (or Our third party payment services providers) invoice Your credit card provided to Us for all amounts due and payable. By providing Us or Our third party payment services providers with Your credit card number and associated payment information, You expressly agree that We or Our third party payment services providers are authorized to immediately invoice Your account for all fees and charges due and payable to Us as a result of Your activities on the Site that require payment. You agree to immediately notify Us of any change in Your invoicing address or the credit card used for payment hereunder. We use third-party processing companies (including credit card processing companies) for billing and payment purposes. These third parties may store or retain certain of Your Personal Information (as defined in the Privacy Policy) necessary to process such payments. These third parties do not have any right to use the Personal Information We provide to them beyond what is necessary to assist Us in processing payments.`,
        ],
    },
    {
        title: 'V. PERSONAL INFORMATION YOU PROVIDE TO US',
        contents: [
            `We collect Personal Information that You submit to Us voluntarily through the Site and App.`,
            `If You are purchasing a product via the Site and App, We collect the following information You provide to Us: Your first and last names, email address, mailing address, and billing address, if different from Your mailing address.`,
            `When You contact Us by sending Us an e-mail, We will collect Your name, e-mail address and information contained in the e-mail You send Us.`,
            `When You respond to a customer satisfaction survey from Us or We collect Your name and email address.`,
            `If You choose to receive product update information from Us, We collect Your name and email address.`,
        ],
    },
    {
        title: 'VI. PERSONAL INFORMATION COLLECTED VIA TECHNOLOGY',
        contents: [
            `As You navigate the Site, certain information may also be collected passively, including Your Internet protocol address (“IP address”), browser type, domain names, access times, and operating system. We also use “Cookies” and navigational data like Uniform Resource Locators (URLs) to gather information regarding the date and time of Your visit and the information for which You searched and which You viewed. This type of information is collected to make Our products and services more useful to You. In some of Our emails to You, We will use a “click-through URL” to make Your experience as easy as possible. When You click on one of these URLs, You pass through Our web server before arriving at Your destination website. Tracking click-throughs helps Us determine Your interest in particular topics and helps Us measure the effectiveness of Our customer communications.`,
            `An “IP Address” is a number that is automatically assigned to Your computer when You use the Internet. In some cases Your IP Address stays the same from browser session to browser session; but if You use a consumer internet access provider, Your IP Address probably varies from session to session. We track IP Addresses solely in conjunction with session cookies to analyze the traffic on Our Site and App.`,
            `“Cookies” are small pieces of information that a web site sends to Your computer’s hard drive while You are viewing a web site. We may use both session Cookies (which expire once You close Your web browser) and persistent Cookies (which stay on Your computer until You delete them) to provide You with a more personal and interactive experience on the Site. Persistent Cookies can be removed by following Internet browser help file directions. If You choose to disable Cookies, some areas of the Site may not work properly.`,
        ],
    },
    {
        title: 'VII. PERSONAL INFORMATION WE RECEIVE FROM OTHER SOURCES',
        contents: [],
    },
    {
        title: 'VIII. DISCLAIMER OF WARRANTY AND LIMITATION OF LIABILITY',
        contents: [
            `We may receive Personal Information about You from other sources like postal mail, telephone or fax. We may add this information to the information We have already collected from You via the Site and App in order to improve the products and services We provide.`,
        ],
    },
    {
        title: 'IX. USE OF INFORMATION',
        contents: [
            `If You opt-in to receiving the following communications from Us, Personal Information You submit to Us is used either to respond to requests that You make, send You press releases, general informative announcements, and other general information about Us or Our products, or to aid Us in serving You better. Our customers will always have the right to opt-out of receiving product update information from Us at any time. You will be given the opportunity to opt-out of receiving further communication from Us at the bottom of every email We send to You .`,
            `If You have not opted-in to receiving communication from Us, We will not contact You unless You place an order for a product via the Site and We cannot process the order for any reason. At this time, We may contact You to request the additional or corrected information required to complete the processing of Your product order.`,
            `As described in more detail below, in order to perform Our services, We may disclose Your Personal Information to third party vendors. We may also use Your Personal Information to provide You with information regarding changes and upgrades to the Site, unless and until You request not to receive such communications from Us.`,
            `We may create Anonymous Information records from Personal Information by excluding information (such as Your name) that makes the information personally identifiable to You. We may use this Anonymous Information to analyze request patterns and usage patterns so that We may enhance Our products and services. We reserve the right to use and disclose Anonymous Information to third parties in Our discretion, including for internal business analysis, and to provide aggregate demographic data to Our various partners.`,
        ],
    },
    {
        title: 'X. PERSONAL INFORMATION COLLECTED VIA SALE OF OUR PRODUCTS',
        contents: [
            `If You purchase any of the products available via Our Site and App, You may be subject to additional terms and conditions of sale, and/or the licenses under which You have a right to use any software embedded in such products, if any. These additional terms and conditions or licenses will govern Your rights in and to such products.`,
        ],
    },
    {
        title: 'XI. FEEDBACK',
        contents: [
            `If You provide feedback on the Site to Us, We may use such feedback for any purpose, provided that We will not associate such feedback with Your Personal Information. We will collect any information contained in such communication and will treat the Personal Information in such communication in accordance with this Privacy Policy.`,
        ],
    },
    {
        title: 'XII. DISCLOSURE OF PERSONAL INFORMATION',
        contents: [
            `Except as otherwise stated in this Privacy Policy, We do not generally trade, rent, or share Your Personal Information with third parties and We will not disclose billing information unless You ask Us to do so.`,
            `However, We may share Your Personal Information with third parties to process payments, or to provide You with access to the Site and App. These third parties are required not to use Your Personal Information other than to provide the services requested by Us and are bound by confidentiality agreements with regard to their use of Your Personal Information. You expressly consent to the sharing of Your Personal Information with Our contractors and third party service providers for the sole purpose of providing Our products and services to You.`,
            `From time to time, We may have a parent company, subsidiaries, joint ventures, or other companies under common control with Us (collectively, “Affiliates”). At present We do not share Your Personal Information with Our Affiliates; however if We do in the future share some or all of Your Personal Information with these Affiliates, We will require Our Affiliates to honor this Privacy Policy.`,
            `If Our company or Our assets are acquired by another company, that company will possess the Personal Information collected by Us and it will assume the rights and obligations regarding Your Personal Information as described in this Privacy Policy. Regardless of any choices You make regarding Your Personal Information (as described below), We may disclose Your Personal Information (1) if We believe in good faith that such disclosure is necessary to (a) comply with relevant laws or to respond to court orders, or (b) to protect and defend the rights or property of Us or third parties; or (2) in connection with investigating and preventing fraud.`,
        ],
    },
    {
        title: 'XIII. YOUR CHOICES REGARDING YOUR PERSONAL INFORMATION',
        contents: [
            `We offer You choices regarding the collection, use and sharing of Your Personal Information. You will have the option to opt-in to receive promotional communications from Us when You purchase products via the Site. You may indicate a preference to stop receiving further communications from Us and You will have the opportunity to “opt-out” by following the unsubscribe instructions provided in the e-mail Your receive or by contacting Us directly (please see contact information below). Despite Your indicated e-mail preferences, We may send You notices of any updates to Our Privacy Policy.`,
        ],
    },
    {
        title: 'XIV. REGARDING CHILDREN',
        contents: [`We do not intentionally gather Personal Information about visitors who are under the age of 13.`],
    },
    {
        title: 'XV. OTHER WEBSITES AND MOBILE APPLICATIONS',
        contents: [
            `Our provision of a link to any other website or location is for Your convenience and does not signify Our endorsement of such other website, mobile application, location, or contents. We have no control over, do not review, and cannot be responsible for these outside websites and mobile applications or their content. Please be aware that the terms of Our Privacy Policy do not apply to these outside websites and mobile applications.`,
        ],
    },
    {
        title: 'XVI. SECURITY',
        contents: [
            `We use commercially reasonable efforts to protect the security of Your Personal Information by using industry-standard security technologies and procedures to help protect Your Personal Information from unauthorized access, use, or disclosure. We safeguard the security of the data You send Us with physical, electronic, and managerial processes. We highly recommend that You take every precaution to protect Your Personal Information when You are on the Internet. One way You can do so is by making sure You are using a secure web browser. Our ecommerce Site uses industry-standard Secure Sockets Layer (SSL) encryption on all ecommerce web pages where Personal Information is submitted by You. Your Personal Information has been secured with a digital security technology provided by VeriSign®/RSA, a trusted leader in digital security. As an extra precaution, please make sure that You are using the latest version of an SSL-enabled browser. We recommend using Internet Explorer 4.0 or higher, Netscape 4.0 or higher, and the latest version of Safari. This will better protect the confidentiality of Your Personal Information, including Your credit card information, while it is transmitted over the Internet.`,
            `Except as provided elsewhere in this Privacy Policy, We limit access to Personal Information in electronic databases to those persons (including employees and contractors) in Our organization who have a business need for such access.`,
            `Even though We have taken steps to protect Your Personal Information from being intercepted, accessed, used, or disclosed by unauthorized persons, You should know that We cannot fully eliminate security risks associated with Personal Information.`,
        ],
    },
    {
        title: 'XVII. CONTACT US',
        contents: [
            <>
                {`Should You have any questions or concerns regarding this Privacy Policy, please contact `}
                <SimpleLink
                    label={'support'}
                    onClick={(): void => {
                        window.open('mailto:info@swingessentials.com', 'blank');
                    }}
                    style={{ fontWeight: 600 }}
                />
                {`.`}
            </>,
        ],
    },
    {
        title: 'XVIII. PRIVACY POLICY UPDATES',
        contents: [
            `This Privacy Policy is subject to revision at any time in Our sole discretion. We will notify You of material changes to this Privacy Policy via the email address You provide Us, and will post on the Site any changes to this Privacy Policy. We do, however, recommend that You read this Privacy Policy each time You use Our website in case You missed Our notice of changes to the Privacy Policy. If You object to any such changes, You must cease using the Site and App immediately. Continued use of the Site and App following notice of any such changes shall indicate Your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.`,
        ],
    },
];

export const PrivacyPage: React.FC = () => (
    <>
        <Banner background={{ src: '', position: 'center 70%', opacity: 0.3 }}>
            <SectionBlurb
                jumbo
                icon={<Policy fontSize={'inherit'} />}
                headline={'Privacy Policy'}
                subheading={'Effective March 1, 2018'}
                body={`By viewing and accessing this https://www.swingessentials.com/ web site (the "site"), the swing essentials mobile application (the "app") and/or purchasing any of the products available via the site and app, you ("you" or "your") represent that you have read and understood this entire privacy policy and you agree to all the terms of this privacy policy. If you do not consent to this privacy policy in its entirety, your sole and exclusive remedy is to immediately cease use of this site.`}
                style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
            />
        </Banner>
        {privacyData.map((section, index) => (
            <Section key={`privacy_section_${index}`} style={{ display: 'block' }} textAlign={'left'}>
                {section.title ? <Typography variant={'h6'}>{section.title}</Typography> : null}
                {section.contents.map((par, pInd) => (
                    <Typography key={`p_${pInd}`} paragraph={pInd < section.contents.length - 1}>
                        {par}
                    </Typography>
                ))}
            </Section>
        ))}
    </>
);
