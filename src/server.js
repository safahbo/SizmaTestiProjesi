const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * TODO: Gelecek versiyonlarda 'helmet.js' entegrasyonu ile HTTP güvenlik başlıkları sıkılaştırılacak.
 * FIXME: Statik dosya sunumu sırasında directory traversal saldırılarına karşı path validasyonu eklenmeli.
 */
app.use(express.static(__dirname));

// Simüle edilmiş veritabanı (Zafiyetli Nesne Referansları)
const invoices = {
    "100": { id: 100, owner: "Safa", amount: "1500 TL", detail: "Laptop Tamiri", date: "2026-03-01" },
    "101": { id: 101, owner: "Basak", amount: "450 TL", detail: "Internet Faturasi", date: "2026-03-05" },
    "102": { id: 102, owner: "Mehmet", amount: "2100 TL", detail: "Kira Odemesi", date: "2026-03-10" }
};

// Ana sayfa yönlendirmesi
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @api {get} /api/invoice/:id Fatura Verisini Getir
 * @apiDescription ZAFİYET NOKTASI: IDOR (Insecure Direct Object Reference). 
 * Sunucu tarafında 'Authentication' olsa dahi 'Authorization' (Yetkilendirme) eksiktir.
 * * TODO: UUID/GUID yapısına geçilerek ID tahmin edilebilirliği (Enumeration) engellenmeli.
 */
app.get('/api/invoice/:id', (req, res) => {
    const id = req.params.id;
    const invoice = invoices[id];

    if (invoice) {
        // FIXME: Gerçek bir uygulamada burada 'invoice.ownerId === req.session.userId' kontrolü yapılmalıdır!
        // Şu anki haliyle her kullanıcı, sadece ID bilerek herkesin faturasına erişebilir.
        res.json(invoice);
    } else {
        res.status(404).json({ error: "Fatura bulunamadı!" });
    }
});

// TODO: Loglama mekanizması (Winston/Morgan) eklenerek yetkisiz erişim denemeleri izlenmeli.
// TODO: Rate limiting uygulanarak kaba kuvvet (brute-force) saldırıları yavaşlatılmalı.

app.listen(PORT, () => {
    console.log(`[GÜVENLİ OLMAYAN MOD] Sunucu aktif: http://localhost:${PORT}`);
});
