---
slug: inserire-testo-predefinito-editor-wordpress
published: true
title: Inserire del testo predefinito all'interno dell'editor di testo di WordPress
publishDate: 25 Mar 2016
description: Come inserire testo predefinito nell'editor WordPress senza plugin
---

Quando si consegna un sito al cliente fatto con WordPress può essere una buona idea dare la possibilità nel momento in cui si crea un nuovo articolo o una nuova pagina di avere del testo già inserito in modo da agevolare il lavoro dello scrittore.

Ecco come fare per inserire un testo nell'editor di WordPress senza l'ausilio di plugin.

<!--more-->

Per farlo è necessario modificare il file **functions.php** del nostro template WordPress inserendo in coda il seguente codice:

```php
add_filter( 'default_content', 'pu_default_editor_content' );

function pu_default_editor_content( $content ) {
    global $post_type;

    switch( $post_type )
    {
        case 'post':
            $content = 'Default content for blog posts.';
        break;

        case 'page':
            $content = 'Default content for pages.';
        break;
    }

    return $content;
}
```

In pratica se si crea una nuova pagina si inserirà un determinato testo, se si crea un nuovo articolo ci sarà un altro.

Per altre info ti rimando al [sito di wpRecipes (Inglese)](http://www.wprecipes.com/how-to-pre-populate-wordpress-editor-with-default-content).
