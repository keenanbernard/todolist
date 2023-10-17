import Offcanvas from 'react-bootstrap/Offcanvas';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const Canvas = (props) => {

  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleclose} placement={'start'} className='canvas'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Docs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='git'>
            GitHub <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Canvas;