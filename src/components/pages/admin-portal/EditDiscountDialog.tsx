import React, { useState, useEffect, useCallback } from 'react';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Stack,
} from '@mui/material';
import {
    FullDiscount,
    useAddDiscountMutation,
    useRemoveDiscountMutation,
    useUpdateDiscountMutation,
} from '../../../redux/apiServices/packagesService';
import { format } from 'date-fns';
import { DATE_REGEX } from '../../../constants';
import { ConfirmationDialog } from '../../common/ConfirmationDialog';

type EditDiscountDialogProps = DialogProps & {
    discount: FullDiscount;
    isNew?: boolean;
};
export const EditDiscountDialog: React.FC<EditDiscountDialogProps> = (props) => {
    const { isNew, discount, ...dialogProps } = props;
    const { onClose = (): void => {} } = dialogProps;

    const [code, setCode] = useState(discount.code);
    const [description, setDescription] = useState(discount.description);
    const [type, setType] = useState<'percent' | 'amount'>(discount.type);
    const [value, setValue] = useState(discount.value);
    const [expires, setExpires] = useState(format(new Date(discount.expires * 1000), 'yyyy-MM-dd'));
    const [quantity, setQuantity] = useState(discount.quantity);
    const [unlimited, setUnlimited] = useState(discount.quantity === -1);
    const [never, setNever] = useState(discount.expires === -1);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const [addDiscount] = useAddDiscountMutation();
    const [updateDiscount] = useUpdateDiscountMutation();
    const [removeDiscount] = useRemoveDiscountMutation();

    const resetDiscount = useCallback(() => {
        setCode(discount.code);
        setDescription(discount.description);
        setType(discount.type);
        setValue(discount.value);
        setExpires(format(new Date(discount.expires * 1000), 'yyyy-MM-dd'));
        setQuantity(discount.quantity);
        setUnlimited(discount.quantity === -1);
        setNever(discount.expires === -1);
    }, [discount]);

    useEffect(() => {
        resetDiscount();
    }, [discount, resetDiscount]);

    if (!discount) return null;
    return (
        <>
            <Dialog
                maxWidth={'xs'}
                {...dialogProps}
                onClose={(e, reason) => {
                    onClose?.(e, reason);
                    resetDiscount();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} Discount Code`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the discount information below:`}</DialogContentText>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            variant={'filled'}
                            label={'Discount Code'}
                            name={'code'}
                            value={code}
                            onChange={(e): void => {
                                setCode(e.target.value);
                            }}
                            color={'secondary'}
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
                            color={'secondary'}
                        />
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                fullWidth
                                variant={'filled'}
                                label={'Value'}
                                name={'value'}
                                value={value}
                                onChange={(e): void => {
                                    setValue(e.target.value);
                                }}
                                sx={{ flex: '1 1 0px' }}
                                color={'secondary'}
                            />
                            <TextField
                                select
                                fullWidth
                                variant={'filled'}
                                label={'Type'}
                                name={'type'}
                                value={type}
                                onChange={(e): void => {
                                    setType(e.target.value as 'percent' | 'amount');
                                }}
                                sx={{ flex: '1 1 0px' }}
                                color={'secondary'}
                            >
                                <MenuItem value="percent">%</MenuItem>
                                <MenuItem value="amount">$</MenuItem>
                            </TextField>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                fullWidth
                                variant={'filled'}
                                label={'Quantity'}
                                name={'quantity'}
                                disabled={unlimited}
                                value={unlimited ? '' : quantity}
                                color="secondary"
                                onChange={(e): void => {
                                    setQuantity(parseInt(e.target.value.replace(/[^0-9]/gi, '').substring(0, 10)));
                                }}
                                sx={{ flex: '1 1 0px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color={'secondary'}
                                        checked={unlimited}
                                        onChange={(e): void => setUnlimited(e.target.checked)}
                                        name="unlimited"
                                    />
                                }
                                sx={{ flex: '1 1 0px' }}
                                label="Unlimited"
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
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
                                    setExpires(e.target.value.replace(/[^0-9-]/gi, '').substring(0, 10));
                                }}
                                color="secondary"
                                sx={{ flex: '1 1 0px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color={'secondary'}
                                        checked={never}
                                        onChange={(e): void => setNever(e.target.checked)}
                                        name="never"
                                    />
                                }
                                sx={{ flex: '1 1 0px' }}
                                label="Never"
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack direction={'row'} spacing={2}>
                        {!isNew && (
                            <Button
                                color={'error'}
                                variant={'contained'}
                                onClick={(): void => {
                                    setShowConfirmationDialog(true);
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            color="inherit"
                            variant={'outlined'}
                            onClick={(e): void => {
                                onClose(e, 'backdropClick');
                                resetDiscount();
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={
                            !code ||
                            !description ||
                            !type ||
                            !value ||
                            (!unlimited && quantity < 1) ||
                            (!never && !DATE_REGEX.test(expires))
                        }
                        onClick={(e): void => {
                            if (isNew) {
                                addDiscount({
                                    code,
                                    description,
                                    type,
                                    value,
                                    quantity: unlimited ? -1 : quantity,
                                    expires: never ? -1 : new Date(expires).getTime() / 1000,
                                });
                            } else {
                                updateDiscount({
                                    id: discount.id,
                                    code,
                                    description,
                                    type,
                                    value,
                                    quantity: unlimited ? -1 : quantity,
                                    expires: never ? -1 : new Date(expires).getTime() / 1000,
                                });
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
                        removeDiscount(discount);
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
