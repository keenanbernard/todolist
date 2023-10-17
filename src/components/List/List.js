import React, {useEffect, useState} from "react";
import './List.css'
import ListModal from "./Modal/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
const List = (props) =>{
  const [items, setItems] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <button>Sort</button>
      </div>
      <div className='list-items'>
        {items?.map((val) => (
          <div className='list-item-container'>
            <li
              key={val.id}
              className={`list-item ${val.id === props.hightlighted.id ? `highlighted` : ``}`}
              onClick={() => selection(val)}>{val.name}
              <div className='list-options-container'>
                <FontAwesomeIcon className='list-options' icon={faPenToSquare} onClick={handleShow}/>
                <FontAwesomeIcon className='list-options' icon={faTrash} onClick={() => props.remove(props.name, val)}/>
              </div>
            </li>
          </div>
        ))}
      </div>
      <ListModal show={show} handleclose={handleClose} task={props.hightlighted}/>
    </div>
  )
}

export default List;