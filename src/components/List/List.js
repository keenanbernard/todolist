import React, {useEffect, useState} from "react";
import './List.css'
const List = (props) =>{
  const [items, setItems] = useState()

  useEffect(() => {
    setItems(props.list)
  }, [props]);


  const selection = (val) =>{
    props.gettask(val)
  }

  return(
    <div className='list'>
      <div className='list-title'>{props.name}</div>
      {items?.map((val, index) => (
        <li
          key={index + 1}
          className={`list-item ${val === props.hightlighted ? `highlighted` : ``}`}
          onClick={() => selection(val, index + 1)}>{val}</li>
      ))}
    </div>
  )
}

export default List;