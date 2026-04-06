# IDOR Zafiyeti Giderme Rehberi (Mitigation)

Bu rapor, İstinye Üniversitesi Bilişim Güvenliği Bölümü bünyesinde, Eğitmen Keyvan Arasteh yönetimindeki "Sızma Testi" dersi kapsamında hazırlanan çözüm planıdır.

## 1. Nesne Seviyesinde Yetkilendirme Kontrolü
En etkili çözüm, kullanıcının veritabanındaki her bir nesne (fatura, profil vb.) üzerindeki haklarını her istekte sorgulamaktır.

```javascript
// GÜVENLİ KOD ÖRNEĞİ
app.get('/api/invoice/:id', (req, res) => {
    const requestedId = req.params.id;
    const currentUserId = req.session.userId; // Oturumdaki kullanıcı kimliği

    const invoice = invoices[requestedId];

    // Kontrol: Veri var mı VE nesne sahibi oturum açan kullanıcı mı?
    if (invoice && invoice.ownerId === currentUserId) {
        res.json(invoice);
    } else {
        // Yetkisiz erişim girişimi: 403 Forbidden
        res.status(403).json({ error: "Bu işleme yetkiniz bulunmamaktadır!" });
    }
});
