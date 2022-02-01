## Ordner: @/api

Code in diesem Ordner definiert die Business-Logik des
Projektes. Dazu gehören folgende Aspekte

- Authentifizierung/Authorisierung
- DB-Zugriff
- Tipprunden-Logik

Der Code darf keinen React-Anteil haben, d.h. jeglicher Import
aus entsprechenden React-Modulen ist verboten.

Vielmehr sollte er den Modulen in den Ordnern
@/lib, @/backyard und @/front-of-house einen Zugriff
auf obige APIs bieten.

