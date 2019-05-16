import SkinnedMesh from './SkinnedMesh/SkinnedMesh';
import ImageDisplay from './ImageDisplay';
const canvas1 = document.querySelector('canvas#main');
const canvas2 = document.querySelector('canvas#img');

(async function() {
    const sm = new SkinnedMesh([canvas1, canvas2], 500, 500, 'brickwall.jpg');
    await sm.init();
    setInterval(() => {
        sm.draw();
    }, 1000 / 20);
})();

