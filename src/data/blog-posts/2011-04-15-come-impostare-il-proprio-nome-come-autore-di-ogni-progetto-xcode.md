---
slug: come-impostare-il-proprio-nome-come-autore-di-ogni-progetto-xcode
published: true
title: Come impostare il proprio nome come autore di ogni progetto Xcode
publishDate: 15 Apr 2011
description: Guida alla configurazione dell'autore nei progetti Xcode
---

Quando si crea un nuovo progetto Xcode inserisce automaticamente il nome dell'utente del Mac come autore del progetto. Per modificare questo comportamento bisogna:

1. Aprire il terminale
2. Digitare: `defaults write com.apple.Xcode PBXCustomTemplateMacroDefinitions '{"ORGANIZATIONNAME" = "Il tuo nome";}'`

In questo modo ogni nuovo progetto avrà il tuo nome come autore.
