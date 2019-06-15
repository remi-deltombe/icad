namespace ICad.View.DOM.WebGL
{
    /**
     * CanvasWebGL
     */
    export class Program
    {
        /** */
        _context : WebGLRenderingContext

        /** */
        _fragmentShaders : Map<string, FragmentShader> = new Map()

        /** */
        _vertexShaders : Map<string, VertexShader> = new Map()

        _programs : Map<WebGLRenderingContext, WebGLProgram> = new Map();

        /**
         *
         */
        createFragmentShader(name, content)
        {
            var shader = new FragmentShader()
            shader.content = content 
            this._fragmentShaders.set(name, shader)
        }

        /**
         *
         */
        createVertexShader(name, content)
        {
            var shader = new VertexShader()
            shader.content = content 
            this._vertexShaders.set(name, shader)
        }

        /**
         *
         */
        fill(color: Math.Color.Color)
        {
            this.context.clearColor(color.r, color.g, color.b, 1);
            this.context.clear(this.context.COLOR_BUFFER_BIT|this.context.DEPTH_BUFFER_BIT);
        }

        /**
         *
         */
        draw(vertexShaderName, fragmentShaderName, buffers : Map<string, Buffer>, data: Map<string, any>, type? : number)
        {
            var gl = this.context            
            var program

            type = type || gl.TRIANGLES

            if(!this._programs.has(gl))
            {
                var vertex = this._vertexShaders.get(vertexShaderName)
                var fragment = this._fragmentShaders.get(fragmentShaderName)
                program = gl.createProgram()
                vertex.compile(this.context)
                fragment.compile(this.context)

                gl.attachShader(program, vertex._shader)
                gl.attachShader(program, fragment._shader)
                gl.linkProgram(program)

                this._programs.set(gl, program);
            }
            else
            {
                program = this._programs.get(gl)
            }
            this._context.useProgram(program)
            /*
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("Could not initialise shaders");
                return
            }
            */

            var length = 0

            buffers.forEach((buffer, name)=>{
                if(buffer._position === false)
                {
                    buffer._position = gl.getAttribLocation(program, name)
                }
                buffer.bind(gl, buffer._position)
                length = buffer._length / buffer.sizeOfItem
            })

            
            data.forEach((value, name)=>{
                var position = gl.getUniformLocation(program, name)
                if(position)
                {
                    if(value instanceof Texture)
                    {
                        value.bind(gl, position)
                    }
                    else if(Array.isArray(value))
                    {
                        var ar = value as Array<number>
                        switch(ar.length)
                        {
                            case 1:
                                gl.uniform1fv(position, ar)
                                break;
                            case 2:
                                gl.uniform2fv(position, ar)
                                break;
                            case 3:
                                gl.uniform3fv(position, ar)
                                break;
                            case 4:
                                gl.uniform4fv(position, ar)
                                break;
                        }
                    }
                    else
                    {
                        gl.uniform1f(position, value);
                    }
                }
            })

            gl.drawArrays(type, 0, length)
        }

        /**
         * Getter of context
        * @return {WebGLRenderingContext}  Value of context
         */
        get context() : WebGLRenderingContext
        {
            return this._context
        }
        
        /**
         * Setter of context
        * @param {WebGLRenderingContext} context New value of context
         */
        set context(context : WebGLRenderingContext)
        {
            this._context = context
/*
            if(!this.context.lastProgram && this.context.lastProgram !== program)
            {
                gl.useProgram(program)
                this.context.lastProgramt = program;
            }
            */
        }
    }
}
