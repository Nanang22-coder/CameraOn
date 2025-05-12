const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// Middleware untuk parsing JSON
app.use(express.json({ limit: '50mb' }));

// Endpoint untuk menerima foto
app.post('/upload', (req, res) => {
    const imageDataURL = req.body.image;
    const base64Data = imageDataURL.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Simpan foto ke file
    const filename = `foto-${Date.now()}.jpg`;
    const filepath = path.join(__dirname, 'uploads', filename);
    fs.writeFile(filepath, buffer, (err) => {
        if (err) {
            console.error('Error menyimpan foto:', err);
            res.status(500).json({ message: 'Error menyimpan foto' });
        } else {
            res.json({ message: 'Foto terkirim', filename });
        }
    });
});

// Buat direktori uploads jika belum ada
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});