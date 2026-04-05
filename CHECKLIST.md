# IDOR Sızma Testi Kontrol Listesi (Checklist)

Bu kontrol listesi, bir web uygulamasında Insecure Direct Object Reference (IDOR) zafiyetlerini sistematik olarak tespit etmek için kullanılan adımları içerir.

## 1. Keşif ve Parametre Tespiti
- [ ] Uygulama içerisindeki tüm dinamik parametreler (ID, user_id, order_no, doc_id vb.) listelendi mi?
- [ ] URL yapısı incelendi mi? (Örn: `/api/v1/profile?id=100`)
- [ ] Gizli form alanları (hidden input fields) kontrol edildi mi?
- [ ] HTTP Header bilgileri (Custom headers) incelendi mi?
- [ ] Çerezler (Cookies) içerisinde kullanıcıyı tanımlayan bir ID değeri var mı?

## 2. Yetkilendirme Testleri (Authorization)
- [ ] **Yatay Yetki Yükseltme:** Kullanıcı A, Kullanıcı B'nin verisine aynı yetki seviyesinde erişebiliyor mu?
- [ ] **Dikey Yetki Yükseltme:** Düşük yetkili bir kullanıcı (User), yüksek yetkili (Admin) bir nesneye erişebiliyor mu?
- [ ] **CRUD Operasyonları:** - [ ] Başkasının verisi okunabiliyor mu? (READ)
    - [ ] Başkasının verisi güncellenebiliyor mu? (UPDATE)
    - [ ] Başkasının verisi silinebiliyor mu? (DELETE)
- [ ] Giriş yapmamış (Unauthenticated) bir kullanıcı, nesne ID'si ile veriye erişebiliyor mu?

## 3. Parametre Manipülasyon Teknikleri
- [ ] Sayısal ID'ler (100, 101, 102) artırılarak/azaltılarak test edildi mi?
- [ ] UUID veya GUID değerleri kullanılıyorsa, bunların tahmin edilebilirliği (zayıf üretim) incelendi mi?
- [ ] Parametre tipi değiştirilerek deneme yapıldı mı? (Örn: Sayı yerine String gönderimi)
- [ ] Birden fazla parametre gönderimi denendi mi? (Örn: `id=100&id=101`)

## 4. Gelişmiş Kontroller
- [ ] HTTP Metodu değiştirme denendi mi? (Örn: GET yerine POST, PUT veya DELETE kullanımı)
- [ ] Eski API versiyonları tarandı mı? (Örn: `/api/v2/` yerine `/api/v1/` denemesi)
- [ ] Dosya uzantısı manipülasyonu denendi mi? (Örn: `/invoice/100.pdf` yerine `/invoice/100.json`)
- [ ] Kayıt oluşturma (POST) sırasında başka bir kullanıcıya ait ID enjekte edilerek sahiplik değiştirilebiliyor mu?

## 5. Raporlama ve Önem Derecesi
- [ ] Zafiyetin iş etkisi (Business Impact) belirlendi mi?
- [ ] Veri gizliliği (PII) ihlali olasılığı değerlendirildi mi?
- [ ] CVSS skoru hesaplandı mı?
