# Prada Paradoxe — landing page

Responsywna strona na podstawie dostarczonego pliku `Custom UI.rar`. Sześć sekcji: hero, odkryj zapach, składniki, produkty, ponowne napełnianie, prezent. Oryginalne grafiki i polskie teksty pochodzą z materiału źródłowego.

## Uruchomienie

Strona nie wymaga instalacji zależności ani budowania. W głównym katalogu repozytorium uruchom:

```sh
python3 -m http.server 8080 --directory static/prada-paradoxe
```

Następnie otwórz http://localhost:8080. Można też otworzyć `static/prada-paradoxe/index.html` bezpośrednio.

## Interakcje

- Animacje wejścia podczas przewijania, subtelne wejście hero i animowane wartości procentowe.
- Hovery składników (białe tło 15%, skala 101,5%), przycisków oraz zdjęć produktów.
- Obsługa dotyku i klawiatury; punkty na zdjęciu aktywują odpowiednie opisy. Escape usuwa zaznaczenie.
- Pasek postępu przewijania, odnośnik do treści i powrót na początek.
- Obsługa `prefers-reduced-motion` i przełącznik animacji. Bez JavaScriptu cała treść pozostaje widoczna.

Przyciski ODKRYJ i KUP zachowują demonstracyjny charakter projektu: efekty hover, bez docelowych linków do sklepu. Są oznaczone `aria-disabled` i opisane dla czytników ekranu. Treści promocyjne i procenty pochodzą z projektu źródłowego.

## Integracja i publikacja

Gatsby kopiuje katalog `static/prada-paradoxe/` do `public/prada-paradoxe/`; po wdrożeniu portfolio strona będzie dostępna pod ścieżką `/prada-paradoxe/`. Nie zmienia istniejących stron portfolio.

Cała zawartość tego katalogu jest gotowym pakietem statycznym. Można ją również opublikować niezależnie, np. przez GitHub Pages z wybranym katalogiem jako artefaktem wdrożenia.

Podgląd opublikowano pod adresem https://prada-paradoxe-scroll.pinek545.chatgpt.site (prywatny dostęp przez ChatGPT).

## Weryfikacja

- Poprawność składni JavaScriptu.
- Kompletność lokalnych zasobów i odnośników, unikalne identyfikatory, sześć sekcji, nagłówek główny i opisy grafik.
- Integralność grafik i SVG.
- Testy zachowania animacji, stanów hover, kliknięć, Escape, liczników, przełącznika ruchu i preferencji ograniczenia animacji.
- Zgodność SHA wszystkich plików binarnych wysłanych na GitHub.

Wizualna weryfikacja w przeglądarce pozostała niewykonana: lokalny podgląd nie był dostępny, a logowanie do prywatnego podglądu zostało zablokowane przez automatyczną kontrolę uprawnień.
