namespace ICad.View.Chart
{
    /**
     * ChartInterface
     */
    export interface ChartInterface
    {
        color : Math.Color.Color
        
        /** */
        data : Array<number>

        axis : ICad.Math.Geometry.Rectangle

        background : boolean
    }
}
