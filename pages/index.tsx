import type { NextPage } from 'next';
import { Box, Center, Text } from '@chakra-ui/react';
import TodoList from 'src/components/TodoList';
import TodoCreate from 'src/components/TodoCreate';
import TodoContextProvider from 'src/components/TodoContextProvider';

const Home: NextPage = () => {
  return (
    <Center>
      <Box>
        <Text color="teal" fontWeight="bold" fontSize="2xl" textAlign="center">
          Amplify GraphQL ToDoList
        </Text>
        <TodoContextProvider>
          <TodoCreate />
          <TodoList />
        </TodoContextProvider>
      </Box>
    </Center>
  );
};

export default Home;
