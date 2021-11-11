import React, { useCallback, useEffect } from 'react';
import { Box, List, ListIcon, ListItem } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from 'src/graphql/queries';
import { onCreateTodo } from 'src/graphql/subscriptions';
import { useTodoContext } from './TodoContextProvider';
import { clientId } from './TodoCreate';

const TodoList: React.FC = () => {
  const { todos, dispatch } = useTodoContext();
  useEffect(() => {
    fetchData();

    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: ({ value: { data } }) => {
        const todo = data.onCreateTodo;
        if (clientId !== todo.clientId) {
          dispatch({ type: 'APPEND', todo });
        }
      },
    });
    return () => subscription.unsubscribe();
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
