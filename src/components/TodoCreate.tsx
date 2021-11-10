import React from 'react';
import { Box, Button, Center, Input } from '@chakra-ui/react';

const TodoCreate: React.FC = () => {
  return (
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
  );
};

export default TodoCreate;
