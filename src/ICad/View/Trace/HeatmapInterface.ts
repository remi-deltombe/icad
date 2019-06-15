namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export interface HeatmapInterface extends TraceViewInterface
    {
        colorFrom : Math.Color.Color
        colorTo : Math.Color.Color
        values : Math.Matrix<number>
        maxHeight : number
        max : number
        min : number
    }
}
