# IDOR Zafiyeti Analizi ve Sızma Testi Laboratuvarı

Bu proje, **İstinye Üniversitesi Bilişim Güvenliği Teknolojisi** bölümü, **Sızma Testi** dersi kapsamında bir "Proof of Concept" (Kavram Kanıtı) çalışması olarak hazırlanmıştır.

## 📝 Proje Özeti
Bu laboratuvar ortamı, web uygulamalarında en sık rastlanan mantıksal hatalardan biri olan **IDOR (Insecure Direct Object Reference)** zafiyetini simüle eder. Proje, bir kullanıcının kendisine ait olmayan verilere (fatura bilgileri, kişisel veriler vb.) sadece URL veya parametre değiştirerek nasıl erişebildiğini teknik olarak açıklar.

## 🚀 Kurulum ve Çalıştırma
Uygulamayı yerel ortamda çalıştırmak için:

1. Depoyu bilgisayarınıza indirin veya klonlayın.
2. Terminal üzerinden proje dizinine gidin.
3. Bağımlılıkları yüklemek için: `npm install`
4. Uygulamayı başlatmak için: `npm start`
5. Tarayıcıdan erişmek için: `http://localhost:3000`

## 🛡️ Sızma Testi Senaryosu ve Bulgular
Sistemde üç adet kullanıcı ve bunlara bağlı fatura verileri tanımlanmıştır:
- **Safa (ID: 100)** - Mevcut kullanıcı
- **Başak (ID: 101)** - Diğer kullanıcı
- **Mehmet (ID: 102)** - Diğer kullanıcı

### Adım Adım İstismar (Exploitation):
1. Kullanıcı sisteme **ID: 100** ile giriş yapar ve kendi faturasını görüntüler.
2. Sorgulama ekranındaki ID değeri manuel olarak **101** veya **102** olarak değiştirilir.
3. **Bulgu:** Sunucu, isteği yapan kişinin o veriye erişim yetkisi olup olmadığını kontrol etmeden "Başak" veya "Mehmet" isimli kullanıcılara ait özel fatura detaylarını döndürmektedir.



## 🔍 Teknik Analiz (Neden Zafiyet Var?)
Zafiyet, `server.js` dosyasındaki `/api/invoice/:id` endpoint'inde bulunmaktadır:

```javascript
app.get('/api/invoice/:id', (req, res) => {
    const id = req.params.id; // Kullanıcıdan alınan kontrolsüz girdi
    const invoice = invoices[id]; // Veriye doğrudan erişim
    res.json(invoice); // Yetki kontrolü yapılmadan verinin gönderilmesi
});
