# IDOR Sızma Testi Metodolojisi (Checklist)

Bu döküman, İstinye Üniversitesi Bilişim Güvenliği Bölümü bünyesinde hazırlanan proje için IDOR zafiyetlerini sistematik olarak tespit etmek amacıyla kullanılan kontrol listesini içerir.

---

## 1. Keşif ve Parametre Tespiti
- [x] Uygulama içerisindeki tüm dinamik parametreler (id, user_id, order_no, doc_id vb.) listelendi mi?
- [x] URL yapısı incelendi mi? (Örn: `/api/v1/profile?id=100`)
- [x] Gizli form alanları (hidden input fields) kontrol edildi mi?
- [x] HTTP Header bilgileri (Custom headers) incelendi mi?
- [x] Çerezler (Cookies) içerisinde kullanıcıyı tanımlayan bir ID değeri var mı?

## 2. Yetkilendirme Testleri (Authorization)
- [x] **Yatay Yetki Yükseltme:** Kullanıcı A, Kullanıcı B'nin verisine aynı yetki seviyesinde erişebiliyor mu?
- [x] **Dikey Yetki Yükseltme:** Düşük yetkili bir kullanıcı (User), yüksek yetkili (Admin) bir nesneye erişebiliyor mu?
- [x] **CRUD Operasyonları:** - [x] Başkasının verisi okunabiliyor mu? (READ)
    - [x] Başkasının verisi güncellenebiliyor mu? (UPDATE)
    - [x] Başkasının verisi silinebiliyor mu? (DELETE)
- [x] Giriş yapmamış (Unauthenticated) bir kullanıcı, nesne ID'si ile veriye erişebiliyor mu?

## 3. Parametre Manipülasyon Teknikleri
- [x] Sayısal ID'ler (100, 101, 102) artırılarak/azaltılarak test edildi mi?
- [x] UUID veya GUID değerleri kullanılıyorsa, bunların tahmin edilebilirliği (zayıf üretim) incelendi mi?
- [x] Parametre tipi değiştirilerek deneme yapıldı mı? (Örn: Sayı yerine String gönderimi)
- [x] Birden fazla parametre gönderimi denendi mi? (Örn: `id=100&id=101`)

## 4. Gelişmiş Kontroller
- [x] HTTP Metodu değiştirme denendi mi? (Örn: GET yerine POST, PUT veya DELETE kullanımı)
- [x] Eski API versiyonları tarandı mı? (Örn: `/api/v2/` yerine `/api/v1/` denemesi)
- [x] Dosya uzantısı manipülasyonu denendi mi? (Örn: `/invoice/100.pdf` yerine `/invoice/100.json`)
- [x] Kayıt oluşturma (POST) sırasında başka bir kullanıcıya ait ID enjekte edilerek sahiplik değiştirilebiliyor mu?

## 5. Raporlama ve Önem Derecesi
- [x] Zafiyetin iş etkisi (Business Impact) belirlendi mi?
- [x] Veri gizliliği (PII) ihlali olasılığı değerlendirildi mi?
- [x] CVSS skoru hesaplandı mı?

---
### 📚 Standart Referanslar
- **OWASP:** A01:2021-Broken Access Control
- **CWE:** CWE-639 (Insecure Direct Object Reference)

**Geliştiren:** Safa Hacıbayramoğlu  
**Eğitmen:** Keyvan Arasteh  
**Kurum:** İstinye Üniversitesi
