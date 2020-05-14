import React, { useState, ChangeEvent, MouseEvent, useRef, useEffect, useCallback } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { usePinch } from 'react-use-gesture';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from '@material-ui/icons';
import { setUserAvatar } from '../../redux/actions/user-settings-actions';
import { AppState } from '../../__types__';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: 300,
            width: 300,
            borderRadius: 300,
            color: 'white',
            backgroundPosition: 'center center',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            boxShadow: theme.shadows[6],
        },
    })
);

export const AvatarChanger: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const settingsLoaded = useSelector((state: AppState) => state.api.getUserSettings.status);
    const user = useSelector((state: AppState) => state.user);

    // avatar hash code
    const _avatar = useSelector((state: AppState) => state.settings.avatar);
    const [avatarInitialized, setAvatarInitialized] = useState(false);
    // full path to hosted image used by main display
    const [avatar, setAvatar] = useState('');
    // source used in the edit dialog
    const [source, setSource] = useState('');
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = (): void => {
        setAnchorEl(null);
    };
    const removePhoto = (): void => {
        setAnchorEl(null);
        setAvatar('');
        dispatch(
            setUserAvatar({
                useAvatar: 0,
                avatar: '',
            })
        );
    };

    useEffect(() => {
        if (settingsLoaded === 'success' && !avatarInitialized && user.username) {
            setAvatarInitialized(true);
            setAvatar(
                `https://www.swingessentials.com/images/profiles/${
                    _avatar ? `${user.username}/${_avatar}.png` : 'blank.png'
                }`
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, avatarInitialized, settingsLoaded, setAvatar]);

    return (
        <div
            className={classes.avatar}
            style={{
                backgroundColor: theme.palette.primary.light,
                backgroundImage: `url(${avatar || 'https://www.swingessentials.com/images/profiles/blank.png'})`,
            }}
        >
            <IconButton
                color={'inherit'}
                aria-controls="avatar-menu"
                aria-haspopup="true"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={(e): void => setAnchorEl(e.currentTarget)}
            >
                <Edit />
            </IconButton>
            <input
                id={`file-picker-avatar`}
                style={{ display: 'none' }}
                type={'file'}
                accept={'.jpg,.jpeg,.png'}
                title={`Select a new profile photo`}
                onClick={(evt: MouseEvent): void => {
                    (evt.target as HTMLInputElement).value = '';
                }}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                    if (evt && evt.target && evt.target.files && evt.target.files.length > 0) {
                        setSource(URL.createObjectURL(evt.target.files[0] || ''));
                        setShowImagePicker(true);
                    }
                }}
            />
            <Menu id="avatar-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <label htmlFor={`file-picker-avatar`}>
                    <MenuItem onClick={handleClose}>Upload a photo...</MenuItem>
                </label>
                <MenuItem onClick={removePhoto}>Remove photo</MenuItem>
            </Menu>

            <AvatarPickerDialog
                open={showImagePicker}
                src={source || `https://www.swingessentials.com/images/profiles/blank.png`}
                onClose={(): void => {
                    setShowImagePicker(false);
                }}
                onImageChange={(newImage: string): void => setAvatar(newImage)}
            />
        </div>
    );
};

type AvatarDialogProps = DialogProps & {
    src: string;
    onImageChange: (newImage: string) => void;
};
export const AvatarPickerDialog: React.FC<AvatarDialogProps> = (props) => {
    const { src, onImageChange, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const [zoom, setZoom] = useState(1.5);
    const preview = useRef<AvatarEditor>(null);

    const bind = usePinch(
        (state) => {
            if (state && state.event) state.event.preventDefault();
            const momentum = state.vdva[0] || 0;
            if (momentum > 0) setZoom(Math.min(4, zoom + 0.07));
            else if (momentum < 0) setZoom(Math.max(zoom - 0.07, 1));
        },
        { domTarget: window, eventOptions: { passive: false } }
    );

    useEffect(bind, [bind, preview]);

    useEffect(() => {
        if (dialogProps.open) setZoom(1.5);
    }, [dialogProps.open, setZoom]);

    const submitAvatar = useCallback(
        (imageURL: string) => {
            if (!imageURL) {
                return;
            }
            dispatch(
                setUserAvatar({
                    useAvatar: 1,
                    avatar: imageURL,
                })
            );
        },
        [dispatch]
    );

    return (
        <>
            <Dialog
                {...dialogProps}
                onBackdropClick={(e): void => {
                    if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                    // resetBlog();
                }}
            >
                <DialogTitle>Update Your Profile Picture</DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <DialogContentText>{`Adjust the window below to change your profile picture:`}</DialogContentText>
                    <AvatarEditor
                        ref={preview}
                        image={src}
                        width={xs ? 200 : 300}
                        height={xs ? 200 : 300}
                        border={0}
                        borderRadius={150}
                        color={[0, 0, 0, 0.6]} // RGBA
                        scale={zoom}
                        rotate={0}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant={'outlined'}
                        onClick={(e): void => {
                            onClose(e, 'backdropClick');
                            // resetBlog();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={false /*!title || !date || !body || !DATE_REGEX.test(date)*/}
                        onClick={(e): void => {
                            if (preview && preview.current) {
                                const imageURL = preview.current.getImageScaledToCanvas().toDataURL('image/png', 0.5);
                                onImageChange(imageURL);
                                submitAvatar(imageURL);
                            }
                            onClose(e, 'escapeKeyDown');
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
