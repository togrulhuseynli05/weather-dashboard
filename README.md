# Weather Dashboard (HTML, CSS, JavaScript)

Bakı üçün hava məlumatını göstərən, dark tema ilə hazırlanmış statik veb səhifə. Layihə build addımı tələb etmir: `index.html` faylını brauzerdə açmaq kifayətdir.

## Nə göstərir

- **Bugünün kartı:** şəhərin yerli vaxtı, temperatur, hiss olunan temperatur, hava təsviri, külək, təzyiq, rütubət, gün çıxışı və batışı.
- **Həftəlik kartlar:** bugünkü gündən başlayaraq 7 günlük proqnoz (bugün böyük kartdadır, qalan 6 gün kiçik kartlardadır). Hər kartda gün adı, hava ikonu və maksimum temperatur göstərilir.
- **Today's Overview:**
  - Wind Status: küləyin sürəti km/h ilə və vaxtı.
  - UV Index: hazırda "N/A" (aşağıda izah olunub).
  - Humidity: rütubət faizi və şeh nöqtəsi (hesablanır).
  - Visibility: görünmə məsafəsi km ilə və vəziyyət yazısı.
  - Xəritə banneri.
- **Chance of Rain:** növbəti 18 saat üçün yağış ehtimalının sütun qrafiki (Chart.js ilə).
- **Other Cities:** Beijing, California, Dubai və Charlottetown üçün cari hava.
- **Axtarış:** şəhər adı yazıb Enter basanda və ya lupa düyməsinə klik edəndə həmin şəhərin məlumatı yenilənir. Səhifə açılanda Baku göstərilir.

## Qovluq strukturu

```
weather-dashboard/
├── index.html          səhifənin strukturu
├── css/
│   └── style.css       bütün dizayn
├── images/
│   └── *.svg           ikonlar və şəkillər
└── js/
    ├── config.js       API
    ├── api.js          məlumat çəkən funksiyalar
    ├── utils.js        vaxt, gün adı, ikon və hesablama funksiyaları
    ├── rainChart.js    Chance of Rain qrafiki
    └── script.js       səhifəni məlumatla doldurur və axtarışı idarə edir
```

## Məlumat mənbələri

| Mənbə | Nə üçün istifadə olunur | Açar lazımdır? |
|---|---|---|
| OpenWeatherMap `/weather` | cari hava, Other Cities | bəli |
| OpenWeatherMap `/forecast` | Chance of Rain (3 saatlıq məlumat) | bəli |
| Open-Meteo `/forecast` | 7 günlük həftəlik kartlar | xeyr |
| Chart.js (CDN) | yağış qrafiki | — |



## Xəta mesajları

| Ekranda yazılan | Səbəb |
|---|---|
| API key is empty. | `js/config.js` faylında açar yazılmayıb |
| API key is wrong. | Açar səhvdir və ya hələ aktiv olmayıb |
| City not found. | Şəhər adı səhvdir. Bəzi adlar (məsələn California) tapılmaya bilər, bu halda `Sacramento,US` yazmaq olar |
| Weekly forecast could not be loaded. | Open-Meteo-ya qoşulmaq olmadı, internet bağlantısını yoxla |
| Something went wrong. | Digər ümumi xəta, konsolda (F12) ətraflı məlumata bax |

Other Cities bölməsində bir şəhər tapılmasa, digərləri yenə göstərilir. Xəta yalnız konsolda yazılır.

## Məhdudiyyətlər

- **UV Index:** OpenWeatherMap-in pulsuz planında UV məlumatı yoxdur, ona görə "N/A" göstərilir. İkon şəkli sabitdir, mavi qövs dəyərə görə dəyişmir.
- **Wind Status** qrafiki statik şəkildir. Sürət rəqəm kimi dəyişir, qrafikin forması isə dəyişmir.
- **Air Quality** tabı və **Today / Tomorrow** tabları yalnız görünüş üçündür, klik etdikdə yalnız aktiv rəng dəyişir.
- **Dark / light toggle** yalnız dark mode göstərir və klik etmir.
- **Həftəlik kartlarda** yalnız maksimum temperatur göstərilir.
- **Responsive deyil.** Dizayn desktop ekranı üçün hazırlanıb (təxminən 1240px).
- **API açarı brauzerdə görünür.** Bu layihə öyrənmə məqsədi üçündür. Real layihədə sorğular bir backend üzərindən göndərilməlidir.


## Dizayn

Dizayn Figma-dan götürülüb. Rənglər:

- Arxa fon: `#13131a`
- Kart: `#1c1c27`
- Çərçivə: `#2d2d3a`
- Vurğu: `#4b8bf4`
- Mətn: `#ffffff`, köməkçi mətn: `#9ca3af`