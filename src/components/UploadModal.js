import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Assuming you have configured Firebase and exported db
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UploadModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [label, setLabel] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload video file to storage (assuming you have storage logic)
      // For simplicity, I'm focusing on Firestore data upload

      // Add video data to Firestore
      const docRef = await addDoc(collection(db, 'videos'), {
        title,
        description,
        thumbnail,
        price: parseFloat(price), // Convert price to number (if necessary)
        label,
        // Add more fields as needed
      });

      console.log('Document written with ID: ', docRef.id);
      handleClose(); // Close modal on success
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Header>
          <Typography variant="h6" component="h2">
            Upload Video
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} required />
          <TextField label="Thumbnail URL" fullWidth value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} required />
          <TextField label="Rent Price" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} required />
          <TextField label="Label" fullWidth value={label} onChange={(e) => setLabel(e.target.value)} required />
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </Form>
      </Box>
    </Modal>
  );
};

export default UploadModal;
