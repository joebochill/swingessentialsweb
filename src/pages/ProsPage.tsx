import React, { JSX, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useGoogleAnalyticsPageView } from '../../src/hooks';
import { Pro } from '../__types__';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { Box, Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import bg from '../assets/images/banners/pros.jpg';
import pga from '../assets/images/logos/pga-member.svg';
import pgaWhite from '../assets/images/logos/pga-member-white.svg';
import { useDarkMode } from '../hooks';
import { RootState } from '../redux/store';
import { useGetProsQuery } from '../redux/apiServices/prosService';
import { ProBio } from '../components/display/ProBio';
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
    // useGoogleAnalyticsPageView();

    const { data: pros = [], isLoading } = useGetProsQuery();
    const admin = useSelector((state: RootState) => state.auth.admin);
    const { isDarkMode } = useDarkMode();
    const [showNewDialog, setShowNewDialog] = useState(false);

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }}>
                <SectionBlurb
                    icon={
                        <Box
                            component={'img'}
                            src={isDarkMode ? pgaWhite : pga}
                            alt={'PGA Logo'}
                            sx={{
                                width: (t) => t.spacing(6),
                                height: (t) => t.spacing(7),
                            }}
                        />
                    }
                    headline={'Meet Our Pros'}
                    subheading={'The folks behind the magic'}
                    body={`At Swing Essentials, all of our lessons are crafted by PGA golf professionals with years of playing and coaching experience. Rest assured that you are in good hands when you submit your videos for analysis. If you are interested in joining our team of professionals, please contact us!`}
                    sx={{ color: 'primary.contrastText', zIndex: 100, maxWidth: 900 }}
                />
            </Banner>
            <ActionToolbar show={admin}>
                <Button
                    variant={'text'}
                    color={'inherit'}
                    onClick={(): void => setShowNewDialog(true)}
                    startIcon={<AddCircle />}
                >
                    New Pro
                </Button>
            </ActionToolbar>

            <LoadingIndicator show={isLoading && pros.length < 1} />

            {admin && (
                <EditProDialog
                    isNew={true}
                    pro={BlankPro}
                    open={showNewDialog}
                    onClose={(): void => {
                        setShowNewDialog(false);
                    }}
                    closeAfterTransition={false}
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
