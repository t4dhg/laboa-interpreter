# Laboa Programazio Hizkuntza

![Laboa logo](https://taigmaccarthy.com/img/laboa/laboa-logo.svg)

**Laboa** euskararen gramatika eta lexikoa darabilen programazio-lengoaia da, euskal terminologia eta egiturak erabiliz programazioarekin esperimentatzeko eta hura sustatzeko sortua.

Proiektuak Mikel Laboa kantari donostiarraren izena darama, haren izaera berritzaile eta esperimentalarekin bat egiten duelako.

## Aurkezpena

Laboa euskarazko sintaxia JavaScriptera itzultzen duen transpilatzailea da. Proiektuaren helburua programazioaren mundua eta euskara modu erraz eta naturalean uztartzea da, betiere euskararen ezaugarri kultural eta linguistikoak errespetatuz.

## Benetan behar al dugu euskarazko programazio hizkuntza bat?

Programazio-hizkuntza gehienak ingelesez dira; hau da, ingelesaren egitura sintaktikoetan oinarritzen dira. Egitura hauek oso antzekoak dira gazteleraz, baina euskaraz **gure hizkuntzaren egituren berezitasunek pentsaera eta logika desberdinak** dakartzate.

Adibidez, ingerezezko eta gaztelaniazko kondizionalak antzekoak dira:

```js
// Ingel­eraz
function sing(x) {
  if x < 20 or x > 40:
    show('Hey Jude');
  else:
    show("don't be afraid");
}
// Gaztel­eraz
función cantar(x) {
  si x < 20 o x > 40:
    muestra('Ai torito');
  si no:
    muestra('mi torito guapo');
}
```

Ingelesezko (“If … else”) eta gaztelaniazko (“Si … Si no”) sintaxiek antzeko egitura, hitz-orden eta kokapen arauak dituzte. Baino euskaraz, kondizionalek egitura desberdinak dituzte:

```js
// Ingel­eraz
function sing(x) {
  if x > 20 or x < 40:
    show('Hey Jude');
}

// Euskaraz
funtzio abestu(x) {
  x > 20 edo x < 40 bada:
    ageri('Lau teilatu');
}
```

## Hizkuntzaren Ezaugarriak

### Oinarrizko Sintaxia

Laboak bi sintaxi mota onartzen ditu, bata funtzio-estilokoa eta bestea Pythonen antzekoa:

#### Funtzio-estiloko sintaxia

```laboa
funtzio abestu(x) {
  x > 20 edo x < 40 bada:
    ageri('Lau teilatu');
}
```

#### Pythonen antzeko sintaxia

```laboa
funtzio abestia(x):
  x < 20 edo x > 40 bada:
    ageri('Txoria txori')
  bestela:
    ageri('Liluraren kontra')
```

### Gako-hitzak eta Egiturak

| Kategoria      | Ingelesa                                 | Euskara                                                | Adibidea                             |
| -------------- | ---------------------------------------- | ------------------------------------------------------ | ------------------------------------ |
| **Funtzioak**  | `function`, `def`, `return`              | `funtzio`, `definitu`, `itzuli`                        | `funtzio kalkulatu() { itzuli 42; }` |
| **Aldagaiak**  | `var`, `let`, `const`                    | `orokor`, `aldagarri`, `finko`                         | `finko izena = 'Mikel';`             |
| **Baldintzak** | `if`, `else`, `else if`                  | `... bada:`, `bestela:`, `bestela ... bada:`           | `x > 10 bada: ageri('Handia');`      |
| **Begiztak**   | `for`, `while`, `break`, `continue`      | `errepikatu`, `bitartean`, `eten`, `jarraitu`          | `bitartean i < 10: i = i + 1;`       |
| **Logika**     | `and`, `or`, `not`                       | `eta`, `edo`, `ez`                                     | `x > 5 eta y < 10 bada:`             |
| **Datu Motak** | `int`, `string`, `bool`, `list`, `float` | `osoa`, `katea`, `boolearra`, `zerrenda`, `hamartarra` | `aldagarri zerrenda = [1, 2, 3];`    |

### Funtzio Integratuak

| Funtzioa | Euskara    | Azalpena                 | Adibidea                                   |
| -------- | ---------- | ------------------------ | ------------------------------------------ |
| `print`  | `ageri`    | Informazioa pantailan    | `ageri('Kaixo mundua!');`                  |
| `input`  | `sartu`    | Erabiltzailearen sarrera | `aldagarri izena = sartu('Zure izena: ');` |
| `length` | `luzera`   | Luzera lortu             | `ageri(luzera('euskera'));`                |
| `range`  | `bitartea` | Zenbaki-tartea sortu     | `errepikatu i bitartea(0, 10):`            |

### Kateen Metodoak

| Metodoa | Euskara  | Azalpena       | Adibidea                |
| ------- | -------- | -------------- | ----------------------- |
| `join`  | `lotu`   | Kateak elkartu | `lotu(['a', 'b'], '-')` |
| `split` | `zatitu` | Katea zatitu   | `zatitu('a-b-c', '-')`  |

### Fitxategi Eragiketak

| Eragiketa | Euskara    | Azalpena            | Adibidea                              |
| --------- | ---------- | ------------------- | ------------------------------------- |
| `open`    | `ireki`    | Fitxategia ireki    | `aldagarri fitx = ireki('data.txt');` |
| `read`    | `irakurri` | Fitxategia irakurri | `aldagarri edukia = irakurri(fitx);`  |
| `write`   | `idatzi`   | Fitxategian idatzi  | `idatzi(fitx, 'testua');`             |
| `close`   | `itxi`     | Fitxategia itxi     | `itxi(fitx);`                         |

### Errore Motak

| Ingelesezko Errorea | Euskarazko Baliokidea     |
| ------------------- | ------------------------- |
| `SyntaxError`       | `SintaxiHutsa`            |
| `NameError`         | `IzenHutsa`               |
| `TypeError`         | `MotaHutsa`               |
| `ValueError`        | `BalioHutsa`              |
| `IndexError`        | `IndizeHutsa`             |
| `FileNotFoundError` | `FitxategiEzAurkituHutsa` |

## Instalazioa eta Erabilera

### Aurrebaldintzak

- Node.js (14 bertsitik aurrera)

### Instalazioa

```bash
# Biltegi hau klonatu
git clone https://github.com/t4dhg/laboa-interpreter.git
cd laboa-interpreter

# Menpekotasunak instalatu
npm install
```

### Erabilera

#### Komando Lerroko Interfazea

```bash
# Laboa fitxategia exekutatu
node laboa.js run adibideak/kaixo.laboa

# JavaScriptera transpilatu
node laboa.js transpile adibideak/sinplea.laboa irteera.js

# REPL interaktiboa
node laboa.js repl
```

## Adibideak

### Kaixo Mundua

```laboa
ageri('Kaixo mundua!')
ageri('Haizea dabil orratz artean...')
```

### Aldagaiak eta Funtzioak

```laboa
finko abeslaria = 'Mikel'
aldagarri urte_magikoa = 1934

funtzio kantatu(izena, urtea) {
    ageri('Abeslari handia: ' + izena)
    ageri('Jaio zen urtea: ' + urtea)
    ageri('Beti gure bihotzetan')
}

kantatu(abeslaria, urte_magikoa)
```

### Begiztoak eta Baldintzak

```laboa
aldagarri abestiak = ['Txoria txori', 'Lau teilatu', 'Haizea dabil', 'Beti da goizaro']

errepikatu abestia abestiak-n:
    baldin luzera(abestia) > 10 bada:
        ageri(abestia + ' - abesti luzea da')
    bestela:
        ageri(abestia + ' - abesti laburra da')
```

### Zerrendekin Lan Egitea

```laboa
aldagarri kantauak = ['Txoria txori', 'Lau teilatu', 'Haizea dabil']

errepikatu kanta kantauak-n:
    ageri('♪ ' + kanta + ' ♪')

gehitu(kantauak, 'Beti da goizaro')
ageri('Orain ' + luzera(kantauak) + ' kanta ditugu bilduman')
```

## Proiektuaren Egitura

```
laboa/
├── README.md
├── TUTORIAL.md
├── package.json
├── laboa.js (CLI sarrera puntua)
├── src/
│   ├── laboa.js (transpilatzaile nagusia)
│   ├── lexer.js (tokenizatzailea)
│   ├── parser.js (AST analizatzailea)
│   ├── transpiler.js (JS kode sortzailea)
│   └── builtins.js (funtzio eraikiak)
├── adibideak/
│   ├── kaixo.laboa
│   ├── sinplea.laboa
│   ├── funtzioak.laboa
│   ├── motak.laboa
│   └── begiztoak.laboa
└── tests/
    └── test.js
```

## Ekarpenak

Ekarpenak ongi etorriak dira! Mesedez, bidali arazoak eta pull request-ak Laboa hobetzen laguntzeko.

## Lizentzia

Apache 2.0. Begiratu LICENSE fitxategia xehetasunetarako.

## Euskerari Buruz

Proiektu honen helburua euskera programazioaren bitartez sustatzea da, garatzaileentzat eskuragarri eginez bere ezaugarri linguistiko bereziak mantenduz. Euskera Europako hizkuntza zaharrenetako bat da eta era digitalean ospatu behar da.

Mikel Laboa bezala, hizkuntza eta kultura gordetzen eta zabaltzen saiatzen gara, teknologiaren bidez euskerari etorkizun digitalean lekua emanez.
