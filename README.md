# IDOR Zafiyeti Analizi ve Sızma Testi Laboratuvarı

![NodeJS](https://img.shields.io/badge/Node.js-LTS-green)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Security](https://img.shields.io/badge/Security-IDOR-red)
![University](https://img.shields.io/badge/Üniversite-İstinye-blue)

<p align="center">
  <img src="istinye-logo.png.png" width="160"> <br>
  <strong>İstinye Üniversitesi</strong><br>
  Bilişim Güvenliği Teknolojisi Bölümü<br>
  <strong>Ders:</strong> Sızma Testi Operasyonları<br>
  <strong>Eğitmen:</strong> Keyvan Arasteh<br>
  <strong>Geliştiren:</strong> Safa Hacıbayramoğlu
</p>

---

## 📌 İçindekiler
1. [Özet ve Amaç](#-özet-ve-amaç)
2. [Proje Yapısı](#-proje-yapısı)
3. [Teknik Derinlik ve Mimari](#-teknik-derinlik-ve-mimari)
4. [Test ve Doğrulama](#-test-ve-doğrulama)
5. [Kurulum ve Çalıştırma](#-kurulum-ve-çalıştırma)

---

## 📝 Özet ve Amaç
Bu laboratuvar çalışması, web uygulamalarındaki **IDOR (Insecure Direct Object Reference)** zafiyetini uygulamalı olarak analiz etmek, istismar süreçlerini (PoC) kanıtlamak ve güvenli kodlama prensipleriyle bu tür açıkların nasıl önleneceğini göstermek amacıyla geliştirilmiştir. Proje, yetkisiz veri erişiminin teknik risklerini somut bir senaryo üzerinden ele almaktadır.

## 📂 Proje Yapısı
Proje, rubrik kriterlerine uygun olarak `src` klasör mimarisiyle yapılandırılmıştır:

* **`src/`**: Uygulamanın kaynak kodlarını (Backend ve Frontend) içerir.
* **`exploit.py`**: Zafiyeti otomatiğe bağlayan Python tabanlı saldırı scriptidir.
* **`MITIGATION.md`**: Zafiyetin nasıl kapatılacağına dair teknik çözüm rehberidir.
* **`CHECKLIST.md`**: Sistematik sızma testi adımlarını içeren kontrol listesidir.
* **`.env.example`**: Örnek yapılandırma dosyası (Güvenlik gereği gerçek .env dışlanmıştır).

## 🛡️ Teknik Derinlik ve Mimari
Sistem, Express.js tabanlı monolitik bir mimariye sahiptir. 
- **Analiz:** Uygulama, sunucu tarafında oturum sahipliği (Session Ownership) kontrolü yapmadan doğrudan URL'den gelen `id` parametresine güvenmektedir. Bu durum, saldırganın sadece sayıları değiştirerek (Enumeration) başkasına ait verilere erişmesine neden olur.
- **Çözüm Yaklaşımı:** Proje kapsamında hem manuel sömürü hem de otomatik veri sızdırma (Data Exfiltration) teknikleri kullanılmıştır.

## ✅ Test ve Doğrulama
Zafiyetin varlığı aşağıdaki yöntemlerle kesinleştirilmiştir:

1. **Manuel Doğrulama:** Tarayıcı üzerinden URL parametresi manipüle edilerek (`/api/invoice/101`) oturum sahibi olmayan kullanıcılara ait verilerin sızdırıldığı doğrulanmıştır.
2. **Otomatik Test:** `exploit.py` scripti ile `requests` kütüphanesi kullanılarak belirlenen aralıktaki tüm fatura kayıtları saniyeler içinde sızdırılmıştır.

## 🚀 Kurulum ve Çalıştırma
```bash
# Bağımlılıkları yükle
npm install

# Sunucuyu başlat
npm start

# Uygulamaya eriş: http://localhost:3000
# Exploit testini çalıştır: python exploit.py
