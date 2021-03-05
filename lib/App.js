"use strict";
exports.__esModule = true;
exports.App = void 0;
var App = /** @class */ (function () {
    function App() {
        this.settings = [];
    }
    App.prototype.init = function () {
        throw new Error("Method not implemented.");
    };
    App.prototype.set = function (settingName, val) {
        this.settings[settingName] = val;
        return this;
    };
    App.prototype.get = function (settingName) {
        return this.settings[settingName];
    };
    App.getInstance = function () {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    };
    return App;
}());
exports.App = App;
