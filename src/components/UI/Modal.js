import { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom'
const BackDrop =(props) =>{
    return <div className={classes.backdrop} onClick={props.onHideCart}/>
}

const ModalOverlay =(props)=>{
    return (
        <div className = {classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const Modal = (props) =>{
    return(<Fragment>
        {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart}/>,document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
    </Fragment>
    );
}
export default Modal;