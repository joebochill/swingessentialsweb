import React, { HTMLAttributes, useState, ChangeEvent, MouseEvent } from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
    Typography,
    darken,
    Button,
    TextField,
    FormHelperText,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
} from '@material-ui/core';
import { AddAPhoto, Edit, AddCircle } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        placeholder: {
            width: '100%',
            backgroundColor: theme.palette.primary.light,
            border: `2px dashed ${theme.palette.primary.main}`,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: darken(theme.palette.primary.light, 0.05),
            },
        },
        portrait: {
            paddingTop: '177.78%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            position: 'relative',
        },
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        input: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            cursor: 'inherit',
        },
        video: {
            display: 'block',
            width: '100%',
            outline: 'none',
        },
        button: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

type PlaceholderVideoProps = HTMLAttributes<HTMLDivElement> & {
    title: string;
    background: string;
    onVideoChange: (file: File | null) => void;
};
export const PlaceHolderVideo: React.FC<PlaceholderVideoProps> = (props) => {
    const { title, background, style, onVideoChange, ...divProps } = props;
    const classes = useStyles(props);
    const [videoSrc, setVideoSrc] = useState<File | null>(null);
    const [videoSrcString, setVideoSrcString] = useState('');

    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    return (
        <>
            <div {...divProps} style={Object.assign({ textAlign: 'center' }, style)}>
                <div
                    className={clsx({ [classes.placeholder]: !videoSrc, [classes.portrait]: !videoSrc })}
                    style={videoSrc ? { background: 'none' } : { backgroundImage: `url(${background})` }}
                >
                    <div className={classes.container}>
                        <Typography variant={'subtitle1'} color={'primary'}>
                            {title}
                        </Typography>
                    </div>
                    <input
                        className={classes.input}
                        id={`file-picker-${title}`}
                        style={{ display: videoSrc ? 'none' : 'initial' }}
                        type={'file'}
                        accept={'.mov,.mp4,.mpeg'}
                        title={`Select a new ${title} video`}
                        onClick={(evt: MouseEvent): void => {
                            (evt.target as HTMLInputElement).value = '';
                        }}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                            if (evt && evt.target && evt.target.files && evt.target.files.length > 0) {
                                const size = evt.target.files[0].size;
                                const tooBig = size > 10 * 1024 * 1024;
                                if (tooBig) {
                                    setError(
                                        `The video you have selected is too large (${(size / (1024 * 1024)).toFixed(
                                            1
                                        )} MB). The maximum allowable file size is 10MB.`
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
                        <video className={classes.video} controls src={videoSrcString}>
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <label htmlFor={`file-picker-${title}`}>
                    <Button variant={'text'} color={'primary'} component={'span'} style={{ marginTop: 8 }}>
                        {videoSrc ? <Edit style={{ marginRight: 4 }} /> : <AddAPhoto style={{ marginRight: 4 }} />}
                        {`${videoSrc ? 'Change' : 'Add'} Video`}
                    </Button>
                </label>
            </div>
            <Dialog disableBackdropClick open={showError} onClose={(): void => setShowError(false)}>
                <DialogTitle>{`Video Error`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{error}</DialogContentText>
                </DialogContent>
                <DialogActions>
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

type PlaceholderTextProps = HTMLAttributes<HTMLDivElement> & {
    label: string;
    onTextChange: (text: string) => void;
};
export const PlaceHolderText: React.FC<PlaceholderTextProps> = (props) => {
    const { label, style, onTextChange, ...divProps } = props;
    const classes = useStyles(props);

    const [showField, setShowField] = useState(false);
    const [description, setDescription] = useState('');

    return (
        <div {...divProps} style={Object.assign({ textAlign: 'center' }, style)}>
            {!showField && (
                <div className={clsx(classes.placeholder, classes.button)} onClick={(): void => setShowField(true)}>
                    <AddCircle style={{ marginRight: 4 }} />
                    <Typography variant={'button'} style={{ userSelect: 'none' }}>
                        {label}
                    </Typography>
                </div>
            )}
            {showField && (
                <>
                    <TextField
                        fullWidth
                        multiline
                        autoFocus
                        variant={'outlined'}
                        label={'Special Requests'}
                        placeholder={'Add any special requests or comments here...'}
                        name={'comments'}
                        value={description}
                        onChange={(e): void => {
                            setDescription(e.target.value);
                            onTextChange(e.target.value);
                        }}
                        classes={{}}
                        inputProps={{ maxLength: 500, style: { minHeight: 64 } }}
                    />
                    <FormHelperText color={'primary'}>{`${500 - description.length} characters left`}</FormHelperText>
                </>
            )}
        </div>
    );
};
