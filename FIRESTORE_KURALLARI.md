# Firestore kuralı — Paydaş Portalı görüş kutusu

Panel v2.0 ile, panele yetkisi olmayan ama Google ile giriş yapan kullanıcılar
(öğrenci, mezun, sektör temsilcisi) **Paydaş Portalı**'nı görür ve görüş bildirebilir.
Bu görüşler `gorusKutusu` adlı ayrı bir koleksiyona yazılır. Yönetici bunları
**Görüşler** sekmesinin üstündeki kutudan panele aktarır.

Bu koleksiyon için Firebase'de bir kural eklemek gerekir. Kural eklenmezse:

- portaldan gönderilen görüş "erişim izni yok" hatası verir,
- Görüşler sekmesinde sarı bir uyarı görünür.

Panelin geri kalanı bundan etkilenmez.

## Adımlar

1. <https://console.firebase.google.com> → **eticvepazarlamapanel** projesi → **Firestore Database** → **Kurallar (Rules)**.
2. Mevcut kuralların içinde, `match /databases/{database}/documents {` bloğunun **içine**
   aşağıdaki bloğu ekleyin. Mevcut `panel/...` kurallarınıza dokunmayın.
3. **Yayınla (Publish)**.

```
    // Paydaş Portalı görüş kutusu (panel v2.0)
    function gkYonetici() {
      return request.auth != null &&
        request.auth.token.email.lower() in
          get(/databases/$(database)/documents/panel/users).data.yoneticiler;
    }
    match /gorusKutusu/{gorusId} {
      // Giriş yapmış herkes yalnızca kendi adına, yeni görüş oluşturabilir
      allow create: if request.auth != null
        && request.resource.data.keys().hasOnly(['ad','tur','konu','metin','eposta','uid','tarih','durum'])
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.durum == 'yeni'
        && request.resource.data.metin is string
        && request.resource.data.metin.size() > 0
        && request.resource.data.metin.size() < 5000;
      // Okuma ve durum güncelleme (aktarıldı / kapatıldı) yalnızca yöneticiler
      allow read, update: if gkYonetici();
      allow delete: if false;
    }
```

Not: Kural, yönetici listesini panelin kendi `panel/users` dokümanındaki `yoneticiler`
alanından okur. Kurucu hesap bu listede bulunduğu sürece ek bir işlem gerekmez.
