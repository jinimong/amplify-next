import React, { useCallback, useEffect } from 'react';
import { Box, List, ListIcon, ListItem } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from 'src/graphql/queries';
import { useTodoContext } from './TodoContextProvider';

const TodoList: React.FC = () => {
  const { todos, dispatch } = useTodoContext();
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
      dispatch({ type: 'INITIALIZE', todos: items });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
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
  );
};

export default TodoList;
