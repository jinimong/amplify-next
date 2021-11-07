import type { NextPage } from 'next';
import { Box, Center, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Center>
      <Box>
        <Text color="teal" fontWeight="bold" fontSize="2xl">
          Amplify GraphQL ToDoList
        </Text>
      </Box>
    </Center>
  );
};

export default Home;
