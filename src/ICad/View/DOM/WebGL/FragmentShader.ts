namespace ICad.View.DOM.WebGL
{
    /**
     * CanvasWebGL
     */
    export class FragmentShader extends Shader
    {
        /**
         *
         */
        compile(context : WebGLRenderingContext)
        {
            if(this._context != context || !this._shader)
            {
                var shader = context.createShader(context.FRAGMENT_SHADER)
                context.shaderSource(shader, this.content)
                context.compileShader(shader)

                if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
                    console.error(context.getShaderInfoLog(shader));
                    return null;
                }

                this._shader = shader
                this._context = context
            }
        }
    }
}
