import { FunctionComponent } from 'react';

import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

import { theme } from '@src/styles/theme';

export type ShareSocialMediaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

export const ShareSocialMediaModal: FunctionComponent<
  ShareSocialMediaModalProps
> = ({ isOpen, onClose, content }) => {
  const toast = useToast();

  const socialmedias = [
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${content}`,
      color: '#0A66C2',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      link: `https://wa.me/?text=${content}`,
      color: '#25D366',
    },
    {
      name: 'Twitter',
      icon: FiTwitter,
      link: `https://twitter.com/intent/tweet?url=${content}`,
      color: '#1DA1F2',
    },
    {
      name: 'Telegram',
      icon: FaTelegramPlane,
      link: `https://telegram.me/share/url?url=${content}`,
      color: '#0088cc',
    },
    {
      name: 'E-mail',
      icon: FiMail,
      link: `mailto:?subject=Link para o post&body=${content}`,
      color: '#9a9da0',
    },
  ];

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.closeAll();
    toast({
      title: 'Copiado',
      description: 'Link copiado para a área de transferência',
      duration: 2000,
      isClosable: true,
      position: 'bottom-left',
      variant: 'subtle',
      status: 'success',
    });
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent
          minW="300px"
          w="30rem"
          background="brand.hover"
          color="brand.primary"
          margin="1rem"
        >
          <ModalHeader>Compartilhar</ModalHeader>
          <ModalCloseButton
            color="brand.secondary"
            _hover={{ color: 'brand.primary' }}
          />
          <ModalBody
            display="flex"
            gap="2rem"
            alignItems={'center'}
            justifyContent={'flex-start'}
            overflowX="auto"
          >
            {socialmedias.map((socialmedia) => (
              <Flex
                key={socialmedia.name}
                direction={'column'}
                gap="0.5rem"
                alignItems={'center'}
              >
                <IconButton
                  aria-label={socialmedia.name}
                  as="a"
                  href={socialmedia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  background="brand.command"
                  color="brand.primary"
                  transition="all 0.2s"
                  _hover={{ background: 'brand.primary', color: 'brand.hover' }}
                  icon={<socialmedia.icon color={socialmedia.color} />}
                  dropShadow={theme.shadows['2xl']}
                  width="3rem"
                  height="3rem"
                />

                <Text fontSize="sm">{socialmedia.name}</Text>
              </Flex>
            ))}
          </ModalBody>

          <ModalFooter>
            <InputGroup
              size="md"
              background="brand.hover"
              color="brand.primary"
            >
              <Input
                pr="4.5rem"
                type={'text'}
                background="brand.hover"
                color="brand.primary"
                borderColor="brand.primary"
                value={content}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  background="brand.background"
                  color="brand.primary"
                  _hover={{ background: 'brand.primary', color: 'brand.hover' }}
                  onClick={() => handleCopyToClipboard(content)}
                >
                  Copiar
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
