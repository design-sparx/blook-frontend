import React from 'react';
import {Box, Button} from '@mantine/core';
import {FaChevronLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button leftIcon={<FaChevronLeft size={14}/>} onClick={() => navigate(-1)} variant="light">Back</Button>
    </Box>
  );
};

export default BackBtn;
