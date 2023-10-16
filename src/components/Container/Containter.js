import React, {useState} from "react";
import List from "../List/List";
import './Container.css'


const Container = () => {
  const [value, setValue] = useState('')
  const [count, setCount] = useState(1);
  const [task, setTask] = useState('')
  const [todoList, setTodoList] = useState([])
  const [completedList, setCompletedList] = useState([])

  const resetStates = () => {
    setValue('')
    setTask('')
  }

  const getTask = (task) => {
    setTask(task)
  }

  const updateList = (value) => {
    setCount(count + 1)
    const task = {id: count, name: value === '' ? 'Untitled' : value}

    setTodoList(prevState => {
      return [...prevState, task]
    })
    resetStates()
  }

  const updateLists = (list) => {
    if(list === 'To do'){
      if (todoList.includes(task) || task === ''){
        resetStates()
        return
      }

      setCompletedList(current =>
        current.filter(value => {
          return value !== task;
        }),
      );

      setTodoList(prevState => {
        return [...prevState, task]
      })
    }

    if(list === 'Completed'){
      if (completedList.includes(task) || task === ''){
        resetStates()
        return
      }

      setTodoList(current =>
        current.filter(value => {
          return value !== task;
        }),
      );

      setCompletedList(prevState => {
        return [...prevState, task]
      })
    }
    resetStates()
  };

  const deleteTask = (list) => {
    if(list === 'To do'){
      setTodoList(current =>
        current.filter(value => {
          return value !== task;
        }),
      );
    }

    if(list === 'Completed'){
      setCompletedList(current =>
        current.filter(value => {
          return value !== task;
        }),
      );
    }
  }


  return (
    <div data-testid='Container' className="Container">
      <div className='Contained-Input'>
        <input className='list-input'
         value={value}
         onChange={e => setValue(e.target.value)}
        />
        <button className='Addition-Button' onClick={() => updateList(value)}>Add</button>
      </div>
      <div className='Contained-List'>
        <List name={'To do'} list={todoList} gettask={getTask}
              hightlighted={task.id} total={todoList.length} remove={deleteTask}
        />
        <div className='Contained-Buttons'>
          <button className='Manipulations' onClick={() => updateLists('To do')}>&#60;</button>
          <button className='Manipulations' onClick={() => updateLists('Completed')}>&#62;</button>
        </div>
        <List name={'Completed'} list={completedList} gettask={getTask}
              hightlighted={task.id} total={completedList.length} remove={deleteTask}
        />
      </div>
    </div>
  );
}

export default Container;