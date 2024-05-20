import classes from './Input.module.css'
import { useState } from 'react';

export default function Input(props) {

    function resetter() {
        props.onResett();
        inputFieldReset();
    }

    let [input, setInput] = useState({
        'current-savings': '',
        'yearly-contribution': '',
        'expected-return': '',
        'duration': ''
    });

    function inputChangeHandler(inId, value) {
        setInput(prevState => {
            return {
                ...prevState,
                [inId]: +value        //The '+' converts the value to a number.  //the [] syntax is important.
            }
        })
    }

    function inputFieldReset() {
        setInput({
            'current-savings': '',
            'yearly-contribution': '',
            'expected-return': '',
            'duration': ''
        })
    }

    function validate() {
        if (input['current-savings'] && input['yearly-contribution'] && input.duration && input['expected-return']) {
            return true
        } else {
            return false;
        }
    }

    function submitter(e) {
        if (validate()) {
            e.preventDefault();
            props.onCalculate(input);
            inputFieldReset();
        }
    }

    return (
        <form className={classes.form} onSubmit={submitter}>
            <div className={`${classes['input-group']}`}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input type="number" value={input['current-savings']} id="current-savings" onChange={e => inputChangeHandler('current-savings', e.target.value)} />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input type="number" value={input['yearly-contribution']} id="yearly-contribution" onChange={e => inputChangeHandler('yearly-contribution', e.target.value)} />
                </p>
            </div>
            <div className={`${classes['input-group']}`}>
                <p>
                    <label htmlFor="expected-return">Expected Interest (%, per year)</label>
                    <input type="number" value={input['expected-return']} id="expected-return" onChange={e => inputChangeHandler('expected-return', e.target.value)} />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input type="number" value={input['duration']} id="duration" onChange={e => inputChangeHandler('duration', e.target.value)} />
                </p>
            </div>
            <p className={classes.actions}>
                <button type="reset" className={classes.buttonAlt} onClick={resetter}>
                    Reset
                </button>
                <button type="submit" className={classes.button}> Calculate </button>
            </p>
        </form>
    )
}