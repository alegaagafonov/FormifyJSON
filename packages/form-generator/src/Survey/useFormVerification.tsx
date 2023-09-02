import { useState } from 'react';
import { Api } from './index';

export const usePhoneVerification = (api: Api) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(null);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingUser, setVerifyingUser] = useState(false);

  const sendCode = async ({ phoneNumber, projectId }) => {
    setSendingCode(true);
    try {
      await api.sendVerification({ phoneNumber, projectId });
      setVerificationError(null);
    } catch (error) {
      setVerificationError('Failed to send code. Please try again.');
    } finally {
      setSendingCode(false);
    }
  };

  const verifyUser = async ({ phoneNumber, code }) => {
    setVerifyingUser(true);
    try {
      await api.verifyUser({ phoneNumber, code });
      setVerificationError(null);
    } catch (error) {
      setVerificationError('Verification failed. Please try again.');
    } finally {
      setVerifyingUser(false);
    }
  };

  return {
    verificationCode,
    verificationError,
    sendingCode,
    verifyingUser,
    setVerificationCode,
    sendCode,
    verifyUser
  };
};
