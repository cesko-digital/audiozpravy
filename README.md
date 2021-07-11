![cesko.digital](cesko-digital_logo.png)

# 🎧 Audiozprávy

Oficiální repozitář týmu Audiozpráv v projeku #run-inovace-zpravodajskeho-storytellingu na Česko.digital

## 🔎 Co je obsahem repozitáře?

**/app** - mobilní aplikace Audiozpráv

**/backend** - API / BE aplikace (rekomendační systém)

**/infrastructure** - Terraform definice cloudové infrastruktury

**/pipeline** - pipeline zpracování nových zpráv (RSS scrape, preprocessing, TTS)

## 🛠 Jak přispívat?

**Jazyky:**

* Angličtina: Kód, komentáře, pull-requesty, commit zprávy
* Čeština: README a Issues

**Issues:**

* Název by měl obsahovat zda se jedná o vývoj na aplikaci, nebo backendu + výstižný popisek (např. APP: Home screen komponenta)
* Issue by měl obsahovat snadno pochopitelné zadání, z kterého bude zřejmé co je výstupem
* Pokud se jedná o issue na FE měl by obsahovat screenshot z Figmy + odkaz na Figmu
* Jednodušší issues tagujeme "good first issue", abychom mohli lépe vybírat úkoly pro juniornější vývojáře
* Jakmile se někdo issue ujme, je potřeba ho k němu přiřadit

**Pull-requesty:**

* Vytváříme fork-branches s názvem {iniciály-developera}-{číslo-issue}-{krátký-popisek}, tedy např. ``jn-74-test-branch``
* Před vytvořením pull-requestu interactive rebase s jedním commitem, ostatní jako fixup (název commitu = název branche)
* Název pull requestu = název branch
* Každé issue by mělo projít code-review od tech-lead + v případě práce na FE i schválení ze projektové strany týmu / grafika

## 🏛 Struktura BE aplikace

![](services.svg)

## 🚀 Setup mobilní aplikace

``cd app`` - move to app directory

``yarn install`` - install project dependencies

``yarn start`` - to start dev enviroment

## ☎️ Komu se mám ozvat?

**Techlead:** Jiří Zikeš (jiri@xomlo.io, 725 523 929)
