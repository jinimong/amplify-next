import type { NextPage } from 'next';
import {
  Box,
  Button,
  Center,
  Text,
  Input,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useCallback, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from 'src/graphql/queries';

const Home: NextPage = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const {
        data: {
          listTodos: { items },
        },
      } = await API.graphql(graphqlOperation(listTodos));
      setTodos(items);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Center>
      <Box>
        <Text color="teal" fontWeight="bold" fontSize="2xl" textAlign="center">
          Amplify GraphQL ToDoList
        </Text>
        <form>
          <Box mt={2}>
            <Input
              name="title"
              placeholder="제목"
              value={null}
              onChange={() => {}}
            />
            <Input
              name="description"
              placeholder="내용"
              value={null}
              onChange={() => {}}
            />
          </Box>
          <Center>
            <Box mt={2}>
              <Button colorScheme="teal" type="submit">
                Save
              </Button>
            </Box>
          </Center>
        </form>
        <List spacing={2}>
          {todos.map(({ id, name, description }) => (
            <ListItem key={id}>
              <Box fontWeight="semibold">
                <ListIcon as={CheckCircleIcon} color="teal" /> {name}
              </Box>
              <Box color="gray.500">{description}</Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Center>
  );
};

export default Home;
