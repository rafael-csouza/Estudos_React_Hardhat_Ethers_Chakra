import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';

const ModalButton = ({ title, subtitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Box onClick={() => setIsOpen(true)} cursor='pointer' margin='0 15px'>
        {title}
      </Box>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{subtitle}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButton;
