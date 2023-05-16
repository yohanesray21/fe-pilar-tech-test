import {
  Box,
  Button,
  Center,
  Container,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const dateNow = new Date().toLocaleDateString();

interface AllOfMessage {
  sender: string;
  message: string;
  time: string;
}

const allOfMessage: AllOfMessage[] = [
  {
    sender: 'John',
    message: 'Hello!',
    time: '19:00 PM',
  },
  {
    sender: 'Alice',
    message: 'Hi there!',
    time: '20:00 PM',
  },
  {
    sender: 'John',
    message: 'How are you?',
    time: '20:01 PM',
  },
  {
    sender: 'Alice',
    message: "I'm good, thanks!",
    time: '20:05 PM',
  },
];

const time = new Date().toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});

export default function PersonalChatPage() {
  const { query } = useRouter();

  const sender = query.user as string;

  const [message, setMessage] = useState<AllOfMessage[]>(allOfMessage);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Update local storage whenever messages change
    localStorage.setItem('messages', JSON.stringify(message));
  }, [message]);

  useEffect(() => {
    // Retrieve messages from local storage on component mount
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessage(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', () => {
      // When storage changes, refetch
      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        setMessage(JSON.parse(storedMessages));
      }
    });
  }, []);

  const addMessage = (sender: string, message: string, time: string) => {
    const newMessage = { sender, message, time };

    setMessage((prevMessage) => [...prevMessage, newMessage]);
    setMessageText('');
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.user) {
      addMessage(sender, messageText, time);
    }

    console.log(message);
  };

  return (
    <>
      <Container pt={10}>
        <Center>
          <Stack
            bgColor="#292F3F"
            w="375px"
            height="90vh"
            p={8}
            borderRadius={40}
            color="white"
            spacing={3}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href="/ChatApp/">
                <IconButton
                  variant="outline"
                  colorScheme="whiteAlpha"
                  aria-label=""
                  fontSize="20px"
                  size="sm"
                  icon={<ArrowBackIcon />}
                />
              </Link>
              <Text>{dateNow}</Text>
              <Text>{sender}</Text>
            </Stack>

            <Stack flex={1} overflow="auto">
              {message.map((mes, i) => {
                return (
                  <Box
                    key={i}
                    bgColor={mes.sender === sender ? '#373E4E' : '#272A35'}
                    borderRadius="20px"
                    p="14px"
                    maxW="280px"
                    alignSelf={mes.sender === sender ? 'end' : 'start'}
                  >
                    <Text>{mes.message}</Text>
                    <Text fontSize="xs" textAlign="start">
                      {mes.time}
                    </Text>
                  </Box>
                );
              })}
            </Stack>
            <form onSubmit={handleOnSubmit}>
              <Stack direction="row">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Start a message"
                />
                <Button colorScheme="whiteAlpha" type="submit">
                  Send
                </Button>
              </Stack>
            </form>
          </Stack>
        </Center>
      </Container>
    </>
  );
}
