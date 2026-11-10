# Weather Dashboard

Bakı və dünyanın digər şəhərləri üçün cari havanı, 7 günlük proqnozu və yağış ehtimalını göstərən veb tətbiq. Məlumat OpenWeatherMap və Open-Meteo API-lərindən çəkilir. Tətbiq HTML, CSS və JavaScript ilə yazılıb və build addımı tələb etmir.

**Canlı demo:** http://127.0.0.1:5501/index.html (Live Server ilə işə salınanda açılır)

## Ekran görüntüləri

Desktop görünüş — (public/screenshots/desktop1.png)

Desktop görünüş — (public/screenshots/desktop2.png)

## Texnologiyalar

| Texnologiya | İstifadə yeri |
|---|---|
| HTML5 | Səhifənin strukturu (`header`, `main`, `aside`, `section`) |
| CSS3 | Grid və Flexbox layout, dark tema, şəffaf xəritə banneri |
| JavaScript (ES6+) | `fetch`, `async/await`, template literal-lar |
| Chart.js 4.4.1 | Chance of Rain sütun qrafiki (CDN ilə yüklənir) |
| OpenWeatherMap API | Cari hava, 3 saatlıq proqnoz, digər şəhərlər |
| Open-Meteo API | 7 günlük proqnoz |
| SVG | Hava ikonları və dizayn şəkilləri |

## Xüsusiyyətlər

- Şəhər adı ilə axtarış (Enter basaraq və ya lupa düyməsinə klik etməklə)
- Səhifə açılanda Bakı üçün hava göstərilir
- Bugünkü hava: temperatur, hiss olunan temperatur, hava təsviri, külək, təzyiq, rütubət, gün çıxışı və batışı
- 7 günlük proqnoz: bugün böyük kartda, qalan 6 gün kiçik kartlarda
- Chance of Rain: növbəti 18 saat üçün yağış ehtimalı
- Wind Status: küləyin sürəti və vaxtı
- Humidity: rütubət və hesablanmış şeh nöqtəsi
- Visibility: görünmə məsafəsi və vəziyyət
- Other Cities: Beijing, California, Dubai və Charlottetown üçün cari hava
- Yüklənmə mesajı və aydın xəta mesajları (səhv açar, tapılmayan şəhər və s.)


## Mühit dəyişənləri
 Açar `js/config.js` faylında saxlanılır:

| Ad | Yer | Təsvir |
|---|---|---|
| `WEATHER_API_KEY` | `js/config.js` | OpenWeatherMap API açarı |

`js/config.js` `.gitignore`-dadır, ona görə GitHub-a yüklənmir. Bu faylı hər kompüterdə əl ilə yaratmaq lazımdır.

## API məlumatı

| API | İstifadə olunan endpoint-lər | Açar | Pulsuz plan |
|---|---|---|---|
| OpenWeatherMap | `/weather`, `/forecast` | Lazımdır | Dəqiqədə 60 sorğu, ayda 1 000 000 sorğu (cari limitləri sənəddən yoxla) |
| Open-Meteo | `/forecast` (7 gün) | Lazım deyil | Qeyri-kommersiya istifadə üçün açıqdır (cari limitləri sənəddən yoxla) |

**OpenWeatherMap açarı necə alınır:**

1. [openweathermap.org/api](https://openweathermap.org/api) saytında qeydiyyatdan keç.
2. Hesab səhifəsində **API keys** bölməsinə get və açarı kopyala.
3. Açar yeni yaradılıbsa, 2 saata qədər aktiv olmaya bilər. Bu müddətdə "API key is wrong" xətası görünəcək.

Açarın işlədiyini yoxlamaq üçün brauzerdə bu linki aça bilərsən (`SENIN_ACARIN` yerinə öz açarını yaz):

`https://api.openweathermap.org/data/2.5/weather?q=Baku&appid=SENIN_ACARIN&units=metric`

## Məhdudiyyətlər

- **UV Index:** pulsuz planda UV məlumatı yoxdur, ona görə "N/A" göstərilir.
- **Air Quality** və **Today / Tomorrow** tabları yalnız görünüş üçündür.
- **GET STARTED** düyməsi hazırda heç bir əməliyyat etmir.
- **Dark / light toggle** yalnız dark mode-u göstərir.
- Layout desktop üçün hazırlanıb, mobil uyğunlaşdırma yoxdur.
- API açarı brauzerdə görünür. Real layihədə sorğular server tərəfdə göndərilməlidir.

## Qovluq strukturu

```
software-village-weather-app/
├── index.html                 səhifənin əsas strukturu
├── css/
│   └── style.css              bütün dizayn
├── images/                    hava ikonları və dizayn şəkilləri (SVG)
├── js/
│   ├── config.js              öz API açarın (GitHub-a göndərilmir)
│   ├── messages.js            xəta və status mesajları
│   ├── api.js                 OpenWeatherMap və Open-Meteo sorğuları
│   ├── utils.js               vaxt, gün, ikon və hesablama funksiyaları
│   ├── rainChart.js           Chance of Rain qrafiki
│   └── script.js              səhifəni məlumatla doldurur
├── public/
│   └── screenshots/           README üçün ekran görüntüləri
├── .gitignore
└── README.md
```

## Müəllif

- **Ad, soyad:** [Toğrul Hüseynli]
- **GitHub:** https://github.com/[togrulhuseynli05]
- **LinkedIn:** https://linkedin.com/in/[togrulhuseyn05]
