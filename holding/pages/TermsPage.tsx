import React, { ReactNode } from 'react';
import { useGoogleAnalyticsPageView } from '../../src/hooks';
import { SimpleRouterLink, SimpleLink } from '../components/navigation/SimpleLink';
import { Banner } from '../components/display/Banner';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { Section } from '../components/display/Section';
import { Typography } from '@material-ui/core';
import { Gavel } from '@material-ui/icons';

type TermsContent = {
    title: string;
    contents: ReactNode[];
};
const termsData: TermsContent[] = [
    {
        title: 'I. USE OF THE SITE AND APP',
        contents: [
            'Swing Essentials owns and operates the Site and App. The documents and other information and content available on the Site and App (the "Site and App Content") are protected by copyright laws throughout the world. The Site and App Content may be owned by us or may be provided through an arrangement We have with others, including other users, or our partners, sponsors, or affiliates. The Site and App Content is protected by copyright under both United States and foreign laws. Unauthorized use of the Site and App Content may violate copyright, trademark, and other laws. You have no rights in or to the Site and App Content, and you may not use the Site and App Content except as permitted under these Terms of Use. No other use is permitted without prior written consent from us or the owner of the Site and App Content. You must retain all copyright and other proprietary notices contained in the original Site and App Content on any copy you make of the Site and App Content. You may not sell, transfer, assign, license, sublicense, or modify the Site and App Content or reproduce, display, publicly perform, make a derivative version of, distribute, or otherwise use the Site and App Content in any way for any public or commercial purpose, except to utilize features of the Site and App that, by their nature, involve publishing or sharing of the Site and App Content with the public. If you violate any part of these Terms of Use, your permission to access and/or use the Site and App Content automatically terminates and you must immediately destroy any copies you have made of the Site and App Content.',
        ],
    },
    {
        title: 'II. TRADEMARKS',
        contents: [
            'The Swing Essentials logo and other related graphics, logos, service marks, and trade names used on the Site and App are the trademarks of Swing Essentials and may not be used without permission in connection with any third party products or services. Other trademarks, service marks, and trade names that may appear on the Site and App are the property of their respective owners.',
        ],
    },
    {
        title: 'III. MODIFICATION',
        contents: [
            'Swing Essentials reserves the right, at any time, to modify the Site and App Content or to modify, suspend, or discontinue the Site or App or any part thereof with or without notice. You agree that Swing Essentials will not be liable to you or to any third party for any modification of the Site and App Content or modification, suspension, or discontinuance of the Site or App.',
        ],
    },
    {
        title: 'IV. FEEDBACK',
        contents: [
            'Swing Essentials will treat any feedback or suggestions you provide to Swing Essentials as non-confidential and non-proprietary. THUS, IN THE ABSENCE OF A WRITTEN AGREEMENT WITH Swing Essentials TO THE CONTRARY, YOU HEREBY ASSIGN ALL RIGHTS IN ANY FEEDBACK OR SUGGESTIONS YOU PROVIDE TO Swing Essentials.',
        ],
    },
    {
        title: 'V. PRIVACY',
        contents: [
            <>
                {`Swing Essentials’ Privacy Policy, which is available`}{' '}
                <SimpleRouterLink to="/legal/privacy" label={'here'} style={{ fontWeight: 600 }} />
                {`, is incorporated into these Terms of Use.`}
            </>,
        ],
    },
    {
        title: 'VI. THIRD-PARTY LINKS',
        contents: [
            'The Site and App may contain links to other web sites operated by third parties. Such third party web sites are not under the control of Swing Essentials. Swing Essentials is not responsible for the content of any third party web site or any link contained in a third party web site. Swing Essentials provides these links only as a convenience and does not review, approve, monitor, endorse, warrant, or make any representations with respect to third party web sites.',
        ],
    },
    {
        title: 'VII. INDEMNITY',
        contents: [
            'You agree to defend, indemnify, and hold Swing Essentials harmless from and against any claims, actions or demands, including, without limitation, reasonable legal and accounting fees, arising or resulting from your breach of these Terms of Use or your uploading of, access to, or use or misuse of the Site and App Content or the Site and App. We shall provide notice to you of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit or proceeding. We reserve the right to assume the exclusive defense and control of any matter which is subject to indemnification under this section. In such case, you agree to cooperate with any reasonable requests assisting our defense of such matter.',
        ],
    },
    {
        title: 'VIII. DISCLAIMER OF WARRANTY AND LIMITATION OF LIABILITY',
        contents: [
            'SWING ESSENTIALS, OUR AFFILIATES, OUR PARTNERS, AND OUR AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS, MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE SITE AND APP CONTENT, INCLUDING BUT NOT LIMITED TO ITS ACCURACY, RELIABILITY, COMPLETENESS, TIMELINESS, OR RELIABILITY.',
            'NEITHER SWING ESSENTIALS NOR OUR AFFILIATES OR PARTNERS SHALL BE SUBJECT TO LIABILITY FOR TRUTH, ACCURACY, OR COMPLETENESS OF ANY INFORMATION CONVEYED TO USERS OF THE SITE AND APP OR FOR ERRORS, MISTAKES OR OMISSIONS THEREIN OR FOR ANY DELAYS OR INTERRUPTIONS OF THE DATA OR INFORMATION STREAM FROM WHATEVER CAUSE. YOU AGREE THAT YOU USE THE SITE AND APP AND THE SITE AND APP CONTENT AT YOUR OWN RISK.',
            'WE MAKE NO WARRANTY THAT THE SITE AND APP WILL BE AVAILABLE ERROR FREE OR THAT THE SERVICES OR THE SITE AND APP CONTENT ARE FREE OF COMPUTER VIRUSES OR SIMILAR CONTAMINATION OR DESTRUCTIVE FEATURES. IF YOUR USE OF THE SERVICES OR THE CONTENT RESULTS IN THE NEED FOR SERVICING OR REPLACING EQUIPMENT OR DATA, WE SHALL NOT BE RESPONSIBLE FOR THOSE COSTS.',
            `THE SITE AND APP AND SITE AND APP CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND. WE HEREBY DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE WARRANTY OF TITLE, MERCHANTABILITY, NON INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE.`,
            `IN NO EVENT SHALL SWING ESSENTIALS BE LIABLE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION, INCIDENTAL AND CONSEQUENTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION) RESULTING FROM THE USE OR INABILITY TO USE THE SITE AND APP AND THE SITE AND APP CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, IN EXCESS OF ONE HUNDRED DOLLARS, EVEN IF A WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
            `Some states do not allow exclusion of implied warranties or limitation of liability for incidental or consequential damages, so the above limitations or exclusions may not apply to you. IN SUCH STATES, SWING ESSENTIALS’ LIABILITY SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.`,
            `Swing Essentials provides the Site and App for you to track, manage, and improve your golf swing. THE SITE AND APP DO NOT CONTAIN OR CONSTITUTE, AND SHOULD NOT BE INTERPRETED AS, MEDICAL ADVICE OR OPINION. We are not licensed medical professionals, and We are not in the business of providing medical advice. You should always consult a qualified and licensed medical professional prior to beginning or modifying any diet or exercise program. YOUR USE OF THE SITE OR THE APP DOES NOT CREATE A DOCTOR-PATIENT RELATIONSHIP BETWEEN YOU AND SWING ESSENTIALS.`,
        ],
    },
    {
        title: 'IX. AMENDMENT',
        contents: [
            'Swing Essentials may, at any time, revise these Terms of Use by updating this posting. By using the Site and App, you agree to be bound by any such revisions and, therefore, you should periodically visit this page of the Site to examine the then-current Terms of Use. Certain provisions of these Terms of Use may be superseded by expressly designated legal notices or terms located on particular pages of this Site.',
        ],
    },
    {
        title: 'X. GENERAL PROVISIONS',
        contents: [
            `If any provision of these Terms of Use is, for any reason, held to be invalid or unenforceable, the other provisions of these Terms of Use will be unimpaired and the invalid or unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent permitted by law. These Terms of Use and any action related thereto will be governed, controlled, interpreted, and defined by and under the laws of the Commonwealth of Virginia , without giving effect to any principles that require the application of the law of a different jurisdiction. By using this Site, you hereby expressly consent to the personal jurisdiction and venue in the state and federal courts for Fairfax County, Virginia, and you agree that any claim brought by you pursuant to these Terms of Use will be brought solely in those courts and no other court.`,
            <>
                {`If you have any questions about the foregoing, please contact `}
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
];

export const TermsPage: React.FC = () => {
    useGoogleAnalyticsPageView();
    return (
        <>
            <Banner background={{ src: '', position: 'center 70%', opacity: 0.3 }}>
                <SectionBlurb
                    jumbo
                    icon={<Gavel fontSize={'inherit'} />}
                    headline={'Terms of Use'}
                    subheading={'Effective March 1, 2018'}
                    body={`Swing Essentials, LLC  ("Swing Essentials" or "We") grants you the right to use this website ("Site") and mobile application ("App") subject to the terms and conditions of use ("Terms of Use" or "Agreement") set forth below. The purchase of any product or service through the site is governed by the terms of sale . Please read these terms of use carefully. By accessing the site, you agree to be bound by the terms of use. If you do not wish to be bound by these terms of use, you may not access or use this site or the app.`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            {termsData.map((section, index) => (
                <Section key={`terms_section_${index}`} style={{ display: 'block' }} textAlign={'left'}>
                    <Typography variant={'h6'}>{section.title}</Typography>
                    {section.contents.map((par, pInd) => (
                        <Typography key={`p_${pInd}`} paragraph={pInd < section.contents.length - 1}>
                            {par}
                        </Typography>
                    ))}
                </Section>
            ))}
        </>
    );
};
