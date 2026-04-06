# IDOR Zafiyeti Analizi ve Sızma Testi Laboratuvarı

![NodeJS](https://img.shields.io/badge/Node.js-LTS-green)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Security](https://img.shields.io/badge/Security-IDOR-red)
![University](https://img.shields.io/badge/Üniversite-İstinye-blue)

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/tr/b/b3/%C4%B0stinye_%C3%9Cniversitesi_Logosu.png" width="150"> <br>
  <strong>İstinye Üniversitesi</strong><br>
  Bilişim Güvenliği Teknolojisi Bölümü<br>
  <strong>Ders:</strong> Sızma Testi<br>
  <strong>Eğitmen:</strong> Keyvan Arasteh<br>
  <strong>Geliştiren:</strong> Safa Hacıbayramoğlu
</p>

---

## 📌 İçindekiler
* [Özet ve Amaç](#-özet-ve-amaç)
* [Proje Yapısı](#-proje-yapısı)
* [Teknik Derinlik ve Mimari](#-teknik-derinlik-ve-mimari)
* [Test ve Doğrulama](#-test-ve-doğrulama)
* [Kurulum ve Çalıştırma](#-kurulum-ve-çalıştırma)
* [Lisans](#-lisans)

---

## 📝 Özet ve Amaç
Bu laboratuvar çalışması, web uygulamalarındaki **IDOR (Insecure Direct Object Reference)** zafiyetini uygulamalı olarak analiz etmek, istismar süreçlerini (PoC) kanıtlamak ve güvenli kodlama prensipleriyle bu tür açıkların nasıl önleneceğini göstermek amacıyla geliştirilmiştir.

## 📂 Proje Yapısı
Proje, rubrik kriterlerine uygun olarak `src` klasör mimarisiyle yapılandırılmıştır:

* **`src/`**: Uygulamanın kaynak kodlarını (Backend ve Frontend) içerir.
* **`exploit.py`**: Zafiyeti otomatiğe bağlayan Python tabanlı saldırı scriptidir.
* **`MITIGATION.md`**: Zafiyetin nasıl kapatılacağına dair teknik çözüm rehberidir.
* **`CHECKLIST.md`**: Sistematik sızma testi adımlarını içeren kontrol listesidir.

## 🛡️ Teknik Derinlik ve Mimari
Sistem, Express.js tabanlı monolitik bir yapıdadır. 
- **Zafiyet Analizi:** Uygulama, nesne referanslarını (ID) doğrulamadan doğrudan sunucuya iletmekte ve "Broken Access Control" zafiyetine yol açmaktadır.
- **Güvenlik Mekanizması:** Çözüm olarak UUID kullanımı ve oturum tabanlı yetki kontrolü (Session Ownership) önerilmektedir.

## ✅ Test ve Doğrulama
Zafiyetin varlığı aşağıdaki yöntemlerle kesinleştirilmiştir:

1. **Manuel Doğrulama:** Tarayıcı üzerinden URL parametresi manipüle edilerek (`/api/invoice/101`) başka kullanıcılara ait verilerin sızdırıldığı doğrulanmıştır.
2. **Otomatik Test:** `exploit.py` scripti ile veri sızdırma (Data Exfiltration) işlemi otomatiğe bağlanmış ve saniyeler içinde tüm gizli kayıtlar elde edilmiştir.

## 🚀 Kurulum ve Çalıştırma
```bash
# Bağımlılıkları yükle
npm install

# Sunucuyu başlat
npm start

# Exploit testini çalıştır
python exploit.py
