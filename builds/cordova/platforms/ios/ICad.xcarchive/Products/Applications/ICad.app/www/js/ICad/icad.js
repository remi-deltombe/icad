var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var abs = window.Math.abs;
var max = window.Math.max;
var min = window.Math.min;
var pow = window.Math.pow;
var round = window.Math.round;
var floor = window.Math.floor;
var ceil = window.Math.ceil;
var minmax = (v, m, M) => min(M, max(m, v));
var delay = (f, t = 1) => setTimeout(f, t);
var map = (v, ff, ft, tf, tt) => {
    var df = (ft - ff);
    var dt = (tt - tf);
    if (Array.isArray(v))
        return v.map(v => ((v - ff) / df) * dt + tf);
    else
        return ((v - ff) / df) * dt + tf;
};
var now = ()=>new Date().getTime();
var ICad;
(function (ICad) {
    var Event;
    (function (Event) {
        /**
         * EventEmitter
         * @abstract
         */
        class EventEmitter {
            constructor() {
                /** Registred callbacks on this object.
                 * Structure :
                 * {
                 *   eventName:
                 *   [
                 *     callback,
                 *     callback,
                 *     ...
                 *   ],
                 *    ...
                 * }*/
                this._registrations = new Map();
            }
            /**
             * Register a function to an event.
             * When called, this function will receive an Event object as parameter.
             * Prototype : function(Event.Event) : void
             * @param {string} eventName Name of the event to listen.
             * @param {Function} callback Function to call when the event is triggered.
             * @return {ICad.Event.Registration}  Registration create for this event registration.
             */
            on(eventName, callback) {
                var registration = new ICad.Event.Registration();
                registration.callback = callback;
                if (!this.registrations.has(eventName)) {
                    this.registrations.set(eventName, []);
                }
                this.registrations.get(eventName).push(registration);
                return registration;
            }
            /**
             * Unregister a function from  an event.
            * @param {ICad.Event.Registration} registration Registration to remove from the event.
             */
            off(registration) {
                this.registrations.forEach(registrations => {
                    var i = registrations.indexOf(registration);
                    if (i !== -1)
                        registrations.splice(i, 1);
                });
            }
            /**
             * Spread  an event.
             * All functions registered to this event will be called.
             * @param {string} eventName Event's name to spread.
             * @param {Object} args?.Data used to build the Event object.
             *                      These data will be available for all the called registered functions.
             * @return {ICad.Event.Event}  Event triggered by this emitter.
             */
            trigger(eventName, args) {
                if (!this.registrations.has(eventName))
                    return;
                var registrations = this.registrations.get(eventName);
                if (registrations.length == 0)
                    return;
                var event = new ICad.Event.Event();
                event.data = args;
                event.emitter = this;
                for (var i = 0; i < registrations.length; ++i) {
                    registrations[i].callback(event);
                }
                return null;
            }
            /**
             * Getter of registrations
             * @return {Map<string, Array<Registration>>}  Value of registrations
             */
            get registrations() {
                return this._registrations;
            }
            /**
             * Getter of bridges
             * @return {Array<EventEmitter>}  Value of bridges
             */
            get bridges() {
                return this._bridges;
            }
            /**
             * Setter of registrations
             * @param {Map<string, Array<Registration>>} registrations New value of registrations
             */
            set registrations(registrations) {
                this._registrations = registrations;
            }
            /**
             * Setter of bridges
            * @param {Array<EventEmitter>} bridges New value of bridges
             */
            set bridges(bridges) {
                this._bridges = bridges;
            }
        }
        Event.EventEmitter = EventEmitter;
    })(Event = ICad.Event || (ICad.Event = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        /**
         * AbstractView
         * @abstract
         */
        class AbstractView extends ICad.Event.EventEmitter {
            constructor() {
                super(...arguments);
                /** Views contained by this view*/
                this._children = [];
                /** */
                this._position = new ICad.Math.Geometry.Rectangle;
                /** */
                this._visible = true;
                /** */
                this._classes = '';
            }
            /**
             * Refresh the render of this view.
             * All children of this view are refreshing too.
             */
            render() {
                for (var i = 0; i < this.children.length; ++i) {
                    this.children[i].render();
                }
            }
            /**
             * Update the content of this view without regenerate it
             * All children of this view are updated too.
             */
            update() {
                for (var i = 0; i < this.children.length; ++i) {
                    this.children[i].update();
                }
            }
            clear() { }
            /**
             *
             */
            invalidate() {
                this.update();
            }
            /**
             * Add a child to this view.
             * Remove the child of the old parent, if needed.
             * @param {ICad.View.AbstractView} child
             */
            addChild(child) {
                if (child.parent === this)
                    return;
                if (child.parent)
                    child.parent.removeChild(child);
                child.parent = this;
                child.render();
                this.children.push(child);
            }
            /**
             * Remove a child from this view.
             * @param {ICad.View.AbstractView} child
             */
            removeChild(child) {
                if (child.parent === this) {
                    child.parent = null;
                    this.children.splice(this.children.indexOf(child), 1);
                }
            }
            /**
             * Remove all children from this view.
             * @param {ICad.View.AbstractView} child
             */
            removeChildren() {
                for (var i = this.children.length - 1; i >= 0; --i) {
                    this.removeChild(this.children[i]);
                }
            }
            /**
             *
             */
            hasClass(_class) {
                return this.classes.split(' ').indexOf(_class) !== -1;
            }
            /**
             *
             */
            addClasses(classes) {
                var existing = this.classes.split(' ');
                var toAdd = classes.split(' ');
                for (var i = 0; i < toAdd.length; ++i) {
                    var index = existing.indexOf(toAdd[i]);
                    if (index === -1) {
                        existing.push(toAdd[i]);
                    }
                }
                this.classes = existing.join(' ');
            }
            /**
             *
             */
            removeClasses(classes) {
                var existing = this.classes.split(' ');
                var toAdd = classes.split(' ');
                for (var i = 0; i < toAdd.length; ++i) {
                    var index = existing.indexOf(toAdd[i]);
                    if (index !== -1) {
                        existing.splice(index, 1);
                    }
                }
                this.classes = existing.join(' ');
            }
            /**
             *
             */
            toggleClasses(classes) {
                var existing = this.classes.split(' ');
                var toToggle = classes.split(' ');
                for (var i = 0; i < toToggle.length; ++i) {
                    var index = existing.indexOf(toToggle[i]);
                    if (index === -1) {
                        existing.push(toToggle[i]);
                    }
                    else {
                        existing.splice(index, 1);
                    }
                }
                this.classes = existing.join(' ');
            }
            /**
             * Getter of parent
             * @return {AbstractView}  Value of parent
             */
            get parent() {
                return this._parent;
            }
            /**
             * Getter of children
             * @return {Array<AbstractView>}  Value of children
             */
            get children() {
                return this._children;
            }
            /**
             * Getter of position
             * @return {ICad.Math.Geometry.Rectangle}  Value of position
             */
            get position() {
                return this._position;
            }
            /**
             *
             */
            get offsetPosition() {
                return this._position;
            }
            /**
             * Getter of visible
             * @return {boolean} Value of visible
             */
            get visible() {
                return this._visible;
            }
            /**
             * Getter of classes
             * @return {string} Value of classes
             */
            get classes() {
                return this._classes;
            }
            /**
             * Setter of parent
             * @param {AbstractView} parent New value of parent
             */
            set parent(parent) {
                this._parent = parent;
            }
            /**
             * Setter of children
             * @param {Array<AbstractView>} children New value of children
             */
            set children(children) {
                this._children = children;
            }
            /**
             * Setter of position
             * @param {ICad.Math.Geometry.Rectangle} position New value of position
             */
            set position(position) {
                this._position = position;
            }
            /**
             * Setter of visible
             * @param {boolean} visible New value of visible
             */
            set visible(visible) {
                this._visible = visible;
            }
            /**
             * Setter of classes
             * @param {string} Value of classes
             */
            set classes(classes) {
                this._classes = classes;
            }
        }
        View.AbstractView = AbstractView;
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM_1) {
            /**
             * DOM
             */
            class DOM extends ICad.View.AbstractView {
                constructor() {
                    super(...arguments);
                    /** Template used to render  dom.
                     * It should be formated as html.
                     * Exemple : "<div>My template</div>"*/
                    this._template = '';
                    /**
                     *
                     */
                    this._requestAnimationFrameID = null;
                }
                /**
                 * Construct its dom based on its template.
                 * Append it  to its parent dom if its parent is a DOM.
                 * Trigger the event "render.dom.before".
                 * Trigger the event "render.dom.after".
                 *
                 */
                render() {
                    this.removeDomFromParent();
                    this.dom = document.createElement('div');
                    this.dom.innerHTML = this.template;
                    if (this.dom.children.length == 1) {
                        this.dom = this.dom.children[0];
                        this.dom.parentElement.removeChild(this.dom);
                    }
                    this.update();
                    super.render();
                }
                /**
                 * Update the content of this view without regenerate it
                 * All children of this view are updated too.
                 */
                update() {
                    this.visible = this.visible;
                    this.classes = this.classes;
                    var translation = '';
                    if (this.position.x || this.position.y) {
                        this.dom.style.transform = 'translate3d(' + round(this.position.x) + 'px,' + round(this.position.y) + 'px,0)';
                    }
                    if (this.position.width)
                        this.dom.style.width = this.position.width + 'px';
                    if (this.position.height)
                        this.dom.style.height = this.position.height + 'px';
                    super.update();
                }
                /**
                 *
                 */
                invalidate() {
                    var that = this;
                    //setTimeout(function(){
                    if (!that._requestAnimationFrameID) {
                        that._requestAnimationFrameID = requestAnimationFrame(function () {
                            that._requestAnimationFrameID = null;
                            that.render();
                        });
                    }
                    //},0)
                }
                /**
                 * Add a child to this view.
                 * Remove the child of the old parent, if needed.
                * @param {ICad.View.AbstractView} child
                 */
                addChild(child) {
                    super.addChild(child);
                    child.visible = child.visible;
                }
                /**
                 *
                 */
                removeDomFromParent() {
                    if (this.dom && this.dom.parentElement) {
                        this.dom.parentElement.removeChild(this.dom);
                    }
                }
                /**
                 *
                 */
                addDomToParent() {
                    if (this.parent && this.dom) {
                        // lookup for a valid parent to append
                        var current = this.parent;
                        while (current && !(current instanceof DOM))
                            current = current.parent;
                        if (current) {
                            var parent = current;
                            if (parent.dom && (parent.dom != this.dom.parentElement)) {
                                parent.dom.appendChild(this.dom);
                            }
                        }
                    }
                }
                /**
                 * Getter of parent
                * @return {AbstractView}  Value of parent
                 */
                get parent() {
                    return this._parent;
                }
                /**
                 * Getter of dom
                * @return {Element}  Value of dom
                 */
                get dom() {
                    return this._dom;
                }
                /**
                 * Getter of template
                * @return {string}  Value of template
                 */
                get template() {
                    return this._template;
                }
                /**
                 * Getter of visible
                * @return {boolean} Value of visible
                 */
                get visible() {
                    return this._visible;
                }
                /**
                 * Getter of classes
                * @return {string} Value of classes
                 */
                get classes() {
                    return this._classes;
                }
                /**
                 * Setter of parent
                * @param {AbstractView} parent New value of parent
                 */
                set parent(parent) {
                    this.removeDomFromParent();
                    this._parent = parent;
                    this.addDomToParent();
                }
                /**
                 * Setter of dom
                * @param {Element} dom New value of dom
                 */
                set dom(dom) {
                    this._dom = dom;
                }
                /**
                 *
                 */
                get offsetPosition() {
                    var offset = new ICad.Math.Geometry.Rectangle();
                    if (this._dom) {
                        var parentPosition = this.parent ? this.parent.offsetPosition : null;
                        offset.x = this._dom.offsetLeft + (parentPosition ? parentPosition.left : 0);
                        offset.y = this._dom.offsetTop + (parentPosition ? parentPosition.top : 0);
                        offset.width = this._dom.offsetWidth;
                        offset.height = this._dom.offsetHeight;
                    }
                    return offset;
                }
                /**
                 * Setter of template
                * @param {string} template New value of template
                 */
                set template(template) {
                    this._template = template;
                }
                /**
                 * Setter of visible
                * @param {boolean} visible New value of visible
                 */
                set visible(visible) {
                    this._visible = visible;
                    if (this.dom) {
                        if (visible) {
                            this.addDomToParent();
                        }
                        else if (!visible && this.dom.parentElement) {
                            this.removeDomFromParent();
                        }
                    }
                }
                /**
                 * Setter of classes
                * @param {string} Value of classes
                 */
                set classes(classes) {
                    this._classes = classes;
                    if (this.dom) {
                        this.dom.className = classes;
                    }
                }
            }
            DOM_1.DOM = DOM;
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM) {
            /**
             * DOMEmitter
             */
            class DOMEmitter extends ICad.View.DOM.DOM {
                constructor() {
                    super(...arguments);
                    /** Event to listen on this view dom.
                     * The keys are the HTML events names.
                     * The values are the function to call, or the event to trigger.*/
                    this._events = new Map([
                        ['scroll', 'scroll'],
                        ['touchmove', 'touchmove'],
                        ['mouseleave', 'mouseleave'],
                        ['mouseenter', 'mouseenter'],
                        ['mousewheel', 'mousewheel'],
                        ['gesturestart', 'gesturestart'],
                        ['touchstart', 'touchstart'],
                        ['touchmove', 'touchmove'],
                        ['touchend', 'touchend'],
                        ['keydown', 'keydown'],
                        ['keyup', 'keyup'],
                        ['resize', 'resize']
                    ]);
                }
                /**
                 * Call DOM render and bind events on its dom.
                 */
                render() {
                    super.render();
                    this.bindEvents();
                }
                /**
                 * Getter of events
                * @return {Map<string, string|Function>}  Value of events
                 */
                get events() {
                    return this._events;
                }
                /**
                 * Setter of events
                * @param {Map<string, string|Function>} events New value of events
                 */
                set events(events) {
                    this._events = events;
                }
                /**
                 *
                 */
                bindEvents() {
                    var that = this;
                    this.events.forEach((v, k) => { that.bindEvent(k, v); });
                }
                bindEvent(eventName, callback) {
                    if (typeof callback == 'string') {
                        this.dom.addEventListener(eventName, this.trigger.bind(this, callback), { passive: true });
                    }
                    else if (typeof callback == 'function') {
                        this.dom.addEventListener(eventName, callback, { passive: true });
                    }
                }
            }
            DOM.DOMEmitter = DOMEmitter;
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Collection;
    (function (Collection) {
        class MapListenable extends ICad.Event.EventEmitter {
            constructor() {
                super(...arguments);
                this._map = new Map();
            }
            set(key, value) {
                this._map.set(key, value);
                this.trigger('keys.' + key + '.change', value);
            }
            get(key) {
                return this._map.get(key);
            }
        }
        Collection.MapListenable = MapListenable;
    })(Collection = ICad.Collection || (ICad.Collection = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        /**
         * AbstractCtrl
         * @abstract
         */
        class AbstractCtrl extends ICad.Event.EventEmitter {
            /**
             * Construct a new abstract controller.
             *
            * @param {ICad.Application.AbstractApplication} app App which contain this application
             */
            constructor(app) {
                super();
                /** Is this controller started?*/
                this._started = false;
                this.app = app;
            }
            /**
             * Start this controller and its view.
             * Only work if it's not started.
             */
            start() {
                if (this.view)
                    this.view.visible = true;
                this._started = true;
                if (this.view)
                    this.view.render();
            }
            /**
             * Update this controller and its view.
             * If it's not started, it will start it first.
             */
            update() {
                this.stop();
                this.start();
            }
            /**
             * Stop this controller and its view.
             * Only work if it's started.
             */
            stop() {
                if (this.view)
                    this.view.visible = false;
                this._started = false;
            }
            /**
             * Getter of view
            * @return {ICad.View.AbstractView}  Value of view
             */
            get view() {
                return this._view;
            }
            /**
             * Getter of started
            * @return {Boolean}  Value of started
             */
            get started() {
                return this._started;
            }
            /**
             * Getter of app
            * @return {ICad.Application.AbstractApplication}  Value of app
             */
            get app() {
                return this._app;
            }
            /**
             * Setter of view
            * @param {ICad.View.AbstractView} view New value of view
             */
            set view(view) {
                this._view = view;
            }
            /**
             * Setter of started
            * @param {Boolean} started New value of started
             */
            set started(started) {
                this._started = started;
            }
            /**
             * Setter of app
            * @param {ICad.Application.AbstractApplication} app New value of app
             */
            set app(app) {
                this._app = app;
            }
        }
        Controller.AbstractCtrl = AbstractCtrl;
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Network;
    (function (Network) {
        /**
         * Ajax
         */
        class Ajax {
            /**
             *
            * @param {number | null} seed
             */
            constructor(url) {
                this._url = url;
            }
            /**
             * Getter of url
            * @return {string}  Value of url
             */
            get url() {
                return this._url;
            }
            get(path, data = {}) {
                return __awaiter(this, void 0, void 0, function* () {
                    return this.query('GET', path, data);
                });
            }
            query(verb, path, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Promise(resolver => {
                        var key;
                        var xhr = new XMLHttpRequest();
                        var handler = function () {
                            resolver(JSON.parse(this.response));
                        };
                        xhr.addEventListener('load', handler);
                        switch (verb) {
                            case 'GET':
                                path += '?';
                                for (key in data) {
                                    path += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
                                }
                                xhr.open(verb, this._url + path);
                                xhr.send();
                                break;
                            case 'POST':
                                xhr.open(verb, this._url + path);
                                xhr.send(data);
                                break;
                        }
                    });
                });
            }
        }
        Network.Ajax = Ajax;
    })(Network = ICad.Network || (ICad.Network = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action_1) {
        /**
         * Action
         */
        class Action {
            /**
             * Construct a new action.
            * @param {Function} callback? Function to call when this action is running.
             */
            constructor(callback) {
                this.callback = callback || function () { };
                this.next = null;
            }
            /**
             * Run the function of this action.
             */
            run() {
                return __awaiter(this, void 0, void 0, function* () {
                    var result = yield this.act();
                    if (this.next) {
                        this.next.run();
                    }
                });
            }
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    return this.callback();
                });
            }
            /**
             * Getter of callback
            * @return {Function}  Value of callback
             */
            get callback() {
                return this._callback;
            }
            /**
             * Getter of next
            * @return {Action}  Value of next
             */
            get next() {
                return this._next;
            }
            /**
             * Setter of callback
            * @param {Function} callback New value of callback
             */
            set callback(callback) {
                this._callback = callback;
            }
            /**
             * Setter of next
            * @param {Action} next New value of next
             */
            set next(next) {
                this._next = next;
            }
        }
        Action_1.Action = Action;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * ActionAppWorkflow
         */
        class ActionAppWorkflow extends ICad.Action.Action {
            /**
             *
            * @param {ICad.Application.AbstractApplication} app
             */
            constructor(app) {
                super();
                this.app = app;
            }
            /**
             * Getter of app
            * @return {ICad.Application.AbstractApplication}  Value of app
             */
            get app() {
                return this._app;
            }
            /**
             * Setter of app
            * @param {ICad.Application.AbstractApplication} app New value of app
             */
            set app(app) {
                this._app = app;
            }
        }
        Action.ActionAppWorkflow = ActionAppWorkflow;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * Call
         */
        class Call extends ICad.Action.Action {
            /**
             * Construct a new Call action.
            * @param {any} object Object which contain the method to call.
            ,* @param {string} method Name of the method to call.
            ,* @param {Array<any>} args? Arguments to pass to the methods when it is calling.
             */
            constructor(object, method, args) {
                super();
                this.object = object;
                this.method = method;
                this.args = args;
            }
            /**
             *
             */
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.object[this.method].apply(this.object, this.args);
                });
            }
            /**
             * Getter of object
            * @return {any}  Value of object
             */
            get object() {
                return this._object;
            }
            /**
             * Getter of method
            * @return {string}  Value of method
             */
            get method() {
                return this._method;
            }
            /**
             * Getter of args
            * @return {Array<any>}  Value of args
             */
            get args() {
                return this._args;
            }
            /**
             * Setter of object
            * @param {any} object New value of object
             */
            set object(object) {
                this._object = object;
            }
            /**
             * Setter of method
            * @param {string} method New value of method
             */
            set method(method) {
                this._method = method;
            }
            /**
             * Setter of args
            * @param {Array<any>} args New value of args
             */
            set args(args) {
                this._args = args;
            }
        }
        Action.Call = Call;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * OpenHome
         */
        class OpenHome extends ICad.Action.ActionAppWorkflow {
            /**
             * Construct a new OpenLog action.
             */
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    var home = this.app.controllerFactory.instantiate(ICad.Controller.Misc.HomeCtrl);
                    this.app.documents.addController(home);
                    this.app.documents.active = home;
                });
            }
        }
        Action.OpenHome = OpenHome;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * OpenProject
         */
        class OpenProject extends ICad.Action.ActionAppWorkflow {
            /**
             * Construct a new OpenProject action.
            * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
            ,* @param {ICad.Model.Well.Project} project Project to open.
             */
            constructor(app, project) {
                super(app);
                this.project = project;
            }
            /**
             *
             */
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    var controller = this.app.controllerFactory.instantiate(ICad.Controller.Model.Well.Project.ProjectFrameCtrl);
                    controller.model = this.project;
                    this.app.documents.removeControllers();
                    this.app.documents.addController(controller);
                    this.app.documents.active = controller;
                    this.app.navigation.open = false;
                    var reference = -1;
                    this.project.boreholes.forEach(b => {
                        b.logs.forEach(l => {
                            if (reference === -1)
                                reference = l.traces.top;
                            else
                                reference = min(reference, l.traces.top);
                        });
                    });
                    controller.reference = reference;
                });
            }
            /**
             * Getter of project
            * @return {ICad.Model.Well.Project}  Value of project
             */
            get project() {
                return this._project;
            }
            /**
             * Setter of project
            * @param {ICad.Model.Well.Project} project New value of project
             */
            set project(project) {
                this._project = project;
            }
        }
        Action.OpenProject = OpenProject;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * OpenSample
         */
        class OpenSample extends ICad.Action.ActionAppWorkflow {
            constructor(app, url) {
                super(app);
                this._url = "http://192.168.0.23:8080";
                this._url = url ? url : this._url;
            }
            /**
             *
             */
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    var explorer = this.app.navigation.controllers.find(v => v instanceof ICad.Controller.Model.StorageExplorerCtrl);
                    var storage = explorer.storages.find(v => v instanceof ICad.Storage.FakeStorage);
                    if (!storage) {
                        storage = new ICad.Storage.StoreJS.Rest(this._url);
                        //explorer.addStorage(new ICad.Storage.FakeStorage(1))
                        explorer.addStorage(storage);
                        //explorer.addStorage(new ICad.Storage.FakeStorage(1))
                    }
                });
            }
        }
        Action.OpenSample = OpenSample;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * LoadLog
         */
        class LoadLog extends ICad.Action.ActionAppWorkflow {
            /**
             * Construct a new LoadLog action.
            * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
            ,* @param {ICad.Model.Well.Log} log Log to open.
             */
            constructor(app, storage, log) {
                super(app);
                this.log = log;
                this.storage = storage;
            }
            /**
             *
             */
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    var query = new ICad.Storage.Query();
                    query.parent = this.log;
                    var traces = yield this.storage.getTraces(query);
                    return traces;
                });
            }
            /**
             * Getter of log
            * @return {ICad.Model.Well.Log}  Value of log
             */
            get log() {
                return this._log;
            }
            /**
             * Getter of storage
            * @return {ICad.Storage.AbstractStorage}  Value of storage
             */
            get storage() {
                return this._storage;
            }
            /**
             * Setter of log
            * @param {ICad.Model.Well.Log} log New value of log
             */
            set log(log) {
                this._log = log;
            }
            /**
             * Setter of storage
            * @param {ICad.Storage.AbstractStorage} storage New value of storage
             */
            set storage(storage) {
                this._storage = storage;
            }
        }
        Action.LoadLog = LoadLog;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * LoadProject
         */
        class LoadProject extends ICad.Action.ActionAppWorkflow {
            /**
             * Construct a new LoadProject action.
            * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
            ,* @param {ICad.Model.Well.Project} borehole Log to open.
             */
            constructor(app, storage, project) {
                super(app);
                this.project = project;
                this.storage = storage;
            }
            /**
             *
             */
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    var loading = this.app.controllerFactory.instantiate(ICad.Controller.Misc.LoadingCtrl);
                    //this.app.documents.addController(loading)
                    loading.view = this.app.viewFactory.container();
                    this.app.viewFactory.root().addChild(loading.view);
                    loading.start();
                    this.app.config.set('activeLog', null);
                    var query = new ICad.Storage.Query();
                    query.parent = this.project;
                    this.project.boreholes = yield this.storage.getBoreholes(query);
                    var boreholesIterator = this.project.boreholes.entries();
                    for (var boreholeValue of boreholesIterator) {
                        var borehole = boreholeValue[1];
                        query.parent = borehole;
                        borehole.logs = yield this.storage.getLogs(query);
                        var logsIterator = borehole.logs.entries();
                        for (var logValue of logsIterator) {
                            var log = logValue[1];
                            query.parent = log;
                            log.traces = yield this.storage.getTraces(query);
                        }
                    }
                    this.app.viewFactory.root().removeChild(loading.view);
                    loading.stop();
                    return this.project;
                });
            }
            /**
             * Getter of project
            * @return {ICad.Model.Well.Project}  Value of project
             */
            get project() {
                return this._project;
            }
            /**
             * Getter of storage
            * @return {ICad.Storage.AbstractStorage}  Value of storage
             */
            get storage() {
                return this._storage;
            }
            /**
             * Setter of project
            * @param {ICad.Model.Well.Project} project New value of project
             */
            set project(project) {
                this._project = project;
            }
            /**
             * Setter of storage
            * @param {ICad.Storage.AbstractStorage} storage New value of storage
             */
            set storage(storage) {
                this._storage = storage;
            }
        }
        Action.LoadProject = LoadProject;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Action;
    (function (Action) {
        /**
         * OpenLog
         */
        class ToggleLiveStat extends ICad.Action.ActionAppWorkflow {
            act() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.app.config.set('displayLiveStats', !this.app.config.get('displayLiveStats'));
                    this.app.documents.update();
                });
            }
        }
        Action.ToggleLiveStat = ToggleLiveStat;
    })(Action = ICad.Action || (ICad.Action = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Application;
    (function (Application) {
        /**
         * AbstractApplication
         * @abstract
         */
        class AbstractApplication {
            constructor() {
                this._config = new ICad.Collection.MapListenable();
            }
            /**
             * Getter of container
            * @return {ICad.View.AbstractView}  Value of container
             */
            get container() {
                return this._container;
            }
            /**
             * Getter of documents
            * @return {ICad.Controller.Container.FrameCtrl}  Value of documents
             */
            get documents() {
                return this._documents;
            }
            /**
             * Getter of charts
            * @return {ICad.Controller.Container.FrameCtrl}  Value of charts
             */
            get charts() {
                return this._charts;
            }
            /**
             * Getter of navigation
            * @return {ICad.Controller.Container.SideBarCtrl}  Value of navigation
             */
            get navigation() {
                return this._navigation;
            }
            /**
             * Getter of edition
            * @return {ICad.Controller.Container.SideBarCtrl}  Value of edition
             */
            get edition() {
                return this._edition;
            }
            /**
             * Getter of viewFactory
            * @return {ICad.View.AbstractFactory}  Value of viewFactory
             */
            get viewFactory() {
                return this._viewFactory;
            }
            /**
             * Getter of controllerFactory
            * @return {ICad.Controller.Factory}  Value of controllerFactory
             */
            get controllerFactory() {
                return this._controllerFactory;
            }
            /**
             * Getter of keyboard
            * @return {ICad.Util.Keyboard}  Value of keyboard
             */
            get keyboard() {
                return this._keyboard;
            }
            /**
             */
            get config() {
                return this._config;
            }
            /**
             * Setter of container
            * @param {ICad.View.AbstractView} container New value of container
             */
            set container(container) {
                this._container = container;
            }
            /**
             * Setter of documents
            * @param {ICad.Controller.Container.FrameCtrl} documents New value of documents
             */
            set documents(documents) {
                this._documents = documents;
            }
            /**
             * Setter of charts
            * @param {ICad.Controller.Container.FrameCtrl} charts New value of charts
             */
            set charts(charts) {
                this._charts = charts;
            }
            /**
             * Setter of navigation
            * @param {ICad.Controller.Container.SideBarCtrl} navigation New value of navigation
             */
            set navigation(navigation) {
                this._navigation = navigation;
            }
            /**
             * Setter of edition
            * @param {ICad.Controller.Container.SideBarCtrl} edition New value of edition
             */
            set edition(edition) {
                this._edition = edition;
            }
            /**
             * Setter of viewFactory
            * @param {ICad.View.AbstractFactory} viewFactory New value of viewFactory
             */
            set viewFactory(viewFactory) {
                this._viewFactory = viewFactory;
            }
            /**
             * Setter of controllerFactory
            * @param {ICad.Controller.Factory} controllerFactory New value of controllerFactory
             */
            set controllerFactory(controllerFactory) {
                this._controllerFactory = controllerFactory;
            }
            /**
             * Setter of keyboard
            * @param {ICad.Util.Keyboard} keyboard New value of keyboard
             */
            set keyboard(keyboard) {
                this._keyboard = keyboard;
            }
        }
        Application.AbstractApplication = AbstractApplication;
    })(Application = ICad.Application || (ICad.Application = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Application;
    (function (Application) {
        /**
         * Browser
         */
        class Browser extends ICad.Application.AbstractApplication {
            /**
             * Initialize and start this application.
             * The application instanciate its context and a rootController
             */
            start() {
                // Factory instanciation
                this.viewFactory = new ICad.View.DOM.Factory();
                this.controllerFactory = new ICad.Controller.Factory(this);
                // keyboard
                this.keyboard = new ICad.Util.Keyboard(this);
                // Basic container creation
                this.navigation = this.controllerFactory.instantiate(ICad.Controller.Container.SideBarCtrl);
                this.edition = this.controllerFactory.instantiate(ICad.Controller.Container.SideBarCtrl);
                this.documents = this.controllerFactory.instantiate(ICad.Controller.Container.FrameCtrl);
                //this.charts     = this.controllerFactory.instantiate(Controller.Container.FrameCtrl)
                this.container = this.viewFactory.container();
                this.container.classes = "app";
                this.navigation.view = this.viewFactory.container();
                this.navigation.view.classes += " left";
                this.edition.view = this.viewFactory.container();
                this.edition.view.classes += " right";
                this.documents.view = this.viewFactory.container();
                this.documents.view.classes = "app-content";
                //this.charts.view = this.viewFactory.container()
                this.container.addChild(this.navigation.view);
                this.container.addChild(this.edition.view);
                this.container.addChild(this.documents.view);
                //this.container.addChild(this.charts.view)
                this.navigation.start();
                this.edition.start();
                this.documents.start();
                //this.charts.start()
                // Debugger
                this._debug = this.controllerFactory.instantiate(ICad.Controller.Misc.DebugCtrl);
                this._debug.view = this._container;
                // Storage explorer creation
                var explorer = this.controllerFactory.instantiate(ICad.Controller.Model.StorageExplorerCtrl);
                var icon = this.viewFactory.png();
                icon.src = "../images/icon-storage.png";
                this.navigation.addController(explorer, icon);
                // Log info
                var info = this.controllerFactory.instantiate(ICad.Controller.Model.Well.Log.LogInfoSidebarCtrl);
                var icon = this.viewFactory.png();
                icon.src = "../images/icon-info.png";
                this.edition.addController(info, icon);
                // Log settings
                var settings = this.controllerFactory.instantiate(ICad.Controller.Model.Well.Log.LogSettingsSidebarCtrl);
                var icon = this.viewFactory.png();
                icon.src = "../images/icon-settings.png";
                this.edition.addController(settings, icon);
                // Live stat in edition
                var iconStat = this.viewFactory.png();
                iconStat.src = "../images/icon-stats.png";
                iconStat.addClasses('icon');
                this.edition.addAction(new ICad.Action.Action(() => {
                    iconStat.toggleClasses('icon-active');
                    new ICad.Action.ToggleLiveStat(this).act();
                }), iconStat);
                // Debug in edition
                var iconDebug = this.viewFactory.png();
                iconDebug.src = "../images/icon-debug.png";
                iconDebug.addClasses('icon');
                this.edition.addAction(new ICad.Action.Action(() => {
                    iconDebug.addClasses('icon-active');
                    this._debug.start();
                }), iconDebug);
                // Render
                var body = this.viewFactory.root();
                body.addChild(this.container);
                body.render();
                window.onresize = function () {
                    body.invalidate();
                };
                // Open home
                //var openHome = new ICad.Action.OpenSample(this, "http://192.168.1.16:8080")
                //var openHome = new ICad.Action.OpenSample(this, "http://10.0.0.211:8080")
                //var openHome = new ICad.Action.OpenSample(this, "http://192.168.0.23:8080")
                var openHome = new ICad.Action.OpenSample(this, "http://192.168.0.23:8080");
                openHome.run();
                // Used to prevent pinch of this stupid safari
                document.documentElement.addEventListener('touchstart', function (event) {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                    }
                }, false);
                //Disable double tap on document
                var lastTouchEnd = 0;
                document.documentElement.addEventListener('touchend', function (event) {
                    var now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false);
            }
        }
        Application.Browser = Browser;
    })(Application = ICad.Application || (ICad.Application = {}));
})(ICad || (ICad = {}));
var _Browser = ICad.Application.Browser;
var ICad;
(function (ICad) {
    var Application;
    (function (Application) {
        /**
         * Cordova
         */
        class Cordova extends ICad.Application.AbstractApplication {
            /**
             * Initialize and start this application.
             * The application instanciate its context and a rootController
             */
            start() {
                // Factory instanciation
                this.viewFactory = new ICad.View.DOM.Factory();
                this.controllerFactory = new ICad.Controller.Factory(this);
                // keyboard
                this.keyboard = new ICad.Util.Keyboard(this);
                // Basic container creation
                this.navigation = this.controllerFactory.instantiate(ICad.Controller.Container.SideBarCtrl);
                this.edition = this.controllerFactory.instantiate(ICad.Controller.Container.SideBarCtrl);
                this.documents = this.controllerFactory.instantiate(ICad.Controller.Container.FrameCtrl);
                //this.charts     = this.controllerFactory.instantiate(Controller.Container.FrameCtrl)
                this.container = this.viewFactory.container();
                this.container.classes = "app";
                this.navigation.view = this.viewFactory.container();
                this.navigation.view.classes += " left";
                this.edition.view = this.viewFactory.container();
                this.edition.view.classes += " right";
                this.documents.view = this.viewFactory.container();
                this.documents.view.classes = "app-content";
                //this.charts.view = this.viewFactory.container()
                this.container.addChild(this.navigation.view);
                this.container.addChild(this.edition.view);
                this.container.addChild(this.documents.view);
                //this.container.addChild(this.charts.view)
                this.navigation.start();
                this.edition.start();
                this.documents.start();
                //this.charts.start()
                // Debugger
                this._debug = this.controllerFactory.instantiate(ICad.Controller.Misc.DebugCtrl);
                this._debug.view = this._container;
                // Storage explorer creation
                var explorer = this.controllerFactory.instantiate(ICad.Controller.Model.StorageExplorerCtrl);
                var icon = this.viewFactory.png();
                icon.src = "images/icon-storage.png";
                this.navigation.addController(explorer, icon);
                // Log info
                var info = this.controllerFactory.instantiate(ICad.Controller.Model.Well.Log.LogInfoSidebarCtrl);
                var icon = this.viewFactory.png();
                icon.src = "images/icon-info.png";
                this.edition.addController(info, icon);
                // Log settings
                var settings = this.controllerFactory.instantiate(ICad.Controller.Model.Well.Log.LogSettingsSidebarCtrl);
                var icon = this.viewFactory.png();
                icon.src = "images/icon-settings.png";
                this.edition.addController(settings, icon);
                // Live stat in edition
                var iconStat = this.viewFactory.png();
                iconStat.src = "images/icon-stats.png";
                iconStat.addClasses('icon');
                this.edition.addAction(new ICad.Action.Action(() => {
                    iconStat.toggleClasses('icon-active');
                    new ICad.Action.ToggleLiveStat(this).act();
                }), iconStat);
                // Debug in edition
                var iconDebug = this.viewFactory.png();
                iconDebug.src = "images/icon-debug.png";
                iconDebug.addClasses('icon');
                this.edition.addAction(new ICad.Action.Action(() => {
                    iconDebug.addClasses('icon-active');
                    this._debug.start();
                }), iconDebug);
                // Render
                var body = this.viewFactory.root();
                body.addChild(this.container);
                body.render();
                window.onresize = function () {
                    body.invalidate();
                };
                // Open home
                //var openHome = new ICad.Action.OpenSample(this, "http://10.0.0.211:8080")
                var openHome = new ICad.Action.OpenSample(this, "http://192.168.0.23:8080");
                openHome.run();
            }
        }
        Application.Cordova = Cordova;
    })(Application = ICad.Application || (ICad.Application = {}));
})(ICad || (ICad = {}));
var _Cordova = ICad.Application.Cordova;
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        /**
         * AbstractCompositeCtrl
         * @abstract
         */
        class AbstractCompositeCtrl extends ICad.Controller.AbstractCtrl {
            constructor() {
                super(...arguments);
                /** Controller which compose this controller
                 * */
                this._controllers = [];
            }
            /**
             * Start this controller and all its contained controllers.
             */
            start() {
                this.controllers.forEach(v => v.start());
                super.start();
            }
            /**
             * Update this controller and its view.
             * If it's not started, it will start it first.
             */
            update() {
                this.controllers.forEach(v => v.update());
            }
            /**
             * Stop this controller and all its contained controllers.
             */
            stop() {
                this.controllers.forEach(v => v.stop());
                super.stop();
            }
            /**
             *
            * @param {ICad.Controller.AbstractCtrl} controller
             */
            addController(controller) {
                this.controllers.push(controller);
            }
            findControllers(controllerClass) {
                var result = [];
                this.controllers.forEach(c => {
                    if (c instanceof controllerClass) {
                        result.push(c);
                    }
                    if (c instanceof AbstractCompositeCtrl) {
                        result = result.concat(c.findControllers(controllerClass));
                    }
                });
                return result;
            }
            /**
             *
            * @param {ICad.Controller.AbstractCtrl} controller
             */
            removeController(controller) {
                var i = this.controllers.indexOf(controller);
                if (i !== -1) {
                    controller.stop();
                    this.controllers.splice(i, 1);
                }
            }
            /**
             *
            * @param {ICad.Controller.AbstractCtrl} controller
             */
            removeControllers() {
                for (var i = this.controllers.length - 1; i >= 0; --i) {
                    this.removeController(this.controllers[i]);
                }
            }
            createController(controller) {
                var result = this.app.controllerFactory.instantiate(controller);
                if (this.started)
                    result.start();
                this.addController(result);
                return result;
            }
            /**
             * Getter of controllers
            * @return {Array<AbstractCtrl>}  Value of controllers
             */
            get controllers() {
                return this._controllers;
            }
            /**
             * Setter of controllers
            * @param {Array<AbstractCtrl>} controllers New value of controllers
             */
            set controllers(controllers) {
                this._controllers = controllers;
            }
        }
        Controller.AbstractCompositeCtrl = AbstractCompositeCtrl;
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        /**
         * Factory
         */
        class Factory {
            /**
             *
            * @param {ICad.Application.AbstractApplication} app
             */
            constructor(app) {
                this.app = app;
            }
            /**
             *
            * @param {new ()=>ICad.Controller.AbstractCtrl} controller
             */
            instantiate(controller) {
                var result = new controller(this.app);
                return result;
            }
            /**
             * Getter of app
            * @return {ICad.Application.AbstractApplication}  Value of app
             */
            get app() {
                return this._app;
            }
            /**
             * Setter of app
            * @param {ICad.Application.AbstractApplication} app New value of app
             */
            set app(app) {
                this._app = app;
            }
        }
        Controller.Factory = Factory;
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Container;
        (function (Container) {
            /**
             * AbstractTabularCtrl
             * @abstract
             */
            class AbstractTabularCtrl extends ICad.Controller.AbstractCompositeCtrl {
                /**
                 * Stop all this tabular controller except its active one.
                 * Start the active controller if needed.
                 */
                constructor(app) {
                    super(app);
                    this.tabs = this.app.viewFactory.container();
                    this.content = this.app.viewFactory.container();
                }
                /**
                 * Stop all this tabular controller except its active one.
                 * Start the active controller if needed.
                 */
                start() {
                    var active = this.active;
                    this.controllers.forEach(v => v === active ? v.start() : v.stop());
                    this.view.addChild(this.tabs);
                    this.view.addChild(this.content);
                    super.start();
                }
                /**
                 *
                * @param {ICad.Controller.AbstractCtrl} controller
                 */
                addController(controller) {
                    controller.view = this.app.viewFactory.container();
                    this.controllers.push(controller);
                }
                /**
                 *
                * @param {ICad.Controller.AbstractCtrl} controller
                 */
                removeController(controller) {
                    this.view.removeChild(controller.view);
                    super.removeController(controller);
                }
                /**
                 *
                * @param {ICad.Controller.AbstractCtrl} controller
                 */
                removeControllers() {
                    super.removeControllers();
                    this._active = null;
                }
                /**
                 * Getter of active
                * @return {AbstractCtrl}  Value of active
                 */
                get active() {
                    return this._active;
                }
                /**
                 * Getter of tabs
                * @return {ICad.View.AbstractView}  Value of tabs
                 */
                get tabs() {
                    return this._tabs;
                }
                /**
                 * Getter of content
                * @return {ICad.View.AbstractView}  Value of content
                 */
                get content() {
                    return this._content;
                }
                /**
                 * Setter of active
                * @param {AbstractCtrl} active New value of active
                 */
                set active(active) {
                    if (this.active) {
                        this.active.stop();
                        this.content.removeChild(this.active.view);
                    }
                    this._active = active;
                    if (this.active) {
                        this.content.addChild(this.active.view);
                        if (this.started)
                            this.active.start();
                    }
                }
                /**
                 * Setter of tabs
                * @return {ICad.View.AbstractView}  tabs New value of tabs
                 */
                set tabs(tabs) {
                    this._tabs = tabs;
                }
                /**
                 * Setter of content
                * @return {ICad.View.AbstractView}  content New value of content
                 */
                set content(content) {
                    this._content = content;
                }
            }
            Container.AbstractTabularCtrl = AbstractTabularCtrl;
        })(Container = Controller.Container || (Controller.Container = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Container;
        (function (Container) {
            /**
             * FrameCtrl
             */
            class FrameCtrl extends ICad.Controller.Container.AbstractTabularCtrl {
            }
            Container.FrameCtrl = FrameCtrl;
        })(Container = Controller.Container || (Controller.Container = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Container;
        (function (Container) {
            /**
             * SideBarCtrl
             */
            class SideBarCtrl extends ICad.Controller.Container.AbstractTabularCtrl {
                /**
                 * Stop all this tabular controller except its active one.
                 * Start the active controller if needed.
                 */
                constructor(app) {
                    super(app);
                    /** */
                    this._open = false;
                    this.tabs.classes = "sidebar-tabs";
                    this.content.classes = "sidebar-content";
                    this._menu = this.app.viewFactory.list();
                    this._menu.classes = 'sidebar-menu';
                    this.tabs.addChild(this._menu);
                }
                /**
                 * Stop all this tabular controller except its active one.
                 * Start the active controller if needed.
                 */
                start() {
                    super.start();
                    this.view.addClasses('sidebar');
                    this.view.addClasses(this.open ? 'open' : '');
                }
                /**
                 *
                * @param {ICad.Controller.AbstractCtrl} controller
                 */
                addController(controller, title) {
                    super.addController(controller);
                    title = title || '';
                    var item = this.app.viewFactory.listItem();
                    var content = title instanceof ICad.View.AbstractView
                        ? title
                        : this.app.viewFactory.paragraph(title);
                    item.addChild(content);
                    content.on('touchstart', ((c) => {
                        if (this.active === c) {
                            this.view.toggleClasses('open');
                            if (this.view.hasClass('open')) {
                                c.start();
                            }
                            else {
                                c.stop();
                            }
                        }
                        else {
                            if (this.active)
                                this.active.stop();
                            this.active = c;
                        }
                    }).bind(this, controller));
                    this._menu.addChild(item);
                }
                /**
                 *
                * @param {ICad.Controller.AbstractCtrl} controller
                 */
                addAction(action, title) {
                    title = title || '';
                    var item = this.app.viewFactory.listItem();
                    var content = title instanceof ICad.View.AbstractView
                        ? title
                        : this.app.viewFactory.paragraph(title);
                    item.addChild(content);
                    content.on('touchstart', (c) => {
                        action.act();
                    });
                    this._menu.addChild(item);
                }
                /**
                 * Getter of active
                * @return {AbstractCtrl}  Value of active
                 */
                get active() {
                    return this._active;
                }
                /**
                 * Getter of open
                * @return {boolean}  Value of open
                 */
                get open() {
                    return this._open;
                }
                /**
                 * Setter of open
                * @param {boolean} open New value of open
                 */
                set open(open) {
                    this._open = open;
                    if (this.open)
                        this.view.toggleClasses('open');
                    else
                        this.view.removeClasses('open');
                }
                /**
                 * Setter of active
                * @param {AbstractCtrl} active New value of active
                 */
                set active(active) {
                    super.active = active;
                    if (this.active) {
                        this.view.addClasses('open');
                    }
                    else {
                        this.view.removeClasses('open');
                    }
                }
            }
            Container.SideBarCtrl = SideBarCtrl;
        })(Container = Controller.Container || (Controller.Container = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Misc;
        (function (Misc) {
            /**
             * DebugCtrl
             */
            class DebugCtrl extends ICad.Controller.AbstractCtrl {
                constructor(app) {
                    super(app);
                    this._render = false;
                    this._content = this.app.viewFactory.container();
                    this._content.classes = 'debug';
                    this._fps = this.app.viewFactory.paragraph('');
                    this._content.addChild(this._fps);
                    /*this._mem = this.app.viewFactory.paragraph('')
                    this._content.addChild(this._mem)
                    */
                    this._rendering = this.app.viewFactory.button('Enable render');
                    this._content.addChild(this._rendering);
                    this._specter = this.app.viewFactory.button('Run specter');
                    this._content.addChild(this._specter);
                    var that = this;
                    this._specter.on('touchstart', function () {
                        const s = new SPECTOR.Spector();
                        s.displayUI();
                        that._content.removeChild(that._specter);
                    });
                    this._rendering.on('touchstart', function () {
                        if (that._render) {
                            that._rendering.text = 'Enable render';
                        }
                        else {
                            that._rendering.text = 'Disable render';
                        }
                        that._render = !that._render;
                    });
                    var root = this._app.viewFactory.root();
                    this.app.keyboard.on('keydown', e => {
                        if (this.app.keyboard.isDown('ctrl') && this.app.keyboard.isDown('d')) {
                            this._content.visible = !this._content.visible;
                            this._content.render();
                        }
                    });
                }
                /**
                 * Fill and render the view depending of this controller.
                 */
                start() {
                    if (this.started)
                        return;
                    this._view.addChild(this._content);
                    super.start();
                    this._lastLoop = new Date();
                    this._lastRender = new Date();
                    this.loop();
                }
                stop() {
                    this.started = false;
                    this._view.visible = false;
                }
                /**
                 *
                 */
                loop() {
                    var date = new Date();
                    var fps = window.Math.round(1000 / (date.getTime() - this._lastLoop.getTime()));
                    this._lastLoop = date;
                    if ((this._lastLoop.getTime() - this._lastRender.getTime()) > 250) {
                        //var memory = (window.performance as any).memory
                        //var percent =  window.Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 10000) / 100;
                        this._fps.text = 'FPS : ' + fps;
                        //(this._mem as any as ICad.View.Text.ParagraphInterface).text = 'MEM : ' + percent + ' %';
                        this._lastRender = date;
                    }
                    if (this._render) {
                        this._app.container.render();
                    }
                    if (this.started)
                        window.requestAnimationFrame(this.loop.bind(this));
                }
            }
            Misc.DebugCtrl = DebugCtrl;
        })(Misc = Controller.Misc || (Controller.Misc = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Misc;
        (function (Misc) {
            /**
             * HomeCtrl
             */
            class HomeCtrl extends ICad.Controller.AbstractCtrl {
                /**
                 * Fill and render the view depending of this controller.
                 */
                start() {
                    if (this.started)
                        return;
                    /*
                    var button = this.app.viewFactory.button('Open storage')
                    this.view.addChild(button)
        
                    var button = this.app.viewFactory.button('Quick tour')
                    button.on('touchstart', alert.bind(null, '2'))
                    this.view.addChild(button)
                    */
                    var action = new ICad.Action.OpenSample(this.app);
                    var button = this.app.viewFactory.button('Open sample data');
                    button.on('touchstart', action.run.bind(action));
                    this.view.addChild(button);
                    super.start();
                }
                /**
                 * Fill and render the view depending of this controller.
                 */
                stop() {
                    super.stop();
                    this.view.removeChildren();
                }
            }
            Misc.HomeCtrl = HomeCtrl;
        })(Misc = Controller.Misc || (Controller.Misc = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Misc;
        (function (Misc) {
            /**
             * LoadingCtrl
             */
            class LoadingCtrl extends ICad.Controller.AbstractCtrl {
                /**
                 * Fill and render the view depending of this controller.
                 */
                start() {
                    if (this.started)
                        return;
                    this._loading = this._app.viewFactory.container();
                    this._loading.classes += 'app-loading';
                    this.view.addChild(this._loading);
                    super.start();
                }
                /**
                 * Fill and render the view depending of this controller.
                 */
                stop() {
                    super.stop();
                    this.view.removeChildren();
                }
            }
            Misc.LoadingCtrl = LoadingCtrl;
        })(Misc = Controller.Misc || (Controller.Misc = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            /**
             * AbstractModelCtrl
             * @abstract
             */
            class AbstractModelCtrl extends ICad.Controller.AbstractCompositeCtrl {
                constructor() {
                    super(...arguments);
                    /** */
                    this._reference = 0;
                    /** */
                    this._scale = 1;
                }
                createModelController(model, controller) {
                    var result = this.createController(controller);
                    result.model = model;
                    return result;
                }
                /**
                 *
                 */
                get reference() {
                    return this._reference;
                }
                /**
                 *
                 */
                get scale() {
                    return this._scale;
                }
                /**
                 *
                 */
                set scale(scale) {
                    var diff = this._scale - scale;
                    this._scale = scale;
                    for (var i = 0; i < this._controllers.length; ++i) {
                        var a = this._controllers[i];
                        if (a.scale != 'undefined') {
                            a.scale -= diff;
                        }
                    }
                }
                /**
                 *
                 */
                set reference(reference) {
                    var diff = this._reference - reference;
                    this._reference = reference;
                    for (var i = 0; i < this._controllers.length; ++i) {
                        var a = this._controllers[i];
                        if (a.reference != 'undefined') {
                            a.reference -= diff;
                        }
                    }
                }
            }
            Model.AbstractModelCtrl = AbstractModelCtrl;
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            /**
             * AbstractModelDetailCtrl
             * @abstract
             */
            class AbstractModelDetailCtrl extends ICad.Controller.Model.AbstractModelCtrl {
                /**
                 * Getter of model
                * @return {ICad.Model.AbstractModel}  Value of model
                 */
                get model() {
                    return this._model;
                }
                /**
                 * Setter of model
                * @param {ICad.Model.AbstractModel} model New value of model
                 */
                set model(model) {
                    this._model = model;
                }
            }
            Model.AbstractModelDetailCtrl = AbstractModelDetailCtrl;
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            /**
             * AbstractModelListCtrl
             * @abstract
             */
            class AbstractModelListCtrl extends ICad.Controller.Model.AbstractModelCtrl {
            }
            Model.AbstractModelListCtrl = AbstractModelListCtrl;
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            /**
             * StorageExplorerCtrl
             */
            class StorageExplorerCtrl extends ICad.Controller.Model.AbstractModelCtrl {
                constructor(app) {
                    super(app);
                    /** Storage used to pull model data.*/
                    this._storages = [];
                    this._title = this.app.viewFactory.title("Storages", 6);
                    this._title.classes = "sidebar-title";
                    this._list = this.app.viewFactory.list();
                    this._list.classes = "storage-list";
                }
                /**
                 *
                 */
                start() {
                    super.start();
                    this.view.addChild(this._title);
                    this.view.addChild(this._list);
                }
                /**
                 *
                 */
                addStorage(storage) {
                    this.storages.push(storage);
                    var listItem = this.buildListItemWithStatus(storage.name, 'storage', this.loadStorage.bind(this, storage));
                    this._list.addChild(listItem);
                    //this.loadStorage(storage, listItem)
                }
                loadStorage(storage, view) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var query = new ICad.Storage.Query();
                        var projects = yield storage.getProjects(query);
                        var list = this.app.viewFactory.list();
                        var that = this;
                        view.removeChildren();
                        yield projects.forEach((project) => __awaiter(this, void 0, void 0, function* () {
                            var listItem = this.buildListItemWithStatus(project.name, 'project', this.loadProject.bind(this, storage, project));
                            list.addChild(listItem);
                        }));
                        view.addChild(list);
                    });
                }
                loadProject(storage, project, view) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var query = new ICad.Storage.Query();
                        query.parent = project;
                        var boreholes = yield storage.getBoreholes(query);
                        var list = this.app.viewFactory.list();
                        var that = this;
                        view.removeChildren();
                        yield boreholes.forEach((borehole) => __awaiter(this, void 0, void 0, function* () {
                            var listItem = this.buildListItemWithStatus(borehole.name, 'borehole', this.loadBorehole.bind(this, storage, borehole));
                            list.addChild(listItem);
                        }));
                        view.addChild(list);
                    });
                }
                loadBorehole(storage, borehole, view) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var query = new ICad.Storage.Query();
                        query.parent = borehole;
                        var logs = yield storage.getLogs(query);
                        var list = this.app.viewFactory.list();
                        var that = this;
                        view.removeChildren();
                        logs.forEach(log => {
                            var listItem = this.buildListItem(log.name, 'log');
                            list.addChild(listItem);
                            var openProject = new ICad.Action.OpenProject(this.app, log.borehole.project);
                            var loadProject = new ICad.Action.LoadProject(this.app, storage, log.borehole.project);
                            loadProject.next = openProject;
                            listItem.children[0].on('touchstart', loadProject.run.bind(loadProject));
                        });
                        view.addChild(list);
                    });
                }
                buildListItem(name, type) {
                    var listItem = this.app.viewFactory.listItem();
                    var title = this.app.viewFactory.container();
                    var text = this.app.viewFactory.title(name, 6);
                    title.classes = type + ' open';
                    title.addChild(text);
                    listItem.addChild(title);
                    return listItem;
                }
                buildListItemWithStatus(name, type, loader) {
                    var listItem = this.app.viewFactory.listItem();
                    var title = this.app.viewFactory.container();
                    var icon = this.app.viewFactory.container();
                    var text = this.app.viewFactory.title(name, 6);
                    var children = this.app.viewFactory.container();
                    icon.classes = 'status';
                    title.classes = type + ' close';
                    title.addChild(icon);
                    title.addChild(text);
                    listItem.addChild(title);
                    listItem.addChild(children);
                    var clickHandler = function (loader, title, listItem) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (title.hasClass('close')) {
                                yield loader(children);
                                title.toggleClasses('open close');
                            }
                            else {
                                title.toggleClasses('open close');
                            }
                        });
                    };
                    icon.on('touchstart', clickHandler.bind(null, loader, title, listItem));
                    title.on('touchstart', clickHandler.bind(null, loader, title, listItem));
                    return listItem;
                }
                /**
                 * Getter of list
                * @return {Array<ICad.View.AbstractView}  Value of list
                 */
                get storages() {
                    return this._storages;
                }
                /**
                 * Setter of storages
                * @param {Array<ICad.Storage.AbstractStorage>} storages New value of storages
                 */
                set storages(storages) {
                    this._storages = storages;
                }
            }
            Model.StorageExplorerCtrl = StorageExplorerCtrl;
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Borehole;
                (function (Borehole) {
                    /**
                     * BoreholeColumnCtrl
                     */
                    class BoreholeColumnCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._header = this.app.viewFactory.container();
                            this._header.addClasses('project-borehole-header');
                            this._data = this.app.viewFactory.container();
                            this._data.addClasses('project-borehole-content');
                        }
                        start() {
                            this.view.addChild(this._header);
                            this.view.addChild(this._data);
                            super.start();
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            this._model = model;
                            this.removeControllers();
                            var header = this.createModelController(model, ICad.Controller.Model.Well.Borehole.BoreholeColumnHeaderCtrl);
                            var data = this.createModelController(model, ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl);
                            header.view = this._header;
                            data.view = this._data;
                            // Events ------------------------
                            // Header
                            var target = {
                                action: null,
                                target: null,
                                log: null,
                            };
                            header.on('log-move', e => {
                                target.log = e.data;
                                this._header.addClasses('dragzone-enable');
                                this._app.container.on('touchend', e => {
                                    if (target.target && target.log && target.action) {
                                    }
                                    this._header.removeClasses('dragzone-enable');
                                });
                            });
                            header.on('target-set', e => {
                                target.action = e.data;
                                target.target = e._emitter;
                            });
                            header.on('target-unset', e => {
                                target.target = null;
                            });
                            // Content
                            data.on('project-scale-change', e => this.trigger('project-scale-change', e.data));
                            data.on('project-reference-change', e => this.trigger('project-reference-change', e.data));
                            data.on('borehole-scale-change', e => {
                                var scale = this.scale * e.data;
                                scale = window.Math.max(0.0001, scale);
                                scale = window.Math.min(100, scale);
                                if (!isNaN(scale)) {
                                    this.scale = scale;
                                    this.reference = this.reference;
                                }
                            });
                            data.on('borehole-reference-change', e => {
                                var reference = this.reference - e.data;
                                if (!isNaN(reference))
                                    this.reference = reference;
                                this.trigger('borehole-reference-change', e.data);
                            });
                            data.on('column-width-change', e => {
                                var columnHeader = header.logs.column(e.data.log);
                                var columnData = data.logs.column(e.data.log);
                                columnHeader.view.position.width = e.data.width;
                                columnData.view.position.width = e.data.width;
                                columnHeader.view.update();
                                columnData.view.update();
                                this.update();
                            });
                        }
                    }
                    Borehole.BoreholeColumnCtrl = BoreholeColumnCtrl;
                })(Borehole = Well.Borehole || (Well.Borehole = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Borehole;
                (function (Borehole) {
                    /**
                     * BoreholeColumnDataCtrl
                     */
                    class BoreholeColumnDataCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._touchHandler = new ICad.Event.TouchEventHandler();
                            this._container = this.app.viewFactory.container();
                            this._container.classes = 'project-borehole-content-logs';
                            this._logs = this.createController(ICad.Controller.Model.Well.Log.LogsColumnDataCtrl);
                            this._logs.view = this._container;
                            var view = this.app.viewFactory.container();
                            view.addClasses('project-borehole-content-logs-column ruler');
                            this._container.addChild(view);
                            this._ruler = this.createController(Well.Reference.ReferenceRulerDataCtrl);
                            this._ruler.view = view;
                            var view = this.app.viewFactory.container();
                            this._container.addChild(view);
                            this._line = this.createController(ICad.Controller.Model.Well.Borehole.BoreholeLineDataCtrl);
                            this._line.column = this;
                            this._line.view = view;
                            this._container.on('mousewheel', e => {
                                var ctrl = this.app.keyboard.isDown('ctrl');
                                var shift = this.app.keyboard.isDown('shift');
                                if (ctrl && shift)
                                    this.trigger('project-scale-change', e.data.deltaY / 1000);
                                else if (ctrl)
                                    this.trigger('borehole-scale-change', e.data.deltaY / 1000);
                                else if (shift)
                                    this.trigger('project-reference-change', (-e.data.deltaY / 500) / this.scale);
                                else
                                    this.trigger('borehole-reference-change', (-e.data.deltaY / 500) / this.scale);
                            });
                            this._touchHandler.emitter = this._container;
                            this._line.on('project-reference-change', e => {
                                this.trigger('project-reference-change', this.reference - e.data);
                            });
                            this._touchHandler.on('scroll-1', e => {
                                var height = this._container.offsetPosition.height;
                                this.trigger('project-reference-change', (e.data.y / height) / this._scale);
                            });
                            this._touchHandler.on('scroll-2', e => {
                                var height = this._container.offsetPosition.height;
                                this.trigger('borehole-reference-change', (e.data.y / height) / this._scale);
                            });
                            this._touchHandler.on('zoom-2', e => {
                                this.trigger('borehole-scale-change', 1 - ((e.data.zoom - 1)));
                            });
                            this._touchHandler.on('zoom-3', e => {
                                this.trigger('project-scale-change', 1 - ((e.data.zoom - 1) / 2));
                            });
                            this._logs.on('column-width-change', e => {
                                this.trigger('column-width-change', e.data);
                            });
                        }
                        start() {
                            this.view.addChild(this._container);
                            super.start();
                        }
                        /**
                         * Getter of model
                         * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        get logs() {
                            return this._logs;
                        }
                        /**
                         *
                         * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            this._model = model;
                            var borehole = model;
                            borehole.logs.forEach(log => {
                                this._logs.addLog(log);
                            });
                        }
                    }
                    Borehole.BoreholeColumnDataCtrl = BoreholeColumnDataCtrl;
                })(Borehole = Well.Borehole || (Well.Borehole = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Borehole;
                (function (Borehole) {
                    /**
                     * BoreholeColumnHeaderCtrl
                     */
                    class BoreholeColumnHeaderCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._title = this.app.viewFactory.title('', 1);
                            this._title.addClasses('project-borehole-header-title');
                            this._container = this.app.viewFactory.container();
                            this._container.classes = 'project-borehole-header-logs';
                            this._logs = this.createController(ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl);
                            this._logs.view = this._container;
                            var view = this.app.viewFactory.container();
                            view.classes = 'project-borehole-header-logs-column ruler';
                            this._container.addChild(view);
                            this._ruler = this.createController(Well.Reference.ReferenceRulerHeaderCtrl);
                            this._ruler.view = view;
                        }
                        start() {
                            this.view.addChild(this._title);
                            this.view.addChild(this._container);
                            super.start();
                        }
                        /*
                        column(log : ICad.Model.Well.Log) : ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl
                        {
                            return this.controllers.find(v=>{
                                return (v instanceof ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl) && (v as ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl).model.uuid == log.uuid
                            }) as ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl
                        }
                        */
                        updateTitle() {
                            var text = this.model.name;
                            this._title.text = text;
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        get reference() {
                            return this._reference;
                        }
                        /**
                         * Getter of scale
                        * @return {number}  Value of scale
                         */
                        get scale() {
                            return this._scale;
                        }
                        /**
                         * Getter of logs
                        * @return {ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl}  Value of logs
                         */
                        get logs() {
                            return this._logs;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            this._model = model;
                            this.updateTitle();
                            var borehole = model;
                            var that = this;
                            var index = 1;
                            borehole.logs.forEach(log => {
                                this._logs.addLog(log);
                            });
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        set reference(reference) {
                            super.reference = reference;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        set scale(scale) {
                            super.scale = scale;
                        }
                    }
                    Borehole.BoreholeColumnHeaderCtrl = BoreholeColumnHeaderCtrl;
                })(Borehole = Well.Borehole || (Well.Borehole = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Borehole;
                (function (Borehole) {
                    /**
                     * BoreholeColumnDataCtrl
                     */
                    class BoreholeLineDataCtrl extends ICad.Controller.Model.AbstractModelCtrl {
                        constructor(app, column) {
                            super(app);
                            this._datas = new Map();
                            this._displayLiveStats = false;
                            this._column = column;
                            this._container = this.app.viewFactory.container();
                            this._container.classes = 'project-borehole-line-data';
                            this._referenceDom = this.app.viewFactory.paragraph('');
                            this._referenceDom.classes = 'project-borehole-line-data-reference';
                            this._referenceInputDom = this.app.viewFactory.textfield(null, null, '');
                            this._referenceInputDom.visible = false;
                            this._referenceDom.addChild(this._referenceInputDom);
                            this._container.addChild(this._referenceDom);
                            var input = this._referenceInputDom;
                            this._referenceDom.on('touchstart', e => {
                                input.value = '';//this.reference.toFixed(2);
                                this._referenceInputDom.visible = true;
                                this._referenceInputDom.render();
                                input.focus();
                            });
                            this._referenceInputDom.on('focus-out', e => {
                                this._referenceInputDom.visible = false;
                                this._referenceInputDom.render();
                                this.trigger('project-reference-change', parseFloat(input.value));
                            });
                        }
                        start() {
                            this.view.addChild(this._container);
                            super.start();
                            this.render();
                        }
                        update() {
                            super.update();
                            this.render();
                        }
                        render() {
                            this._referenceDom.text = ICad.Util.Text.formatNumber(this.reference, 2);
                            if (this.app.config.get('displayLiveStats')) {
                                this._column.logs.columns.forEach((v, l) => {
                                    var ctrl = this._datas.get(l);
                                    if (!ctrl) {
                                        if (l.traces.data.width > 1) {
                                            if (l.traces.data._data[0] instanceof ICad.Math.Color.Color) {
                                                ctrl = this.createController(ICad.Controller.Model.Well.Trace.TracesLineDataHistogramRGBCtrl);
                                            }
                                            else {
                                                ctrl = this.createController(ICad.Controller.Model.Well.Trace.TracesLineDataHistogramCtrl);
                                            }
                                        }
                                        else
                                            ctrl = this.createController(ICad.Controller.Model.Well.Trace.TracesLineDataFirstDataCtrl);
                                        var view = this.app.viewFactory.container();
                                        ctrl.view = view;
                                        this._container.addChild(view);
                                        this._datas.set(l, ctrl);
                                    }
                                    if (this.reference > l.traces.top && this.reference < l.traces.bottom) {
                                        var position = v.view.offsetPosition;
                                        var parentPosition = v.view.parent.offsetPosition;
                                        ctrl.start();
                                        ctrl.model = l.traces.atReference(this.reference);
                                        ctrl.container.position.x = position.x - parentPosition.x;
                                        ctrl.container.position.width = position.width;
                                        ctrl.container.render();
                                    }
                                    else {
                                        ctrl.stop();
                                    }
                                });
                            }
                            else {
                                this._datas.forEach(c => c.stop());
                            }
                        }
                        /**
                         *
                         */
                        get reference() {
                            return this._reference;
                        }
                        /**
                         *
                         */
                        get scale() {
                            return this._scale;
                        }
                        /**
                         *
                         */
                        get column() {
                            return this._column;
                        }
                        get displayLiveStats() {
                            return this._displayLiveStats;
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set reference(reference) {
                            super.reference = reference;
                            this.render();
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set scale(scale) {
                            super.scale = scale;
                            this.render();
                        }
                        /**
                         * Setter of column
                        * @param {ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl} column New value of column
                         */
                        set column(column) {
                            this._column = column;
                            this.render();
                        }
                        set displayLiveStats(displayLiveStats) {
                            this._displayLiveStats = displayLiveStats;
                            this.render();
                        }
                    }
                    Borehole.BoreholeLineDataCtrl = BoreholeLineDataCtrl;
                })(Borehole = Well.Borehole || (Well.Borehole = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Log;
                (function (Log) {
                    /**
                     * LogColumnDataCtrl
                     */
                    class LogColumnDataCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._traces = this.app.viewFactory.container();
                            this._drag = this.app.viewFactory.container();
                            this._drag.addClasses('dragzone');
                            this._drag.on('touchstart', e => {
                                var previousPosition = e.data.pageX;
                                var e1 = this._app.container.on('touchmove', e => {
                                    this.trigger('column-width-change', this._view.offsetPosition.width + e.data.pageX - previousPosition);
                                    previousPosition = e.data.pageX;
                                });
                                var e2 = this._app.container.on('touchend', e => {
                                    this._app.container.off(e1);
                                    this._app.container.off(e2);
                                });
                            });
                        }
                        start() {
                            this.view.addChild(this._traces);
                            this.view.addChild(this._drag);
                            super.start();
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            this._model = model;
                            this.removeControllers();
                            var log = model;
                            if (log.traces.data.width > 1) {
                                if (log.traces.data._data[0] instanceof ICad.Math.Color.Color)
                                    var controller = this.app.controllerFactory.instantiate(Well.Trace.TracesRendererImageCtrl);
                                else
                                    var controller = this.app.controllerFactory.instantiate(Well.Trace.TracesRendererHeatmapCtrl);
                            }
                            else
                                var controller = this.app.controllerFactory.instantiate(Well.Trace.TracesRendererLinesCtrl);
                            controller.models = log.traces;
                            this.addController(controller);
                            controller.view = this._traces;
                            if (this.started)
                                controller.start();
                            var that = this;
                            controller.on('project-scale-change', e => { that.trigger('project-scale-change', e.data); });
                            controller.on('borehole-scale-change', e => { that.trigger('borehole-scale-change', e.data); });
                            controller.on('project-reference-change', e => { that.trigger('project-reference-change', e.data); });
                            controller.on('borehole-reference-change', e => { that.trigger('borehole-reference-change', e.data); });
                        }
                    }
                    Log.LogColumnDataCtrl = LogColumnDataCtrl;
                })(Log = Well.Log || (Well.Log = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Log;
                (function (Log) {
                    /**
                     * LogColumnHeaderCtrl
                     */
                    class LogColumnHeaderCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._events = new Array(2);
                            this._content = this.app.viewFactory.container();
                            this._content.addClasses('project-borehole-header-log');
                            this._title = this.app.viewFactory.paragraph('');
                            this._preview = this.app.viewFactory.draw();
                            this._min = this.app.viewFactory.paragraph('');
                            this._max = this.app.viewFactory.paragraph('');
                            this._unit = this.app.viewFactory.paragraph('');
                            this._dragzoneN = this.app.viewFactory.container();
                            this._dragzoneS = this.app.viewFactory.container();
                            this._dragzoneE = this.app.viewFactory.container();
                            this._dragzoneW = this.app.viewFactory.container();
                            this._title.addClasses('title');
                            this._preview.addClasses('preview');
                            this._min.addClasses('min');
                            this._max.addClasses('max');
                            this._unit.addClasses('unit');
                            this._dragzoneN.addClasses('dragzone-n');
                            this._dragzoneS.addClasses('dragzone-s');
                            this._dragzoneE.addClasses('dragzone-e');
                            this._dragzoneW.addClasses('dragzone-w');
                            this._content.addChild(this._title);
                            this._content.addChild(this._preview);
                            this._content.addChild(this._min);
                            this._content.addChild(this._unit);
                            this._content.addChild(this._max);
                            this._content.addChild(this._dragzoneN);
                            this._content.addChild(this._dragzoneS);
                            this._content.addChild(this._dragzoneE);
                            this._content.addChild(this._dragzoneW);
                        }
                        start() {
                            this.view.addChild(this._content);
                            super.start();
                            this._events[0] = this._content.on('touchstart', () => {
                                this.app.config.set('activeLog', this.model);
                            });
                            this._events[0] = this.app.config.on('keys.activeLog.change', (event) => {
                                if (event.data && this.model.uuid == event.data.uuid) {
                                    this._content.addClasses('active');
                                    this._content.render();
                                }
                                else if (this._content.hasClass('active')) {
                                    this._content.removeClasses('active');
                                    this._content.render();
                                }
                            });
                        }
                        update() {
                            super.update();
                        }
                        stop() {
                            super.stop();
                            this._content.off(this._events[0]);
                            this.app.config.off(this._events[1]);
                        }
                        renderPreview() {
                            var log = this.model;
                            if (log.traces.data.width > 1) {
                                var renderer = this.app.controllerFactory.instantiate(Well.Trace.TracesRendererHeatmapCtrl);
                                renderer.models = log.traces;
                            }
                            else {
                                var renderer = this.app.controllerFactory.instantiate(Well.Trace.TracesRendererLinesCtrl);
                                renderer.models = log.traces;
                            }
                            renderer.renderer.renderHeader(this._preview);
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            super.model = model;
                            var log = model;
                            if (log.traces.data._data[0] instanceof ICad.Math.Color.Color) {
                                this._preview.visible = false;
                                this._min.visible = false;
                                this._max.visible = false;
                                this._unit.visible = false;
                            }
                            this._title.text = model.name;
                            this._min.text = log.display.min + '';
                            this._max.text = log.display.max + '';
                            this._unit.text = log.unit;
                            log.display.on('min.change', e => {
                                this._min.text = e.data;
                                this._min.render();
                            });
                            log.display.on('max.change', e => {
                                this._max.text = e.data;
                                this._max.render();
                            });
                            log.display.on('colors.change', e => {
                                this.renderPreview();
                            });
                            delay(this.renderPreview.bind(this));
                        }
                    }
                    Log.LogColumnHeaderCtrl = LogColumnHeaderCtrl;
                })(Log = Well.Log || (Well.Log = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Log;
                (function (Log) {
                    /**
                     * LogColumnDataCtrl
                     */
                    class LogsColumnDataCtrl extends ICad.Controller.Model.AbstractModelListCtrl {
                        constructor(app) {
                            super(app);
                            this.models = new ICad.Model.Well.LogCollection();
                            this._columns = new Map();
                            this._container = this.app.viewFactory.container();
                            this._container.classes = 'project-borehole-content-logs-container';
                        }
                        start() {
                            this.view.addChild(this._container);
                            super.start();
                        }
                        addLog(log) {
                            this.models.add(log);
                            var controller = this.createModelController(log, ICad.Controller.Model.Well.Log.LogColumnDataCtrl);
                            var view = this.app.viewFactory.container();
                            view.classes = 'project-borehole-content-logs-column';
                            this._container.addChild(view);
                            controller.view = view;
                            this.columns.set(log, controller);
                            var cb = function (log, e) {
                                this.trigger('column-width-change', { log, width: e.data });
                            }.bind(this, log);
                            controller.on('column-width-change', cb);
                        }
                        column(log) {
                            return this.controllers.find(v => {
                                return (v instanceof ICad.Controller.Model.Well.Log.LogColumnDataCtrl) && v.model.uuid == log.uuid;
                            });
                        }
                        get models() {
                            return this._models;
                        }
                        get columns() {
                            return this._columns;
                        }
                        set models(models) {
                            this._models = models;
                        }
                        set columns(columns) {
                            this._columns = columns;
                        }
                    }
                    Log.LogsColumnDataCtrl = LogsColumnDataCtrl;
                })(Log = Well.Log || (Well.Log = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Log;
                (function (Log) {
                    /**
                     * LogColumnDataCtrl
                     */
                    class LogsColumnHeaderCtrl extends ICad.Controller.Model.AbstractModelListCtrl {
                        constructor(app) {
                            super(app);
                            this.models = new ICad.Model.Well.LogCollection();
                            this._columns = new Map();
                            this._container = this.app.viewFactory.container();
                            this._container.classes = 'project-borehole-header-logs-container';
                        }
                        start() {
                            this.view.addChild(this._container);
                            super.start();
                        }
                        addLog(log) {
                            this.models.add(log);
                            var controller = this.createModelController(log, ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl);
                            var view = this.app.viewFactory.container();
                            view.classes = 'project-borehole-header-logs-column';
                            this._container.addChild(view);
                            controller.view = view;
                        }
                        column(log) {
                            return this.controllers.find(v => {
                                return (v instanceof ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl) && v.model.uuid == log.uuid;
                            });
                        }
                        get models() {
                            return this._models;
                        }
                        set models(models) {
                            this._models = models;
                        }
                    }
                    Log.LogsColumnHeaderCtrl = LogsColumnHeaderCtrl;
                })(Log = Well.Log || (Well.Log = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Log;
                (function (Log) {
                    /**
                     * LogColumnDataCtrl
                     */
                    class LogSettingsSidebarCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._events = new Array(1);
                            this._title = this.app.viewFactory.title("Log settings", 6);
                            this._title.classes = "sidebar-title";
                            this._content = this.app.viewFactory.container();
                        }
                        /**
                         *
                         */
                        start() {
                            super.start();
                            this.view.addChild(this._title);
                            this.view.addChild(this._content);
                            this._events[0] = this.app.config.on('keys.activeLog.change', e => {
                                this.model = e.data;
                            });
                            this.model = this.app.config.get('activeLog');
                        }
                        stop() {
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            super.model = model;
                            this._content.removeChildren();
                            if (!this.model) {
                                this._content.addChild(this.app.viewFactory.paragraph('No log selected'));
                                return;
                            }
                            var log = this.model;
                            var name = this.app.viewFactory.paragraph(log.name);
                            name.addClasses('settings-title');
                            this._content.addChild(name);
                            if (!(log.traces.data.at(0, 0) instanceof ICad.Math.Color.Color)) {
                                var min = this.app.viewFactory.textfield('Min', 'min', log.display.min.toString());
                                var max = this.app.viewFactory.textfield('Max', 'max', log.display.max.toString());
                                this._content.addChild(min);
                                this._content.addChild(max);
                                max.on('focus-out', e => {
                                    if (log.display.max !== parseFloat(e.data))
                                        log.display.max = parseFloat(e.data);
                                });
                                min.on('focus-out', e => {
                                    if (log.display.min !== parseFloat(e.data))
                                        log.display.min = parseFloat(e.data);
                                });
                                if (log.traces.data.width > 1) {
                                    var colorMin = this.app.viewFactory.colorpicker('Color min', 'color_min', log.display.colors[0]);
                                    var colorMax = this.app.viewFactory.colorpicker('Color max', 'color_max', log.display.colors[1]);
                                    this._content.addChild(colorMin);
                                    this._content.addChild(colorMax);
                                    colorMin.on('focus-out', e => {
                                        if (!log.display.colors[0].equal(e.data)) {
                                            log.display.colors[0] = e.data;
                                            log.display.trigger('colors.change', log.display.colors);
                                        }
                                    });
                                    colorMax.on('focus-out', e => {
                                        if (!log.display.colors[1].equal(e.data)) {
                                            log.display.colors[1] = e.data;
                                            log.display.trigger('colors.change', log.display.colors);
                                        }
                                    });
                                }
                                else {
                                    var color = this.app.viewFactory.colorpicker('Color', 'color', log.display.colors[0]);
                                    this._content.addChild(color);
                                    color.on('focus-out', e => {
                                        log.display.colors[0] = e.data;
                                        log.display.trigger('colors.change', log.display.colors);
                                    });
                                }
                            }
                        }
                    }
                    Log.LogSettingsSidebarCtrl = LogSettingsSidebarCtrl;
                })(Log = Well.Log || (Well.Log = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Log;
                (function (Log) {
                    /**
                     * LogColumnDataCtrl
                     */
                    class LogInfoSidebarCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._title = this.app.viewFactory.title("Log informations", 6);
                            this._title.classes = "sidebar-title";
                            this._content = this.app.viewFactory.container();
                        }
                        /**
                         *
                         */
                        start() {
                            super.start();
                            this.view.addChild(this._title);
                            this.view.addChild(this._content);
                            this.model = this.app.config.get('activeLog');
                            this.app.config.on('keys.activeLog.change', e => {
                                this.model = e.data;
                            });
                        }
                        stop() {
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            if (!model)
                                return;
                            super.model = model;
                            this._content.removeChildren();
                            if (!this.model) {
                                this._content.addChild(this.app.viewFactory.paragraph('No log selected'));
                                return;
                            }
                            var log = this.model;
                            var name = this.app.viewFactory.paragraph(log.name);
                            name.addClasses('info-title');
                            this._content.addChild(name);
                            var createInfo = (name, value) => {
                                var container = this.app.viewFactory.container();
                                var _title = this.app.viewFactory.paragraph(name);
                                var _value = this.app.viewFactory.paragraph(value);
                                container.addClasses('info-data');
                                _title.addClasses('info-data-title');
                                _value.addClasses('info-data-value');
                                container.addChild(_title);
                                container.addChild(_value);
                                this._content.addChild(container);
                            };
                            createInfo('Top depth', log.traces.top);
                            createInfo('Bottom depth', log.traces.bottom);
                            createInfo('Data type', log.traces.data.at(0, 0) instanceof ICad.Math.Color.Color ? 'color' : 'number');
                            createInfo('Traces', log.traces.data.height);
                            createInfo('Data per trace', log.traces.data.width);
                            createInfo('Total of data', log.traces.data.width * log.traces.data.height);
                        }
                    }
                    Log.LogInfoSidebarCtrl = LogInfoSidebarCtrl;
                })(Log = Well.Log || (Well.Log = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Project;
                (function (Project) {
                    /**
                     * ProjectFrameCtrl
                     */
                    class ProjectFrameCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._boreholes = this.app.viewFactory.container();
                            this._boreholes.addClasses('project-boreholes');
                            this._preview = this.app.viewFactory.container();
                            this._preview.addClasses('project-preview');
                            this._previewCtrl = new Project.ProjectPreviewCtrl(this.app, this);
                            this._previewCtrl.view = this._preview;
                            this._previewCtrl.on('project-reference-change', e => {
                                if (!isNaN(e.data))
                                    this.reference = e.data;
                                this.trigger('project-reference-change', this.reference);
                            });
                        }
                        start() {
                            this.view.addChild(this._boreholes);
                            this.view.addChild(this._preview);
                            super.start();
                        }
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            this._model = model;
                            this.removeControllers();
                            this.addController(this._previewCtrl);
                            var project = model;
                            var that = this;
                            project.boreholes.forEach(borehole => {
                                var controller = that.createModelController(borehole, ICad.Controller.Model.Well.Borehole.BoreholeColumnCtrl);
                                var view = that.app.viewFactory.container();
                                view.addClasses('project-borehole');
                                that._boreholes.addChild(view);
                                controller.view = view;
                                controller.on('project-scale-change', e => {
                                    var scale = that.scale + e.data;
                                    scale = window.Math.max(0.01, scale);
                                    scale = window.Math.min(100, scale);
                                    if (!isNaN(scale)) {
                                        this.scale = scale;
                                        this.reference = this.reference;
                                    }
                                });
                                controller.on('project-reference-change', e => {
                                    var reference = that.reference - e.data;
                                    if (!isNaN(reference))
                                        this.reference = reference;
                                    this.trigger('project-reference-change', reference);
                                });
                                controller.on('borehole-reference-change', e => {
                                    this.trigger('project-borehole-reference-change', e.data);
                                });
                            });
                            // Update preview
                            this._previewCtrl.render();
                        }
                    }
                    Project.ProjectFrameCtrl = ProjectFrameCtrl;
                })(Project = Well.Project || (Well.Project = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Project;
                (function (Project) {
                    /**
                     * ProjectFrameCtrl
                     */
                    class ProjectPreviewCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app, frame) {
                            super(app);
                        }
                        render() {
                        }
                        /*
                        _frame : ProjectFrameCtrl
                        _draw2D : ICad.View.AbstractView
                        _draw3D : ICad.View.AbstractView
                        _line :  ICad.View.AbstractView
                
                        _top : number = 0;
                        _bottom : number = 0;
                
                
                        constructor(app : ICad.Application.AbstractApplication, frame: ProjectFrameCtrl)
                        {
                            super(app);
                            this._frame = frame;
                
                            this._line = this.app.viewFactory.container();
                            this._line.addClasses('project-preview-line-data')
                
                            this._draw2D = this.app.viewFactory.draw();
                            this._draw3D = this.app.viewFactory.draw3D();
                
                            this._draw2D.addClasses('data');
                            this._draw3D.addClasses('data');
                
                            frame.on('project-borehole-reference-change', e =>{
                                this.render()
                            });
                
                            frame.on('project-reference-change', e =>{
                                this.render()
                            });
                
                            this._draw3D.on('touchstart', e => {
                                var reference = map(e.data.offsetY, 0, this._draw3D.offsetPosition.height, this._top, this._bottom)
                                this.trigger('project-reference-change', reference)
                            })
                
                            var registration;
                            this._draw3D.on('touchstart', e => {
                                registration =  this._draw3D.on('touchmove', e => {
                                    var reference = map(e.data.offsetY, 0, this._draw3D.offsetPosition.height, this._top, this._bottom)
                                    this.trigger('project-reference-change', reference)
                                })
                            })
                
                            this.app.container.on('touchend', e => {
                                this._draw3D.off(registration)
                            })
                        }
                
                        start()
                        {
                            this.view.addChild(this._draw2D)
                            this.view.addChild(this._draw3D)
                            this.view.addChild(this._line)
                            super.start()
                            this.render();
                        }
                
                        render()
                        {
                            delay(() => {
                                
                                this._draw2D.clear();
                                this._draw3D.clear();
                
                                // Retreive columns to draw
                                var logColumns = this._frame.findControllers(ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl);
                                var offset = this.view.offsetPosition;
                                var position = new Math.Geometry.Rectangle();
                                var width = offset.width / logColumns.length;
                
                                if(logColumns.length === 0) return;
                
                                // Compute top and bottom of the preview
                                var first = logColumns[0] as ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl;
                                this._top = first.models.top;
                                this._bottom = first.models.bottom;
                                var reference = first.reference;
                
                                for(var i=1; i<logColumns.length; ++i)
                                {
                                    var column = logColumns[i] as ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl;
                                    var dref = reference - column.reference;
                                    this._top = min(this._top, column.models.top + dref);
                                    this._bottom = max(this._bottom, column.models.bottom + dref);
                                }
                
                                var ry = offset.height / (this._bottom - this._top);
                
                                // Prepare position
                                position.width = width;
                                position.height = offset.height;
                                position.x = 0;
                                position.y = 0;
                
                                // Draw columns
                                logColumns.forEach(column=>{
                                    var traceRendererCtrl = column as ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl
                                    var dref = reference - traceRendererCtrl.reference;
                                    position.y = (traceRendererCtrl.models.top - this._top + dref) * ry;
                                    position.height = (traceRendererCtrl.models.bottom - traceRendererCtrl.models.top) * ry;
                                    traceRendererCtrl.renderer.renderIn(this._draw2D, position)
                                    traceRendererCtrl.renderer.renderIn(this._draw3D, position)
                                    position.x += width;
                                })
                
                                // Line
                                var lineY = map(this._frame.reference, this._top, this._bottom, 0, offset.height);
                                this._line.position.y=lineY;
                                this._line.render();
                            }, 1)
                        }
                
                
                        /**
                         * Getter of model
                        * @return {ICad.Model.AbstractModel}  Value of model
                         */
                        get model() {
                            return this._model;
                        }
                        /**
                         *
                        * @param {ICad.Model.AbstractModel} model
                         */
                        set model(model) {
                            super.model = model;
                            this.render();
                        }
                    }
                    Project.ProjectPreviewCtrl = ProjectPreviewCtrl;
                })(Project = Well.Project || (Well.Project = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * AbstractTracesRendererCtrl
                     * @abstract
                     */
                    class AbstractTracesRendererCtrl extends ICad.Controller.Model.AbstractModelListCtrl {
                        constructor() {
                            super(...arguments);
                            this._valid = false;
                        }
                        start() {
                            super.start();
                            if (!this._valid) {
                                this.buildData();
                                this._valid = true;
                            }
                        }
                        /**
                         * Getter of models
                        * @return {ICad.Model.Well.TraceCollection}  Value of models
                         */
                        get models() {
                            return this._models;
                        }
                        /**
                         * Setter of models
                        * @param {ICad.Model.Well.TraceCollection} models New value of models
                         */
                        set models(models) {
                            this._models = models;
                            this._valid = false;
                        }
                    }
                    Trace.AbstractTracesRendererCtrl = AbstractTracesRendererCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * TracesRendererBitmapCtrl
                     */
                    class TracesRendererHeatmapCtrl extends ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl {
                        constructor(app) {
                            super(app);
                            this._heatmap = this.app.viewFactory.traceHeatmap();
                            this._heatmap.classes = 'data';
                        }
                        start() {
                            if (this.started)
                                return;
                            this.view.addChild(this._heatmap);
                            super.start();
                            this.render();
                        }
                        /**
                         *
                         */
                        render() {
                            var that = this;
                            window.requestAnimationFrame(function () {
                                that.reference = that.reference;
                                that.scale = that.scale;
                            });
                        }
                        buildData() {
                            var heatmap = this._heatmap;
                            heatmap.values = this.models._data;
                        }
                        /**
                         * Getter of models
                        * @return {ICad.Model.Well.TraceCollection}  Value of models
                         */
                        get models() {
                            return super.models;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        get reference() {
                            return this._reference;
                        }
                        /**
                         * Getter of scale
                        * @return {number}  Value of scale
                         */
                        get scale() {
                            return this._scale;
                        }
                        get renderer() {
                            return this._heatmap;
                        }
                        /**
                         * Setter of models
                        * @param {ICad.Model.Well.TraceCollection} models New value of models
                         */
                        set models(models) {
                            super.models = models;
                            var heatmap = this._heatmap;
                            heatmap.min = models.log.display.min;
                            heatmap.max = models.log.display.max;
                            heatmap.colorFrom = models.log.display.colors[0];
                            heatmap.colorTo = models.log.display.colors[1];
                            this.reference = this.reference;
                            this.scale = this.scale;
                            models.log.display.on('min.change', e => {
                                heatmap.min = e.data;
                                heatmap.render();
                            });
                            models.log.display.on('max.change', e => {
                                heatmap.max = e.data;
                                heatmap.render();
                            });
                            models.log.display.on('colors.change', e => {
                                heatmap.colorFrom = e.data[0];
                                heatmap.colorTo = e.data[1];
                                heatmap.render();
                            });
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set reference(reference) {
                            super.reference = reference;
                            this._heatmap.position.y = (this._models._references[0] - reference) * this._scale * this._heatmap.offsetPosition.height + (this._heatmap.offsetPosition.height / 2);
                            this._heatmap.invalidate();
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set scale(scale) {
                            super.scale = scale;
                            var dataPerScreen = 1 / window.Math.abs(this._models._references[0] - this._models._references[1]);
                            var totalOfScreen = this._models._references.length / dataPerScreen;
                            this._heatmap.position.height = totalOfScreen * this._scale * this._heatmap.offsetPosition.height;
                            this._heatmap.invalidate();
                        }
                    }
                    Trace.TracesRendererHeatmapCtrl = TracesRendererHeatmapCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * TracesRendererBitmapCtrl
                     */
                    class TracesRendererImageCtrl extends ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl {
                        constructor(app) {
                            super(app);
                            this._image = this.app.viewFactory.traceImage();
                            this._image.classes = 'data';
                        }
                        start() {
                            if (this.started)
                                return;
                            this.view.addChild(this._image);
                            super.start();
                            this.render();
                        }
                        /**
                         *
                         */
                        render() {
                            var that = this;
                            window.requestAnimationFrame(function () {
                                that.reference = that.reference;
                                that.scale = that.scale;
                            });
                        }
                        buildData() {
                            var image = this._image;
                            image.values = this.models._data;
                        }
                        /**
                         * Getter of models
                        * @return {ICad.Model.Well.TraceCollection}  Value of models
                         */
                        get models() {
                            return super.models;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        get reference() {
                            return this._reference;
                        }
                        /**
                         * Getter of scale
                        * @return {number}  Value of scale
                         */
                        get scale() {
                            return this._scale;
                        }
                        get renderer() {
                            return this._image;
                        }
                        /**
                         * Setter of models
                        * @param {ICad.Model.Well.TraceCollection} models New value of models
                         */
                        set models(models) {
                            super.models = models;
                            var image = this._image;
                            this.reference = this.reference;
                            this.scale = this.scale;
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set reference(reference) {
                            super.reference = reference;
                            this._image.position.y = (this._models._references[0] - reference) * this._scale * this._image.offsetPosition.height + (this._image.offsetPosition.height / 2);
                            this._image.invalidate();
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set scale(scale) {
                            super.scale = scale;
                            var dataPerScreen = 1 / window.Math.abs(this._models._references[0] - this._models._references[1]);
                            var totalOfScreen = this._models._references.length / dataPerScreen;
                            this._image.position.height = totalOfScreen * this._scale * this._image.offsetPosition.height;
                            this._image.invalidate();
                        }
                    }
                    Trace.TracesRendererImageCtrl = TracesRendererImageCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * TracesRendererBitmapCtrl
                     */
                    class TracesRendererLinesCtrl extends ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl {
                        constructor(app) {
                            super(app);
                            this._lines = this.app.viewFactory.traceLines();
                            this._lines.classes = 'data';
                        }
                        start() {
                            if (this.started)
                                return;
                            this.view.addChild(this._lines);
                            super.start();
                            this.render();
                        }
                        /**
                         *
                         */
                        render() {
                            var that = this;
                            window.requestAnimationFrame(function () {
                                that.reference = that.reference;
                                that.scale = that.scale;
                            });
                        }
                        buildData() {
                            var lines = this._lines;
                            lines.values = this.models._data;
                        }
                        /**
                         * Getter of models
                        * @return {ICad.Model.Well.TraceCollection}  Value of models
                         */
                        get models() {
                            return this._models;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        get reference() {
                            return this._reference;
                        }
                        /**
                         * Getter of scale
                        * @return {number}  Value of scale
                         */
                        get scale() {
                            return this._scale;
                        }
                        get renderer() {
                            return this._lines;
                        }
                        /**
                         * Setter of models
                        * @param {ICad.Model.Well.TraceCollection} models New value of models
                         */
                        set models(models) {
                            super.models = models;
                            var lines = this._lines;
                            lines.min = models.log.display.min;
                            lines.max = models.log.display.max;
                            lines.color = models.log.display.colors[0];
                            this.reference = this.reference;
                            this.scale = this.scale;
                            models.log.display.on('min.change', e => {
                                lines.min = e.data;
                                lines.render();
                            });
                            models.log.display.on('max.change', e => {
                                lines.max = e.data;
                                lines.render();
                            });
                            models.log.display.on('colors.change', e => {
                                lines.color = e.data[0];
                                lines.render();
                            });
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set reference(reference) {
                            super.reference = reference;
                            this._lines.position.y = (this._models._references[0] - reference) * this._scale * this._lines.offsetPosition.height + (this._lines.offsetPosition.height / 2);
                            this._lines.invalidate();
                        }
                        /**
                         * Setter of reference
                        * @param {number} reference New value of reference
                         */
                        set scale(scale) {
                            super.scale = scale;
                            var dataPerScreen = 1 / window.Math.abs(this._models._references[0] - this._models._references[1]);
                            var totalOfScreen = this._models._references.length / dataPerScreen;
                            this._lines.position.height = totalOfScreen * this._scale * this._lines.offsetPosition.height;
                            this._lines.invalidate();
                        }
                    }
                    Trace.TracesRendererLinesCtrl = TracesRendererLinesCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * AbstractTracesRendererCtrl
                     * @abstract
                     */
                    class AbstractTracesLineDataCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl {
                        constructor(app) {
                            super(app);
                            this._container = this.app.viewFactory.container();
                            this._container.addClasses('project-borehole-line-data-data');
                        }
                        update() {
                            if (this.view)
                                this.view.addChild(this._container);
                            super.update();
                        }
                        start() {
                            if (this.started)
                                return;
                            super.start();
                        }
                        get model() {
                            return this._model;
                        }
                        set model(trace) {
                            this._model = trace;
                            this.update();
                        }
                        get container() {
                            return this._container;
                        }
                        set container(container) {
                            this._container = container;
                        }
                    }
                    Trace.AbstractTracesLineDataCtrl = AbstractTracesLineDataCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * AbstractTracesRendererCtrl
                     * @abstract
                     */
                    class TracesLineDataFirstDataCtrl extends Trace.AbstractTracesLineDataCtrl {
                        constructor(app) {
                            super(app);
                            this._content = this.app.viewFactory.paragraph('');
                            this._content.addClasses('project-borehole-line-data-firstdata');
                            this._container.addChild(this._content);
                        }
                        update() {
                            super.update();
                            if (this.model)
                                this._content.text = ICad.Util.Text.formatNumber(this.model.data[0], 3);
                            else
                                this._content.text = '';
                        }
                    }
                    Trace.TracesLineDataFirstDataCtrl = TracesLineDataFirstDataCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * AbstractTracesRendererCtrl
                     * @abstract
                     */
                    class TracesLineDataHistogramCtrl extends Trace.AbstractTracesLineDataCtrl {
                        constructor(app) {
                            super(app);
                            this._content = this.app.viewFactory.chartHistogram();
                            this._content.addClasses('project-borehole-line-data-histogram');
                            this._container.addChild(this._content);
                        }
                        update() {
                            super.update();
                            if (this.model) {
                                this._content.visible = true;
                                this._content.update();
                            }
                            else {
                                this._content.visible = false;
                            }
                        }
                        get model() {
                            return super.model;
                        }
                        set model(trace) {
                            super.model = trace;
                            var log = this.model.log;
                            var data = log.traces.data.data;
                            var histogram = this._content;
                            histogram.data = this.model.data;
                            histogram.axis.right = histogram.data.length;
                            histogram.axis.left = 0;
                            histogram.axis.bottom = log.display.min;
                            histogram.axis.top = log.display.max;
                            log.display.on('min.change', e => {
                                histogram.axis.bottom = e.data;
                                this._content.update();
                            });
                            log.display.on('max.change', e => {
                                histogram.axis.top = e.data;
                                this._content.update();
                            });
                            this.update();
                        }
                    }
                    Trace.TracesLineDataHistogramCtrl = TracesLineDataHistogramCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Trace;
                (function (Trace) {
                    /**
                     * AbstractTracesRendererCtrl
                     * @abstract
                     */
                    class TracesLineDataHistogramRGBCtrl extends Trace.AbstractTracesLineDataCtrl {
                        constructor(app) {
                            super(app);
                            this._content = this.app.viewFactory.container();
                            this._r = this.app.viewFactory.chartHistogram();
                            this._g = this.app.viewFactory.chartHistogram();
                            this._b = this.app.viewFactory.chartHistogram();
                            this._r.color = new ICad.Math.Color.Color(255, 0, 0);
                            this._g.color = new ICad.Math.Color.Color(0, 255, 0);
                            this._b.color = new ICad.Math.Color.Color(0, 0, 255);
                            this._g.background = false;
                            this._b.background = false;
                            this._content.addClasses('project-borehole-line-data-histogram');
                            this._r.addClasses('project-borehole-line-data-histogram-color');
                            this._g.addClasses('project-borehole-line-data-histogram-color');
                            this._b.addClasses('project-borehole-line-data-histogram-color');
                            this._content.addChild(this._r);
                            this._content.addChild(this._g);
                            this._content.addChild(this._b);
                            this._container.addChild(this._content);
                        }
                        update() {
                            super.update();
                            if (this.model) {
                                this._content.visible = true;
                                var log = this.model.log;
                                var data = log.traces.data.data;
                                var r = this._r;
                                var g = this._g;
                                var b = this._b;
                                r.data = new Array(this.model.data.length); //this.model.data.slice(0).map(v=>v.r);
                                g.data = new Array(this.model.data.length); //this.model.data.slice(0).map(v=>v.g);
                                b.data = new Array(this.model.data.length); //this.model.data.slice(0).map(v=>v.b);
                                for (var i = 0; i < this.model.data.length; ++i) {
                                    r.data[i] = this.model.data[i].r;
                                    g.data[i] = this.model.data[i].g;
                                    b.data[i] = this.model.data[i].b;
                                }
                                if (!r.axis.right) {
                                    r.axis.right = r.data.length;
                                    r.axis.left = 0;
                                    r.axis.bottom = 0;
                                    r.axis.top = 255;
                                }
                                if (!g.axis.right) {
                                    g.axis.right = g.data.length;
                                    g.axis.left = 0;
                                    g.axis.bottom = 0;
                                    g.axis.top = 255;
                                }
                                if (!b.axis.right) {
                                    b.axis.right = b.data.length;
                                    b.axis.left = 0;
                                    b.axis.bottom = 0;
                                    b.axis.top = 255;
                                }
                                this._content.update();
                                this._r.update();
                                this._g.update();
                                this._b.update();
                            }
                            else {
                                this._content.visible = false;
                            }
                        }
                    }
                    Trace.TracesLineDataHistogramRGBCtrl = TracesLineDataHistogramRGBCtrl;
                })(Trace = Well.Trace || (Well.Trace = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Reference;
                (function (Reference) {
                    /**
                     * AbstractReferenceCtrl
                     * @abstract
                     */
                    class AbstractReferenceCtrl {
                    }
                    Reference.AbstractReferenceCtrl = AbstractReferenceCtrl;
                })(Reference = Well.Reference || (Well.Reference = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Reference;
                (function (Reference) {
                    /**
                     * AbstractReferenceCtrl
                     * @abstract
                     */
                    class ReferenceRulerHeaderCtrl extends Controller.AbstractCtrl {
                        constructor(app) {
                            super(app);
                            this._unit = 'm';
                            this._content = this.app.viewFactory.container();
                            this._content.addClasses('project-borehole-header-log');
                            this._title = this.app.viewFactory.paragraph(this.unit);
                            this._title.addClasses('title');
                            this._content.addChild(this._title);
                        }
                        start() {
                            this.view.addChild(this._content);
                            super.start();
                        }
                        get unit() {
                            return this._unit;
                        }
                        set unit(unit) {
                            this._unit = unit;
                            this._title.text = unit;
                        }
                    }
                    Reference.ReferenceRulerHeaderCtrl = ReferenceRulerHeaderCtrl;
                })(Reference = Well.Reference || (Well.Reference = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Controller;
    (function (Controller) {
        var Model;
        (function (Model) {
            var Well;
            (function (Well) {
                var Reference;
                (function (Reference) {
                    /**
                     * AbstractReferenceCtrl
                     * @abstract
                     */
                    class ReferenceRulerDataCtrl extends Controller.AbstractCtrl {
                        constructor(app) {
                            super(app);
                            this._reference = 0;
                            this._scale = 1;
                            this._ruler = this.app.viewFactory.ruler();
                            this._ruler.classes = 'data';
                        }
                        start() {
                            this.view.addChild(this._ruler);
                            super.start();
                            this.reference = this.reference;
                            this.scale = this.scale;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        get reference() {
                            return this._reference;
                        }
                        /**
                         * Getter of scale
                        * @return {number}  Value of scale
                         */
                        get scale() {
                            return this._scale;
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        set reference(reference) {
                            this._reference = reference;
                            this._ruler.reference = reference;
                            this._ruler.increment = (1 / this.scale) / 10;
                            this._ruler.spacing = this._ruler.offsetPosition.height / 10;
                            this._ruler.invalidate();
                        }
                        /**
                         * Getter of reference
                        * @return {number}  Value of reference
                         */
                        set scale(scale) {
                            this._scale = scale;
                            this.reference = this.reference;
                        }
                    }
                    Reference.ReferenceRulerDataCtrl = ReferenceRulerDataCtrl;
                })(Reference = Well.Reference || (Well.Reference = {}));
            })(Well = Model.Well || (Model.Well = {}));
        })(Model = Controller.Model || (Controller.Model = {}));
    })(Controller = ICad.Controller || (ICad.Controller = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Event;
    (function (Event_1) {
        /**
         * Event
         */
        class Event {
            /**
             * Getter of data
            * @return {any}  Value of data
             */
            get data() {
                return this._data;
            }
            /**
             * Getter of emitter
            * @return {ICad.Event.EventEmitter}  Value of emitter
             */
            get emitter() {
                return this._emitter;
            }
            /**
             * Setter of data
            * @param {any} data New value of data
             */
            set data(data) {
                this._data = data;
            }
            /**
             * Setter of emitter
            * @param {ICad.Event.EventEmitter} emitter New value of emitter
             */
            set emitter(emitter) {
                this._emitter = emitter;
            }
        }
        Event_1.Event = Event;
    })(Event = ICad.Event || (ICad.Event = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Event;
    (function (Event) {
        /**
         * Event
         */
        class TouchEventHandler extends Event.EventEmitter {
            constructor() {
                super(...arguments);
                /** */
                this._emitter = null;
                this._start = 0;
                /** */
                this._events = [];
                /** */
                this._inertia = new ICad.Math.Physics.Inertia();
            }
            /**
             *
             */
            get emitter() {
                return this._emitter;
            }
            /**
             *
             */
            set emitter(emitter) {
                this.unbindEvents();
                this._emitter = emitter;
                this.bindEvents();
            }
            /**
             *
             */
            bindEvents() {
                this._events.push(this._emitter.on('gesturestart', this.onGestureStart.bind(this)));
                this._events.push(this._emitter.on('touchstart', this.onTouchStart.bind(this)));
                this._events.push(this._emitter.on('touchmove', this.onTouchMove.bind(this)));
                this._events.push(this._emitter.on('touchend', this.onTouchEnd.bind(this)));
            }
            /**
             *
             */
            unbindEvents() {
                if (this._emitter && this._events) {
                    for (var i = 0; i < this._events.length; ++i) {
                        this._emitter.off(this._events[i]);
                    }
                }
            }
            /**
             *
             */
            onTouchStart(e) {
                e.data.preventDefault();
                this._start = now();
                this._fingers = e.data.touches.length;
                this._initial = this.getRectangle(e.data.touches);
                this._previous = this._initial;
                this._inertia._start = 0;
            }
            /**
             *
             */
            onGestureStart(e) {
                e.data.preventDefault();
            }
            /**
             *
             */
            onTouchMove(e) {
                var time = now();
                if(e.data.preventDefault)
                    e.data.preventDefault();
                if (this._fingers !== e.data.touches.length)
                    return;
                if(time-this._start < 100) 
                {
                    return;
                }
                var current = this.getRectangle(e.data.touches);
                var move = current.center.distance(this._previous.center);
                var grow = window.Math.abs(current.diagonal - this._previous.diagonal);
                if (move > grow) {
                    var cc = current.center;
                    var cp = this._previous.center;
                    var dy = cc.y - cp.y;
                    this.trigger('scroll-' + this._fingers, {
                        y: dy,
                        x: cc.x - cp.x
                    });
                    this._inertia._value = dy;
                    this._inertia._duration = (((dy * dy)  / 2500) * 4000);
                }
                else {
                    var cc = current.center;
                    this.trigger('zoom-' + this._fingers, {
                        zoom: this._previous.height / current.height,
                        x: cc.x,
                        y: cc.y
                    });
                }
                this._previous = current;
            }
            /**
             *
             */
            onTouchEnd(e) {
                e.data.preventDefault();
                var time = now();
                if(time-this._start < 100) 
                {
                    return;
                }
                this._inertia._start = new Date().getTime();
                this.applyInertia();
            }
            /**
             *
             */
            getRectangle(touches) {
                var top = touches[0].clientY;
                var bottom = touches[0].clientY;
                var left = touches[0].clientX;
                var right = touches[0].clientX;
                for (var i = 1; i < touches.length; ++i) {
                    top = window.Math.min(top, touches[i].clientY);
                    bottom = window.Math.max(bottom, touches[i].clientY);
                    left = window.Math.min(left, touches[i].clientX);
                    right = window.Math.max(right, touches[i].clientX);
                }
                var rect = new ICad.Math.Geometry.Rectangle();
                rect.y = top;
                rect.x = left;
                rect.height = bottom - top;
                rect.width = right - left;
                return rect;
            }
            applyInertia() {
                var that = this;
                requestAnimationFrame(function () {
                    var now = new Date().getTime();
                    var value = that._inertia.atTime(now);
                    if (value !== 0) {
                        that.trigger('scroll-' + that._fingers, {
                            y: value,
                            x: 0
                        });
                        that.applyInertia();
                    }
                });
            }
        }
        Event.TouchEventHandler = TouchEventHandler;
    })(Event = ICad.Event || (ICad.Event = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Event;
    (function (Event) {
        /**
         * Registration
         */
        class Registration {
            /**
             * Getter of callback
            * @return {Function}  Value of callback
             */
            get callback() {
                return this._callback;
            }
            /**
             * Setter of callback
            * @param {Function} callback New value of callback
             */
            set callback(callback) {
                this._callback = callback;
            }
        }
        Event.Registration = Registration;
    })(Event = ICad.Event || (ICad.Event = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Math;
    (function (Math) {
        /**
         * Matrix<T>
         */
        class Matrix {
            constructor() {
                /** */
                this._data = [];
            }
            allocate(width, height) {
                this.width = width;
                this.height = height;
                this.data = new Array(width * height).fill(0);
            }
            at(x, y) {
                return this.data[x + y * this.width];
            }
            /**
             *
             */
            forEach(fn) {
                for (var y = 0, i = 0; y < this._height; ++y) {
                    for (var x = 0; x < this._width; ++x, ++i) {
                        fn(this._data[i], x, y);
                    }
                }
            }
            /**
             *
             */
            map(fn) {
                for (var y = 0, i = 0; y < this._height; ++y) {
                    for (var x = 0; x < this._width; ++x, ++i) {
                        this._data[i] = fn(this._data[i], x, y);
                    }
                }
            }
            /**
             *
             */
            line(index) {
                index *= this.width;
                return this._data.slice(index, index + this._width);
            }
            /**
             *
             */
            column(index) {
                var result = new Array(this.height);
                for (var i = 0; i < this.height; ++i) {
                    result[i] = this._data[index + this.height * i];
                }
                return result;
            }
            /**
             *
             */
            replaceLine(index, data) {
                index *= this.width;
                for (var i = 0; i < this.width; ++i) {
                    this._data[index + i] = data[i];
                }
            }
            /**
             * Getter of width
            * @return {number}  Value of width
             */
            get width() {
                return this._width;
            }
            /**
             * Getter of height
            * @return {number}  Value of height
             */
            get height() {
                return this._height;
            }
            /**
             * Getter of data
            * @return {Array<any>}  Value of data
             */
            get data() {
                return this._data;
            }
            /**
             * Setter of width
            * @param {number} width New value of width
             */
            set width(width) {
                this._width = width;
            }
            /**
             * Setter of height
            * @param {number} height New value of height
             */
            set height(height) {
                this._height = height;
            }
            /**
             * Setter of data
            * @param {Array<any>} data New value of data
             */
            set data(data) {
                this._data = data;
            }
        }
        Math.Matrix = Matrix;
    })(Math = ICad.Math || (ICad.Math = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Math;
    (function (Math) {
        var Color;
        (function (Color_1) {
            /**
             * Color
             */
            class Color {
                constructor(r, g, b) {
                    this._r = r || 0;
                    this._g = g || 0;
                    this._b = b || 0;
                }
                toString() {
                    return "#" + [
                        this._r.toString(16),
                        this._g.toString(16),
                        this._b.toString(16),
                    ]
                        .map(v => v.length == 1 ? '0' + v : v)
                        .join('');
                }
                fromString(value) {
                    if (value[0] == '#') {
                        this._r = parseInt(value.substr(1, 2), 16);
                        this._g = parseInt(value.substr(3, 2), 16);
                        this._b = parseInt(value.substr(5, 2), 16);
                    }
                }
                equal(color) {
                    return (color.r === this.r) && (color.g === this.g) && (color.b === this.b);
                }
                /**
                 * Getter of rgb
                * @return {number}  Value of rgb
                 */
                get r() {
                    return this._r;
                }
                /**
                 * Getter of rgb
                * @return {number}  Value of rgb
                 */
                get g() {
                    return this._g;
                }
                /**
                 * Getter of rgb
                * @return {number}  Value of rgb
                 */
                get b() {
                    return this._b;
                }
                /**
                 * Getter of rgb
                * @param {number} r New value of rgb
                 */
                set r(r) {
                    this._r = r % 255;
                }
                /**
                 * Getter of rgb
                * @param {number} g New value of rgb
                 */
                set g(g) {
                    this._g = g % 255;
                }
                /**
                 * Getter of rgb
                * @param {number} b New value of rgb
                 */
                set b(b) {
                    this._b = b % 255;
                }
            }
            Color_1.Color = Color;
        })(Color = Math.Color || (Math.Color = {}));
    })(Math = ICad.Math || (ICad.Math = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Math;
    (function (Math) {
        var Geometry;
        (function (Geometry) {
            /**
             * Point
             */
            class Point {
                constructor() {
                    /** */
                    this._x = null;
                    /** */
                    this._y = null;
                }
                distance(from) {
                    var dx = this.x - from._x;
                    var dy = this.y - from._y;
                    return window.Math.sqrt(dx * dx + dy * dy);
                }
                /**
                 * Getter of x
                * @return {number}  Value of x
                 */
                get x() {
                    return this._x;
                }
                /**
                 * Getter of y
                * @return {number}  Value of y
                 */
                get y() {
                    return this._y;
                }
                /**
                 * Setter of x
                * @param {number} x New value of x
                 */
                set x(x) {
                    this._x = x;
                }
                /**
                 * Setter of y
                * @param {number} y New value of y
                 */
                set y(y) {
                    this._y = y;
                }
            }
            Geometry.Point = Point;
        })(Geometry = Math.Geometry || (Math.Geometry = {}));
    })(Math = ICad.Math || (ICad.Math = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Math;
    (function (Math) {
        var Geometry;
        (function (Geometry) {
            /**
             * Rectangle
             */
            class Rectangle {
                constructor() {
                    /** */
                    this._topLeft = new ICad.Math.Geometry.Point();
                    /** */
                    this._bottomRight = new ICad.Math.Geometry.Point();
                }
                clone() {
                    var clone = new Rectangle();
                    clone._topLeft._x = this._topLeft._x;
                    clone._topLeft._y = this._topLeft._y;
                    clone._bottomRight._x = this._topLeft._x;
                    clone._bottomRight._y = this._topLeft._y;
                    return clone;
                }
                /**
                 * Getter of left
                * @return {number}  Value of left
                 */
                get left() {
                    return this.topLeft.x;
                }
                /**
                 * Getter of right
                * @return {number}  Value of right
                 */
                get right() {
                    return this._bottomRight.x;
                }
                /**
                 * Getter of top
                * @return {number}  Value of top
                 */
                get top() {
                    return this.topLeft.y;
                }
                /**
                 * Getter of bottom
                * @return {number}  Value of bottom
                 */
                get bottom() {
                    return this._bottomRight.y;
                }
                /**
                 * Getter of width
                * @return {number}  Value of width
                 */
                get width() {
                    return this.bottomRight.x - this.topLeft.x;
                }
                /**
                 * Getter of height
                * @return {number}  Value of height
                 */
                get height() {
                    return this.bottomRight.y - this.topLeft.y;
                }
                /**
                 *
                 */
                get area() {
                    return this.width * this.height;
                }
                /**
                 *
                 */
                get center() {
                    var p = new Geometry.Point();
                    p.x = this.x + (this.width / 2);
                    p.y = this.y + (this.height / 2);
                    return p;
                }
                /**
                 *
                 */
                get diagonal() {
                    return this._topLeft.distance(this.bottomRight);
                }
                /**
                 * Getter of x
                * @return {number}  Value of x
                 */
                get x() {
                    return this.topLeft.x;
                }
                /**
                 * Getter of y
                * @return {number}  Value of y
                 */
                get y() {
                    return this.topLeft.y;
                }
                /**
                 * Getter of topLeft
                * @return {ICad.Math.Geometry.Point}  Value of topLeft
                 */
                get topLeft() {
                    return this._topLeft;
                }
                /**
                 * Getter of bottomRight
                * @return {ICad.Math.Geometry.Point}  Value of bottomRight
                 */
                get bottomRight() {
                    return this._bottomRight;
                }
                /**
                 * Setter of left
                * @param {number} left New value of left
                 */
                set left(left) {
                    this.topLeft.x = left; //window.Math.min(left, this.bottomRight.x)
                }
                /**
                 * Setter of right
                * @param {number} right New value of right
                 */
                set right(right) {
                    this.bottomRight.x = right; //window.Math.max(right, this.topLeft.x)
                }
                /**
                 * Setter of top
                * @param {number} top New value of top
                 */
                set top(top) {
                    this.topLeft.y = top; //window.Math.min(top, this.bottomRight.y)
                }
                /**
                 * Setter of bottom
                * @param {number} bottom New value of bottom
                 */
                set bottom(bottom) {
                    this.bottomRight.y = bottom; //window.Math.max(bottom, this.topLeft.y)
                }
                /**
                 * Setter of width
                * @param {number} width New value of width
                 */
                set width(width) {
                    width = window.Math.max(width, 0);
                    this.bottomRight.x = this.topLeft.x + width;
                }
                /**
                 * Setter of height
                * @param {number} height New value of height
                 */
                set height(height) {
                    height = window.Math.max(height, 0);
                    this.bottomRight.y = this.topLeft.y + height;
                }
                /**
                 * Setter of x
                * @param {number} x New value of x
                 */
                set x(x) {
                    var width = this.width;
                    this.topLeft.x = x;
                    this.bottomRight.x = this.topLeft.x + width;
                }
                /**
                 * Setter of y
                * @param {number} y New value of y
                 */
                set y(y) {
                    var height = this.height;
                    this.topLeft.y = y;
                    this.bottomRight.y = this.topLeft.y + height;
                }
                /**
                 * Setter of topLeft
                * @param {ICad.Math.Geometry.Point} topLeft New value of topLeft
                 */
                set topLeft(topLeft) {
                    this._topLeft = topLeft;
                }
                /**
                 * Setter of bottomRight
                * @param {ICad.Math.Geometry.Point} bottomRight New value of bottomRight
                 */
                set bottomRight(bottomRight) {
                    this._bottomRight = bottomRight;
                }
            }
            Geometry.Rectangle = Rectangle;
        })(Geometry = Math.Geometry || (Math.Geometry = {}));
    })(Math = ICad.Math || (ICad.Math = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Math;
    (function (Math) {
        var Physics;
        (function (Physics) {
            /**
             * Inertia
             */
            class Inertia {
                constructor() {
                    this._duration = 1000;
                    this._value = 1;
                    this._start = new Date().getTime();
                }
                atTime(time) {
                    var diff = time - this._start;
                    var duration = this._duration;
                    if (diff < 0)
                        return this._value;
                    if (diff > duration)
                        return 0;
                    return this._value * ((duration - diff) / duration);
                }
            }
            Physics.Inertia = Inertia;
        })(Physics = Math.Physics || (Math.Physics = {}));
    })(Math = ICad.Math || (ICad.Math = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        /**
         * AbstractModel
         * @abstract
         */
        class AbstractModel {
            constructor() {
                this.uuid = ICad.Util.Unicity.uuid();
            }
            /**
             * Getter of uuid
            * @return {string}  Value of uuid
             */
            get uuid() {
                return this._uuid;
            }
            /**
             * Setter of uuid
            * @param {string} uuid New value of uuid
             */
            set uuid(uuid) {
                this._uuid = uuid;
            }
        }
        Model.AbstractModel = AbstractModel;
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        /**
         * AbstractModel
         * @abstract
         */
        class AbstractModelCollection {
        }
        Model.AbstractModelCollection = AbstractModelCollection;
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        /**
         * Directory
         */
        class Directory extends ICad.Model.AbstractModel {
            /**
             * Getter of name
            * @return {string}  Value of name
             */
            get name() {
                return this._name;
            }
            /**
             * Getter of projects
            * @return {Map<string, ICad.Model.Well.Project>}  Value of projects
             */
            get projects() {
                return this._projects;
            }
            /**
             * Setter of name
            * @param {string} name New value of name
             */
            set name(name) {
                this._name = name;
            }
            /**
             * Setter of projects
            * @param {Map<string, ICad.Model.Well.Project>} projects New value of projects
             */
            set projects(projects) {
                this._projects = projects;
            }
        }
        Model.Directory = Directory;
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Preference;
        (function (Preference) {
            class DisplayPreference extends ICad.Event.EventEmitter {
                constructor() {
                    super(...arguments);
                    this._min = 0;
                    this._max = 10;
                    this._colors = [
                        new ICad.Math.Color.Color(),
                        new ICad.Math.Color.Color(255, 255, 255)
                    ];
                }
                get min() {
                    return this._min;
                }
                get max() {
                    return this._max;
                }
                get colors() {
                    return this._colors;
                }
                set min(min) {
                    this.trigger('min.change', min);
                    this._min = min;
                }
                set max(max) {
                    this.trigger('max.change', max);
                    this._max = max;
                }
                set colors(colors) {
                    this.trigger('colors.change', colors);
                    this._colors = colors;
                }
            }
            Preference.DisplayPreference = DisplayPreference;
        })(Preference = Model.Preference || (Model.Preference = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Well;
        (function (Well) {
            /**
             * Borehole
             */
            class Borehole extends ICad.Model.AbstractModel {
                constructor() {
                    super(...arguments);
                    /** Logs contained by this borehole.
                     * key=log's uuid, value=log.*/
                    this._logs = new Map();
                }
                /**
                 * Getter of name
                * @return {string}  Value of name
                 */
                get name() {
                    return this._name;
                }
                /**
                 * Getter of logs
                * @return {Map<string, ICad.Model.Well.Log>}  Value of logs
                 */
                get logs() {
                    return this._logs;
                }
                /**
                 * Getter of project
                * @return {ICad.Model.Well.Project}  Value of project
                 */
                get project() {
                    return this._project;
                }
                /**
                 * Setter of name
                * @param {string} name New value of name
                 */
                set name(name) {
                    this._name = name;
                }
                /**
                 * Setter of logs
                * @param {Map<string, ICad.Model.Well.Log>} logs New value of logs
                 */
                set logs(logs) {
                    this._logs = logs;
                }
                /**
                 * Setter of project
                * @param {ICad.Model.Well.Project} project New value of project
                 */
                set project(project) {
                    this._project = project;
                }
            }
            Well.Borehole = Borehole;
        })(Well = Model.Well || (Model.Well = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Well;
        (function (Well) {
            /**
             * Log
             */
            class Log extends ICad.Model.AbstractModel {
                constructor() {
                    super(...arguments);
                    /** Unit of this log.*/
                    this._unit = '';
                    this._display = new Model.Preference.DisplayPreference();
                }
                /**
                 * Getter of name
                * @return {string}  Value of name
                 */
                get name() {
                    return this._name;
                }
                /**
                 * Getter of unit
                * @return {string}  Value of unit
                 */
                get unit() {
                    return this._unit;
                }
                /**
                 * Getter of traces
                * @return {TraceCollection}  Value of traces
                 */
                get traces() {
                    return this._traces;
                }
                /**
                 * Getter of borehole
                * @return {ICad.Model.Well.Borehole}  Value of borehole
                 */
                get borehole() {
                    return this._borehole;
                }
                /**
                 */
                get display() {
                    return this._display;
                }
                /**
                 * Setter of name
                * @param {string} name New value of name
                 */
                set name(name) {
                    this._name = name;
                }
                /**
                 * Setter of unit
                * @param {string} unit New value of unit
                 */
                set unit(unit) {
                    this._unit = unit;
                }
                /**
                 * Setter of traces
                * @param {TraceCollection} traces New value of traces
                 */
                set traces(traces) {
                    this._traces = traces;
                }
                /**
                 * Setter of borehole
                * @param {ICad.Model.Well.Borehole} borehole New value of borehole
                 */
                set borehole(borehole) {
                    this._borehole = borehole;
                }
                /**
                 */
                set display(display) {
                    this._display = display;
                }
            }
            Well.Log = Log;
        })(Well = Model.Well || (Model.Well = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Well;
        (function (Well) {
            /**
             * Log
             */
            class LogCollection extends ICad.Model.AbstractModelCollection {
                constructor() {
                    super();
                    this._logs = new Map();
                }
                add(log) {
                    this._logs.set(log.uuid, log);
                }
                withUUID(uuid) {
                    return this._logs.get(uuid);
                }
            }
            Well.LogCollection = LogCollection;
        })(Well = Model.Well || (Model.Well = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Well;
        (function (Well) {
            /**
             * Project
             */
            class Project extends ICad.Model.AbstractModel {
                constructor() {
                    super(...arguments);
                    /** Boreholes contained by this project.
                     * key=borehole's uuid, value=borehole.*/
                    this._boreholes = new Map();
                }
                /**
                 * Getter of name
                * @return {string}  Value of name
                 */
                get name() {
                    return this._name;
                }
                /**
                 * Getter of boreholes
                * @return {Map<string, ICad.Model.Well.Borehole>}  Value of boreholes
                 */
                get boreholes() {
                    return this._boreholes;
                }
                /**
                 * Getter of directory
                * @return {ICad.Model.Directory}  Value of directory
                 */
                get directory() {
                    return this._directory;
                }
                /**
                 * Setter of name
                * @param {string} name New value of name
                 */
                set name(name) {
                    this._name = name;
                }
                /**
                 * Setter of boreholes
                * @param {Map<string, ICad.Model.Well.Borehole>} boreholes New value of boreholes
                 */
                set boreholes(boreholes) {
                    this._boreholes = boreholes;
                }
                /**
                 * Setter of directory
                * @param {ICad.Model.Directory} directory New value of directory
                 */
                set directory(directory) {
                    this._directory = directory;
                }
            }
            Well.Project = Project;
        })(Well = Model.Well || (Model.Well = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Well;
        (function (Well) {
            /**
             * Trace
             */
            class Trace extends ICad.Model.AbstractModel {
                constructor(collection, index) {
                    super();
                    this._collection = collection;
                    this._index = index;
                }
                /**
                 * Getter of reference
                * @return {number}  Value of reference
                 */
                get reference() {
                    return this._collection._references[this._index];
                }
                /**
                 * Getter of data
                * @return {Array<any>}  Value of data
                 */
                get data() {
                    return this._collection._data.line(this._index);
                }
                /**
                 * Getter of log
                * @return {ICad.Model.Well.Log}  Value of log
                 */
                get log() {
                    return this._collection._log;
                }
                /**
                 * Setter of reference
                * @param {number} reference New value of reference
                 */
                set reference(reference) {
                    this._collection._references[this._index] = reference;
                }
                /**
                 * Setter of data
                * @param {Array<any>} data New value of data
                 */
                set data(data) {
                    this._collection._data.replaceLine(this._index, data);
                }
                /**
                 * Setter of log
                * @param {ICad.Model.Well.Log} log New value of log
                 */
                set log(log) {
                    throw 'trace log can\'t be changed';
                }
            }
            Well.Trace = Trace;
        })(Well = Model.Well || (Model.Well = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Model;
    (function (Model) {
        var Well;
        (function (Well) {
            /**
             * Trace
             */
            class TraceCollection extends ICad.Model.AbstractModelCollection {
                constructor() {
                    super(...arguments);
                    this._data = new ICad.Math.Matrix();
                    this._references = [];
                    this._log = null;
                    this._uuid = [];
                }
                add(model) {
                    throw 'Method add should be implemented';
                }
                /**
                 *
                 */
                withUUID(uuid) {
                    return null;
                }
                /**
                 *
                 */
                atReference(reference) {
                    /*
                    var index = this._references.findIndex(v=>v==reference)
                    if(index !== -1) return new Trace(this, index);
                    */
                    var diff = this._references.map(v => abs(v - reference));
                    var index = 0;
                    diff.forEach((v, i) => {
                        if (v < diff[index])
                            index = i;
                    });
                    /*
                    var a = index;
                    var b = index;
                    if(index == 0) b++;
                    else if(index == (diff.length-1)) b--;
                    else if(diff[index+1] > diff[index-1]) b--;
                    else b++;
        
                    var rf = this._references[a];
                    var rt = this._references[b];
                    */
                    var collection = new TraceCollection();
                    collection.data = new ICad.Math.Matrix();
                    collection.references = [reference];
                    collection.log = this.log;
                    collection.uuid = [null];
                    collection.data.data = this.data.line(index);
                    collection.data.width = this._data.width;
                    collection.data.height = this._data.height;
                    //collection.data.map((v, x)=>map(reference, rf, rt, this.data.at(x, a), this.data.at(x, b)));
                    return new Well.Trace(collection, 0);
                }
                get log() {
                    return this._log;
                }
                get data() {
                    return this._data;
                }
                get top() {
                    return this._references[0];
                }
                get bottom() {
                    return this._references[this._references.length - 1];
                }
                set data(data) {
                    this._data = data;
                }
                set references(references) {
                    this._references = references;
                }
                set log(log) {
                    this._log = log;
                }
                set uuid(uuid) {
                    this._uuid = uuid;
                }
            }
            Well.TraceCollection = TraceCollection;
        })(Well = Model.Well || (Model.Well = {}));
    })(Model = ICad.Model || (ICad.Model = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Storage;
    (function (Storage) {
        /**
         * AbstractStorage
         * @abstract
         */
        class AbstractStorage {
            /**
             * Getter of name
            * @return {string}  Value of name
             */
            get name() {
                return this._name;
            }
            /**
             * Setter of name
            * @param {string} name New value of name
             */
            set name(name) {
                this._name = name;
            }
        }
        Storage.AbstractStorage = AbstractStorage;
    })(Storage = ICad.Storage || (ICad.Storage = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Storage;
    (function (Storage) {
        /**
         * Factory
         */
        class Factory {
            /**
             *
             */
            constructor() {
                return null;
            }
            /**
             *
             */
            getFakeStorage() {
                return null;
            }
        }
        Storage.Factory = Factory;
    })(Storage = ICad.Storage || (ICad.Storage = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Storage;
    (function (Storage) {
        /**
         * FakeStorage
         */
        class FakeStorage extends ICad.Storage.AbstractStorage {
            /**
             *
            * @param {number | null} seed
             */
            constructor(seed) {
                super();
                this._promise = null;
                this._loading = false;
                this._loaded = false;
                this._loadedCount = 0;
                this.name = "Sample storage";
                var random = new ICad.Util.Random(1);
                this._project = new ICad.Model.Well.Project();
                this._project.uuid = ICad.Util.Unicity.uuid();
                this._project.name = 'project';
                this._boreholeA = new ICad.Model.Well.Borehole();
                this._boreholeA.uuid = ICad.Util.Unicity.uuid();
                this._boreholeA.name = 'borehole A';
                this._boreholeA._project = this._project;
                this._project._boreholes.set(this._boreholeA.uuid, this._boreholeA);
                this._boreholeB = new ICad.Model.Well.Borehole();
                this._boreholeB.uuid = ICad.Util.Unicity.uuid();
                this._boreholeB.name = 'borehole B';
                this._boreholeB._project = this._project;
                this._project._boreholes.set(this._boreholeB.uuid, this._boreholeB);
            }
            /**
             *
            * @param {ICad.Storage.Query} query
            * @return {Promise<Map<string, ICad.Model.Directory>>}
             */
            getDirectories(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    return null;
                });
            }
            /**
             *
            * @param {ICad.Storage.Query} query
            * @return {Promise<Map<string, ICad.Model.Well.Project>>}
             */
            getProjects(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Map([[this._project.uuid, this._project]]);
                });
            }
            /**
             *
            * @param {ICad.Storage.Query} query
            * @return {Promise<Map<string, ICad.Model.Well.Borehole>>}
             */
            getBoreholes(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Map([
                        [this._boreholeA.uuid, this._boreholeA],
                        [this._boreholeB.uuid, this._boreholeB]
                    ]);
                });
            }
            /**
             *
            * @param {ICad.Storage.Query} query
            * @return {Promise<Map<string, ICad.Model.Well.Log>>}
             */
            getLogs(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!query.filter.borehole ||
                        !(query.filter.borehole.uuid != this._boreholeA.uuid
                            || query.filter.borehole.uuid != this._boreholeB.uuid)) {
                        return;
                    }
                    var borehole = query.filter.borehole.uuid === this._boreholeA.uuid ? this._boreholeA : this._boreholeB;
                    if (!this._loaded) {
                        var that = this;
                        this._loading = true;
                        this._loaded = true;
                        this._promise = new Promise(resolver => {
                            var promises = [];
                            var urls = [
                                'http://localhost:5757/samples/3.csv',
                                'http://localhost:5757/samples/3.csv',
                                'http://localhost:5757/samples/3.csv',
                                'http://localhost:5757/samples/3.csv',
                                'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                //,'http://localhost:5757/samples/3.csv'
                                ////,'http://localhost:5757/samples/1.csv'
                                //,'http://localhost:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/3.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'http://10.1.2.105:5757/samples/1.csv'
                                //,'http://10.0.0.167:5757/samples/1.csv'
                                //,'../../samples/1.csv'
                                //,'../../samples/1.csv'
                                //,'../../samples/1.csv'
                                //,'../../samples/1.csv'
                                //,'../../samples/1.csv'
                            ];
                            for (var i = 0; i < urls.length; ++i) {
                                promises.push(this.loadLog(urls[i]));
                            }
                            Promise.all(promises).then(logs => {
                                that._loading = false;
                                resolver(borehole.logs);
                            });
                        });
                    }
                    return this._loading ? this._promise : borehole.logs;
                });
            }
            /**
             *
            * @param {ICad.Storage.Query} query
            * @return {Promise<Model.Well.TraceCollection>}
             */
            getTraces(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (query._filter.log && this._boreholeA.logs.has(query._filter.log.uuid)) {
                        return this._boreholeA.logs.get(query._filter.log.uuid).traces;
                    }
                    if (query._filter.log && this._boreholeB.logs.has(query._filter.log.uuid)) {
                        return this._boreholeB.logs.get(query._filter.log.uuid).traces;
                    }
                    return new ICad.Model.Well.TraceCollection();
                });
            }
            loadLog(url) {
                return __awaiter(this, void 0, void 0, function* () {
                    var that = this;
                    return new Promise(resolver => {
                        ICad.Util.Ajax.get(url).then(csv => {
                            var log = new ICad.Model.Well.Log();
                            log.uuid = ICad.Util.Unicity.uuid();
                            log.name = '#' + that._loadedCount + ' - ' + url.split('/').pop();
                            log.borehole = that._loadedCount % 2 ? that._boreholeA : that._boreholeB;
                            log.borehole.logs.set(log.uuid, log);
                            var lineSeparator = '\n';
                            var valueSeparator = ',';
                            var width = 0;
                            var height = 0;
                            for (var i = 0; i < csv.length && csv[i] != lineSeparator; ++i) {
                                if (csv[i] === valueSeparator)
                                    ++width;
                            }
                            for (var i = 0; i < csv.length; ++i) {
                                if (csv[i] === lineSeparator)
                                    ++height;
                            }
                            var length = width * height;
                            var data = new Array(length);
                            var uuid = new Array(height).fill(0).map(v => ICad.Util.Unicity.uuid());
                            var references = new Array(height);
                            var reference = true;
                            for (var i = 0, k = 0, j = 0, r = 0; i < csv.length; ++i) {
                                switch (csv[i]) {
                                    case lineSeparator:
                                    case valueSeparator:
                                        {
                                            var s = '';
                                            for (; k < i; ++k)
                                                s += csv[k];
                                            if (reference) {
                                                references[r] = parseFloat(s); // % 255
                                                ++r;
                                            }
                                            else {
                                                data[j] = parseFloat(s); // % 255
                                                ++j;
                                            }
                                            reference = csv[i] === lineSeparator;
                                        }
                                    case ' ':
                                        k = i + 1;
                                        break;
                                }
                            }
                            var collection = new ICad.Model.Well.TraceCollection();
                            collection._log = log;
                            collection._uuid = uuid;
                            collection._references = references;
                            collection._data.data = data;
                            collection._data.height = height;
                            collection._data.width = width;
                            log.traces = collection;
                            that._loadedCount++;
                            resolver();
                        });
                    });
                });
            }
        }
        Storage.FakeStorage = FakeStorage;
    })(Storage = ICad.Storage || (ICad.Storage = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Storage;
    (function (Storage) {
        /**
         * Query
         */
        class Query {
            constructor() {
                /** */
                this._fields = [];
                /** */
                this._filter = {};
                /** */
                this._sort = '';
                /** */
                this._limit = {};
            }
            /**
             * Getter of fields
            * @return {Array<string>}  Value of fields
             */
            get fields() {
                return this._fields;
            }
            /**
             * Getter of filter
            * @return {any}  Value of filter
             */
            get filter() {
                return this._filter;
            }
            /**
             * Getter of sort
            * @return {string}  Value of sort
             */
            get sort() {
                return this._sort;
            }
            /**
             * Getter of limit
            * @return {any}  Value of limit
             */
            get limit() {
                return this._limit;
            }
            /**
             * Getter of parent
            * @return {ICad.Model.AbstractModel}  Value of parent
             */
            get parent() {
                return this._parent;
            }
            /**
             * Setter of fields
            * @param {Array<string>} fields New value of fields
             */
            set fields(fields) {
                this._fields = fields;
            }
            /**
             * Setter of filter
            * @param {any} filter New value of filter
             */
            set filter(filter) {
                this._filter = filter;
            }
            /**
             * Setter of sort
            * @param {string} sort New value of sort
             */
            set sort(sort) {
                this._sort = sort;
            }
            /**
             * Setter of limit
            * @param {any} limit New value of limit
             */
            set limit(limit) {
                this._limit = limit;
            }
            /**
             * Setter of parent
            * @param {ICad.Model.AbstractModel} parent New value of parent
             */
            set parent(parent) {
                this._parent = parent;
            }
        }
        Storage.Query = Query;
    })(Storage = ICad.Storage || (ICad.Storage = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Storage;
    (function (Storage) {
        var StoreJS;
        (function (StoreJS) {
            /**
             * FakeStorage
             */
            class Rest extends ICad.Storage.AbstractStorage {
                /**
                 *
                * @param {number | null} seed
                 */
                constructor(url) {
                    super();
                    this._name = url; //"StoreJS [" + url.split('/').pop().split(':').shift() + "]";
                    this._ajax = new ICad.Network.Ajax(url);
                }
                /**
                 *
                * @param {ICad.Storage.Query} query
                * @return {Promise<Map<string, ICad.Model.Directory>>}
                 */
                getDirectories(query) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var names = yield this._ajax.get('/');
                        var result = new Map();
                        for (var i = 0; i < names.length; ++i) {
                            var directory = new ICad.Model.Directory();
                            directory.name = names[i];
                            result.set(directory.uuid, directory);
                        }
                        return result;
                    });
                }
                /**
                 *
                * @param {ICad.Storage.Query} query
                * @return {Promise<Map<string, ICad.Model.Well.Project>>}
                 */
                getProjects(query) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var result = new Map();
                        var directories = yield this.getDirectories(query);
                        var iterator = directories.entries();
                        for (var value of iterator) {
                            var directory = value[1];
                            var projects = yield this._ajax.get('/' + directory.name);
                            for (var i = 0; i < projects.length; ++i) {
                                var project = new ICad.Model.Well.Project();
                                project.name = projects[i];
                                project.directory = directory;
                                result.set(project.uuid, project);
                            }
                        }
                        return result;
                    });
                }
                /**
                 *
                * @param {ICad.Storage.Query} query
                * @return {Promise<Map<string, ICad.Model.Well.Borehole>>}
                 */
                getBoreholes(query) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var project = query.parent;
                        var names = yield this._ajax.get('/' + project.directory.name + '/' + project.name);
                        var result = new Map();
                        for (var i = 0; i < names.length; ++i) {
                            var borehole = new ICad.Model.Well.Borehole();
                            borehole.name = names[i];
                            borehole.project = project;
                            project.boreholes.set(borehole.uuid, borehole);
                            result.set(borehole.uuid, borehole);
                        }
                        return result;
                    });
                }
                /**
                 *
                * @param {ICad.Storage.Query} query
                * @return {Promise<Map<string, ICad.Model.Well.Log>>}
                 */
                getLogs(query) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var borehole = query.parent;
                        var names = yield this._ajax.get('/' + borehole.project.directory.name + '/' + borehole.project.name + '/' + borehole.name);
                        var result = new Map();
                        for (var i = 0; i < names.length; ++i) {
                            var log = new ICad.Model.Well.Log();
                            log.name = names[i];
                            log.borehole = borehole;
                            borehole.logs.set(log.uuid, log);
                            result.set(log.uuid, log);
                        }
                        return result;
                    });
                }
                /**
                 *
                * @param {ICad.Storage.Query} query
                * @return {Promise<Model.Well.TraceCollection>}
                 */
                getTraces(query) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var log = query.parent;
                        var result = new ICad.Model.Well.TraceCollection();
                        var infos = yield this._ajax.get('/' + log.borehole.project.directory.name + '/' + log.borehole.project.name + '/' + log.borehole.name + '/' + log.name);
                        var data = infos.data ? infos.data : [];
                        var height = data.length;
                        var width = data[0].length;
                        var matrix = new ICad.Math.Matrix();
                        var references = new Array();
                        matrix.allocate(width - 1, height);
                        var i = 0;
                        var _min = false;
                        var _max = false;
                        data.forEach(r => r.forEach((v, j) => {
                            if (j == 0)
                                references.push(parseFloat(v));
                            else {
                                if (v[0] == '#') {
                                    var color = new ICad.Math.Color.Color();
                                    color.fromString(v);
                                    matrix.data[i++] = color;
                                }
                                else {
                                    var data = parseFloat(v);
                                    matrix.data[i++] = data;
                                    _min = _min === false ? data : min(_min, data);
                                    _max = _max === false ? data : max(_max, data);
                                }
                            }
                        }));
                        result.data = matrix;
                        result.references = references;
                        result.uuid = new Array(matrix.height).fill(0).map(v => ICad.Util.Unicity.uuid());
                        result.log = log;
                        log.traces = result;
                        log.display.min = 0; //infos.min ? infos.min : false;
                        log.display.max = 0; //infos.max ? infos.max : false;
                        if (infos.min) {
                            log.display.min = infos.min;
                        }
                        else if (_min !== false) {
                            log.display.min = _min;
                        }
                        if (infos.max) {
                            log.display.max = infos.max;
                        }
                        else if (_max !== false) {
                            log.display.max = _max;
                        }
                        if (infos.colors) {
                            infos.colors.forEach((v, i) => {
                                var color = new ICad.Math.Color.Color();
                                color.fromString(v);
                                log.display.colors[i] = color;
                            });
                        }
                        return result;
                    });
                }
            }
            StoreJS.Rest = Rest;
        })(StoreJS = Storage.StoreJS || (Storage.StoreJS = {}));
    })(Storage = ICad.Storage || (ICad.Storage = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Util;
    (function (Util) {
        /**
         * Random
         */
        class Random {
            /**
             * Instanciate a new Random.
             * @param {number} seed? Seed to be used by this Random.
             * If not specified, it is set with a random number.
             */
            constructor(seed) {
                seed = window.Math.abs(seed || (window.Math.random() * 16807));
                seed = seed * 16807 % 2147483647;
                this.seed = seed;
            }
            /**
             * Build a random number and update the seed.
            * @return {number}  Random number depending of the current seed.
             */
            next() {
                return this._seed = this._seed * 16807 % 2147483647;
            }
            /**
             * Getter of seed
            * @return {number}  Value of seed
             */
            get seed() {
                return this._seed;
            }
            /**
             * Setter of seed
            * @param {number} seed New value of seed
             */
            set seed(seed) {
                this._seed = seed;
            }
        }
        Util.Random = Random;
    })(Util = ICad.Util || (ICad.Util = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Util;
    (function (Util) {
        /**
         * Unicity
         */
        class Unicity {
            /**
             * Generate an Universal Unique Identifier (UUID).
             *
             * @static
            * @return {string}  Generated UUID.
             */
            static uuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = window.Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        }
        Util.Unicity = Unicity;
    })(Util = ICad.Util || (ICad.Util = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Util;
    (function (Util) {
        class Keyboard extends ICad.Event.EventEmitter {
            /**
             *
             */
            constructor(app) {
                super();
                /** */
                this._keys = new Map();
                /** */
                this._map = new Map([
                    ['backspace', 8],
                    ['tab', 9],
                    ['enter', 13],
                    ['shift', 16],
                    ['ctrl', 17],
                    ['alt', 18],
                    ['pause/break', 19],
                    ['caps lock', 20],
                    ['escape', 27],
                    ['space', 32],
                    ['page up', 33],
                    ['page down', 34],
                    ['end', 35],
                    ['home', 36],
                    ['left arrow', 37],
                    ['up arrow', 38],
                    ['right arrow', 39],
                    ['down arrow', 40],
                    ['insert', 45],
                    ['delete', 46],
                    ['0', 48],
                    ['1', 49],
                    ['2', 50],
                    ['3', 51],
                    ['4', 52],
                    ['5', 53],
                    ['6', 54],
                    ['7', 55],
                    ['8', 56],
                    ['9', 57],
                    ['a', 65],
                    ['b', 66],
                    ['c', 67],
                    ['d', 68],
                    ['e', 69],
                    ['f', 70],
                    ['g', 71],
                    ['h', 72],
                    ['i', 73],
                    ['j', 74],
                    ['k', 75],
                    ['l', 76],
                    ['m', 77],
                    ['n', 78],
                    ['o', 79],
                    ['p', 80],
                    ['q', 81],
                    ['r', 82],
                    ['s', 83],
                    ['t', 84],
                    ['u', 85],
                    ['v', 86],
                    ['w', 87],
                    ['x', 88],
                    ['y', 89],
                    ['z', 90],
                    ['left window key', 91],
                    ['right window key', 92],
                    ['select key', 93],
                    ['numpad 0', 96],
                    ['numpad 1', 97],
                    ['numpad 2', 98],
                    ['numpad 3', 99],
                    ['numpad 4', 100],
                    ['numpad 5', 101],
                    ['numpad 6', 102],
                    ['numpad 7', 103],
                    ['numpad 8', 104],
                    ['numpad 9', 105],
                    ['multiply', 106],
                    ['add', 107],
                    ['subtract', 109],
                    ['decimal point', 110],
                    ['divide', 111],
                    ['f1', 112],
                    ['f2', 113],
                    ['f3', 114],
                    ['f4', 115],
                    ['f5', 116],
                    ['f6', 117],
                    ['f7', 118],
                    ['f8', 119],
                    ['f9', 120],
                    ['f10', 121],
                    ['f11', 122],
                    ['f12', 123],
                    ['num lock', 144],
                    ['scroll lock', 145],
                    ['semi-colon', 186],
                    ['equal sign', 187],
                    ['comma', 188],
                    ['dash', 189],
                    ['period', 190],
                    ['forward slash', 191],
                    ['grave accent', 192],
                    ['open bracket', 219],
                    ['back slash', 220],
                    ['close braket', 221],
                    ['single quote', 222]
                ]);
                this._app = app;
                var that = this;
                var root = this._app.viewFactory.root();
                root.on('keydown', function (e) {
                    that._keys.set(e.data.keyCode, true);
                    that.trigger('keydown');
                });
                root.on('keyup', function (e) {
                    that._keys.set(e.data.keyCode, false);
                    that.trigger('keydown');
                });
            }
            isDown(key) {
                if (!this._map.has(key))
                    return false;
                var k = this._map.get(key);
                return this._keys.has(k) && this._keys.get(k);
            }
        }
        Util.Keyboard = Keyboard;
    })(Util = ICad.Util || (ICad.Util = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Util;
    (function (Util) {
        class Ajax {
            /**
             *
             */
            static get(url, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return Ajax.query('GET', url, args);
                });
            }
            /**
             *
             */
            static post(url, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return Ajax.query('POST', url, args);
                });
            }
            /**
             *
             */
            static put(url, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return Ajax.query('PUT', url, args);
                });
            }
            /**
             *
             */
            static delete(url, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return Ajax.query('DELETE', url, args);
                });
            }
            /**
             *
             */
            static query(method, url, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    var promise = new Promise(function (resolver) {
                        var xhr = new XMLHttpRequest();
                        xhr.addEventListener('load', function () {
                            resolver(this.responseText);
                        });
                        xhr.open(method, url);
                        xhr.send();
                    });
                    return promise;
                });
            }
        }
        Util.Ajax = Ajax;
    })(Util = ICad.Util || (ICad.Util = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var Util;
    (function (Util) {
        /**
         * Unicity
         */
        class Text {
            /**
             *
             * @static
            * @return {string}  Generated UUID.
             */
            static formatNumber(n, precision) {
                var str = n + '';
                if (str.indexOf('.') === -1)
                    str += '.';
                str += '000000000000000000000000000000000000000000000';
                if (precision == 0)
                    return str.substr(0, str.indexOf('.'));
                return str.substr(0, str.indexOf('.') + precision + 1);
            }
        }
        Util.Text = Text;
    })(Util = ICad.Util || (ICad.Util = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        /**
         * AbstractFactory
         * @abstract
         */
        class AbstractFactory {
        }
        View.AbstractFactory = AbstractFactory;
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Button;
        (function (Button) {
            /**
             * ButtonDOM
             */
            class ButtonDOM extends ICad.View.DOM.DOMEmitter {
                /**
                 * Return its text surround by <p> tags.
                 */
                constructor() {
                    super();
                    this.updateTemplate();
                }
                /**
                 *
                 */
                updateTemplate() {
                    this.template = `<button>${this.text}</button>`;
                }
                /**
                 * Getter of text
                * @return {string}  Value of text
                 */
                get text() {
                    return this._text;
                }
                /**
                 * Setter of text
                * @param {string} text New value of text
                 */
                set text(text) {
                    this._text = text;
                    this.updateTemplate();
                    if (this.dom)
                        this.dom.innerHTML = text;
                }
            }
            Button.ButtonDOM = ButtonDOM;
        })(Button = View.Button || (View.Button = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var List;
        (function (List) {
            /**
             * ListDOM
             */
            class ListDOM extends ICad.View.DOM.DOM {
                constructor() {
                    super(...arguments);
                    this._template = '<ul></ul>';
                }
                /**
                 *
                * @param {ICad.View.List.ListItemInterface} item
                 */
                addItem(item) {
                    return null;
                }
            }
            List.ListDOM = ListDOM;
        })(List = View.List || (View.List = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var List;
        (function (List) {
            /**
             * ListItemDOM
             */
            class ListItemDOM extends ICad.View.DOM.DOM {
                constructor() {
                    super(...arguments);
                    this._template = '<li></li>';
                }
            }
            List.ListItemDOM = ListItemDOM;
        })(List = View.List || (View.List = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM) {
            /**
             * Body
             */
            class Body extends ICad.View.DOM.DOMEmitter {
                /**
                 * Instantiate a new Body.
                 * It will get the current existing body and set its dom with it.
                 */
                constructor() {
                    super();
                    this.dom = document.body;
                    this.bindEvents();
                }
                /**
                 * Call AbstractView render.
                 * The body is constant and shouldn't be rewrite.
                 */
                render() {
                    ICad.View.AbstractView.prototype.render.call(this);
                }
            }
            DOM.Body = Body;
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM) {
            /**
             * Canvas
             */
            class Canvas extends ICad.View.DOM.DOMEmitter {
                render() {
                    if (!this.dom) {
                        var that = this;
                        this.dom = document.createElement('canvas');
                        this.events.forEach((v, k) => { that.bindEvent(k, v); });
                    }
                    this.visible = this.visible;
                    this.classes = this.classes;
                    View.AbstractView.prototype.render.call(this);
                }
                update() {
                    super.update();
                    this.dom.style.transform = '';
                    this.dom.style.left = '';
                    this.dom.style.top = '';
                    this.dom.style.width = '';
                    this.dom.style.height = '';
                }
            }
            DOM.Canvas = Canvas;
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM) {
            var Canvas2D;
            (function (Canvas2D_1) {
                /**
                 * CanvasWebGL
                 */
                class Canvas2D extends ICad.View.DOM.Canvas {
                    constructor(resolution = 2) {
                        super();
                        this._autoclear = true;
                        this._resolution = resolution;
                    }
                    render() {
                        super.render();
                        this.update();
                    }
                    /**
                     * Render this canvas.
                     */
                    update() {
                        super.update();
                        var canvas = this.dom;
                        if (this.autoclear || canvas.width == 0 || canvas.height == 0) {
                            var width = canvas.offsetWidth * this._resolution;
                            var height = canvas.offsetHeight * this._resolution;
                            canvas.width = width;
                            canvas.height = height;
                        }
                        this.context = canvas.getContext('2d', { antialias: false });
                    }
                    clear() {
                        var canvas = this.dom;
                        canvas.width = canvas.width;
                        canvas.height = canvas.height;
                    }
                    /**
                     * Getter of context
                    * @return {CanvasRenderingContext2D}  Value of context
                     */
                    get context() {
                        return this._context;
                    }
                    /**
                     */
                    get autoclear() {
                        return this._autoclear;
                    }
                    /**
                     * Setter of context
                    * @param {CanvasRenderingContext2D} context New value of context
                     */
                    set context(context) {
                        this._context = context;
                    }
                    /**
                     */
                    set autoclear(autoclear) {
                        this._autoclear = autoclear;
                    }
                }
                Canvas2D_1.Canvas2D = Canvas2D;
            })(Canvas2D = DOM.Canvas2D || (DOM.Canvas2D = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class Buffer {
                    constructor() {
                        /** */
                        this._sizeOfItem = 1;
                        /** */
                        this._buffer = null;
                        /** */
                        this._length = 0;
                        this._position = false;
                    }
                    /**
                     *
                     */
                    bind(context, position) {
                        if (position < 0)
                            return;
                        if (this._context != context || !this._buffer) {
                            this._context = context;
                            this._buffer = context.createBuffer();
                            context.bindBuffer(context.ARRAY_BUFFER, this._buffer);
                            context.bufferData(context.ARRAY_BUFFER, this._data, context.STATIC_DRAW);
                            context.enableVertexAttribArray(position);
                            context.vertexAttribPointer(position, this.sizeOfItem, context.FLOAT, false, 0, 0);
                        }
                    }
                    buildData(data) {
                        this._data = new Float32Array(data);
                    }
                    /**
                     *
                     */
                    get data() {
                        throw 'Data can\'t  be getted';
                    }
                    /**
                     *
                     */
                    set data(data) {
                        if (this._buffer) {
                            this._context.deleteBuffer(this._buffer);
                            this._buffer = null;
                        }
                        this.buildData(data);
                        this._length = data.length;
                    }
                    /**
                     *
                     */
                    get sizeOfItem() {
                        return this._sizeOfItem;
                    }
                    /**
                     *
                     */
                    set sizeOfItem(sizeOfItem) {
                        this._sizeOfItem = sizeOfItem;
                    }
                }
                WebGL.Buffer = Buffer;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class Texture extends WebGL.Buffer {
                    constructor() {
                        super();
                        /** */
                        this._width = 0;
                        /** */
                        this._height = 0;
                        /** */
                        this._index = 0;
                        this._index = Texture._totalTexture;
                        Texture._totalTexture = (Texture._totalTexture + 1);
                    }
                    /**
                     *
                     */
                    bind(context, position) {
                        this._context = context;
                        this._buffer = context.createTexture();
                        context.pixelStorei(context.UNPACK_ALIGNMENT, 1);
                        context.activeTexture(context.TEXTURE0 + (this._index % Texture._maxIndex));
                        context.bindTexture(context.TEXTURE_2D, this._buffer);
                        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
                        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
                        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
                        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
                        const level = 0;
                        const internalFormat = this._format || context.RGB;
                        const width = this._width;
                        const height = this._height;
                        const border = 0;
                        const format = this._format || context.RGB;
                        const type = this._type || context.UNSIGNED_BYTE;
                        const data = this._data;
                        context.texImage2D(context.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
                        context.uniform1i(position, (this._index % Texture._maxIndex));
                    }
                    buildData(data) {
                        this._data = new Uint8Array(data);
                    }
                }
                /** */
                Texture._totalTexture = 0;
                /** */
                Texture._maxIndex = 8;
                WebGL.Texture = Texture;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class Program {
                    constructor() {
                        /** */
                        this._fragmentShaders = new Map();
                        /** */
                        this._vertexShaders = new Map();
                        this._programs = new Map();
                    }
                    /**
                     *
                     */
                    createFragmentShader(name, content) {
                        var shader = new WebGL.FragmentShader();
                        shader.content = content;
                        this._fragmentShaders.set(name, shader);
                    }
                    /**
                     *
                     */
                    createVertexShader(name, content) {
                        var shader = new WebGL.VertexShader();
                        shader.content = content;
                        this._vertexShaders.set(name, shader);
                    }
                    /**
                     *
                     */
                    fill(color) {
                        this.context.clearColor(color.r, color.g, color.b, 1);
                        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
                    }
                    /**
                     *
                     */
                    draw(vertexShaderName, fragmentShaderName, buffers, data, type) {
                        var gl = this.context;
                        var program;
                        type = type || gl.TRIANGLES;
                        if (!this._programs.has(gl)) {
                            var vertex = this._vertexShaders.get(vertexShaderName);
                            var fragment = this._fragmentShaders.get(fragmentShaderName);
                            program = gl.createProgram();
                            vertex.compile(this.context);
                            fragment.compile(this.context);
                            gl.attachShader(program, vertex._shader);
                            gl.attachShader(program, fragment._shader);
                            gl.linkProgram(program);
                            this._programs.set(gl, program);
                        }
                        else {
                            program = this._programs.get(gl);
                        }
                        this._context.useProgram(program);
                        /*
                        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                            console.error("Could not initialise shaders");
                            return
                        }
                        */
                        var length = 0;
                        buffers.forEach((buffer, name) => {
                            if (buffer._position === false) {
                                buffer._position = gl.getAttribLocation(program, name);
                            }
                            buffer.bind(gl, buffer._position);
                            length = buffer._length / buffer.sizeOfItem;
                        });
                        data.forEach((value, name) => {
                            var position = gl.getUniformLocation(program, name);
                            if (position) {
                                if (value instanceof WebGL.Texture) {
                                    value.bind(gl, position);
                                }
                                else if (Array.isArray(value)) {
                                    var ar = value;
                                    switch (ar.length) {
                                        case 1:
                                            gl.uniform1fv(position, ar);
                                            break;
                                        case 2:
                                            gl.uniform2fv(position, ar);
                                            break;
                                        case 3:
                                            gl.uniform3fv(position, ar);
                                            break;
                                        case 4:
                                            gl.uniform4fv(position, ar);
                                            break;
                                    }
                                }
                                else {
                                    gl.uniform1f(position, value);
                                }
                            }
                        });
                        gl.drawArrays(type, 0, length);
                    }
                    /**
                     * Getter of context
                    * @return {WebGLRenderingContext}  Value of context
                     */
                    get context() {
                        return this._context;
                    }
                    /**
                     * Setter of context
                    * @param {WebGLRenderingContext} context New value of context
                     */
                    set context(context) {
                        this._context = context;
                        /*
                                    if(!this.context.lastProgram && this.context.lastProgram !== program)
                                    {
                                        gl.useProgram(program)
                                        this.context.lastProgramt = program;
                                    }
                                    */
                    }
                }
                WebGL.Program = Program;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class Shader {
                    constructor() {
                        /** */
                        this._content = '';
                        /** */
                        this._shader = null;
                        /** */
                        this._context = null;
                    }
                    /**
                     * Getter of content
                    * @return {string}  Value of content
                     */
                    get content() {
                        return this._content;
                    }
                    /**
                     * Setter of content
                    * @param {string} content New value of content
                     */
                    set content(content) {
                        this._content = content;
                        this._shader = null;
                    }
                }
                WebGL.Shader = Shader;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class FragmentShader extends WebGL.Shader {
                    /**
                     *
                     */
                    compile(context) {
                        if (this._context != context || !this._shader) {
                            var shader = context.createShader(context.FRAGMENT_SHADER);
                            context.shaderSource(shader, this.content);
                            context.compileShader(shader);
                            if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
                                return null;
                            }
                            this._shader = shader;
                            this._context = context;
                        }
                    }
                }
                WebGL.FragmentShader = FragmentShader;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class VertexShader extends WebGL.Shader {
                    /**
                     *
                     */
                    compile(context) {
                        if (this._context != context || !this._shader) {
                            var shader = context.createShader(context.VERTEX_SHADER);
                            context.shaderSource(shader, this.content);
                            context.compileShader(shader);
                            if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
                                return null;
                            }
                            this._shader = shader;
                            this._context = context;
                        }
                    }
                }
                WebGL.VertexShader = VertexShader;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
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
                class CanvasWebGL extends ICad.View.DOM.Canvas {
                    render() {
                        super.render();
                        this.update();
                    }
                    /**
                     * Render this canvas.
                     */
                    update() {
                        super.update();
                        var canvas = this.dom;
                        if (canvas.width != canvas.offsetWidth || canvas.height != canvas.offsetHeight) {
                            canvas.width = canvas.offsetWidth;
                            canvas.height = canvas.offsetHeight;
                            this.context = null;
                        }
                        if (!this.context) {
                            var canvas = this.dom;
                            this.context = canvas.getContext('webgl', { antialias: false });
                            this.context.viewport(0, 0, canvas.width, canvas.height);
                        }
                    }
                    /**
                     * Getter of context
                    * @return {WebGLRenderingContext}  Value of context
                     */
                    get context() {
                        return this._context;
                    }
                    /**
                     * Setter of context
                    * @param {WebGLRenderingContext} context New value of context
                     */
                    set context(context) {
                        this._context = context;
                    }
                }
                WebGL.CanvasWebGL = CanvasWebGL;
            })(WebGL = DOM.WebGL || (DOM.WebGL = {}));
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var DOM;
        (function (DOM) {
            /**
             * Factory
             */
            class Factory extends ICad.View.AbstractFactory {
                /**
                 *
                * @return {ICad.View.DOM.Body}
                 */
                root() {
                    return new ICad.View.DOM.Body();
                }
                /**
                 *
                * @return {ICad.View.DOM.DOM}
                 */
                container() {
                    return new ICad.View.DOM.DOMEmitter();
                }
                /**
                 *
                * @param {string} text
                * @return {ICad.View.AbstractView}
                 */
                paragraph(text) {
                    var p = new ICad.View.Text.ParagraphDOM();
                    p.text = text;
                    return p;
                }
                /**
                 *
                * @param {string} text
                ,* @param {number} level
                * @return {ICad.View.AbstractView}
                 */
                title(text, level) {
                    var t = new ICad.View.Text.TitleDOM();
                    t.text = text;
                    t.level = level;
                    return t;
                }
                /**
                 *
                * @param {string} text
                * @return {ICad.View.AbstractView}
                 */
                button(text) {
                    var b = new ICad.View.Button.ButtonDOM();
                    b.text = text;
                    return b;
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                bitmap() {
                    return new ICad.View.Image.Bitmap.BitmapCanvasWebGL();
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                png() {
                    return new ICad.View.Image.Png.PngDOM();
                }
                /**
                 *
                 * @return {ICad.View.AbstractView}
                 */
                list() {
                    return new ICad.View.List.ListDOM();
                }
                /**
                 * @return {ICad.View.AbstractView}
                 */
                listItem() {
                    return new ICad.View.List.ListItemDOM();
                }
                /**
                * @return {ICad.View.AbstractView}
                 */
                traceHeatmap() {
                    return new View.Trace.HeatmapCanvasWebGL();
                }
                /**
                * @return {ICad.View.AbstractView}
                 */
                traceImage() {
                    return new View.Trace.ImageCanvasWebGL();
                }
                /**
                * @return {ICad.View.AbstractView}
                 */
                traceLines() {
                    return new View.Trace.LinesCanvas2D();
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                chartHistogram() {
                    return new View.Chart.ChartHistogramCanvas2D();
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                draw() {
                    return new DOM.Canvas2D.Canvas2D();
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                draw3D() {
                    return new DOM.WebGL.CanvasWebGL();
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                form() {
                    return new View.Form.FormDOM();
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                textfield(title, name, value = '') {
                    var result = new View.Form.Input.TextField.TextFieldDOM();
                    result.title = title;
                    result.name = name;
                    result.value = value;
                    return result;
                }
                /**
                 *
                * @return {ICad.View.AbstractView}
                 */
                colorpicker(title, name, value = new ICad.Math.Color.Color()) {
                    var result = new View.Form.Input.ColorPicker.ColorPickerDOM();
                    result.title = title;
                    result.name = name;
                    result.value = value;
                    return result;
                }
                /**
                 *
                 * @abstract
                * @return {ICad.View.AbstractView}
                 */
                ruler() {
                    return new View.Ruler.RulerVerticalCanvas2D();
                }
            }
            DOM.Factory = Factory;
        })(DOM = View.DOM || (View.DOM = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Image;
        (function (Image) {
            var Bitmap;
            (function (Bitmap) {
                /**
                 * BitmapCanvasWebGL
                 */
                class BitmapCanvasWebGL extends ICad.View.DOM.WebGL.CanvasWebGL {
                    constructor() {
                        super();
                        /** */
                        this._colors = new View.DOM.WebGL.Texture();
                        /** */
                        this._positions = new View.DOM.WebGL.Buffer();
                        /** */
                        this._program = new View.DOM.WebGL.Program();
                        this._program.createVertexShader('vertex', `
                attribute vec2 position;
                uniform float x;
                uniform float y;
                uniform float scale_x;
                uniform float scale_y;
                varying highp vec2 texturePosition;
                void main(void) {
                    gl_Position = vec4(position * vec2(scale_x, scale_y) + vec2(x, -y) , -1, 1);
                    texturePosition = position;
                }
            `);
                        this._program.createFragmentShader('fragment', `
                precision mediump float;
                varying highp vec2 texturePosition;
                uniform sampler2D texture;
                void main(void) {
                    gl_FragColor = texture2D(texture, texturePosition);

                }
            `);
                        this._positions.sizeOfItem = 2;
                        this._positions.data = [
                            0, 0,
                            0, 1,
                            1, 0,
                            1, 0,
                            1, 1,
                            0, 1,
                        ];
                    }
                    render() {
                        super.render();
                        var canvas = this.dom;
                        var buffers = new Map([
                            ['position', this._positions]
                        ]);
                        var width = this.position.width > 0 ? this.position.width : canvas.width;
                        var height = this.position.height > 0 ? this.position.height : canvas.height;
                        var scaleX = width / canvas.width * 2;
                        var scaleY = height / canvas.height * 2;
                        var x = this.position.x / canvas.width;
                        var y = this.position.y / canvas.height;
                        var data = new Map([
                            ['texture', this._colors],
                            ['x', (x * 2) - 1],
                            ['y', (y * 2) - 1],
                            ['scale_x', scaleX],
                            ['scale_y', -scaleY]
                        ]);
                        this._program.context = this.context;
                        this._program.draw('vertex', 'fragment', buffers, data);
                    }
                    /**
                     * Getter of pixels
                    * @return {ICad.Math.Matrix<ICad.Math.Color.Color>} pixels Value of pixels
                     */
                    get pixels() {
                        return this._pixels;
                    }
                    /**
                     * Setter of pixels
                    * @param {ICad.Math.Matrix<ICad.Math.Color.Color>} pixels New value of pixels
                     */
                    set pixels(pixels) {
                        var that = this;
                        this._pixels = pixels;
                        var colors = new Array(this.position.width * this.position.height * 3);
                        var i = 0;
                        this.pixels.forEach((v, x, y) => {
                            colors[i] = v.r;
                            colors[i + 1] = v.g;
                            colors[i + 2] = v.b;
                            i += 3;
                        });
                        this._colors.data = colors;
                        this._colors._width = this.pixels.width;
                        this._colors._height = this.pixels.height;
                    }
                }
                Bitmap.BitmapCanvasWebGL = BitmapCanvasWebGL;
            })(Bitmap = Image.Bitmap || (Image.Bitmap = {}));
        })(Image = View.Image || (View.Image = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Image;
        (function (Image) {
            var Png;
            (function (Png) {
                /**
                 * PngDOM
                 */
                class PngDOM extends ICad.View.DOM.DOMEmitter {
                    /**
                     *
                     */
                    constructor() {
                        super();
                        this.updateTemplate();
                    }
                    /**
                     *
                     */
                    updateTemplate() {
                        this.template = `<img src="${this.src}"/>`;
                    }
                    /**
                     * Getter of src
                    * @return {string}  Value of src
                     */
                    get src() {
                        return this._src;
                    }
                    /**
                     * Setter of src
                    * @param {string} src New value of src
                     */
                    set src(src) {
                        this._src = src;
                        this.updateTemplate();
                        if (this.dom)
                            this.dom.innerHTML = src;
                    }
                }
                Png.PngDOM = PngDOM;
            })(Png = Image.Png || (Image.Png = {}));
        })(Image = View.Image || (View.Image = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Trace;
        (function (Trace) {
            /**
             * BitmapCanvasWebGL
             */
            class HeatmapCanvasWebGL extends ICad.View.DOM.WebGL.CanvasWebGL {
                constructor() {
                    super();
                    /** */
                    this._colorFrom = new ICad.Math.Color.Color(255, 255, 255);
                    /** */
                    this._colorTo = new ICad.Math.Color.Color(0, 0, 0);
                    /** */
                    this._textures = []; //new  DOM.WebGL.Texture ()
                    /** */
                    this._positions = new View.DOM.WebGL.Buffer();
                    /** */
                    this._program = new View.DOM.WebGL.Program();
                    this._max = 0;
                    this._min = 0;
                    this._program.createVertexShader('vertex', `
                attribute vec2 position;
                uniform vec2 A;
                uniform vec2 B;
                varying highp vec2 texturePosition;
                void main(void) {
                    gl_Position = vec4(A + (position * B), -1, 1);
                    texturePosition = position;
                }
            `);
                    this._program.createFragmentShader('fragment', `
                precision mediump float;
                varying highp vec2 texturePosition;
                uniform sampler2D texture;
                uniform vec4 colorFrom;
                uniform vec4 colorTo;
                void main(void) {
                    vec4 textureValue = texture2D(texture, texturePosition);
                    float alpha = textureValue[3];
                    gl_FragColor =  colorTo + ((colorFrom - colorTo) * vec4(alpha, alpha, alpha, 1));

                }
            `);
                    this._program.createVertexShader('vertexClear', `
                attribute vec2 position;
                void main(void) {
                    gl_Position = vec4(vec2(1, -1) + (position * vec2(2, 2)), -1, 1);
                }
            `);
                    this._program.createFragmentShader('fragmentClear', `
                precision mediump float;
                void main(void) {
                    gl_FragColor = vec4(0,0,0,0);

                }
            `);
                    this._positions.sizeOfItem = 2;
                    this._positions.data = [
                        0, 0,
                        0, 1,
                        1, 0,
                        1, 0,
                        1, 1,
                        0, 1,
                    ];
                }
                update() {
                    if (!this.values)
                        return;
                    super.update();
                    this.renderInCanvas(this.dom, this.context, this.position);
                }
                renderHeader(header) {
                    var canvas = header;
                    var width = canvas.dom.width;
                    var gradient = canvas.context.createLinearGradient(0, 0, width, 0);
                    canvas.autoclear = false;
                    gradient.addColorStop(0, this.colorFrom.toString());
                    gradient.addColorStop(1, this.colorTo.toString());
                    canvas.context.fillStyle = gradient;
                    canvas.context.fillRect(0, 0, width, canvas.dom.height);
                }
                renderIn(container, position) {
                    if (!(container instanceof View.DOM.WebGL.CanvasWebGL))
                        return;
                    var canvas3D = container;
                    var canvas = canvas3D.dom;
                    var context = canvas3D.context;
                    this.renderInCanvas(canvas, context, position);
                }
                renderInCanvas(canvas, context, position) {
                    if (!canvas.parentElement)
                        return;
                    if (!this._textures)
                        this.buildTextures();
                    var buffers = new Map([
                        ['position', this._positions]
                    ]);
                    var program = this._program;
                    program.context = context;
                    var cw = canvas.width;
                    var ch = canvas.height;
                    var rw = 2 / cw;
                    var rh = 2 / ch;
                    var x = position.x;
                    var y = position.y;
                    var w = position.width > 0 ? position.width : canvas.width;
                    var rs = (position.height > 0 ? position.height : canvas.height) / this.values.height;
                    var rendered = 0;
                    var h = this._textures[0]._height * rs;
                    var colorFrom = [this.colorFrom.r / 255, this.colorFrom.g / 255, this.colorFrom.b / 255, 1];
                    var colorTo = [this.colorTo.r / 255, this.colorTo.g / 255, this.colorTo.b / 255, 1];
                    //this._textures.forEach((texture, i)=>{
                    for (var i = 0; i < this._textures.length && ((y + h) > 0); ++i) {
                        var h = this._textures[i]._height * rs;
                        if (y < ch) {
                            var A = [-1 + rw * x, 1 + -rh * y];
                            var B = [rw * w, -rh * h];
                            program.draw('vertex', 'fragment', buffers, new Map([
                                ['texture', this._textures[i]],
                                ['A', A],
                                ['B', B],
                                ['colorFrom', colorFrom],
                                ['colorTo', colorTo]
                            ]));
                            rendered++;
                        }
                        y += h;
                    }
                    //})
                    if (!rendered) {
                        program.draw('vertexClear', 'fragmentClear', buffers, new Map());
                    }
                }
                /**
                 *
                 */
                buildTextures() {
                    var totalHeight = this.values.height;
                    var sliceHeight = this.maxHeight;
                    var sliceWidth = this.values.width;
                    var sliceLength = sliceHeight * sliceWidth;
                    var sliceCount = window.Math.ceil(totalHeight / sliceHeight);
                    var ratio = 255 / (this._max - this._min);
                    var values = this.values.data.map(v => (v - this._min) * ratio);
                    this._textures = new Array(sliceCount).fill(0).map((v, k) => {
                        var texture = new View.DOM.WebGL.Texture();
                        var yFrom = k * sliceHeight;
                        var yTo = min(totalHeight, yFrom + sliceHeight);
                        var height = yTo - yFrom;
                        var iFrom = yFrom * sliceWidth;
                        var iTo = iFrom + sliceLength;
                        var length = iTo - iFrom;
                        texture._height = height;
                        texture._width = sliceWidth;
                        texture._type = this.context.UNSIGNED_BYTE;
                        texture._format = this.context.ALPHA;
                        texture.data = values.slice(iFrom, iTo);
                        return texture;
                    });
                }
                /**
                 *
                 */
                get colorFrom() {
                    return this._colorFrom;
                }
                /**
                 *
                 */
                get colorTo() {
                    return this._colorTo;
                }
                /**
                 *
                 */
                get values() {
                    return this._values;
                }
                /**
                 *
                 */
                get min() {
                    return this._min;
                }
                /**
                 *
                 */
                get max() {
                    return this._max;
                }
                /**
                 *
                 */
                get maxHeight() {
                    if (!this.context)
                        this.render();
                    return this.context.getParameter(this.context.MAX_TEXTURE_SIZE);
                }
                /**
                 *
                 */
                set colorFrom(colorFrom) {
                    this._colorFrom = colorFrom;
                }
                /**
                 *
                 */
                set colorTo(colorTo) {
                    this._colorTo = colorTo;
                }
                /**
                 *
                 */
                set values(values) {
                    this._values = values;
                    this._textures = null;
                }
                /**
                 *
                 */
                set min(min) {
                    this._textures = null;
                    this._min = min;
                }
                /**
                 *
                 */
                set max(max) {
                    this._textures = null;
                    this._max = max;
                }
                /**
                 *
                 */
                set maxHeight(maxHeight) {
                    throw 'maxHeight can\'t be setted';
                }
            }
            Trace.HeatmapCanvasWebGL = HeatmapCanvasWebGL;
        })(Trace = View.Trace || (View.Trace = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Trace;
        (function (Trace) {
            /**
             * BitmapCanvasWebGL
             */
            class LinesCanvas2D extends ICad.View.DOM.Canvas2D.Canvas2D {
                constructor() {
                    super(...arguments);
                    /** */
                    this._color = new ICad.Math.Color.Color(1, 1, 1);
                }
                update() {
                    if (!this.values)
                        return;
                    super.update();
                    this.renderInCanvas(this.dom, this.context, this.position);
                }
                renderHeader(header) {
                    var canvas = header;
                    canvas.autoclear = false;
                    canvas.context.fillStyle = this.color.toString();
                    canvas.context.fillRect(0, 0, canvas.dom.width, canvas.dom.height);
                }
                renderIn(container, position) {
                    if (!(container instanceof View.DOM.Canvas2D.Canvas2D))
                        return;
                    var canvas2D = container;
                    var canvas = canvas2D.dom;
                    var context = canvas2D.context;
                    this.renderInCanvas(canvas, context, position);
                }
                renderInCanvas(canvas, context, position) {
                    if (!this.values.height)
                        return;
                    var cw = canvas.width;
                    var ch = canvas.height;
                    var height = position.height ? (position.height * this._resolution) : ch;
                    var width = position.width ? (position.width * this._resolution) : cw;
                    var x = position.x ? (position.x * this._resolution) : 0;
                    var y = position.y ? (position.y * this._resolution) : 0;
                    var columnWidth = width / this.values.width;
                    context.strokeStyle = this.color.toString();
                    var firstY = max(1, round(map(0, y, y + height, 0, this.values.height))); //max(1, round(map(max(y, 0), y, y+height, 0, this.values.height)));
                    var lastY = firstY + round(map(ch, 0, height, 0, this.values.height)); // map(min(ch, y+height), y, y+height, 0, this.values.height);
                    var firstYM1 = firstY - 1;
                    for (var _x = 0; _x < this.values.width; ++_x) {
                        var dx = columnWidth * _x;
                        context.beginPath();
                        context.moveTo(dx + map(this.values.at(_x, 0), this._min, this._max, 0, columnWidth), y + map(firstYM1, 0, this.values.height, 0, height));
                        for (var _y = firstY; _y < this.values.height; ++_y) {
                            context.lineTo(dx + map(this.values.at(_x, _y), this._min, this._max, 0, columnWidth), y + map(_y, 0, this.values.height, 0, height));
                        }
                        context.stroke();
                        context.closePath();
                    }
                    /*
                    var cw = canvas.width
                    var ch = canvas.height
        
                    if(!this.values.height) return;
        
                    var height = position.height ? (position.height * this._resolution) : ch;
                    var columnWidth = (position.width ? (position.width * this._resolution) : cw) / this.values.width;
                    var ratio = columnWidth / (this._max-this._min)
        
        
                    var incY = (height / this.values.height) * this._resolution;
                    var dy = position.top * this._resolution;
                    var dx = position.left * this._resolution;
                    context.strokeStyle = this.color.toString();
        
                    var first = minmax(floor(-dy / incY), 0, this.values.height-1);
                    var last =  minmax(first + 1 + window.Math.floor(ch / incY), 0, this.values.height-1);
                    if(first < this.values.height)
                    {
                        for(var x=0; x<this.values.width; ++x)
                        {
                            var v = this.values.at(x, first)
                            var xc = x * columnWidth;
                            var tx = window.Math.round(xc + ((v-this._min) * ratio)) + dx;
                            var ty = window.Math.round(dy);
                            context.beginPath();
                            context.moveTo(tx, ty);
                            for(var y=first; y<=last; ++y)
                            {
                                var v = this.values.at(x, y)
                                var tx = window.Math.round(xc + ((v-this._min) * ratio)) + dx;
                                var ty = window.Math.round(y * incY + dy);
                                context.lineTo(tx, ty);
                            }
                            context.stroke();
                        }
                    }
                    */
                }
                /**
                 *
                 */
                get color() {
                    return this._color;
                }
                /**
                 *
                 */
                get values() {
                    return this._values;
                }
                /**
                 *
                 */
                get min() {
                    return this._min;
                }
                /**
                 *
                 */
                get max() {
                    return this._max;
                }
                /**
                 *
                 */
                set color(color) {
                    this._color = color;
                }
                /**
                 *
                 */
                set values(values) {
                    this._values = values;
                }
                /**
                 *
                 */
                set min(min) {
                    this._min = min;
                }
                /**
                 *
                 */
                set max(max) {
                    this._max = max;
                }
            }
            Trace.LinesCanvas2D = LinesCanvas2D;
        })(Trace = View.Trace || (View.Trace = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Trace;
        (function (Trace) {
            /**
             * BitmapCanvasWebGL
             */
            class ImageCanvasWebGL extends ICad.View.DOM.WebGL.CanvasWebGL {
                constructor() {
                    super();
                    /** */
                    this._textures = []; //new  DOM.WebGL.Texture ()
                    /** */
                    this._positions = new View.DOM.WebGL.Buffer();
                    /** */
                    this._program = new View.DOM.WebGL.Program();
                    this._program.createVertexShader('vertex', `
                attribute vec2 position;
                uniform vec2 A;
                uniform vec2 B;
                varying highp vec2 texturePosition;
                void main(void) {
                    gl_Position = vec4(A + (position * B), -1, 1);
                    texturePosition = position;
                }
            `);
                    this._program.createFragmentShader('fragment', `
                precision mediump float;
                varying highp vec2 texturePosition;
                uniform sampler2D texture;
                void main(void) {
                    gl_FragColor =  texture2D(texture, texturePosition);

                }
            `);
                    this._program.createVertexShader('vertexClear', `
                attribute vec2 position;
                void main(void) {
                    gl_Position = vec4(vec2(1, -1) + (position * vec2(2, 2)), -1, 1);
                }
            `);
                    this._program.createFragmentShader('fragmentClear', `
                precision mediump float;
                void main(void) {
                    gl_FragColor = vec4(0,0,0,0);

                }
            `);
                    this._positions.sizeOfItem = 2;
                    this._positions.data = [
                        0, 0,
                        0, 1,
                        1, 0,
                        1, 0,
                        1, 1,
                        0, 1,
                    ];
                }
                update() {
                    if (!this.values)
                        return;
                    super.update();
                    this.renderInCanvas(this.dom, this.context, this.position);
                }
                renderHeader(header) {
                }
                renderIn(container, position) {
                    if (!(container instanceof View.DOM.WebGL.CanvasWebGL))
                        return;
                    var canvas3D = container;
                    var canvas = canvas3D.dom;
                    var context = canvas3D.context;
                    this.renderInCanvas(canvas, context, position);
                }
                renderInCanvas(canvas, context, position) {
                    if (!this._textures)
                        this.buildTextures();
                    var buffers = new Map([
                        ['position', this._positions]
                    ]);
                    var program = this._program;
                    program.context = context;
                    var cw = canvas.width;
                    var ch = canvas.height;
                    var rw = 2 / cw;
                    var rh = 2 / ch;
                    var x = position.x;
                    var y = position.y;
                    var w = position.width > 0 ? position.width : canvas.width;
                    var rs = (position.height > 0 ? position.height : canvas.height) / this.values.height;
                    var rendered = 0;
                    var h = this._textures[0]._height * rs;
                    for (var i = 0; i < this._textures.length && ((y + h) > 0); ++i) {
                        var h = this._textures[i]._height * rs;
                        if (y < ch) {
                            var A = [-1 + rw * x, 1 + -rh * y];
                            var B = [rw * w, -rh * h];
                            program.draw('vertex', 'fragment', buffers, new Map([
                                ['texture', this._textures[i]],
                                ['A', A],
                                ['B', B],
                            ]));
                            rendered++;
                        }
                        y += h;
                    }
                    if (!rendered) {
                        program.draw('vertexClear', 'fragmentClear', buffers, new Map());
                    }
                }
                /**
                 *
                 */
                buildTextures() {
                    var totalHeight = this.values.height;
                    var sliceHeight = this.maxHeight;
                    var sliceWidth = this.values.width * 3;
                    var sliceLength = sliceHeight * sliceWidth;
                    var sliceCount = window.Math.ceil(totalHeight / sliceHeight);
                    var that = this;
                    this._textures = new Array(sliceCount).fill(0).map((v, k) => {
                        var texture = new View.DOM.WebGL.Texture();
                        var yFrom = k * sliceHeight;
                        var yTo = min(totalHeight, yFrom + sliceHeight);
                        var height = yTo - yFrom;
                        var iFrom = yFrom * this.values.width;
                        var iTo = iFrom + height * this.values.width;
                        var values = new Array(height * sliceWidth);
                        for (var i = iFrom, j = 0; i < iTo; ++i, j += 3) {
                            values[j] = this.values._data[i].r;
                            values[j + 1] = this.values._data[i].g;
                            values[j + 2] = this.values._data[i].b;
                        }
                        texture._width = this.values.width;
                        texture._height = height;
                        texture._type = that.context.UNSIGNED_BYTE;
                        texture._format = that.context.RGB;
                        texture.data = values;
                        return texture;
                    });
                }
                /**
                 *
                 */
                get values() {
                    return this._values;
                }
                get maxHeight() {
                    if (!this.context)
                        this.render();
                    return this.context.getParameter(this.context.MAX_TEXTURE_SIZE);
                }
                /**
                 *
                 */
                set values(values) {
                    this._values = values;
                    this._textures = null;
                }
            }
            Trace.ImageCanvasWebGL = ImageCanvasWebGL;
        })(Trace = View.Trace || (View.Trace = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Text;
        (function (Text) {
            /**
             * ParagraphDOM
             */
            class ParagraphDOM extends ICad.View.DOM.DOMEmitter {
                /**
                 * Return its text surround by <p> tags.
                 */
                constructor() {
                    super();
                    /** */
                    this._text = "";
                    this.updateTemplate();
                }
                /**
                 *
                 */
                updateTemplate() {
                    this.template = `<p>${this.text}</p>`;
                }
                render() {
                    if (!this.dom) {
                        super.render();
                    }
                    else {
                        this.dom.innerHTML = this.text;
                    }
                }
                /**
                 * Getter of text
                * @return {string}  Value of text
                 */
                get text() {
                    return this._text;
                }
                /**
                 * Setter of text
                * @param {string} text New value of text
                 */
                set text(text) {
                    this._text = text;
                    this.updateTemplate();
                    if (this.dom)
                        this.dom.innerHTML = text;
                }
            }
            Text.ParagraphDOM = ParagraphDOM;
        })(Text = View.Text || (View.Text = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Text;
        (function (Text) {
            /**
             * TitleDOM
             */
            class TitleDOM extends ICad.View.DOM.DOM {
                /**
                 * Return its text surround by <hlevel> tags.
                 */
                constructor() {
                    super();
                    /** */
                    this._level = 1;
                    /** */
                    this._text = "";
                    this.updateTemplate();
                }
                /**
                 *
                 */
                updateTemplate() {
                    this.template = `<h${this.level}>${this.text}</h${this.level}>`;
                }
                /**
                 * Getter of level
                * @return {number}  Value of level
                 */
                get level() {
                    return this._level;
                }
                /**
                 * Setter of level
                * @param {number} level New value of level
                 */
                set level(level) {
                    this._level = level;
                    this.updateTemplate();
                    this.render();
                }
                /**
                 * Getter of text
                * @return {string}  Value of text
                 */
                get text() {
                    return this._text;
                }
                /**
                 * Setter of text
                * @param {string} text New value of text
                 */
                set text(text) {
                    this._text = text;
                    this.updateTemplate();
                    if (this.dom)
                        this.dom.innerHTML = text;
                }
            }
            Text.TitleDOM = TitleDOM;
        })(Text = View.Text || (View.Text = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Chart;
        (function (Chart) {
            /**
             * ChartInterface
             */
            class ChartHistogramCanvas2D extends ICad.View.DOM.Canvas2D.Canvas2D {
                constructor() {
                    super();
                    this._color = new ICad.Math.Color.Color(255, 255, 255);
                    /** */
                    this._data = [];
                    this.axis = new ICad.Math.Geometry.Rectangle();
                    this._background = true;
                }
                update() {
                    super.update();
                    var x, y, i;
                    var context = this.context;
                    var canvas = this.dom;
                    var cw = canvas.width;
                    var ch = canvas.height;
                    context.strokeStyle = this.color.toString();
                    context.fillStyle = 'rgba(255,255,255,0.1)';
                    context.lineWidth = 2;
                    context.beginPath();
                    context.moveTo(0, ch);
                    var dfx = (this.axis.right - this.axis.left);
                    var rx = cw / dfx;
                    var dfy = (this.axis.bottom - this.axis.top);
                    var ry = ch / dfy;
                    for (i = 0; i < this.data.length; ++i) {
                        x = (i - this.axis.left) * rx;
                        y = (this.data[i] - this.axis.top) * ry; //map(this.data[i], this.axis.top, this.axis.bottom,ch,0);
                        context.lineTo(x, y);
                    }
                    context.lineTo(cw, y);
                    context.stroke();
                    if (this.background) {
                        context.beginPath();
                        context.fillStyle = 'rgba(255,255,255,0.2)';
                        for (i = 1; i < 4; ++i) {
                            x = map(i, 0, 4, 0, cw - 1);
                            y = map(i, 0, 4, 0, ch - 1);
                            context.rect(x, 0, 1, ch);
                            context.rect(0, y, cw, 1);
                        }
                        context.fill();
                    }
                }
                get data() {
                    return this._data;
                }
                get color() {
                    return this._color;
                }
                get background() {
                    return this._background;
                }
                set data(data) {
                    this._data = data;
                }
                set color(color) {
                    this._color = color;
                }
                set background(background) {
                    this._background = background;
                }
            }
            Chart.ChartHistogramCanvas2D = ChartHistogramCanvas2D;
        })(Chart = View.Chart || (View.Chart = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Form;
        (function (Form) {
            class FormDOM extends View.DOM.DOMEmitter {
                constructor() {
                    super(...arguments);
                    this._template = '<form></form>';
                }
                submit() {
                    this.trigger('submit');
                }
            }
            Form.FormDOM = FormDOM;
        })(Form = View.Form || (View.Form = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Form;
        (function (Form) {
            var Input;
            (function (Input) {
                var ColorPicker;
                (function (ColorPicker) {
                    class ColorPickerDOM extends View.DOM.DOMEmitter {
                        constructor() {
                            super();
                            this._focus = false;
                            this.updateTemplate();
                        }
                        update() {
                            super.update();
                            if (this.dom) {
                                // Retreive dom element and register events
                                var inputs = this.dom.getElementsByTagName('input');
                                if (inputs.length) {
                                    this._input = inputs[0];
                                    this._input.value = this._value.toString();
                                    this._input.onkeyup = e => {
                                        var color = new ICad.Math.Color.Color();
                                        color.fromString(e.srcElement.value);
                                        this.value = color;
                                    };
                                    this._input.onfocus = e => {
                                        this.trigger('focus-in', this._value);
                                        this._focus = true;
                                    };
                                    this._input.onblur = e => {
                                        this.trigger('focus-out', this._value);
                                        this._focus = false;
                                    };
                                    
                                }
                                var divs = this.dom.getElementsByClassName('input-preview');
                                if (divs.length) {
                                    this._preview = divs[0];
                                    this._preview.style.background = this._value.toString();
                                }
                            }
                        }
                        updateTemplate() {
                            if (this.value)
                                var color = this.value.toString();
                            else
                                var color = '';
                            this.template = `
            <div>
                <div class="input input-color">
                    <div class="input-label">${this._title}</div>
                    <div class="input-field"> 
                        <input name="${this._name}" value="${color}">
                        <div class="input-preview" style="background:${color}">
                    </div>
                    </div> 
                </div>
            </div>`;
                        }
                        focus() {
                            this._input.focus();
                        }
                        get title() {
                            return this._title;
                        }
                        get name() {
                            return this._name;
                        }
                        get value() {
                            return this._value;
                        }
                        get colors() {
                            return this._colors;
                        }
                        set title(title) {
                            this._title = title;
                            this.updateTemplate();
                            this.invalidate();
                        }
                        set name(name) {
                            this._name = name;
                            this.updateTemplate();
                            this.invalidate();
                        }
                        set value(value) {
                            this._value = value;
                            this.trigger('change', this._value);
                            if (this._input && !this._focus) {
                                this._input.value = this._value.toString();
                            }
                            if (this._preview) {
                                this._preview.style.background = this._value.toString();
                            }
                        }
                        set colors(colors) {
                            this._colors = colors;
                            this.updateTemplate();
                            this.invalidate();
                        }
                    }
                    ColorPicker.ColorPickerDOM = ColorPickerDOM;
                })(ColorPicker = Input.ColorPicker || (Input.ColorPicker = {}));
            })(Input = Form.Input || (Form.Input = {}));
        })(Form = View.Form || (View.Form = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Form;
        (function (Form) {
            var Input;
            (function (Input) {
                var TextField;
                (function (TextField) {
                    class TextFieldDOM extends View.DOM.DOMEmitter {
                        constructor() {
                            super();
                            this._focus = false;
                            this.updateTemplate();
                        }
                        update() {
                            super.update();
                            if (this.dom) {
                                // Retreive dom element and register events
                                var inputs = this.dom.getElementsByTagName('input');
                                if (inputs.length) {
                                    this._input = inputs[0];
                                    this._input.value = this._value;
                                    this._input.onkeyup = e => { this.value = e.srcElement.value; };
                                    this._input.onfocus = e => {
                                        this.trigger('focus-in', this._value);
                                        this._focus = true;
                                    };
                                    this._input.onblur = e => {
                                        this.trigger('focus-out', this._value);
                                        this._focus = false;
                                    };
                                }
                            }
                        }
                        updateTemplate() {
                            this.template = `
            <div>
                <div class="input input-text">
                    ` + (this._title ? `<div class="input-label">${this._title}</div>` : '') + `
                    <div class="input-field"> 
                        <input type="text" name="${this._name}" value="${this._value}">
                    </div>
                </div>
            </div>`;
                        }
                        focus() {
                            this._input.focus();
                        }
                        get title() {
                            return this._title;
                        }
                        get name() {
                            return this._name;
                        }
                        get value() {
                            return this._value;
                        }
                        get pattern() {
                            return this._pattern;
                        }
                        set title(title) {
                            this._title = title;
                            this.updateTemplate();
                            this.invalidate();
                        }
                        set name(name) {
                            this._name = name;
                            this.updateTemplate();
                            this.invalidate();
                        }
                        set value(value) {
                            this._value = value;
                            this.trigger('change', this._value);
                            if (this._input && !this._focus) {
                                this._input.value = value;
                            }
                        }
                        set pattern(pattern) {
                            this._pattern = pattern;
                        }
                    }
                    TextField.TextFieldDOM = TextFieldDOM;
                })(TextField = Input.TextField || (Input.TextField = {}));
            })(Input = Form.Input || (Form.Input = {}));
        })(Form = View.Form || (View.Form = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
var ICad;
(function (ICad) {
    var View;
    (function (View) {
        var Ruler;
        (function (Ruler) {
            /**
             * BitmapCanvasWebGL
             */
            class RulerVerticalCanvas2D extends View.DOM.Canvas2D.Canvas2D {
                constructor() {
                    super(...arguments);
                    /** */
                    this._reference = 0;
                    /** */
                    this._spacing = 100;
                    /** */
                    this._increment = 100;
                    /** */
                    this._vertical = true;
                }
                update() {
                    super.update();
                    this.renderVertical();
                }
                renderVertical() {
                    var resolution = 2;
                    var canvas = this.dom;
                    var ctx = this.context;
                    var width = canvas.width;
                    var height = canvas.height;
                    var spacing = this.spacing * resolution;
                    var reference = this.reference;
                    var increment = this.increment;
                    var precision = window.Math.pow(10, 1);
                    var count = window.Math.ceil(height / spacing);
                    var lineWidth = width / 5;
                    // Clear
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, width, height);
                    // Text
                    ctx.fillStyle = '#767676';
                    ctx.font = '24px Fira Code, sans-serif';
                    ctx.textAlign = "center";
                    var baseValue = window.Math.floor(this.reference / increment) * increment;
                    var positionReference = height / 2;
                    var positionBase = positionReference - (((reference - baseValue) / increment) * spacing);
                    var dy = positionBase - positionReference;
                    baseValue -= (count / 2) * increment;
                    for (var i = 0; i <= count; ++i) {
                        var y = i * spacing + dy;
                        var text = (window.Math.floor((baseValue + i * increment) * precision) / precision) + '';
                        ctx.save();
                        ctx.translate((width / 2) + 8, y);
                        ctx.rotate(-window.Math.PI / 2);
                        ctx.fillText(text, 0, 0);
                        ctx.restore();
                    }
                    ctx.fillStyle = '#D5D5D5';
                    for (var i = 0; i <= count; ++i) {
                        var y = i * spacing + dy;
                        ctx.fillRect(0, y, lineWidth, 2);
                        ctx.fillRect(width - lineWidth, y, lineWidth, 2);
                    }
                }
                /**
                 *
                 */
                get reference() {
                    return this._reference;
                }
                /**
                 *
                 */
                get spacing() {
                    return this._spacing;
                }
                /**
                 *
                 */
                get increment() {
                    return this._increment;
                }
                /**
                 *
                 */
                get vertical() {
                    return this._vertical;
                }
                /**
                 *
                 */
                get horizontal() {
                    return !this._vertical;
                }
                /**
                 *
                 */
                set reference(reference) {
                    this._reference = reference;
                }
                /**
                 *
                 */
                set spacing(spacing) {
                    this._spacing = spacing;
                }
                /**
                 *
                 */
                set increment(increment) {
                    this._increment = increment;
                }
                /**
                 *
                 */
                set vertical(vertical) {
                    this._vertical = vertical;
                }
                /**
                 *
                 */
                set horizontal(horizontal) {
                    this._vertical = !horizontal;
                }
            }
            Ruler.RulerVerticalCanvas2D = RulerVerticalCanvas2D;
        })(Ruler = View.Ruler || (View.Ruler = {}));
    })(View = ICad.View || (ICad.View = {}));
})(ICad || (ICad = {}));
