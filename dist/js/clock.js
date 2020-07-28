"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
    function Clock() {
        _classCallCheck(this, Clock);

        this.on = false;
        this.unit = 25;
        this.rangeValue = this.unit;
        this.isPressed = false;
        this.useHrsUnit = false; // min | hrs
        this.upButton = document.querySelector("#up-btn");
        this.downButton = document.querySelector("#down-btn");
        this.pwrButton = document.querySelector("#pwr-btn");
        this.pwrLed = document.querySelector('.clock__buttons__power-btn__led');
        this.switchBtn = document.querySelector("#switch");
        this.screenUnit = document.querySelector('.clock__screen__unit');
        this.screenMinUnit = document.querySelector(".clock__screen__unit__min");
        this.screenHrsUnit = document.querySelector(".clock__screen__unit__hrs");
        this.screenNumber = document.querySelector('.clock__screen__display__front');
        this.screenClock = document.querySelector('.clock__screen__left');
        this.rangeInput = document.querySelector('input[type=range]');
        this.setup();
    }

    _createClass(Clock, [{
        key: "setup",
        value: function setup() {
            var _this = this;

            var ranger = Number(this.unit) * 100 / 60;

            this.upButton.addEventListener("click", function () {
                return _this.pressUp();
            });
            this.downButton.addEventListener("click", function () {
                return _this.pressDown();
            });
            this.pwrButton.addEventListener("click", function () {
                return _this.togglePower();
            });
            this.switchBtn.addEventListener("change", function (e) {
                return _this.handleSwitch(e);
            });
            this.rangeInput.addEventListener("change", function (e) {
                return _this.handleRange(e);
            });
            this.rangeInput.style.background = "linear-gradient(to right, #9ad3df 0%, #9ad3df " + ranger + "%, rgba(0, 0, 0, 0) " + ranger + "%, rgba(0, 0, 0, 0) 100%)";
            this.rangeInput.value = this.rangeValue;
            this._renderUnitsOnScreen();
        }

        /**
         * @private
         * @description Render minutes/hours on the screen
         * @return void
         */

    }, {
        key: "_renderUnitsOnScreen",
        value: function _renderUnitsOnScreen() {
            var unit = this.unit.toString().split('');
            var target = this.screenNumber;
            var elements = [];
            var contents = [];

            unit.forEach(function (value) {
                contents.push(document.createTextNode(value));
            });

            contents.forEach(function (item, i) {
                elements.push(document.createElement('span'));
                elements[i].appendChild(item);
                target.appendChild(elements[i]);
            });
        }

        /**
         * @private
         * @description Increment unit by one
         * @return void
         */

    }, {
        key: "_incrementUnit",
        value: function _incrementUnit() {
            this.unit = this.unit + 1;
            this._updateRangeValue(this.unit * 100 / 60, this.unit);
            this._reRenderUnit();
        }

        /**
         * @private
         * @description Decrement unit by one
         * @return void
         */

    }, {
        key: "_decrementUnit",
        value: function _decrementUnit() {
            this.unit = this.unit - 1;
            this._updateRangeValue(this.unit * 100 / 60, this.unit);
            this._reRenderUnit();
        }
    }, {
        key: "_updateRangeValue",
        value: function _updateRangeValue(ranger, value) {
            console.log("_updateRangeValue", ranger, value);
            this.rangeInput.value = value;
            this.rangeInput.style.background = "linear-gradient(to right, #9ad3df 0%, #9ad3df " + ranger + "%, rgba(0, 0, 0, 0) " + ranger + "%, rgba(0, 0, 0, 0) 100%)";
        }

        /**
         * @private
         * @description Re render unit on the screen
         * @return void
         */

    }, {
        key: "_reRenderUnit",
        value: function _reRenderUnit() {
            var _this2 = this;

            var unit = this.unit.toString().split('');
            var nodes = document.querySelectorAll('.clock__screen__display__front span');

            unit.forEach(function (value, i) {
                if (nodes[i] === undefined) {
                    var newContent = document.createTextNode(value);
                    var newNode = document.createElement('span');
                    newNode.appendChild(newContent);
                    _this2.screenNumber.appendChild(newNode);
                    return;
                }
                nodes[i].textContent = value;
            });

            if (nodes.length > unit.length) {
                nodes.forEach(function (node, i) {
                    if (unit[i] === undefined) {
                        _this2.screenNumber.removeChild(node);
                    }
                });
            }
        }
    }, {
        key: "togglePower",
        value: function togglePower() {
            var _this3 = this;

            this.on = !this.on;
            this.pwrButton.classList.toggle("--pressed");
            this.screenNumber.classList.toggle('--on');
            this.screenClock.classList.toggle('--on');
            this.screenUnit.classList.toggle('--on');
            this.pwrLed.classList.toggle('--on');

            setTimeout(function () {
                _this3.pwrButton.classList.toggle("--pressed");
            }, 250);
        }
    }, {
        key: "pressUp",
        value: function pressUp() {
            var _this4 = this;

            this.upButton.classList.toggle("--pressed");
            if (this.unit < 9999) {
                this._incrementUnit();
            }
            setTimeout(function () {
                _this4.upButton.classList.toggle("--pressed");
            }, 300);
        }
    }, {
        key: "pressDown",
        value: function pressDown() {
            var _this5 = this;

            this.downButton.classList.toggle("--pressed");
            if (this.unit > 0) {
                this._decrementUnit();
            }
            setTimeout(function () {
                _this5.downButton.classList.toggle("--pressed");
            }, 300);
        }
    }, {
        key: "handleSwitch",
        value: function handleSwitch(e) {
            if (e.target.checked) {
                this.useHrsUnit = true;
                this.screenMinUnit.classList.toggle("--active");
                this.screenHrsUnit.classList.toggle("--active");
                return;
            }
            this.useHrsUnit = false;
            this.screenMinUnit.classList.toggle("--active");
            this.screenHrsUnit.classList.toggle("--active");
        }
    }, {
        key: "handleRange",
        value: function handleRange(e) {
            var value = e.target.value;

            var ranger = Number(value) * 100 / 60;
            this.unit = parseInt(value);
            this._updateRangeValue(ranger, value);
            this._reRenderUnit();
        }
    }]);

    return Clock;
}();

var clock = new Clock();