import TodoList from './components/TodoList';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCallback, useState, useEffect } from "react";
import { v4 } from 'uuid';
const TODO_APP_STORAGE_KEY = "TODO_APP";


function App() {

  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  // kiểm tra xem local storage có giá trị không thì xử lý
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    console.log(storagedTodoList);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    } else {
      alert("hi")
    }
  }, [])
  // lưu todo list vào local storage
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, [])

  const onAddBtnClick = useCallback(
    (e) => {
      // Thêm text input vao danh sach todoList
      setTodoList([
        {id: v4(), name: textInput, isCompleted: false}, // thêm element đầu tiên
        ...todoList, // sau đó spread (giải) các element còn lại
      ]);

      setTextInput("")

    }, [textInput, todoList]
  ); // Tránh reload những thông tin có sẵn


  // Tạo function kiểm tra xem todo có hoàn thành chưa
  // truyền vào state trước đó --> 
  // kiểm tra xem id của nó có đúng với id mà click k thì chuyển sang true
  // Không thì trả về như bth
  const onCheckBtnClick = useCallback((id) => {
    setTodoList(prevState => 
      prevState.map((todo) => 
        todo.id === id ? {...todo, isCompleted: true} : todo
      )
    )
  }, [])

  return (
    <>
      <h3>Danh sách việc cần làm</h3>
      <TextField 
        id="outlined-basic" 
        label="Thêm việc cần làm.." 
        variant="outlined" 
        sx={{ width: 400}}
        value={textInput}
        onChange={onTextInputChange}
        />
      <Button 
        variant="contained"
        disabled={!textInput}
        sx={{
          width: 85,
          height: 55,
          marginLeft: 1,
          marginBottom: 2,
        }}
        onClick={onAddBtnClick}
        >
        Thêm
      </Button>
        <br/>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>

    </>
    

  );
}

export default App;
