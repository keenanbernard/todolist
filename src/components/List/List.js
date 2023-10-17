import React, {useEffect, useState} from "react";
import './List.css'
import ListModal from "./Modal/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faA,
  faAngleDown,
  faAngleUp,
  faArrowsRotate,
  faCalendarDays,
  faPenToSquare,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {Dropdown} from "react-bootstrap";

const List = (props) =>{
  const [items, setItems] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sort, setSort] = useState('')
  const [sorting, setSorting] = useState('ascending')

  useEffect(() => {
    setItems(props.list)
  }, [props.list]);


  const selection = (val) =>{
    props.gettask(val)
  }

  const sortBy = (value) => {
    setSort(value)
    setSorting('ascending')
  }

  const sortedItems = items
    .sort((a, b) => {
    if (sort === 'name') {
      const sortOrder = sorting === 'ascending' ? 1 : -1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1 * sortOrder;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1 * sortOrder;
    } else if (sort === 'date' || sort === 'reset') {
      const sortOrder = sorting === 'ascending' ? 1 : -1;
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      if (dateA < dateB) return -1 * sortOrder;
      if (dateA > dateB) return 1 * sortOrder;
    }
  })

  return(
    <div className='list'>
      <div className='list-title-container'>
        <div className='list-title'>{props.name} {props.total}</div>
        <Dropdown>
          <Dropdown.Toggle className='list-sorting' variant="secondary" id="dropdown-basic">
            Sort
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => sortBy('name')}><FontAwesomeIcon icon={faA} /> Name</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('date')}><FontAwesomeIcon icon={faCalendarDays} /> Date Created</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setSorting('ascending')}><FontAwesomeIcon icon={faAngleUp} /> Ascending</Dropdown.Item>
            <Dropdown.Item onClick={() => setSorting('descending')}><FontAwesomeIcon icon={faAngleDown} /> Descending</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => sortBy('reset')}><FontAwesomeIcon icon={faArrowsRotate} /> Reset</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='list-items'>
        {sortedItems?.map((val) => (
          <div key={val.id} className='list-item-container'>
            <li
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
      <ListModal show={show} handleclose={handleClose} task={props.hightlighted} status={props.name}/>
    </div>
  )
}

export default List;