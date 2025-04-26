---
slug: javascript-controllo-estensioni-file
published: true
title: Effettuare controllo sulle estensioni dei file allegati in una Form
publishDate: 21 Lug 2011
description: Validazione delle estensioni dei file allegati con JavaScript.
---

Uno dei modi migliori per impiegare il javascript è per validare form html. Javascript è molto utile per questo tipo di operazione in quanto funziona lato client, le proprie informazioni non viaggiano nella rete ogni volta che inseriamo dei dati a meno che non siano corretti. In un’applicazione web sulla quale sto lavorando mi sono trovato a dover effettuare l’upload di file ed in particolare di pdf. Posto parte del codice della pagina che effettuava l’upload ed il controllo che il file allegato fosse pdf.

```html
<form name="form1" action="uploadservlet" method="post" enctype="multipart/form-data" name="modulo" onsubmit="return controllopdf();" >
  <label for="filename">File da caricare: </label>
  <input id="filename" type="file" name="filename" size="50"/>
  <input type="submit" value="Carica File"/>
</form>

<script language="Javascript">
  function controllopdf(){
  var filename =document.form1.filename.value;
  var c = filename.length;
  var extension = filename[c-3] +filename[c-2] + filename[c-1];
  if (extension !='pdf'){
    alert('attenzione il file che hai allegato non è un pdf');
    return false;
  } else {
  return true;
  }
</script>
```