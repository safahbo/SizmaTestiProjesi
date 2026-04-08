/**
 * @file server.js
 * @description IDOR Lab Environment - SECURED VERSION
 * @instructor Keyvan Arasteh
 * @author Safa Hacıbayramoğlu
 * * SECURITY ADVISORY:
 * - Vulnerability: IDOR (Insecure Direct Object Reference) -> CLOSED
 * - Mitigation: Session Ownership Validation, Helmet, Rate Limiting implemented.
 */

const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// [TASK 5 ÇÖZÜMÜ]: Helmet.js ile HTTP güvenlik başlıkları (Header Security) eklendi.
app.use(helmet());

// [TASK 4 ÇÖZÜMÜ]: Express Session ile oturum yönetimi sağlandı.
app.use(session({
    secret: 'istinye-security-key-2026',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Lab ortamı olduğu için false (HTTPS yok)
}));

// Testler ve simülasyon için sahte giriş (Login) mekanizması
app.use((req, res, next) => {
    if (req.query.loginAs) {
        req.session.userId = req.query.loginAs;
    }
    next();
});

// [TASK 5 ÇÖZÜMÜ]: Express-Rate-Limit ile otomatik ID tarama (Enumeration) saldırıları engellendi.
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // IP başına 100 istek limiti
    message: { error: "Çok fazla istek atıldı, lütfen daha sonra tekrar deneyin." }
});

app.use(express.static(__dirname));
app.use('/api/', apiLimiter);

/**
 * MOCK DATABASE - IN-MEMORY
 * Fatura verilerine 'ownerId' eklenerek sahiplik kontrolü için hazırlandı.
 */
const invoices = {
    "100": { id: 100, ownerId: "user1", owner: "Safa", amount: "1500 TL", detail: "Laptop Tamiri", date: "2026-03-01" },
    "101": { id: 101, ownerId: "user2", owner: "Basak", amount: "450 TL", detail: "Internet Faturasi", date: "2026-03-05" },
    "102": { id: 102, ownerId: "user3", owner: "Mehmet", amount: "2100 TL", detail: "Kira Odemesi", date: "2026-03-10" }
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @api {get} /api/invoice/:id Fetch Invoice Data
 * @apiDescription GÜVENLİK YAMASI: IDOR zafiyeti Oturum Sahipliği (Session Ownership) ile kapatıldı.
 */
app.get('/api/invoice/:id', (req, res) => {
    const id = req.params.id;
    const invoice = invoices[id];

    if (!invoice) {
        return res.status(404).json({ error: "Fatura bulunamadı!" });
    }

    // [TASK 4 ÇÖZÜMÜ]: IDOR Koruması (Ownership Validation)
    // Eğer kullanıcı giriş yapmamışsa VEYA giriş yapan kullanıcının ID'si faturanın sahibine eşit değilse engelle!
    if (!req.session.userId || req.session.userId !== invoice.ownerId) {
        return res.status(403).json({ error: "Erişim Reddedildi! Başkasının faturasına bakamazsınız. (403 Forbidden)" });
    }

    // Yetki kontrolü başarılıysa veriyi göster
    res.json(invoice);
});

// Otomatik testlerin düzgün çalışabilmesi için app objesini export ediyoruz
module.exports = app;

// Sunucuyu başlat (Eğer dosya doğrudan çalıştırılıyorsa)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`[+] GÜVENLİ LAB AKTİF: Zafiyet kapatıldı. Sunucu: http://localhost:${PORT}`);
    });
}
