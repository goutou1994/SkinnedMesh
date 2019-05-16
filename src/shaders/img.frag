precision mediump float;
varying vec2 frag_texcoord;
uniform sampler2D tex;
void main() {
    //gl_FragColor = vec4(1, 0, 0, 1);
    gl_FragColor = texture2D(tex, frag_texcoord);
}
