const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Dosyalar yan yana (klasörsüz) olduğu için ana dizini statik olarak açıyoruz
app.use(express.static(__dirname));

// Simüle edilmiş veritabanı
const invoices = {
    "100": { id: 100, owner: "Safa", amount: "1500 TL", detail: "Laptop Tamiri", date: "2026-03-01" },
    "101": { id: 101, owner: "Başak", amount: "450 TL", detail: "İnternet Faturası", date: "2026-03-05" },
    "102": { id: 102, owner: "Mehmet", amount: "2100 TL", detail: "Kira Ödemesi", date: "2026-03-10" }
};

// Ana sayfa isteği gelince index.html'i gönder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ZAFİYETLİ ENDPOINT: IDOR BURADA!
// Dikkat: Burada 'bu veri bu kullanıcıya mı ait?' kontrolü yok.
app.get('/api/invoice/:id', (req, res) => {
    const id = req.params.id;
    const invoice = invoices[id];

    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).json({ error: "Fatura bulunamadı!" });
    }
});

app.listen(PORT, () => {
    console.log(`Uygulama çalışıyor: http://localhost:${PORT}`);
});
