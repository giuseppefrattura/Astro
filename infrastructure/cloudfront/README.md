# Interventi AWS ancora da applicare

## Redirect HTTP 301

`redirects.js` contiene una CloudFront Function (runtime JavaScript 2.0) per i soli vecchi URL `/blog/1` e `/1index`, incluse le varianti con slash e `index.html`. Conserva i parametri della query, inclusi quelli ripetuti.

Il sito genera già redirect HTML, che rispondono HTTP 200. Per ottenere veri HTTP 301:

1. Nella distribuzione del dominio `giuseppefrattura.com`, leggere le associazioni attuali sul comportamento che serve le pagine HTML.
2. Se esiste una funzione viewer-request, integrare `redirectResponse()` nel suo codice e richiamarla **prima** dell'eventuale riscrittura verso `index.html`. Non sostituire il resto dell'handler esistente. Se non esiste alcuna funzione né associazione Lambda@Edge incompatibile, usare l'handler completo fornito.
3. Eseguire il test della versione DEVELOPMENT con i casi coperti da `npm run check:infra`. Salvare il codice e le associazioni precedenti per il rollback.
4. Pubblicare e associare al viewer-request del comportamento appropriato. Non cambiare origine, policy di cache o comportamento degli altri URL.
5. Verificare che `/blog/1/`, `/1index/` e le loro varianti restituiscano 301 con Location corretta; homepage, asset e articoli devono continuare a rispondere normalmente. Ripristinare l'associazione precedente in caso di regressione.

Nessuna modifica AWS viene applicata automaticamente dal workflow di questo repository.

Riferimenti ufficiali: [evento CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html), [esempio di redirect](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_redirect_based_on_country_section.html).

## Cache

Verificati in produzione il 22 ottobre 2026:

- HTML: `public,max-age=0,must-revalidate`.
- Asset con hash in `/_astro/`: `public,max-age=31536000,immutable`.
- Logo in `/assets/`: `public,max-age=86400`.

Gli header sono corretti. Per accertare completamente il comportamento interno di CloudFront, controllare i TTL minimi/massimi della policy associata. Una verifica HTTP esterna non mostra tutte le impostazioni della distribuzione.

## Pulizia degli oggetti obsoleti su S3

Prima di cancellare oggetti, esportare l'inventario del bucket e confrontarlo con i file prodotti dalla build. Limitare l'analisi agli oggetti di questo sito: il bucket potrebbe contenere altri file. Conservare gli asset con hash che possono ancora essere referenziati da HTML nelle cache dei browser. I due vecchi URL noti vengono sovrascritti con redirect HTML al deploy e non richiedono una cancellazione per eliminare la vecchia pagina template.

Non è stata eseguita alcuna cancellazione. Senza accesso all'inventario non è possibile affermare quali altri oggetti siano obsoleti.

## Source map Sentry

Il workflow legge il secret GitHub `SENTRY_AUTH_TOKEN`, attualmente assente. Creare in Sentry un token adatto al caricamento di release/source map per l'organizzazione `fracture` e il progetto `javascript-astro`, quindi salvarlo nel repository GitHub come secret Actions con quel nome. Non inserirlo nei file del progetto o nella chat. Al successivo deploy verificare nei log l'upload delle source map; la segnalazione degli errori client usa già il DSN pubblico e non dipende da questo token.
