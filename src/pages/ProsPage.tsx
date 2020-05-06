import React, { useState } from 'react';
import bg from '../assets/images/banners/pros.jpg';
import pga from '../assets/images/logos/pga_p.svg';

import { Button } from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { AddCircle } from '@material-ui/icons';
import { ProBio } from '../components/display/ProBio';
import { AppState, Pro } from '../__types__';
import { useSelector } from 'react-redux';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { ActionToolbar } from '../components/toolbars/ActionToolbar';
import { LoadingIndicator } from '../components/display/LoadingIndicator';
import { EditProDialog } from '../components/dialogs/EditProDialog';

const BlankPro: Pro = {
    id: '-1',
    name: '',
    title: '',
    image: '',
    bio: '',
};

export const ProsPage: React.FC = (): JSX.Element => {
    const pros = useSelector((state: AppState) => state.pros.prosList);
    const status = useSelector((state: AppState) => state.api.pros.status);
    const loading = status === 'loading';
    const admin = useSelector((state: AppState) => state.auth.admin);

    const [showNewDialog, setShowNewDialog] = useState(false);

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }}>
                <SectionBlurb
                    jumbo
                    icon={<img src={pga} alt={'PGA Logo'} width={48} />}
                    headline={'Meet Our Pros'}
                    subheading={'The folks behind the magic'}
                    body={`At Swing Essentials, all of our lessons are crafted by PGA golf professionals with years of playing and coaching experience. Rest assured that you are in good hands when you submit your videos for analysis. If you are interested in joining our team of professionals, please contact us!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            <ActionToolbar show={admin}>
                <Button variant={'text'} onClick={(): void => setShowNewDialog(true)}>
                    <AddCircle style={{ marginRight: 4 }} />
                    New Pro
                </Button>
            </ActionToolbar>

            <LoadingIndicator show={loading && pros.length < 1} />

            {admin && (
                <EditProDialog
                    isNew={true}
                    pro={BlankPro}
                    open={showNewDialog}
                    onClose={(): void => {
                        setShowNewDialog(false);
                    }}
                />
            )}

            {pros.map((bio) => (
                <Section key={`bio_${bio.id}`}>
                    <ProBio
                        {...bio}
                        background={{ size: bio.imageSize, position: bio.imagePosition }}
                        title={bio.title || 'Lead Instructor'}
                    />
                </Section>
            ))}
        </>
    );
};
