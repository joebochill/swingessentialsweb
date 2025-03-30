import React, { HTMLAttributes, useState } from 'react';
import { useSelector } from 'react-redux';
import { splitDatabaseText } from '../../../utilities/text';
import { Box, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { RootState } from '../../../redux/store';
import { EditProDialog } from './EditProDialog';

type ProBioProps = HTMLAttributes<HTMLDivElement> & {
    id: string | number;
    image: string;
    background?: {
        position?: string;
        size?: string;
    };
    name: string;
    title: string;
    bio: string;
};
export const ProBio: React.FC<ProBioProps> = (props) => {
    const { image, name, title, background = {}, bio } = props;

    const admin = useSelector((state: RootState) => state.auth.admin);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const descriptionParagraphs = splitDatabaseText(bio);

    return (
        <>
            <Stack
                sx={{
                    width: '100%',
                    maxWidth: 1024,
                    alignItems: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 4, md: 8 },
                }}
            >
                <Stack sx={{ flex: 0, textAlign: 'center' }}>
                    <Box
                        sx={{
                            height: 200,
                            width: 200,
                            borderRadius: '200px',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url(${
                                image.startsWith('http')
                                    ? image
                                    : `https://www.swingessentials.com/images/pros/${image}`
                            })`,
                            backgroundPosition: background.position || 'center center',
                            backgroundSize: background.size || '100%',
                        }}
                    />
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        sx={{
                            mt: 1,
                            cursor: admin ? 'pointer' : 'initial',
                        }}
                        onClick={
                            admin
                                ? (): void => {
                                      setShowEditDialog(true);
                                  }
                                : undefined
                        }
                    >
                        {admin && <Edit sx={{ mr: 0.5 }} />}
                        <Typography variant={'h6'} sx={{ lineHeight: 1 }}>
                            {name}
                        </Typography>
                    </Stack>
                    <Typography variant={'caption'} display={'block'}>
                        {title}
                    </Typography>
                </Stack>

                <Stack sx={{ flex: '1 1 0px', gap: 2 }}>
                    {descriptionParagraphs.map((paragraph: string, index: number) => (
                        <Typography key={`p_${index}`} sx={{ lineHeight: 1.8 }}>
                            {paragraph}
                        </Typography>
                    ))}
                </Stack>
            </Stack>

            <EditProDialog
                open={showEditDialog}
                pro={{ ...props }}
                onClose={(): void => {
                    setShowEditDialog(false);
                }}
            />
        </>
    );
};
