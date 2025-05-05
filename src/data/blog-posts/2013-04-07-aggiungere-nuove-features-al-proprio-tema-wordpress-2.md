---
slug: aggiungere-nuove-features-al-proprio-tema-wordpress
published: true
title: Aggiungere nuove features al proprio tema WordPress
publishDate: 07 Apr 2013
description: Guide e snippet per aggiungere funzionalità al proprio tema WordPress
---

Creare un tema WordPress è reso sempre più facile dalle molte guide che si trovano su internet. Voglio condividere alcuni dei così detti code snippet che ho trovato e che consentono di aumentare il numero di features del proprio tema.

<!--more-->

### Aggiungere automaticamente Open Graph ai tuoi post

Open Graph è un protocollo creato da Facebook che rende il contenuto della pagina più facilmente riconoscibile dal social network.

Bisogna inserire il seguente codice all'interno del file functions.php del proprio tema:

```php
function wptuts_opengraph_for_posts() {
    if ( is_singular() ) {
        global $post;
        setup_postdata( $post );
        $output = '<meta property="og:type" content="article" />' . "\n";
        $output .= '<meta property="og:title" content="' . esc_attr( get_the_title() ) . '" />' . "\n";
        $output .= '<meta property="og:url" content="' . get_permalink() . '" />' . "\n";
        $output .= '<meta property="og:description" content="' . esc_attr( get_the_excerpt() ) . '" />' . "\n";
        if ( has_post_thumbnail() ) {
            $imgsrc = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium' );
            $output .= '<meta property="og:image" content="' . $imgsrc[0] . '" />' . "\n";
        }
        echo $output;
    }
}
add_action( 'wp_head', 'wptuts_opengraph_for_posts' );
```

Ora all'interno dell'header.php del proprio tema si modifica quella che dovrebbe essere la prima riga di codice, il tag HTML con:

```html
<html <?php language_attributes(); ?> prefix="og: http://ogp.me/ns#">
```

Nel caso di HTML5 si può anche scrivere:

```html
<!DOCTYPE html prefix="og: http://ogp.me/ns#">
```

### Sostituire automaticamente le parole all'interno dei tuoi post

Nel caso dovessi sostituire alcune parole all'interno di tutti i tuoi post basta copiare il seguente codice all'interno del file functions.php:

```php
function replace_text_wps($text){
    $replace = array(
        // 'WORD TO REPLACE' => 'REPLACE WORD WITH THIS'
        'wordpress' => '<a href="#">wordpress</a>',
        'excerpt' => '<a href="#">excerpt</a>',
        'function' => '<a href="#">function</a>'
    );
    $text = str_replace(array_keys($replace), $replace, $text);
    return $text;
}
add_filter('the_content', 'replace_text_wps');
add_filter('the_excerpt', 'replace_text_wps');
```

### Rimuovere gli elementi dalla barra amministratore di WordPress

Se si vuole evitare che un amministratore acceda ad alcuni menù come quello dei plugin o quello delle impostazioni basta incollare il seguente codice all'interno del file functions.php:

```php
function wps_admin_bar() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('wp-logo');
    $wp_admin_bar->remove_menu('about');
    $wp_admin_bar->remove_menu('wporg');
    $wp_admin_bar->remove_menu('documentation');
    $wp_admin_bar->remove_menu('support-forums');
    $wp_admin_bar->remove_menu('feedback');
    $wp_admin_bar->remove_menu('view-site');
}
add_action( 'wp_before_admin_bar_render', 'wps_admin_bar' );
```

### Cambiare la scritta del footer della parte amministrativa

Cambiare la scritta del footer nella parte amministrativa è a volte utile in quanto è brutto vedere un prodotto con la scritta "Grazie per aver creato questo sito usando WordPress":

```php
function remove_footer_admin () {
    echo "Testo da aggiungere";
}
add_filter('admin_footer_text', 'remove_footer_admin');
```

### Cambiare il mittente delle mail di WordPress

Se vuoi cambiare il mittente delle mail che WordPress invia a te o agli utenti registrati devi inserire le seguenti righe di codice all'interno del file functions.php:

```php
add_filter('wp_mail_from', 'new_mail_from');
add_filter('wp_mail_from_name', 'new_mail_from_name');

function new_mail_from($old) {
 return 'admin@yourdomain.com';
}
function new_mail_from_name($old) {
 return 'Your Blog Name';
}
```

### Creare un pulsante "pin it" di Pinterest per il tuo sito WordPress

Pinterest è uno dei nuovi social network che sta riscuotendo un grandissimo successo. Pinterest è un sito dove le persone condividono le immagini appartenenti a siti internet. Così come per Facebook o Twitter, puoi aggiungere un bottone di Pinterest all'interno del tuo sito per rendere più facile la condivisione dei tuoi articoli.

Inserisci questo codice nel tuo template (non all'interno del file functions.php ma all'interno di header, index, footer, single o page):

```html
<a href="http://pinterest.com/pin/create/button/?url=<?php the_permalink(); ?>&amp;media=<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $thumb['0']; ?>&amp;description=<?php the_title(); ?>" class="pin-it-button" count-layout="horizontal">Pin It</a>
```

Una volta fatto basta caricare la libreria javascript di Pinterest inserendo nel footer:

```html
<script type="text/javascript" src="http://assets.pinterest.com/js/pinit.js"></script>
```

### Mostra quante volte un post è stato condiviso via Twitter

Inserisci all'interno del file functions.php:

```php
function readTwitterShares($url) {
 $s = file_get_contents("http://urls.api.twitter.com/1/urls/count.json?callback=?&url=".urlencode($url));
   preg_match("#(\"count\"):([0-9]*)#",$s,$ar);
   return isset($ar[2]) ? $ar[2] : 0;
}
```

Poi all'interno del post inserisci:

```php
<?php echo readTwitterShares(get_permalink()); ?>
```

### Disabilita automaticamente i commenti più vecchi di X giorni

Se hai articoli molto vecchi sul tuo sito è possibile che parte del codice che hai inserito all'interno sia deprecato, o che in generale la notizia che riporti sia imprecisa. In questo caso conviene disabilitare i post vecchi. Il seguente codice disabiliterà i commenti per gli articoli più vecchi di 30 giorni:

```php
function close_comments( $posts ) {
    if ( !is_single() ) { return $posts; }
    if ( time() - strtotime( $posts[0]->post_date_gmt ) > ( 30 * 24 * 60 * 60 ) ) {
        $posts[0]->comment_status = 'closed';
        $posts[0]->ping_status    = 'closed';
    }
    return $posts;
}
add_filter( 'the_posts', 'close_comments' );
```

Hai altre guide o code snippet che ritieni pertinenti a quanto scritto su questo articolo? Commenta qui sotto o mandami una mail.
