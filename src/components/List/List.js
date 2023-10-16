import React, {useEffect, useState} from "react";
import './List.css'
const List = (props) =>{
  const [items, setItems] = useState()

  useEffect(() => {
    setItems(props.list)
  }, [props.list]);


  const selection = (val) =>{
    props.gettask(val)
  }

  return(
    <div className='list'>
      <div className='list-title-container'>
        <div className='list-title'>{props.name} {props.total}</div>
      </div>
      <div className='list-items'>
        {items?.map((val) => (
          <div className='list-item-container'>
            <li
              key={val.id}
              className={`list-item ${val.id === props.hightlighted ? `highlighted` : ``}`}
              onClick={() => selection(val)}>{val.name}
              <div className='list-options-container'>
                <button hidden={val.id !== props.hightlighted} className='list-options'>&#x2710;</button>
                <button hidden={val.id !== props.hightlighted} className='list-options' onClick={() => props.remove(props.name)}>&#x2715;</button>
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List;