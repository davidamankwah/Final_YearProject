// PostUpdateForm.js
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const PostUpdateForm = ({ postId, initialText, onUpdate }) => {
  const [updatedText, setUpdatedText] = useState(initialText);

  const handleUpdate = () => {
    // Perform validation if needed
    onUpdate(postId, updatedText);
  };

  return (
    <div>
      <TextField
        label="Update Post"
        multiline
        rows={4}
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
      />
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default PostUpdateForm;
