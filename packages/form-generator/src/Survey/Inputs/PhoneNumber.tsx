import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { InputLabel } from './InputLabel';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface OtpApi {
  sendCode: (phoneNumber: string) => Promise<void>;
  verifyCode: ({ phoneNumber, code }) => Promise<void>;
}

interface PhoneVerificationProps {
  label: string;
  otpApi: OtpApi;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  label,
  otpApi
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [sendCodeLoading, setSendCodeLoading] = useState<boolean>(false);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    setSendCodeLoading(true);
    setError(null);

    try {
      await otpApi.sendCode(phoneNumber);
      setShowCodeInput(true);
    } catch (err) {
      setError('Failed to send code. Please try again.');
    }

    setSendCodeLoading(false);
  };

  const handleVerifyCode = async () => {
    setVerifyLoading(true);
    setError(null);

    try {
      await otpApi.verifyCode({ phoneNumber, code });
      // Handle success (e.g., navigate to another page, show a success message, etc.)
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    }

    setVerifyLoading(false);
  };

  const inputLabelSx: SxProps<Theme> = {
    '& .MuiInputBase-root': {
      height: '35px',
      padding: '6px 12px'
    },
    '& .MuiInputLabel-root': {
      transform: 'translate(14px, 10px) scale(1)'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    }
  };

  return (
    <Box>
      <InputLabel name={label} label={label} />
      <Box
        display="flex"
        alignItems="center"
        sx={{ ml: 0, height: '35px !important', width: '300px' }}
      >
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder=""
          containerStyle={{ width: '100%' }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendCode}
            sx={{ ml: 1, height: '35px !important', width: '150px' }}
          >
            {sendCodeLoading ? <CircularProgress size={24} /> : 'Send Code'}
          </Button>
        </Box>
      </Box>
      {showCodeInput && (
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            label="Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={verifyLoading}
            sx={{
              ...inputLabelSx,
              width: '80px !important',
              ml: '0px !important'
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyCode}
            sx={{ ml: 1, height: '35px !important' }}
          >
            {verifyLoading ? <CircularProgress size={24} /> : 'Verify Code'}
          </Button>
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PhoneVerification;
