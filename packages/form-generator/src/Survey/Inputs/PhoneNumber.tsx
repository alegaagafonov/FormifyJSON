import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { InputLabel } from "./InputLabel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { usePhoneVerification } from "../useFormVerification"; // Import the usePhoneVerification hook

interface PhoneVerificationProps {
  label: string;
  projectId: string; // Add a projectId prop
  api: any;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  label,
  projectId,
  api,
}) => {
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  //const [code, setCode] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

  const {
    verificationCode,
    verificationError,
    sendingCode,
    verifyingUser,
    setVerificationCode,
    sendCode,
    verifyUser,
  } = usePhoneVerification(api); // Use the usePhoneVerification hook

  const handleVerifyUser = async () => {
    try {
      await verifyUser({ phoneNumber, code: verificationCode });
      setSuccessSnackbarOpen(true);
    } catch (error) {
      // handle error
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const handleSendCode = async () => {
    try {
      await sendCode({ phoneNumber, projectId });
      setShowCodeInput(true);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCloseNotification = () => {
  //   setSuccessSnackbarOpen(false);
  // };

  const inputLabelSx: SxProps<Theme> = {
    "& .MuiInputBase-root": {
      height: "35px",
      padding: "6px 12px",
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
  };

  return (
    <Box>
      <InputLabel name={label} label={label} />
      <Box
        display="flex"
        alignItems="center"
        sx={{ ml: 0, height: "35px !important", width: "300px" }}
      >
        <PhoneInput
          country={"us"}
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder=""
          containerStyle={{ width: "70%" }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendCode}
            sx={{ ml: 1, height: "35px !important", width: "150px" }}
          >
            {sendingCode ? <CircularProgress size={24} /> : "Send Code"}
          </Button>
        </Box>
      </Box>
      {showCodeInput && (
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            label="Code"
            variant="outlined"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={verifyingUser}
            sx={{
              ...inputLabelSx,
              width: "110px !important",
              ml: "0px !important",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyUser}
            sx={{ ml: 1, height: "35px !important" }}
          >
            {verifyingUser ? <CircularProgress size={24} /> : "Verify Code"}
          </Button>
        </Box>
      )}
      {verificationError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {verificationError}
        </Alert>
      )}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="User successfully verified!"
      />
    </Box>
  );
};

export default PhoneVerification;
