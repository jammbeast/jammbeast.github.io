const video = document.querySelector('video');
const ascii = document.querySelector('pre');

const asciiChars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."];

video.addEventListener('play', ()=>{
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.width;
    canvas.height = video.height;

    const asciiUpdate = ()=>{
        if (video.paused || video.ended) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, video.width, video.height);

        const { data, width, height } = imageData;

        let asciiFrame = '';


        for (let y = 0; y < height; y+=6){
            for (let x = 0; x < width; x+=3){
                const offSet = (y*width+ x) * 4;
                const r = data[offSet];
                const g = data[offSet+1];
                const b = data[offSet+2];
                const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

                const charIndex = Math.floor(brightness * (asciiChars.length -1 ));
                asciiFrame += asciiChars[charIndex];

            }
            asciiFrame += '\n';
        }
        ascii.textContent = asciiFrame;
        requestAnimationFrame(asciiUpdate);


    };

    requestAnimationFrame(asciiUpdate);

});