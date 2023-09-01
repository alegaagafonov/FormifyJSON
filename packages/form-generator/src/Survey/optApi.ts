const otpApi = {
  sendCode: async (phoneNumber: string) => {
    const response = await fetch('/send-code', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  },
  verifyCode: async ({
    phoneNumber,
    code
  }: {
    phoneNumber: string;
    code: string;
  }) => {
    const response = await fetch('/verify-code', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, code })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
};

export default otpApi;
