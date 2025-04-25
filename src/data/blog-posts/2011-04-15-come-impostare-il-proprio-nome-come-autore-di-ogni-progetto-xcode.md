---
slug: Come impostare il proprio nome come autore di ogni progetto Xcode
published: true
title: Come impostare il proprio nome come autore di ogni progetto Xcode
publishDate: 15 Apr 2011
description: Come impostare il proprio nome come autore di ogni progetto Xcode
---

Ogni volta che si crea un nuovo progetto Xcode imposta in automatico la stringa
// Copyright __MyCompanyName__ 2011. All rights reserved.
all&rsquo;interno del nostro codice, per ogni classe creata.

<!--more-->

Visto che &egrave; un p&ograve; brutto publicare codice con questo commento, ma al tempo stesso pu&ograve; essere un operazione molto lunga sostituire per ogni classe creata questo commento si pu&ograve; sostituire il campo MyCompanyName con un altro testo a piacere, ed ecco come: eseguire da terminale una delle due stringhe seguenti

<strong>defaults write com.apple.ProjectBuilder PBXCustomTemplateMacroDefinitions &lsquo;{ &ldquo;ORGANIZATIONNAME&rdquo; = &ldquo;My Company&rdquo;;}&rsquo;</strong>

oppure

<strong>defaults write com.apple.Xcode PBXCustomTemplateMacroDefinitions &lsquo;{ &ldquo;ORGANIZATIONNAME&rdquo; = &ldquo;My Company&rdquo;;}&rsquo;</strong>
<p>Dove al posto di &lsquo;<em>My Company&rsquo;</em> potrete inserire ad esempio il vostro nome.
