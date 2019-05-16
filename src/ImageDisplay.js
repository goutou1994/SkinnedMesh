import generateImgMesh from '@/lib/ImgMesh';
import vs_src from './shaders/img.vert';
import fs_src from './shaders/img.frag';

function loadImage(path) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = function() {
            resolve(img);
        };
        img.src = path;
    });
}

class ImageDisplay {
    constructor(context, path, [width, height], [gridsX, gridsY]) {
        this.context = context;
        this.imgp = loadImage(path);
        this.size = [width, height];
        this.grids = [gridsX, gridsY];
        const {
            vertex,
            texcoords,
            indices
        } = generateImgMesh(this.size, this.grids);
        this.vertex = vertex;
        this.texcoords = texcoords;
        this.indices = indices;
    }

    async init() {
        const gl = this.context;
        const program = gl.createProgram();
        const vs = gl.createShader(gl.VERTEX_SHADER), fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vs, vs_src);
        gl.shaderSource(fs, fs_src);
        gl.compileShader(vs);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(vs));
        }
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(fs));
        }
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, (this.vertex.length + this.texcoords.length) * 4, gl.DYNAMIC_DRAW);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertex);
        gl.bufferSubData(gl.ARRAY_BUFFER, this.vertex.length * 4, this.texcoords);

        const ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        const attrib_bind = [
            gl.getAttribLocation(program, 'aPos'),
            gl.getAttribLocation(program, 'aTexcoord')
        ];
        gl.enableVertexAttribArray(attrib_bind[0]);
        gl.vertexAttribPointer(attrib_bind[0], 2, gl.FLOAT, gl.FALSE, 2 * 4, 0);

        gl.enableVertexAttribArray(attrib_bind[1]);
        gl.vertexAttribPointer(attrib_bind[1], 2, gl.FLOAT, gl.FALSE, 2 * 4, this.vertex.length * 4);

        this.img = await this.imgp;
        const tbo = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tbo);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.img);

        const tex_bind = gl.getUniformLocation(program, 'tex');
        gl.uniform1i(tex_bind, 0);
    }

    updateVertex() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertex);
    }

    draw() {
        const gl = this.context;
        gl.viewport(0, 0, this.size[0], this.size[1]);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, this.grids[0] * this.grids[1] * 6, gl.UNSIGNED_INT, 0);
    }
}

export default ImageDisplay;