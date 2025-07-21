---
slug: java-cancellare-files-cartelle
published: true
title: Java, come cancellare files e cartelle
publishDate: 19 Aug 2011
description: Guida su come cancellare file e cartelle in Java.
---

Le librerie di Java.io permettono ad un applicazione scritta di Java di eseguire operazioni sul file sistem. La cosa interessante è che essendo Java un linguaggio multipiattaforma si può cancellare un file su Windows, Mac o Linux indistintamente, logicamente inserendo il gisuto path.

Il codice che permette di fare la cancellazione è il seguente:

```java
public static boolean deleteDir(String percorso_del_file) {
  File dir = new File(percorso_del_file);
  if (dir.isDirectory()) {
    String[] children = dir.list();
    for (int i = 0 ; i < children.length ; i++ ) {
      boolean success = deleteDir(new File( dir , children[i] ) );
      if (!success) {
        return false;
      }
    }
}
```

Una volta che la directory è vuota posso cancellarla

```java
return dir.delete();
```

Fonte:
[http://www.exampledepot.com/egs/java.io/DeleteDir.html](http://www.exampledepot.com/egs/java.io/DeleteDir.html)
