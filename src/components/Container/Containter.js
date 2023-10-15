import React, {useState} from "react";
import List from "../List/List";
import './Container.css'


const Container = () => {
  const [value, setValue] = useState('')
  const [leftList, setLeftList] = useState([])
  const [rightList, setRightList] = useState([])
  const [task, setTask] = useState('')

  const resetStates = () => {
    setValue('')
    setTask('')
  }

  const updateList = (value) => {
    setLeftList(prevState => {
      return [...prevState, value]
    })
    resetStates()
  }

  const getTask = (task) => {
    setTask(task)
  }

  const updateLeft = () => {
    if (leftList.includes(task)){
      resetStates()
      return
    }

    setRightList(current =>
        current.filter(value => {
          return value !== task;
        }),
      );

      setLeftList(prevState => {
        return [...prevState, task]
      })

    resetStates()
  };

  const updateRight = () => {
    if (rightList.includes(task)){
      resetStates()
      return
    }

    setLeftList(current =>
      current.filter(value => {
        return value !== task;
      }),
    );

    setRightList(prevState => {
      return [...prevState, task]
    })

    resetStates()
  };


  return (
    <div className="Container">
      <div className='Contained-Input'>
        <input className='list-input'
         value={value}
         onChange={e => setValue(e.target.value)}
        />
        <button className='Addition-Button' onClick={() => updateList(value)}>Add</button>
      </div>
      <div className='Contained-List'>
        <List name={'To do'} list={leftList} gettask={getTask} hightlighted={task}/>
        <div className='Contained-Buttons'>
          <button className='Manipulations' onClick={updateLeft}>&#60;</button>
          <button className='Manipulations' onClick={updateRight}>&#62;</button>
        </div>
        <List name={'Completed'} list={rightList} gettask={getTask} hightlighted={task}/>
      </div>
    </div>
  );
}

export default Container;