---
slug: connettere-un-applicativo-java-ad-oracle
published: true
title: Connettere un applicativo Java ad Oracle
publishDate: 16 Sep 2011
description: Connettere un applicativo Java ad Oracle
---

Per collegare un applicativo java ad un dbms c’è bisogno di un JDBC, nel nostro caso serve il JDBC di ORACLE.  
Creiamo un nuovo progetto Netbeans selezioniamo la categoria Java ed il tipo di progetto Java Application, mettiamo il nome ed assicuriamoci che la classe Main venga creata in automatico. Nelle proprietà del progetto (click col tasto destro sul nome del progetto sulla sinistra) aggiungiamo alle librerie il componente JDBC ed inseriamo nella classe mail il seguente codice:

```java
import java.sql.*;
public class Main {
 public static void main(String[] args) throws ClassNotFoundException, SQLException
 {
  Class.forName("oracle.jdbc.driver.OracleDriver");
  String url = "jdbc:oracle:thin:@//ipServerOracle:Porta/Servizio";
  //nel caso si utilizzi oracle XE il nome del servizio è xe
  Connection conn = DriverManager.getConnection(url,"NomeUtente","PasswordUtente");
 Statement stmt = conn.createStatement();
 //Come effettuare una query e stampare a video i risultati
 ResultSet rset = stmt.executeQuery("select titolo from Libri");
 while (rset.next()) {
  System.out.println (rset.getString(1));
 }
//Come effettuare un insert o un update
 String query="insert into libri values...";
 stmt.executeUpdate(query);
//Chiudiamo la connessione e stampiamo ok
 stmt.close();
 System.out.println ("Ok.");
 }
}
```

Nota bene: non è raccomandabile creare una main class che lancia eccezioni (o che dichiara di farlo), in questo caso è stato fatto solo per esempio.
