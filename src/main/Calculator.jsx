import React, { Component } from "react";
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display'

const initealState = {
    displayValue: '0',
    clearDisplay: false,
    eperation: null,
    values: [0,0 ],
    current: 0
}

export default class Calculator extends Component {

    state = {...initealState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigite = this.addDigite.bind(this)
    }
    
    clearMemory() {
        this.setState({ ...initealState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigite(num) {
        if (num === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + num
        this.setState({displayValue, clearDisplay: false})

        if (num !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }

    render() {
        return (
            <>
                <div className="calculator">
                    <Display value={this.state.displayValue}/>
                    <Button label="AC" click={this.clearMemory} triple/>
                    <Button label="/" click={this.setOperation} operation/>
                    <Button label="7" click={this.addDigite}/>
                    <Button label="8" click={this.addDigite}/>
                    <Button label="9" click={this.addDigite}/>
                    <Button label="*" click={this.setOperation} operation/>
                    <Button label="4" click={this.addDigite}/>
                    <Button label="5" click={this.addDigite}/>
                    <Button label="6" click={this.addDigite}/>
                    <Button label="-" click={this.setOperation} operation/>
                    <Button label="1" click={this.addDigite}/>
                    <Button label="2" click={this.addDigite}/>
                    <Button label="3" click={this.addDigite}/>
                    <Button label="+" click={this.setOperation} operation/>
                    <Button label="0" click={this.addDigite} double/>
                    <Button label="." click={this.addDigite}/>
                    <Button label="=" click={this.setOperation} operation/>
                </div>
            </>
        )
    }
}