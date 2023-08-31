import React, { useState } from 'react';

interface SaveButtonProps {
  isDisabled: boolean;
  onSave: (values: any) => Promise<void>;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isDisabled, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // @ts-ignore
      await onSave();
    } catch (err) {
      setError('Error saving data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button disabled={isDisabled || isLoading} onClick={handleClick}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default SaveButton;
