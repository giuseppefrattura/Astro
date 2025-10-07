---
slug: strumenti-per-sviluppare-e-testare-web-application-su-idevice
published: true
title: Strumenti per sviluppare e testare web Application su iDevice
publishDate: 29 May 2011
description: Strumenti e tecniche per testare web app su dispositivi iOS.
---

# Strumenti per sviluppare e testare web Application su iDevice

Il mercato delle web application è in grande crescita grazie agli smartphone, che fanno della connessione ad internet il loro punto di forza. Purtroppo l’esigenza di molte persone è avere dei dati disponibili sia su pc che su smartphone, preferibilmente evitando lunghe e/o fastidiose sincronizzazioni dati. È per questo che nascono le web application.

Sviluppare web application richiede una buona conoscenza di programmazione sia lato server (PHP o Java Servlet, sono i linguaggi più usati ) sia lato client dove domina il javascript. Alcuni linguaggi sono compatibili sono su alcuni dispositivi, ad esempio il FLASH non è compatibile su iPhone, iPod e iPad. Altra caratteristica importantissima per l’usabilità della web app è l’uso dei fogli di stile (CSS) che devono rendere l’interazione con l’utente il più facile possibile.

È da poco uscito Dreamweaver 5.5 che contiene varie features che promettono di agevolare lo sviluppo di siti e web app per dispositivi mobili offrendo anche l’integrazione con jquery e jquery mobile.

Per effettuare i test ho usato spesso Safari ed il simulatore iOS incluso nell’iPhone SDK, quest’ultimo si è comportato bene anche quando ho testato i video in HTML5.

Con Safari si può andare nella modalità sviluppo e da lì si può scegliere il dispositivo da simulare, però ci sono dei piccoli difettini, come ad esempio il fatto che i video in HTML5 hanno l’autoplay, cosa che su iPad non è possibile abilitare, e che infatti non è presente nemmeno sul simulatore iOS.
