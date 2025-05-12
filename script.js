const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

async function takePhoto() {
    try {
        // Mengakses kamera
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        video.srcObject = stream;
        await new Promise(resolve => video.onloadedmetadata = resolve);
        video.play();

        // Ambil foto
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/jpeg');

        // Hentikan stream kamera
        stream.getTracks().forEach(track => track.stop());

        // Kirim foto ke backend
        const response = await fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageDataURL })
        });
        const data = await response.json();
        console.log('Foto terkirim:', data);
    } catch (err) {
        console.error('Error:', err);
    }
}