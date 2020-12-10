import React from 'react'
import {connect} from 'react-redux';
import {Increase, decrease} from '../../actions';
 const Test = ({counter, Increase, decrease}) => {
    console.log(counter)
    return (
        <div>
            <h1>Counter</h1>
            <button type="button" onClick={() => Increase()}>+</button>
            <button type="button" onClick={() => decrease()}>-</button>
            <p>{counter}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        counter: state.counter
    }
}
const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return {
        Increase: () => dispatch(Increase()),
        decrease: () => dispatch(decrease()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test);