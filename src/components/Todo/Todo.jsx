import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ todo, index, onDelete, onHandleEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{index}
      </Text>
      <Text>{todo.text}</Text>
      <DeleteButton type="button" onClick={() => onDelete(todo.id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={() => onHandleEdit()}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
