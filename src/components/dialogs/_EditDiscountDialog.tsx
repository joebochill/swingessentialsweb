import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Discount } from '../../__types__';
import { addDiscount, updateDiscount, removeDiscount } from '../../redux/actions/discount-actions';
import { DATE_REGEX } from '../../constants';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Spacer } from '@pxblue/react-components';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
} from '@material-ui/core';
import { getDate } from '../../utilities/date';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
    })
);

type EditDiscountDialogProps = DialogProps & {
    discount: Discount;
    isNew?: boolean;
};
export const EditDiscountDialog: React.FC<EditDiscountDialogProps> = (props) => {
    const { isNew, discount, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const [code, setCode] = useState(discount.code);
    const [description, setDescription] = useState(discount.description);
    const [type, setType] = useState<'percent' | 'amount'>(discount.type);
    const [value, setValue] = useState(discount.value);
    const [expires, setExpires] = useState(getDate(parseInt(discount.expires, 10) * 1000));
    const [quantity, setQuantity] = useState(discount.quantity);
    const [unlimited, setUnlimited] = useState(parseInt(discount.quantity, 10) === -1);
    const [never, setNever] = useState(parseInt(discount.expires, 10) === -1);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const resetDiscount = useCallback(() => {
        setCode(discount.code);
        setDescription(discount.description);
        setType(discount.type);
        setValue(discount.value);
        setExpires(getDate(parseInt(discount.expires, 10) * 1000));
        setQuantity(discount.quantity);
        setUnlimited(parseInt(discount.quantity, 10) === -1);
        setNever(parseInt(discount.expires, 10) === -1);
    }, [discount]);

    useEffect(() => {
        resetDiscount();
    }, [discount, resetDiscount]);

    if (!discount) return null;
    return (
        <>
            <Dialog
                {...dialogProps}
                onBackdropClick={(e): void => {
                    if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                    resetDiscount();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} Discount Code`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the discount information below:`}</DialogContentText>
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Discount Code'}
                        name={'code'}
                        value={code}
                        onChange={(e): void => {
                            setCode(e.target.value);
                        }}
                        className={classes.field}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Description'}
                        name={'description'}
                        value={description}
                        onChange={(e): void => {
                            setDescription(e.target.value);
                        }}
                        className={classes.field}
                    />
                    <div className={classes.field} style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant={'filled'}
                            label={'Value'}
                            name={'value'}
                            value={value}
                            // InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            onChange={(e): void => {
                                setValue(e.target.value);
                            }}
                        />
                        <FormControl variant="filled" style={{ marginLeft: theme.spacing(2), minWidth: 150 }}>
                            {/* <InputLabel id="type-label">{`Response Status`}</InputLabel> */}
                            <Select
                                // labelId="type-label"
                                value={type}
                                onChange={(e): void => setType(e.target.value as 'percent' | 'amount')}
                            >
                                <MenuItem value="percent">%</MenuItem>
                                <MenuItem value="amount">$</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.field} style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant={'filled'}
                            label={'Quantity'}
                            name={'quantity'}
                            disabled={unlimited}
                            value={unlimited ? '' : quantity}
                            onChange={(e): void => {
                                setQuantity(e.target.value.replace(/[^0-9]/gi, '').substr(0, 10));
                            }}
                        />
                        <FormControlLabel
                            style={{ marginLeft: theme.spacing(2), marginRight: 0, minWidth: 158 }}
                            control={
                                <Checkbox
                                    color={'primary'}
                                    checked={unlimited}
                                    onChange={(e): void => setUnlimited(e.target.checked)}
                                    name="unlimited"
                                />
                            }
                            label="Unlimited"
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant={'filled'}
                            label={'Expires'}
                            name={'expires'}
                            error={!never && !DATE_REGEX.test(expires)}
                            disabled={never}
                            value={never ? '' : expires}
                            placeholder={'YYYY-MM-DD'}
                            onChange={(e): void => {
                                setExpires(e.target.value.replace(/[^0-9-]/gi, '').substr(0, 10));
                            }}
                        />
                        <FormControlLabel
                            style={{ marginLeft: theme.spacing(1), marginRight: 0, minWidth: 158 }}
                            control={
                                <Checkbox
                                    color={'primary'}
                                    checked={never}
                                    onChange={(e): void => setNever(e.target.checked)}
                                    name="never"
                                />
                            }
                            label="Never"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    {!isNew && (
                        <Button
                            color={'secondary'}
                            variant={'contained'}
                            onClick={(): void => {
                                setShowConfirmationDialog(true);
                            }}
                        >
                            Delete
                        </Button>
                    )}
                    <Spacer classes={{}} />
                    <Button
                        color="primary"
                        variant={'outlined'}
                        onClick={(e): void => {
                            onClose(e, 'backdropClick');
                            resetDiscount();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={
                            !code ||
                            !description ||
                            !type ||
                            !value ||
                            (!unlimited && parseInt(quantity, 10) < 1) ||
                            (!never && !DATE_REGEX.test(expires))
                        }
                        onClick={(e): void => {
                            if (isNew) {
                                dispatch(
                                    addDiscount({
                                        code,
                                        description,
                                        type,
                                        value,
                                        quantity: unlimited ? '-1' : quantity,
                                        expires: never ? '-1' : `${new Date(expires).getTime() / 1000}`,
                                    })
                                );
                            } else {
                                dispatch(
                                    updateDiscount({
                                        id: discount.id,
                                        code,
                                        description,
                                        type,
                                        value,
                                        quantity: unlimited ? '-1' : quantity,
                                        expires: never ? '-1' : `${new Date(expires).getTime() / 1000}`,
                                    })
                                );
                            }
                            onClose(e, 'escapeKeyDown');
                        }}
                    >
                        {`${isNew ? 'Add' : 'Save'}`}
                    </Button>
                </DialogActions>
            </Dialog>
            {showConfirmationDialog && (
                <ConfirmationDialog
                    title={'Delete Discount Code'}
                    message={'Are you sure you want to delete this discount? This action cannot be undone.'}
                    onOkay={(e): void => {
                        setShowConfirmationDialog(false);
                        dispatch(removeDiscount(discount));
                        onClose(e, 'escapeKeyDown');
                    }}
                    onCancel={(): void => {
                        setShowConfirmationDialog(false);
                    }}
                />
            )}
        </>
    );
};
