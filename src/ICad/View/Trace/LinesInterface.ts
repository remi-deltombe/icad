namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export interface LinesInterface extends TraceViewInterface
    {
        color : Math.Color.Color
        values : Math.Matrix<number>
        min : number
        max : number
    }
}
