import SkinnedMesh from './SkinnedMesh/SkinnedMesh';
import ImageDisplay from './ImageDisplay';
const canvas = document.querySelector('canvas#main');

// const sm = new SkinnedMesh(canvas, 500, 500);

(async function() {
    const img = new ImageDisplay(
        canvas.getContext('webgl2'),
        'brickwall.jpg',
        [500, 500],
        [10, 10]
    );
    await img.init();
    img.draw();
})();
