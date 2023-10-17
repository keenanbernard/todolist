import {Modal, Button} from 'react-bootstrap'

const ListModal = (props) => {
  console.log(props)
  return (
    <>
      <Modal show={props.show} onHide={props.handleclose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task: #{props.task.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.task.name}</Modal.Body>
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