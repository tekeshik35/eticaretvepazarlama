# Firestore kuralları — öğrenci/paydaş sayfası (panel v2.1)

Panel v2.1'de iki yeni veri yeri var:

| Koleksiyon / doküman | Ne için | Kim okur | Kim yazar |
|---|---|---|---|
| `public/program` | Yayımlanan öğretim planı ve program kimliği | Giriş yapmış herkes | Yalnızca yöneticiler |
| `gorusKutusu/{id}` | Öğrenci ve paydaşlardan gelen görüşler | Yalnızca yöneticiler | Giriş yapmış herkes, sadece kendi adına |

Panelin ana verisi (`panel/main`) eskisi gibi yalnızca yetkili kullanıcılara açık kalır.
Öğrenciler oraya erişmez.

## Adımlar

1. <https://console.firebase.google.com> → **eticvepazarlamapanel** → **Firestore Database** → **Kurallar (Rules)**.
2. `match /databases/{database}/documents {` bloğunun **içine**, mevcut kuralların altına aşağıdakini ekleyin. Mevcut `panel/...` kurallarına dokunmayın.
3. **Yayınla (Publish)**.

```
    // ---- Panel v2.1: öğrenci/paydaş sayfası ----
    function gkYonetici() {
      return request.auth != null &&
        request.auth.token.email.lower() in
          get(/databases/$(database)/documents/panel/users).data.yoneticiler;
    }
    // Yayımlanan öğretim planı ve program kimliği
    match /public/{dokuman} {
      allow read: if request.auth != null;
      allow write: if gkYonetici();
    }
    // Öğrenci/paydaş görüş kutusu
    match /gorusKutusu/{gorusId} {
      allow create: if request.auth != null
        && request.resource.data.keys().hasOnly(['ad','tur','konu','metin','eposta','uid','tarih','durum'])
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.durum == 'yeni'
        && request.resource.data.metin is string
        && request.resource.data.metin.size() > 0
        && request.resource.data.metin.size() < 5000;
      allow read, update: if gkYonetici();
      allow delete: if false;
    }
```

## Kural eklenmezse ne olur?

- **Öğrenci sayfası:** yayımlanan plan okunamaz. Onun yerine panelin içine gömülü katalog planı (27.07.2026) gösterilir ve sayfada bunu belirten küçük bir uyarı çıkar.
- **Görüş formu:** "erişim izni yok" der.
- **Yönetici paneli:** normal çalışır. Görüşler sekmesinde sarı bir kurulum uyarısı görünür.

## İsteğe bağlı: girişi üniversite hesaplarıyla sınırlamak

Öğrenci sayfasını yalnızca `@gantep.edu.tr` ve `@ogr.gantep.edu.tr` hesaplarına açmak isterseniz, `public` kuralındaki `request.auth != null` ifadesini şununla değiştirin:

```
request.auth != null && request.auth.token.email.matches('.*@(ogr\\.)?gantep\\.edu\\.tr$')
```

Bu durumda sektör temsilcileri kişisel Gmail hesaplarıyla planı göremez. Onları panelde
görüntüleyici olarak ekleyebilirsiniz.
