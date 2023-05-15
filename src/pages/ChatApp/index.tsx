import Link from 'next/link';
import { Box, Button, Center, Container, Stack, Text } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <>
      <Container pt={10}>
        <Center>
          <Box
            bgColor="#292F3F"
            w="375px"
            height="90vh"
            p={8}
            borderRadius={40}
            color="white"
          >
            <Stack flex={1} overflow="auto">
              <Center>
                <Text fontSize="xl">Select User For Chat : </Text>
              </Center>
              <Link href="/ChatApp/Alice" target="_blank">
                <Button
                  bgColor="#373E4E"
                  borderRadius="20px"
                  p="14px"
                  width="full
                "
                >
                  <Center>
                    <Text>Select Alice</Text>
                  </Center>
                </Button>
              </Link>
              <Link href="ChatApp/John" target="_blank">
                <Button
                  bgColor="#272A35"
                  borderRadius="20px"
                  p="14px"
                  width="full
                "
                >
                  <Center>
                    <Text>Select John</Text>
                  </Center>
                </Button>
              </Link>
            </Stack>
          </Box>
        </Center>
      </Container>
    </>
  );
}
