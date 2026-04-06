# IDOR Zafiyeti Analizi ve Sızma Testi Laboratuvarı

![NodeJS](https://img.shields.io/badge/Node.js-LTS-green)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Security](https://img.shields.io/badge/Security-OWASP_A01-red)
![Standard](https://img.shields.io/badge/CWE-639-orange)
![University](https://img.shields.io/badge/Üniversite-İstinye-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

<p align="center">
  <img src="istinye-logo.png.png" width="160"> <br>
  <strong>İstinye Üniversitesi</strong><br>
  Bilişim Güvenliği Teknolojisi Bölümü<br>
  <strong>Ders:</strong> Sızma Testi<br>
  <strong>Eğitmen:</strong> Keyvan Arasteh<br>
  <strong>Geliştiren:</strong> Safa Hacıbayramoğlu
</p>

---

## 📌 İçindekiler
1. [📝 Özet ve Amaç](#-özet-ve-amaç)
2. [📂 Proje Yapısı ve Mimari](#-proje-yapısı-ve-mimari)
3. [🛡️ Teknik Derinlik ve Zafiyet Analizi](#-teknik-derinlik-ve-zafiyet-analizi)
4. [✅ Test ve Doğrulama (Manual & PoC)](#-test-ve-doğrulama-manual--poc)
5. [🚀 Kurulum ve Çalıştırma](#-kurulum-ve-çalıştırma)

---

## 📝 Özet ve Amaç
Bu laboratuvar çalışması, web uygulamalarındaki en kritik erişim kontrolü hatalarından biri olan **IDOR (Insecure Direct Object Reference)** konusunu uygulamalı olarak analiz etmek amacıyla geliştirilmiştir. Projenin temel amacı, yetkisiz veri erişiminin teknik risklerini (**PII - Personal Identifiable Information** sızıntısı) somut bir senaryo üzerinden ele almak, istismar süreçlerini (**PoC**) kanıtlamak ve güvenli kodlama prensiplerini dökümante etmektir.

## 📂 Proje Yapısı ve Mimari
Sistem, modüler ve temiz kod prensiplerine uygun olarak `src/` klasör mimarisiyle yapılandırılmıştır:

* **`src/`**: Uygulamanın çekirdek dosyalarını (Express.js tabanlı Backend ve HTML/CSS Frontend) içerir.
* **`exploit.py`**: Zafiyeti otomatiğe bağlayan, asenkron mantığa uygun Python tabanlı sızma testi scriptidir.
* **`MITIGATION.md`**: Zafiyetin kapatılmasına yönelik teknik çözüm rehberi ve risk matrisi.
* **`CHECKLIST.md`**: OWASP WSTG standartlarına uygun sistematik sızma testi kontrol listesi.
* **`.env.example`**: Güvenli yapılandırma örneği (Hassas verilerin korunması bilinciyle hazırlanmıştır).
* **`.gitattributes` & `.gitignore`**: Repo profesyonelliği ve dosya yönetimi için gerekli konfigürasyonlar.

## 🛡️ Teknik Derinlik ve Zafiyet Analizi (CWE-639)
Sistem, Express.js tabanlı monolitik bir mimariye sahiptir. Analiz aşamasında şu teknik bulgular saptanmıştır:
* **Zafiyet Nedeni:** Sunucu tarafında oturum sahipliği (**Session Ownership**) kontrolü yapılmadan doğrudan kullanıcıdan gelen `id` parametresine güvenilmesi (Broken Access Control).
* **Etki (Impact):** Herhangi bir kullanıcı, sadece URL parametrelerini manipüle ederek (**ID Enumeration**) başkasına ait hassas fatura ve kişisel verilere erişebilmektedir.
* **Sektörel Karşılık:** Bu zafiyet **OWASP A01:2021-Broken Access Control** kategorisinde yer alır ve **CWE-639** olarak tanımlanır.



## ✅ Test ve Doğrulama (Manual & PoC)
Zafiyetin varlığı ve kritikliği iki farklı metodoloji ile kesinleştirilmiştir:

1.  **Manuel Doğrulama:** Tarayıcı üzerinden URL parametresi manipüle edilerek (`/api/invoice/100` -> `101`) oturum sahibi olmayan kullanıcılara ait verilerin sızdırıldığı doğrulanmıştır.
2.  **Otomatik Test (PoC):** Geliştirilen `exploit.py` scripti, `requests` kütüphanesi kullanarak belirlenen aralıktaki tüm hassas kayıtları saniyeler içinde sızdırmış (**Data Exfiltration**) ve zafiyetin otomatize edilebilirliğini kanıtlamıştır.

## 🚀 Kurulum ve Çalıştırma
```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Sunucuyu başlatın
npm start

# 3. Uygulamaya erişin
# http://localhost:3000

# 4. Sızma testi scriptini çalıştırın
python exploit.py
