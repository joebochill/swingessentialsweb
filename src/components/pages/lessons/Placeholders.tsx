import React, { useState, ChangeEvent, MouseEvent } from 'react';
import {
    Typography,
    Button,
    TextField,
    FormHelperText,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    BoxProps,
    Box,
    Stack,
} from '@mui/material';
import { Edit, AddCircle } from '@mui/icons-material';
import Dtl from '../../../assets/icons/dtl.svg?react';
import Fo from '../../../assets/icons/fo.svg?react';

type PlaceholderVideoProps = BoxProps & {
    title: string;
    swingType: 'dtl' | 'fo';
    onVideoChange: (file: File | null) => void;
};
export const PlaceHolderVideo: React.FC<PlaceholderVideoProps> = (props) => {
    const { title, swingType, sx, onVideoChange, ...boxProps } = props;

    const [videoSrc, setVideoSrc] = useState<File | null>(null);
    const [videoSrcString, setVideoSrcString] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    return (
        <>
            <Box {...boxProps} sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}>
                <Box
                    sx={[
                        !videoSrc
                            ? (t) => ({
                                  paddingTop: '177.78%',
                                  position: 'relative',
                                  width: '100%',
                                  backgroundColor: 'primary.light',
                                  border: `2px dashed`,
                                  borderColor: `secondary.main`,
                                  cursor: 'pointer',

                                  '&:hover': {
                                      backgroundColor: `color-mix(in srgb, ${t.vars.palette.primary.light}, #000000 4%)`,
                                  },
                                  ...t.applyStyles('dark', {
                                      backgroundColor: `rgba(${t.vars.palette.primary.mainChannel} / 0.12)`,
                                      '&:hover': {
                                          backgroundColor: `rgba(${t.vars.palette.primary.mainChannel} / 0.08)`,
                                      },
                                  }),
                              })
                            : {},
                    ]}
                >
                    {!videoSrc && (
                        <Stack alignItems={'center'} justifyContent={'center'} sx={{ position: 'absolute', inset: 0 }}>
                            {swingType === 'dtl' ? (
                                <Dtl style={{ maxHeight: '40%', fill: 'currentcolor' }} />
                            ) : (
                                <Fo style={{ maxHeight: '40%', fill: 'currentcolor' }} />
                            )}
                        </Stack>
                    )}
                    {!videoSrc && (
                        <Stack sx={{ position: 'absolute', inset: 0, p: 2, alignItems: 'center' }}>
                            <Typography variant={'subtitle1'} color={'text.primary'}>
                                {title}
                            </Typography>
                        </Stack>
                    )}
                    <Box
                        component={'input'}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 0,
                            cursor: 'inherit',
                            display: videoSrc ? 'none' : 'initial',
                        }}
                        id={`file-picker-${title}`}
                        type={'file'}
                        accept={'.mov,.mp4,.mpeg'}
                        title={`Select a new ${title} video`}
                        onClick={(evt: MouseEvent): void => {
                            (evt.target as HTMLInputElement).value = '';
                        }}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                            if (evt && evt.target && evt.target.files && evt.target.files.length > 0) {
                                const size = evt.target.files[0].size;
                                const tooBig = size > 50 * 1024 * 1024;
                                if (tooBig) {
                                    setError(
                                        `The video you have selected is too large (${(size / (1024 * 1024)).toFixed(
                                            1
                                        )} MB). The maximum allowable file size is 50MB.`
                                    );
                                    setShowError(true);
                                }
                                setVideoSrc(tooBig ? null : evt.target.files[0]);
                                setVideoSrcString(tooBig ? '' : URL.createObjectURL(evt.target.files[0] || ''));
                                onVideoChange(tooBig ? null : evt.target.files[0]);
                            }
                        }}
                    />
                    {videoSrc && (
                        <Box
                            component={'video'}
                            sx={{ display: 'block', width: '100%', outlineL: 'none' }}
                            controls
                            src={videoSrcString}
                        >
                            Your browser does not support the video tag.
                        </Box>
                    )}
                </Box>
                <label htmlFor={`file-picker-${title}`}>
                    <Button
                        variant={'text'}
                        color={'secondary'}
                        component={'span'}
                        sx={{ mt: 1 }}
                        startIcon={videoSrc ? <Edit /> : <AddCircle />}
                    >
                        {`${videoSrc ? 'Change' : 'Add'} Video`}
                    </Button>
                </label>
            </Box>
            <Dialog
                open={showError}
                onClose={(e, r): void => {
                    if (r !== 'backdropClick') setShowError(false);
                }}
            >
                <DialogTitle>{`Video Error`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{error}</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={(): void => {
                            setShowError(false);
                        }}
                    >
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

type PlaceholderTextProps = BoxProps & {
    label: string;
    onTextChange: (text: string) => void;
};
export const PlaceholderText: React.FC<PlaceholderTextProps> = (props) => {
    const { label, sx, onTextChange, ...boxProps } = props;

    const [showField, setShowField] = useState(false);
    const [description, setDescription] = useState('');

    return (
        <Box {...boxProps} sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}>
            {!showField && (
                <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                    direction={'row'}
                    spacing={1}
                    sx={(t) => ({
                        width: '100%',
                        backgroundColor: 'primary.light',
                        border: `2px dashed`,
                        borderColor: 'secondary.main',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: `color-mix(in srgb, ${t.vars.palette.primary.light}, #000000 4%)`,
                        },
                        ...t.applyStyles('dark', {
                            backgroundColor: `rgba(${t.vars.palette.primary.mainChannel} / 0.12)`,
                            '&:hover': {
                                backgroundColor: `rgba(${t.vars.palette.primary.mainChannel} / 0.08)`,
                            },
                        }),
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                    onClick={(): void => setShowField(true)}
                >
                    <AddCircle />
                    <Typography variant={'button'} sx={{ userSelect: 'none' }}>
                        {label}
                    </Typography>
                </Stack>
            )}
            {showField && (
                <>
                    <TextField
                        fullWidth
                        multiline
                        autoFocus
                        variant={'outlined'}
                        color={'secondary'}
                        label={'Special Requests'}
                        placeholder={'Add any special requests or comments here...'}
                        name={'comments'}
                        value={description}
                        onChange={(e): void => {
                            setDescription(e.target.value);
                            onTextChange(e.target.value);
                        }}
                        slotProps={{
                            htmlInput: { maxLength: 500, style: { minHeight: 64 } },
                        }}
                    />
                    <FormHelperText color={'primary'}>{`${500 - description.length} characters left`}</FormHelperText>
                </>
            )}
        </Box>
    );
};
