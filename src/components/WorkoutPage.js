import React from 'react';
import Exercise from './Exercise';
import Portal from './Portal';
import Modal from './Modal';
import {connect} from 'react-redux';
import {startAddWeights} from '../actions/exercises';
import {openModal, closeModal} from '../actions/modal';
import {Redirect} from 'react-router-dom';

export class WorkoutPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            day: this.props.exercise && this.props.exercises[5].value % 2 === 0 ? 'B' : 'A',
            modal: props.modal}
    }
    onConfirmation = () => {
        this.props.startAddWeights(this.props.exercises, this.state.day);
        this.props.closeModal()
        this.props.history.push('/');
    }
    onClose = () => {
        this.props.closeModal()
    }
    handleClick = () => {
        this.props.openModal({
            modalType: 'CONFIRMATION',
            modalProps: {
                onClose: this.onClose,
                onConfirmation: this.onConfirmation,
                content: 'Finish your workout?'
            }
        }) 
    }
    render() {
        
        if(!this.props.exercises[5]) {
            return <Redirect to='/settings' />
        }
        const day = this.props.exercises[5].value % 2 === 0 ? 'B' : 'A'

        return (
            <div className='page-header'>
                <div className='content-container'>
                    <h1>Session {this.props.exercises[5].value}</h1>

                    {this.props.exercises.map((exercise) => {                           
                        if(exercise.id !== 'session' && exercise.day !== day){                        
                            return <Exercise className='exercise-item' key={exercise.id}{...exercise}/>
                        }                            
                    })
                    }
                    <button className='button button--finish' onClick={this.handleClick}>
                    Finish Workout
                    </button>
                </div>
                <Portal>
                    <Modal/>
                </Portal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddWeights: (exercises, day) => dispatch(startAddWeights(exercises, day)),
    closeModal: (modal) => dispatch(closeModal(modal)),
    openModal: (modal) => dispatch(openModal(modal))
})

const mapStateToProps = (state) => {
    return {
        exercises: state.exercises,
        modal: state.modal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);