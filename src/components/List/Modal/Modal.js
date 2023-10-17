import {Modal, Button} from 'react-bootstrap'
import './Modal.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

const ListModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleclose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='Modal-Title'>{props.task.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body><FontAwesomeIcon icon={faClock} /> Date Created {props.task.created}</Modal.Body>
        <Modal.Body>Status {props.status}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleclose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleclose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListModal;