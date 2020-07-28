"use strict"

class Clock {
    constructor() {
        this.on = false
        this.unit = 25
        this.rangeValue = this.unit
        this.isPressed = false
        this.useHrsUnit = false // min | hrs
        this.upButton = document.querySelector("#up-btn")
        this.downButton = document.querySelector("#down-btn")
        this.pwrButton = document.querySelector("#pwr-btn")
        this.pwrLed = document.querySelector('.clock__buttons__power-btn__led')
        this.switchBtn = document.querySelector("#switch")
        this.screenUnit = document.querySelector('.clock__screen__unit')
        this.screenMinUnit = document.querySelector(".clock__screen__unit__min")
        this.screenHrsUnit = document.querySelector(".clock__screen__unit__hrs")
        this.screenNumber = document.querySelector('.clock__screen__display__front')
        this.screenClock = document.querySelector('.clock__screen__left')
        this.rangeInput = document.querySelector('input[type=range]')
        this.setup()
    }

    setup() {
        const ranger = (Number(this.unit) * 100) / 60

        this.upButton.addEventListener("click", () => this.pressUp())
        this.downButton.addEventListener("click", () => this.pressDown())
        this.pwrButton.addEventListener("click", () => this.togglePower())
        this.switchBtn.addEventListener("change", (e) => this.handleSwitch(e))
        this.rangeInput.addEventListener("change", (e) => this.handleRange(e))
        this.rangeInput.style.background = `linear-gradient(to right, #9ad3df 0%, #9ad3df ${ranger}%, rgba(0, 0, 0, 0) ${ranger}%, rgba(0, 0, 0, 0) 100%)`
        this.rangeInput.value = this.rangeValue
        this._renderUnitsOnScreen()
    }

    /**
     * @private
     * @description Render minutes/hours on the screen
     * @return void
     */
    _renderUnitsOnScreen() {
        const unit = this.unit.toString().split('')
        const target = this.screenNumber
        const elements = []
        const contents = []

        unit.forEach((value) => {
            contents.push(document.createTextNode(value))
        })

        contents.forEach((item, i) => {
            elements.push(document.createElement('span'))
            elements[i].appendChild(item)
            target.appendChild(elements[i])
        })
    }

    /**
     * @private
     * @description Increment unit by one
     * @return void
     */
    _incrementUnit() {
        this.unit = this.unit + 1
        this._updateRangeValue((this.unit * 100) / 60, this.unit)
        this._reRenderUnit()
    }

    /**
     * @private
     * @description Decrement unit by one
     * @return void
     */
    _decrementUnit() {
        this.unit = this.unit - 1
        this._updateRangeValue((this.unit * 100) / 60, this.unit)
        this._reRenderUnit()
    }

    _updateRangeValue(ranger, value) {
        console.log("_updateRangeValue",ranger, value)
        this.rangeInput.value = value
        this.rangeInput.style.background = `linear-gradient(to right, #9ad3df 0%, #9ad3df ${ranger}%, rgba(0, 0, 0, 0) ${ranger}%, rgba(0, 0, 0, 0) 100%)`
    }

    /**
     * @private
     * @description Re render unit on the screen
     * @return void
     */
    _reRenderUnit() {
        const unit = this.unit.toString().split('')
        const nodes = document.querySelectorAll('.clock__screen__display__front span')

        unit.forEach((value, i) => {
            if (nodes[i] === undefined) {
                const newContent = document.createTextNode(value)
                const newNode = document.createElement('span')
                newNode.appendChild(newContent)
                this.screenNumber.appendChild(newNode)
                return
            }
            nodes[i].textContent = value
        })

        if (nodes.length > unit.length) {
            nodes.forEach((node, i) => {
                if (unit[i] === undefined) {
                    this.screenNumber.removeChild(node)
                }
            })
        }
    }

    togglePower() {
        this.on = !this.on
        this.pwrButton.classList.toggle("--pressed")
        this.screenNumber.classList.toggle('--on')
        this.screenClock.classList.toggle('--on')
        this.screenUnit.classList.toggle('--on')
        this.pwrLed.classList.toggle('--on')

        setTimeout(() => {
            this.pwrButton.classList.toggle("--pressed")
        }, 250)
    }
    
    pressUp() {
        this.upButton.classList.toggle("--pressed")
        if (this.unit < 9999) {
            this._incrementUnit()
        }
        setTimeout(() => {
            this.upButton.classList.toggle("--pressed")
        }, 300)
    }

    pressDown() {
        this.downButton.classList.toggle("--pressed")
        if (this.unit > 0) {
            this._decrementUnit()
        }
        setTimeout(() => {
            this.downButton.classList.toggle("--pressed")
        }, 300)
    }

    handleSwitch(e) {
        if (e.target.checked) {
            this.useHrsUnit = true
            this.screenMinUnit.classList.toggle("--active")
            this.screenHrsUnit.classList.toggle("--active")
            return
        }
        this.useHrsUnit = false
        this.screenMinUnit.classList.toggle("--active")
        this.screenHrsUnit.classList.toggle("--active")
    }

    handleRange(e) {
        const { target: { value } } = e
        const ranger = (Number(value) * 100) / 60
        this.unit = parseInt(value)
        this._updateRangeValue(ranger, value)
        this._reRenderUnit()
    }
} 

const clock = new Clock
