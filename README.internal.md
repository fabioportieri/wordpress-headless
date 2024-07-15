# Link utili

- repository github (doc): `https://github.com/WPGov/amministrazione-trasparente`

- doc rest:

`https://learn.wordpress.org/tutorial/interacting-with-the-wordpress-rest-api/`
`https://developer.wordpress.org/rest-api/reference/posts/`
`https://rudrastyh.com/wordpress/rest-api-create-post.html`

`https://developer.wordpress.org/rest-api/`

## TODO

### STEP 1

    fai un form con richtexteditor, possibilita' di creare allegati e associare il contenuto/form ad una tipologia/sezione/tassonomia

    sulla falsariga di:

![alt text](image.png)

### STEP 2

    possibilita' di pubblicare su wordpress da AlboPretorio
    Albopretorio ha gia la sua UI per la generazione di contenuti, si vuole un pulsante/widget che permetta di pubblicare un contenuto gia' fatto su una sezione

    widget/form in cui selezioni una tipologia e pubblichi un contenuto (con allegati) per quella tipologia

### STEP 3 (LOW PRIORITY)

    ristrutturare/ampliare il plugin, permettendo ad esempio la gestione di nuovi gruppi oltre agli standard:

![alt text](image-1.png)

## CRITICITA'

1. ~~recuperare lista tipologie da endpoint (per creare nuovo contenuto)~~

2. pubblicare un nuovo contenuto su tipologia di amm. trasparente

3. recuperare albero gruppi / ~~tipologie~~ / contenuti da endpoint (per riprodurre immagine 2 da webapp client)

### appunti

curl -H "Authorization: Bearer YOUR_TOKEN" "http://example.com/wp-json/wp/v2/posts?post_type=book"
curl "http://example.com/wp-json/wp/v2/posts?post_type=book&per_page=20&page=2"

http://192.168.1.157/demo.dmi

rest api discovery: GET da browser su : http://192.168.1.157/demo.dmi/wp-json/
contiene anche doc in json schema delle api

TODO serve configurare il cors
