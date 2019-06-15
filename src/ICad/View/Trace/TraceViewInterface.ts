namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export interface TraceViewInterface
    {
        renderHeader(header : AbstractView);
        renderIn(container : AbstractView, position : Math.Geometry.Rectangle);
    }
}
