## 🧪 Sızma Testi Bulguları ve Kanıtlar

Uygulama yerel ortamda (Node.js v18+) ayağa kaldırılmış ve aşağıdaki test adımları izlenmiştir:

1. **Adım:** Uygulama `http://localhost:3000` üzerinden başlatıldı.
2. **Adım:** Sisteme "Safa" (ID: 100) kullanıcısı olarak erişim sağlandı.
3. **Adım:** URL parametresi veya sorgu ekranındaki ID değeri manuel olarak `101` olarak değiştirildi.
4. **Bulgu:** Sistemin "Başak" isimli başka bir kullanıcının fatura tutarını ve özel detaylarını (İnternet Faturası vb.) herhangi bir yetki kontrolü yapmadan döndürdüğü görüldü.

### Zafiyet Analizi (OWASP Risk Skoru)
- **Zafiyet Türü:** IDOR (Insecure Direct Object Reference)
- **Etki:** Yüksek (Kullanıcı verilerinin gizliliği ihlal edilmektedir.)
- **Zorluk:** Çok Düşük (Sadece parametre manipülasyonu ile gerçekleştirilebilir.)
