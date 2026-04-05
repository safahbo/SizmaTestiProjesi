# IDOR Zafiyeti Giderme Rehberi (Mitigation Guide)

Bu doküman, projede tespit edilen **IDOR (Insecure Direct Object Reference)** zafiyetinin teknik analizini ve bu zafiyetin nasıl önleneceğine dair güvenli kodlama standartlarını içerir.

## 1. Zafiyet Analizi (Hatalı Kod)
Mevcut `server.js` dosyasında, kullanıcıdan alınan `id` parametresi doğrudan işlenmekte ve herhangi bir yetki kontrolü (Authorization) yapılmamaktadır:

```javascript
// HATALI YAKLAŞIM
app.get('/api/invoice/:id', (req, res) => {
    const id = req.params.id; 
    const invoice = invoices[id]; // Sadece nesne ID'sine güveniliyor
    res.json(invoice);
});
