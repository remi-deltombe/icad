var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM) {
            var WebGL;
            (function (WebGL) {
                /**
                 * CanvasWebGL
                 */
                var CanvasWebGL = /** @class */ (function (_super) {
                    __extends(CanvasWebGL, _super);
                    function CanvasWebGL() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    CanvasWebGL.prototype.render = function () {
                        _super.prototype.render.call(this);
                        this.update();
                    };
                    /**
                     * Render this canvas.
                     */
                    CanvasWebGL.prototype.update = function () {
                        _super.prototype.update.call(this);
                        var canvas = this.dom;
                        if (canvas.width != canvas.offsetWidth || canvas.height != canvas.offsetHeight) {
                            canvas.width = canvas.offsetWidth;
                            canvas.height = canvas.offsetHeight;
                            this.context = null;
                        }
                        if (!this.context) {
                            var canvas = this.dom;
                            this.context = canvas.getContext('webgl', { antialias: false });
                        }
                    };
                    Object.defineProperty(CanvasWebGL.prototype, "context", {
                        /**
                         * Getter of context
                        * @return {WebGLRenderingContext}  Value of context
                         */
                        get: function () {
                            return this._context;
                        },
                        /**
                         * Setter of context
                        * @param {WebGLRenderingContext} context New value of context
                         */
                        set: function (context) {
                            this._context = context;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return CanvasWebGL;
                }(ICad.View.DOM.Canvas));
                WebGL.CanvasWebGL = CanvasWebGL;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
