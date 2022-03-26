import React from 'react';
import classes from './home.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import valid from 'card-validator';
import CardApi from '../../api/card-api'

function Home() {

    const validationsSchemaSignUp = yup.object().shape({
        cardNumber: yup.string()
            .required('Card number is required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(16, 'Must be exactly 16 digits')
            .max(16, 'Must be exactly 16 digits'),
        expDate: yup.string().typeError('Not a valid expiration date. Example: MM/YYYY')
            .matches(
                /([0-9]{2})\/([0-9]{4})/,
                'Not a valid expiration date. Example: MM/YYYY'
            )
            .test('test-date',
                'Not a valid month or year',
                value => valid.expirationDate(value).isValid)
            .required('Expiration date is required'),
        cvv: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(3, 'Must be exactly 3 digits').max(3, 'Must be exactly 3 digits').required('CVV is required'),
        amount: yup.string().matches(/^[0-9]+$/, "Must be only digits").required('Amount is required')
    });

    function submitData(values) {
        CardApi.cardPay(values).then((response) => {
            if (response.status === 200) {
                alert(`Post id: ${response.data.requestId}, amount: ${response.data.amount}`)
            }
        },error => {
            if (error.response.status === 409) {
                alert(error.response.data.message);
            }
        });
    }

    return (
        <div>
            <div className={classes.wrapper}>

                <Formik
                    initialValues={{
                        cardNumber: '',
                        expDate: '',
                        cvv: '',
                        amount: ''
                    }}
                    validateOnChange
                    onSubmit={(values) => { submitData(values)}}
                    validationSchema={validationsSchemaSignUp}
                >

                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                        <div className={classes.cardForm}>
                            <TextField
                                sx={{
                                    marginBottom: "1rem"
                                }}
                                label="Card Number"
                                type={`text`}
                                name={`cardNumber`}
                                onBlur={handleBlur}
                                value={values.cardNumber}
                                onChange={handleChange}
                            />
                            {touched.cardNumber && errors.cardNumber && <p className={classes.error}>{errors.cardNumber}</p>}
                            <TextField
                                sx={{
                                    marginBottom: "1rem"
                                }}
                                label="Expiration Date * MM/YYYY"
                                type={`text`}
                                name={`expDate`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expDate}
                            />
                            {touched.expDate && errors.expDate && <p className={classes.error}>{errors.expDate}</p>}
                            <TextField
                                sx={{
                                    marginBottom: "1rem"
                                }}
                                label="CVV"
                                type={`text`}
                                name={`cvv`}
                                onBlur={handleBlur}
                                value={values.cvv}
                                onChange={handleChange}
                            />
                            {touched.cvv && errors.cvv && <p className={classes.error}>{errors.cvv}</p>}
                            <TextField
                                sx={{
                                    marginBottom: "1rem"
                                }}
                                label="Amount"
                                type={`text`}
                                name={`amount`}
                                onBlur={handleBlur}
                                value={values.amount}
                                onChange={handleChange}
                            />
                            {touched.amount && errors.amount && <p className={classes.error}>{errors.amount}</p>}
                            {/*<div>*/}
                            {/*    {emailAlreadyExist && <p className={classes.errorEmailAlreadyExist}>This email already exist!!</p>}*/}
                            {/*</div>*/}
                            <Button
                                sx={{
                                    fontSize: "1.3rem",
                                    textTransform: "none"
                                }}
                                variant="contained"
                                disabled={!isValid || !dirty}
                                onClick={handleSubmit}
                                type={`submit`}
                            >Pay
                            </Button>
                        </div>
                    )}

                    </Formik>
            </div>
        </div>
    );
};

export default Home;
