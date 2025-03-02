/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useCallback, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Audience, EmailType } from '../../__types__';
import { sendBulkEmail } from '../../redux/actions/emailActions';
import { capitalize, convertMultilineToDatabaseText } from '../../utilities/text';
import { sortUsers } from '../../utilities/user';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Chip,
} from '@material-ui/core';
import { Spacer } from '@pxblue/react-components';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            marginRight: 4,
            marginBottom: 4,
        },
    })
);

type NewEmailBlastDialogProps = DialogProps;
export const NewEmailBlastDialog: React.FC<NewEmailBlastDialogProps> = (props) => {
    const { ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const classes = useStyles();

    const users = useSelector((state: AppState) => state.users.list);
    const usersByName = [...users].sort(sortUsers('last'));
    const currentUser = useSelector((state: AppState) => state.user);

    // Form fields
    const [subject, setSubject] = useState('');
    const [headline, setHeadline] = useState('');
    const [body, setBody] = useState('');
    const [type, setType] = useState<EmailType>('marketing');
    const [audience, setAudience] = useState<Audience>('all');
    const [audienceList, setAudienceList] = useState<string[]>([]);

    const resetEmail = useCallback(() => {
        setSubject('');
        setHeadline('');
        setBody('');
        setType('marketing');
        setAudience('all');
        setAudienceList([]);
    }, []);

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>New Email Blast</DialogTitle>
            <DialogContent>
                <DialogContentText>{`What kind of email will this be:`}</DialogContentText>

                <FormControl variant="filled" fullWidth className={classes.field}>
                    <InputLabel id="type-label">{`Email Type`}</InputLabel>
                    <Select
                        labelId="type-label"
                        value={type}
                        onChange={(e): void => setType(e.target.value as EmailType)}
                    >
                        <MenuItem value="marketing">Marketing</MenuItem>
                        <MenuItem value="newsletter">Newsletter</MenuItem>
                        <MenuItem value="reminder">Reminder</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth className={classes.field}>
                    <InputLabel id="type-label">{`Recipients`}</InputLabel>
                    <Select
                        labelId="audience-label"
                        value={audience}
                        onChange={(e): void => setAudience(e.target.value as Audience)}
                    >
                        <MenuItem value="all">Everyone</MenuItem>
                        <MenuItem value="unconfirmed">Unconfirmed Emails</MenuItem>
                        <MenuItem value="incomplete">Incomplete Profiles</MenuItem>
                        <MenuItem value="manual">Select Manually</MenuItem>
                    </Select>
                </FormControl>
                {audience === 'manual' && (
                    <FormControl variant="filled" fullWidth className={classes.field}>
                        <InputLabel id="username-label">{`Users`}</InputLabel>
                        <Select
                            labelId="users-label"
                            placeholder="Choose recipients"
                            value={audienceList}
                            renderValue={(selected): ReactNode => (
                                <div className={classes.chips}>
                                    {/* @ts-ignore */}
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            variant={'outlined'}
                                            color={value.includes('unconfirmed') ? 'secondary' : 'primary'}
                                            label={value}
                                            className={classes.chip}
                                        />
                                    ))}
                                </div>
                            )}
                            onChange={(event): void => setAudienceList(event.target.value as string[])}
                            multiple
                        >
                            {usersByName.map((_user) => {
                                const displayName =
                                    _user.first && _user.last
                                        ? `${capitalize(_user.last)}, ${capitalize(_user.first)} (${_user.username})`
                                        : _user.username;
                                return (
                                    <MenuItem key={_user.username} value={_user.username}>
                                        {`${displayName}${_user.role === 'pending' ? ' (unconfirmed)' : ''}`}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                )}

                <DialogContentText>{`Enter the email details below:`}</DialogContentText>
                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Email Subject'}
                    placeholder={'Check this out!'}
                    name={'subject'}
                    value={subject}
                    onChange={(e): void => {
                        setSubject(e.target.value);
                    }}
                    className={classes.field}
                />
                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Body Headline'}
                    placeholder={'Add the title to show in the message body here...'}
                    name={'headline'}
                    value={headline}
                    onChange={(e): void => {
                        setHeadline(e.target.value);
                    }}
                    className={classes.field}
                />
                <TextField
                    fullWidth
                    multiline
                    variant={'filled'}
                    label={'Body Content'}
                    placeholder={'Add the content here...'}
                    name={'body'}
                    value={body}
                    onChange={(e): void => {
                        setBody(e.target.value);
                    }}
                    inputProps={{ maxLength: 65000, style: { minHeight: 128 } }}
                    helperText={`${65000 - body.length} characters left`}
                    className={classes.field}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant={'outlined'}
                    disabled={!subject || !headline || !body}
                    onClick={(e): void => {
                        dispatch(
                            sendBulkEmail({
                                subject,
                                title: headline,
                                body: convertMultilineToDatabaseText(body),
                                type,
                                audience: 'manual',
                                bcc: [currentUser.username],
                            })
                        );
                        onClose(e, 'escapeKeyDown');
                    }}
                >
                    {`Send Test (${currentUser.email})`}
                </Button>
                <Spacer classes={{}} />
                <Button
                    color="primary"
                    variant={'outlined'}
                    onClick={(e): void => {
                        onClose(e, 'backdropClick');
                        resetEmail();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    disabled={!subject || !headline || !body}
                    onClick={(e): void => {
                        dispatch(
                            sendBulkEmail({
                                subject,
                                title: headline,
                                body: convertMultilineToDatabaseText(body),
                                type,
                                audience,
                                bcc: audience === 'manual' ? audienceList : undefined,
                            })
                        );
                        onClose(e, 'escapeKeyDown');
                        resetEmail();
                    }}
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};
