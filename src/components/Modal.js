import React from 'react';
import { connect } from 'react-redux';
import Confirmation from './Confirmation';
import Counter from './Counter';


const MODAL_COMPONENTS = {
    'CONFIRMATION': Confirmation,
    'COUNTER': Counter
}
const Modal = ({modalType, modalProps}) => {
    if(!modalType) {
        return null
    }
    const Modal = MODAL_COMPONENTS[modalType]
    return <Modal {...modalProps}/>
}
const mapStateToProps = (state) => {
    return {
        modalType: state.modal.modalType,
        modalProps: state.modal.modalProps
    }
}

export default connect(mapStateToProps, null)(Modal)