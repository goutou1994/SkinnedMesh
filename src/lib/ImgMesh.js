function generateImageMesh([width, height], [gridsX, gridsY]) {
    let vertex = new Float32Array((gridsX + 1) * (gridsY + 1) * 2),
        texcoords = new Float32Array((gridsX + 1) * (gridsY + 1) * 2),
        indices = new Int32Array(gridsX * gridsY * 6);
    const step = [2 / gridsX, 2 / gridsY];
    for (let x = 0; x <= gridsX; x++) {
        for (let y = 0; y <= gridsY; y++) {
            vertex[(x * (gridsY + 1) + y) * 2] = -1 + x * step[0];
            vertex[(x * (gridsY + 1) + y) * 2 + 1] = -1 + y * step[1];
            texcoords[(x * (gridsY + 1) + y) * 2] = x / gridsX;
            texcoords[(x * (gridsY + 1) + y) * 2 + 1] = y / gridsY;
        }
    }
    
    for (let x = 0; x < gridsX; x++) {
        for (let y = 0; y < gridsY; y++) {
            let i = x * (gridsY + 1) + y;   // upper-left corner
            let g = (x * gridsY + y) * 6;
            indices[g] = i;
            indices[g + 1] = i + gridsY + 1;
            indices[g + 2] = i + 1;
            indices[g + 3] = i + 1;
            indices[g + 4] = i + gridsY + 1;
            indices[g + 5] = i + gridsY + 2;
        }
    }
    
    return {
        vertex,
        texcoords,
        indices,
        n: gridsX * gridsY
    }
}

export default generateImageMesh;