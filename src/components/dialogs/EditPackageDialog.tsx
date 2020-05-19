/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Package } from '../../__types__';
import { addPackage, updatePackage, removePackage } from '../../redux/actions/package-actions';
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
    InputAdornment,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
    })
);

type EditPackageDialogProps = DialogProps & {
    pkg: Package;
    isNew?: boolean;
};
export const EditPackageDialog: React.FC<EditPackageDialogProps> = (props) => {
    const { isNew, pkg, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const classes = useStyles();

    const [name, setName] = useState(pkg.name);
    const [description, setDescription] = useState(pkg.description);
    const [short, setShort] = useState(pkg.shortcode);
    const [count, setCount] = useState(pkg.count);
    const [price, setPrice] = useState(pkg.price);
    const [sku, setSku] = useState(pkg.app_sku);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const resetPackage = useCallback(() => {
        setName(pkg.name);
        setDescription(pkg.description);
        setShort(pkg.shortcode);
        setCount(pkg.count);
        setPrice(pkg.price);
        setSku(pkg.app_sku);
    }, [pkg]);

    useEffect(() => {
        resetPackage();
    }, [pkg, resetPackage]);

    if (!pkg) return null;
    return (
        <>
            <Dialog
                {...dialogProps}
                onBackdropClick={(e): void => {
                    if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                    resetPackage();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} Package`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the package information below:`}</DialogContentText>
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Package Name'}
                        placeholder={'e.g. Albatross Package'}
                        name={'name'}
                        value={name}
                        onChange={(e): void => {
                            setName(e.target.value);
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
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Lesson Count'}
                        name={'count'}
                        value={count}
                        onChange={(e): void => {
                            setCount(e.target.value.replace(/[^0-9]/gi, '').substr(0, 3));
                        }}
                        className={classes.field}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Price'}
                        name={'price'}
                        placeholder={'e.g., 14.99'}
                        value={price}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        onChange={(e): void => {
                            setPrice(e.target.value.replace(/[^0-9.]/gi, '').substr(0, 6));
                        }}
                        className={classes.field}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'App SKU'}
                        name={'sku'}
                        placeholder={'e.g., com.swingessentials.par'}
                        value={sku}
                        onChange={(e): void => {
                            setSku(e.target.value);
                        }}
                        className={classes.field}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Short Code'}
                        name={'short'}
                        placeholder={'e.g., par'}
                        value={short}
                        onChange={(e): void => {
                            setShort(e.target.value);
                        }}
                        className={classes.field}
                    />
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
                    <Spacer />
                    <Button
                        color="primary"
                        variant={'outlined'}
                        onClick={(e): void => {
                            onClose(e, 'backdropClick');
                            resetPackage();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={!name || !description || !short || count < 1 || !price || !sku}
                        onClick={(e): void => {
                            if (isNew) {
                                dispatch(
                                    addPackage({
                                        name,
                                        description,
                                        shortcode: short,
                                        count,
                                        duration: 0,
                                        price,
                                        app_sku: sku,
                                    })
                                );
                            } else {
                                dispatch(
                                    updatePackage({
                                        id: pkg.id,
                                        name,
                                        description,
                                        shortcode: short,
                                        count,
                                        price,
                                        app_sku: sku,
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
                    title={'Delete Package'}
                    message={'Are you sure you want to delete this package? This action cannot be undone.'}
                    onOkay={(e): void => {
                        setShowConfirmationDialog(false);
                        dispatch(removePackage(pkg));
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
