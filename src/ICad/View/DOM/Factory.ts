namespace ICad.View.DOM
{
    /**
     * Factory
     */
    export class Factory extends ICad.View.AbstractFactory
    {
        /**
         * 
        * @return {ICad.View.DOM.Body}  
         */
        root() : ICad.View.DOM.Body
        {
            return new ICad.View.DOM.Body();
        }
        
        /**
         * 
        * @return {ICad.View.DOM.DOM}  
         */
        container() : ICad.View.DOM.DOM
        {
            return new ICad.View.DOM.DOMEmitter();
        }
        
        /**
         * 
        * @param {string} text 
        * @return {ICad.View.AbstractView}  
         */
        paragraph(text : string) : ICad.View.AbstractView
        {
            var p =new ICad.View.Text.ParagraphDOM();
            p.text = text;
            return p;
        }
        
        /**
         * 
        * @param {string} text 
        ,* @param {number} level 
        * @return {ICad.View.AbstractView}  
         */
        title(text : string, level : number) : ICad.View.AbstractView
        {
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
        button(text : string) : ICad.View.AbstractView
        {
            var b = new ICad.View.Button.ButtonDOM();
            b.text = text;
            return b;
        }
        
        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
        bitmap() : ICad.View.AbstractView
        {
            return new ICad.View.Image.Bitmap.BitmapCanvasWebGL();
        }
        
        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
        png() : ICad.View.AbstractView
        {
            return new ICad.View.Image.Png.PngDOM();
        }

        /**
         * 
         * @return {ICad.View.AbstractView}  
         */
        list() : ICad.View.AbstractView
        {
            return new ICad.View.List.ListDOM();
        }
        
        /**
         * @return {ICad.View.AbstractView}  
         */
        listItem() : ICad.View.AbstractView
        {
            return new ICad.View.List.ListItemDOM();
        }

        /**
        * @return {ICad.View.AbstractView}  
         */
        traceHeatmap() : ICad.View.AbstractView
        {
            return new Trace.HeatmapCanvasWebGL();
        }

        /**
        * @return {ICad.View.AbstractView}  
         */
        traceImage() : ICad.View.AbstractView
        {
            return new Trace.ImageCanvasWebGL();
        }

        /**
        * @return {ICad.View.AbstractView}  
         */
        traceLines() : ICad.View.AbstractView
        {
            return new Trace.LinesCanvas2D();
        }

        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
        chartHistogram() : ICad.View.AbstractView
        {
            return new Chart.ChartHistogramCanvas2D();
        }

        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
        draw() : ICad.View.AbstractView
        {
            return new Canvas2D.Canvas2D();
        }

        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
        draw3D() : ICad.View.AbstractView
        {
            return new WebGL.CanvasWebGL();
        }

        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
         form() : ICad.View.AbstractView
         {
             return new Form.FormDOM();
         }

        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
         textfield(title : string, name : string, value : string = '') : ICad.View.AbstractView
         {
             var result =  new Form.Input.TextField.TextFieldDOM();
             result.title = title;
             result.name = name;
             result.value = value;
             return result;
         }

        /**
         * 
        * @return {ICad.View.AbstractView}  
         */
         colorpicker(title : string, name : string, value : Math.Color.Color = new Math.Color.Color()) : ICad.View.AbstractView
         {
             var result =  new Form.Input.ColorPicker.ColorPickerDOM();
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
        ruler() : ICad.View.AbstractView
        {
             return new Ruler.RulerVerticalCanvas2D();
        }
    }
}
