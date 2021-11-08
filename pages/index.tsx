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

const Home: NextPage = () => {
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
          <ListItem>
            <Box fontWeight="semibold">
              <ListIcon as={CheckCircleIcon} color="teal" /> 제목
            </Box>
            <Box color="gray.500">내용</Box>
          </ListItem>
          <ListItem>
            <Box fontWeight="semibold">
              <ListIcon as={CheckCircleIcon} color="teal" /> 제목
            </Box>
            <Box color="gray.500">내용</Box>
          </ListItem>
        </List>
      </Box>
    </Center>
  );
};

export default Home;
