import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review'; 
import useInput from '../../hooks/useInput'
import axios from 'axios';
import { recordCart } from '../../redux/cart';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  
  const theme = createTheme();
  
  export default function Checkout() {
    const fullName = [useInput('firstName'), useInput('lastName')]
    const addresses = [
      useInput('address1'), 
      useInput('city'), 
      useInput('state'), 
      useInput('expDzipate'), 
      useInput('country')
    ];
    const payments = [
      { name: 'Card type', value: 'Visa' }, 
      useInput('Card holder'), 
      useInput('Card number'), 
      useInput('Expiry date')
    ]

    function getStepContent(step) {
      switch (step) {
        case 0:
          return <AddressForm fullName={fullName} addresses={addresses} />;
        case 1:
          return <PaymentForm payments={payments} />;
        case 2:
          return <Review fullName={fullName} addresses={addresses} payments={payments}/>;
        default:
          throw new Error('Unknown step');
      }
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    const handlePlaceOrder = () => {
      axios.put('/api/cart/checkout')
        .then(()=> dispatch(recordCart())
          .then(()=> navigate('/home'))
          .then(() =>{throw alert("yout purchase was succesfull")})
        )
    }
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
  
                    {activeStep === steps.length - 1 ?(
                      <Button
                        variant="contained"
                        onClick={handlePlaceOrder}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Place order
                      </Button>
                    ):(
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    );
  }


   
