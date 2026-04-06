# Tehdit Modellemesi (Threat Modeling)

Bu laboratuvar ortamındaki IDOR zafiyetinin risk analizi aşağıdadır:

### 1. Varlık Analizi (Asset Analysis)
- **Hassas Veri:** Kullanıcı Faturaları (PII)
- **Kritiklik:** Yüksek (High)

### 2. Tehdit Aktörleri (Threat Actors)
- Yetkisiz dış kullanıcılar.
- Yatay yetki yükseltmeye çalışan kayıtlı kullanıcılar.

### 3. Saldırı Vektörleri (Attack Vectors)
- **ID Enumeration:** URL parametrelerinin ardışık olarak değiştirilmesi.
- **Bypassing Authorization:** Sunucu tarafındaki yetkilendirme eksikliğinin istismarı.

### 4. Risk Puanlaması (STRIDE)
- **S**poofing: Düşük
- **T**ampering: Orta
- **I**nformation Disclosure: **Kritik**
- **D**enial of Service: Düşük
