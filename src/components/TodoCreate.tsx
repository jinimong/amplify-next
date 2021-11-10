import React, { useCallback, useState } from 'react';
import { Box, Button, Center, Input } from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from 'src/graphql/mutations';
import { useTodoContext } from './TodoContextProvider';

type FormData = {
  name: string;
  description: string;
};

const defaultFormData = {
  name: '',
  description: '',
};

const TodoCreate: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { name, description } = formData;
  const { dispatch } = useTodoContext();

  const handleChange = useCallback((e) => {
    const {
      currentTarget,
      target: { value },
    } = e;
    setFormData((prev) => ({
      ...prev,
      [currentTarget.name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(defaultFormData);
    try {
      const { data } = await API.graphql(
        graphqlOperation(createTodo, { input: formData })
      );
      dispatch({ type: 'APPEND', todo: data.createTodo });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mt={2}>
        <Input
          name="name"
          placeholder="제목"
          value={name}
          onChange={handleChange}
        />
        <Input
          name="description"
          placeholder="내용"
          value={description}
          onChange={handleChange}
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
  );
};

export default TodoCreate;
