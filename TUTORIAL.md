# Laboa Programazio Hizkuntzaren Tutorea

## Sarrera

Laboa euskeraren gramatika eta hitz-altxorra darabilen programazio hizkuntza da. Helburua euskaldunei programazioa modu errazean gerturatzea eta euskarak mundu digitalean presentzia handiagoa izatea da.

## Oinarriak

### Iruzkinak

```laboa
# Hau iruzkin bat da
# Iruzkinak # ikurrarekin hasten dira
```

### Aldagaiak

```laboa
# Aldagaien deklarazioa
orokor    x = 10      # var   x = 10
aldagarri y = 20      # let   y = 20
finko     Z = 3.14    # const Z = 3.14
```

### Datu motak

```laboa
# Zenbakiak
aldagarri osoa = 42
aldagarri hamartarra = 3.14159

# Kateak
aldagarri katea = 'Kaixo mundua!'
aldagarri testua = "Euskara polita da"

# Boolearrak
aldagarri egia = egia           # egia
aldagarri gezurra = gezurra     # gezurra

# Zerrendak
aldagarri zenbakiZerrenda = [1, 2, 3, 4, 5]
aldagarri frutak = ['sagarra', 'laranja', 'banana']

# Balio hutsa
aldagarri balioHutsa = hutsa         # null
```

## Funtzioak

### Oinarrizko funtzioak

```laboa
funtzio agurtu(izena) {
    ageri('Kaixo, ' + izena + '!')
}

agurtu('Ane')
```

### Balioa itzultzen duten funtzioak

```laboa
funtzio batu(x, y) {
    itzuli x + y
}

aldagarri emaitza = batu(10, 5)
ageri('Emaitza: ' + emaitza)  # Irteera: Emaitza: 15
```

### Pythonen antzeko sintaxia funtzioetan

```laboa
funtzio biderkatu(x, y):
    itzuli x * y

ageri(biderkatu(4, 3))  # Irteera: 12
```

## Baldintzak

### Baldintza sinpleak: `bada` eta `bestela`

```laboa
aldagarri zenbakia = 15

zenbakia > 10 bada:
    ageri('Zenbakia hamar baino handiagoa da.')
bestela:
    ageri('Zenbakia hamar edo txikiagoa da.')
```

### Baldintza anizkoitzak

```laboa
aldagarri nota = 85

nota >= 90 bada:
    ageri('Bikain!')
bestela, nota >= 80 bada:
    ageri('Oso ongi')
bestela, nota >= 70 bada:
    ageri('Ongi')
bestela:
    ageri('Hobetu behar duzu')
```

### Eragile logikoak

```laboa
aldagarri x = 15
aldagarri y = 25

x > 10 eta y < 30 bada:
    ageri('Bi baldintzak betetzen dira.')

x < 5 edo y > 20 bada:
    ageri('Gutxienez baldintza bat betetzen da.')

ez (x == y) bada:
    ageri('x eta y ez dira berdinak.')
```

## Begiztak

### `errepikatu` begizta, `bitartea` erabiliz

```laboa
# 1etik 5era zenbakiak inprimatu
errepikatu i bitartea(1, 6):
    ageri('Zenbakia: ' + i)
```

### `errepikatu` begizta, zerrenda batekin

```laboa
aldagarri koloreak = ['gorria', 'urdina', 'horia', 'berdea']

errepikatu kolorea koloreaken:
    ageri('Kolorea: ' + kolorea)
```

### `bitartean` begizta

```laboa
aldagarri kontagailua = 0

bitartean kontagailua < 5:
    ageri('Kontagailua: ' + kontagailua)
    kontagailua = kontagailua + 1
```

## Zerrendak

### Zerrendak sortu eta atzitu

```laboa
aldagarri zenbakiak = [10, 20, 30, 40, 50]

# Elementuak indizearen bidez atzitu
ageri(zenbakiak[0])    # Lehen elementua: 10
ageri(zenbakiak[2])    # Hirugarren elementua: 30

# Zerrendaren luzera lortu
ageri('Luzera: ' + luzera(zenbakiak))
```

### Zerrenda metodoak

```laboa
aldagarri zerrenda = ['a', 'b', 'c']

# Elementu bat gehitu amaieran
gehitu(zerrenda, 'd')
ageri(zerrenda)        # ['a', 'b', 'c', 'd']

# Elementu bat kendu indizearen arabera
aldagarri kendutakoa = kendu(zerrenda, 1)
ageri('Kendutako elementua: ' + kendutakoa)  # 'b'
ageri(zerrenda)                              # ['a', 'c', 'd']
```

## Kateak

### Kateen eragiketak

```laboa
aldagarri testua = 'Euskara polita da'

# Katearen luzera
ageri('Luzera: ' + luzera(testua))

# Kateen elkarketa
aldagarri agurra = 'Kaixo' + ' ' + 'Mikel'
ageri(agurra)

# Katea zatitu
aldagarri hitzak = zatitu(testua, ' ')
ageri(hitzak)          # ['Euskara', 'polita', 'da']

# Zerrenda bat kate bihurtu
aldagarri berrizElkartuta = lotu(hitzak, '-')
ageri(berrizElkartuta) # 'Euskara-polita-da'
```

## Motak

### Motaren definizioa

```laboa
mota Pertsona:
    funtzio __hasiera__(norbera, izena, adina):
        norbera.izena = izena
        norbera.adina = adina

    metodoa agurtu(norbera):
        ageri('Kaixo, ni ' + norbera.izena + ' naiz.')

    metodoa urtebeteZahartu(norbera):
        norbera.adina = norbera.adina + 1
        ageri(norbera.izena + ' orain ' + norbera.adina + ' urte ditu.')
```

### Motaren erabilera

```laboa
# Objektuak sortu
aldagarri mikel = berri Pertsona('Mikel', 30)
aldagarri ane = berri Pertsona('Ane', 25)

# Metodoei deitu
mikel.agurtu()          # Kaixo, ni Mikel naiz.
ane.agurtu()            # Kaixo, ni Ane naiz.

mikel.urtebeteZahartu() # Mikel orain 31 urte ditu.
```

## Erroreen kudeaketa

### `saiatu`, `harrapatu` eta `azkenean`

```laboa
saiatu:
    aldagarri emaitza = 10 / 0
    ageri('Emaitza: ' + emaitza)
harrapatu errorea:
    ageri('Errore bat gertatu da: ' + errorea)
azkenean:
    ageri('Exekuzioa amaitu da.')
```

## Fitxategiak

```laboa
# Fitxategi bat ireki irakurtzeko
aldagarri fitxategia = ireki('data.txt', 'r')

# Fitxategiaren edukia irakurri
aldagarri edukia = irakurri(fitxategia)
ageri('Fitxategiaren edukia: ' + edukia)

# Fitxategia itxi
itxi(fitxategia)

# Fitxategi batean idatzi
aldagarri idaztekoFitxategia = ireki('irteera.txt', 'w')
idatzi(idaztekoFitxategia, 'Kaixo fitxategitik!')
itxi(idaztekoFitxategia)
```

## Funtzio integratuak

### Eragiketa matematikoak

```laboa
ageri(batu(5, 3))      # Batuketa: 8
ageri(ken(10, 4))      # Kenketa: 6
ageri(biderkatu(6, 7)) # Biderketa: 42
ageri(zatitu(15, 3))   # Zatiketa: 5
```

### Beste funtzio erabilgarri batzuk

```laboa
aldagarri testua = 'euskara'
ageri(luzera(testua))      # Luzera: 7
ageri(alderantziz(testua)) # Alderantziz: arakuse

aldagarri zerrenda = [3, 1, 4, 1, 5]
ageri(ordenatu(zerrenda))  # Ordenatuta: [1, 1, 3, 4, 5]

# Mota egiaztatu
ageri(mota(42))       # osoa
ageri(mota('kaixo'))  # katea
ageri(mota([1,2,3]))  # zerrenda
```

## Adibide praktikoak

### Zenbakia asmatzeko jolasa

```laboa
funtzio jolastu() {
    aldagarri zenbakiEzkutua = Math.floor(Math.random() * 100) + 1
    aldagarri saiakerak = 0

    ageri('Asmatu zenbaki bat, 1 eta 100 artean!')

    bitartean egia:
        aldagarri erantzuna = sartu('Sartu zenbaki bat: ')
        saiakerak = saiakerak + 1

        erantzuna == zenbakiEzkutua bada:
            ageri('Zorionak! ' + saiakerak + ' saiakeratan asmatu duzu!')
            eten
        bestela, erantzuna < zenbakiEzkutua bada:
            ageri('Handiagoa da!')
        bestela:
            ageri('Txikiagoa da!')
}

jolastu()
```

### Kalkulagailu sinplea

```laboa
funtzio kalkulagailua() {
    ageri('Kalkulagailu sinplea')
    ageri('Eragiketak: +, -, *, /')

    aldagarri a = sartu('Lehen zenbakia: ')
    aldagarri eragiketa = sartu('Eragiketa: ')
    aldagarri b = sartu('Bigarren zenbakia: ')

    aldagarri emaitza

    aukeratu eragiketa:
        kasua '+':
            emaitza = a + b
        kasua '-':
            emaitza = a - b
        kasua '*':
            emaitza = a * b
        kasua '/':
            b != 0 bada:
                emaitza = a / b
            bestela:
                ageri('Errorea: Ezin da zeroz zatitu!')
                itzuli

    ageri('Emaitza: ' + emaitza)
}

kalkulagailua()
```

## Laboa vs beste hizkuntzak

| **Laboa**    | **JavaScript** | **Python** | **Euskarazko esanahia** |
| ------------ | -------------- | ---------- | ----------------------- | ---- | --- |
| `funtzio`    | `function`     | `def`      | funtzioa                |
| `itzuli`     | `return`       | `return`   | itzuli                  |
| `... bada`   | `if`           | `if`       | baldin... bada          |
| `bestela`    | `else`         | `else`     | bestela                 |
| `bitartean`  | `while`        | `while`    | bitartean               |
| `errepikatu` | `for`          | `for`      | errepikatu              |
| `eta`        | `&&`           | `and`      | eta                     |
| `edo`        | `              |            | `                       | `or` | edo |
| `ez`         | `!`            | `not`      | ez                      |
| `ageri`      | `console.log`  | `print`    | agertu/erakutsi         |

## Laboa kodea exekutatu

### Komando-lerrotik

```bash
# Fitxategi bat exekutatu
node laboa.js exekutatu nire_fitxategia.laboa

# JavaScriptera transpilatu
node laboa.js transpilatu sarrera.laboa irteera.js

# REPL interaktiboa
node laboa.js repl
```

Tutoretza honek Laboaren ezaugarri nagusiak biltzen ditu. Lengoaia garatzen ari da, eta etorkizuneko bertsioetan ezaugarri gehiago gehi daitezke.
