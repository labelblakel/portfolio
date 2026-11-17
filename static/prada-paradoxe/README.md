# Prada Paradoxe — landing page

Responsywna strona na podstawie pliku `Custom UI.rar`. Oryginalne grafiki oraz polskie teksty pochodzą z dostarczonego projektu. Sześć sekcji: hero, odkryj zapach, składniki, produkty, ponowne napełnianie, prezent.

## Uruchomienie

Nie wymaga instalacji ani budowania. Otwórz `dist/index.html` lub uruchom:

```sh
python3 -m http.server 8080 --directory dist
```

## Interakcje

- Animacje wejścia podczas przewijania (`IntersectionObserver`), subtelne wejście hero i animowane liczby.
- Hovery składników (białe tło 15%, skala 101,5%), przycisków oraz zdjęć produktów.
- Składniki reagują również na klawiaturę i dotyk; Escape usuwa aktywne zaznaczenie. Punkty na zdjęciu aktywują odpowiedni opis.
- Pasek postępu przewijania, odnośniki do sekcji i powrót na początek.
- Obsługa `prefers-reduced-motion` i przełącznik animacji. Treść pozostaje widoczna bez JavaScriptu.

Przyciski ODKRYJ i KUP zachowują demonstracyjny charakter projektu: efekt hover, bez linków do sklepu. Są oznaczone `aria-disabled` i mają opis dla czytników ekranu. Promocja i procenty są treścią materiału źródłowego, a nie potwierdzeniem aktualnej oferty.

## Pliki

- `dist/index.html`: semantyczny HTML i treść
- `dist/styles.css`: układ, responsywność, animacje i hovery
- `dist/script.js`: obsługa przewijania, składników i preferencji ruchu
- `dist/assets/`: lokalne grafiki; strona nie pobiera zewnętrznych bibliotek, fontów ani trackerów

## Integracja z portfolio

Katalog `dist` jest gotową stroną statyczną. W repozytorium Gatsby jego zawartość trafia do `static/prada-paradoxe/`; Gatsby kopiuje te pliki do `public/prada-paradoxe/`. Po wdrożeniu portfolio strona będzie dostępna pod ścieżką `/prada-paradoxe/`. Można też opublikować samą zawartość tego katalogu na dowolnym hostingu statycznym, w tym GitHub Pages.

Zasoby marki są dostarczonym materiałem projektowym; nie przenoszą praw do znaków ani fotografii.
