namespace ICad.Controller.Model.Well.Project
{
    /**
     * ProjectFrameCtrl
     */
    export class ProjectPreviewCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        constructor(app : ICad.Application.AbstractApplication, frame: ProjectFrameCtrl)
        {
            super(app);
        }
        render()
        {
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

            this._draw3D.on('click', e => {
                var reference = map(e.data.offsetY, 0, this._draw3D.offsetPosition.height, this._top, this._bottom)
                this.trigger('project-reference-change', reference)
            })

            var registration;
            this._draw3D.on('mousedown', e => {
                registration =  this._draw3D.on('mousemove', e => {
                    var reference = map(e.data.offsetY, 0, this._draw3D.offsetPosition.height, this._top, this._bottom)
                    this.trigger('project-reference-change', reference)
                })
            })

            this.app.container.on('mouseup', e => {
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
        get model() : ICad.Model.AbstractModel
        {
            return this._model
        }

        /**
         * 
        * @param {ICad.Model.AbstractModel} model 
         */
        set model(model : ICad.Model.AbstractModel)
        {
            super.model = model;
            this.render()

        }
    }
}
