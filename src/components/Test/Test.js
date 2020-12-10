import React from 'react'
import {connect} from 'react-redux';
import {Increase, decrease} from '../../actions';

 const Test = ({counter, Increase, decrease}) => {
    return (
        <div>
            <h1>Counter</h1>
            <button type="button" onClick={Increase}>+</button>
            <button type="button" onClick={decrease}>-</button>
            <p>{counter}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

export default connect(mapStateToProps, {Increase, decrease})(Test);