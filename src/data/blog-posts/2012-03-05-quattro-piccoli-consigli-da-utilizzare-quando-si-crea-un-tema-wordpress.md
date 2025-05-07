---
slug: quattro-piccoli-consigli-da-utilizzare-quando-si-crea-un-tema-wordpress
published: true
title: Quattro piccoli consigli da utilizzare quando si crea un tema wordpress
publishDate: 05 Mar 2012
description: Suggerimenti pratici per la creazione di temi WordPress personalizzati
---

Nell'ultimo periodo mi sono dovuto confrontare con la creazione di un template wordpress (ancora in lavorazione), ho affrontato varie difficoltà ed ho pensato di comunicarvi qualche mia piacevole scoperta e qualche problema che ho risolto.

<!--more-->

### Header Footer Sidebar e Index

I file di un template Wordpress sono vari, i più importanti sono style.css (che contiene lo stile del sito), functions.php (che contiene le funzioni php utilizzate dal sito) e poi index.php. Il file **index.php** è quello che si apre non appena il sito è visitato, può essere statico o dinamico, ma visto che si può impostare statico dalle impostazioni wordpress ci interessa crearlo dinamico. Per una buona programmazione è consigliabile lavorare con modularità, la pagina index può essere scomposta in header (la parte che sta in alto di un sito), il footer (quella che sta in basso nel sito) e la sidebar, un componente che è posizionata lateralmente al contenuto del sito. Eseguire una separazione del codice permette una gestione più facile della pagina, se chiamiamo rispettivamente *header.php*, *footer.php* e *sidebar.php* i file possono essere caricati tramite delle chiamate molto semplici all'interno del file index.php:

```php
<?php get_header() ?>
<?php get_sidebar() ?>
<?php get_footer() ?>
```

In questo modo possiamo usare le stesse componenti in ogni pagina che creiamo oppure per esempio eliminare la sidebar su alcune pagine.

Una cosa da fare se si usa la sidebar è accertarsi che nel file functions.php sia presente il seguente codice:

```php
if ( function_exists('register_sidebar') ) {
  register_sidebar(array(
    'name'=>'sidebar',
    'before_widget' => '',
    'after_widget' => '</li>',
    'before_title' => '',
    'after_title' => '</h3>',
  ));
}
```

Una volta inserito questo codice sarà possibile inserire widget all'interno della sidebar.

### Il Loop

Il loop è una delle funzioni più interessanti, serve a stampare a video tutti i vari articoli, in base a varie caratteristiche. Questo è il codice raccomandato da wordpress.org:

```php
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
  <?php if ( in_category('3') ) { ?>
    <div class="post-cat-three">
  <?php } else { ?>
    <div class="post">
  <?php } ?>
  
  <h2>
    <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>">
      <?php the_title(); ?>
    </a>
  </h2>
  
  <small>
    <?php the_time('F jS, Y') ?> by <?php the_author_posts_link() ?>
  </small>
  
  <div class="entry">
    <?php the_content(); ?>
  </div>
  
  <div class="postmetadata">
    Posted in <?php the_category(', '); ?>
  </div>
  
<?php endwhile; else: ?>
  Sorry, no posts matched your criteria.
<?php endif; ?>
```

Le righe di codice interessanti sono:

```php
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
```

Questa riga permette appunto di ciclare per tutti i risultati di un'interrogazione su tutti gli articoli del sito. Questa interrogazione può essere modificata, decidendo ad esempio di stampare solo gli articoli di un determinato autore, con una determinata caratteristica o è anche possibile scegliere quanti articoli stampare per pagina usando 

```php
query_posts( 'posts_per_page=7' );
```

prima del while.

Il comando `<?php the_content(); ?>` mostra il contenuto di un articolo, molto probabilmente noi vorremmo solo farne vedere un'anteprima, e per farlo dobbiamo sostituire questa riga con:

```php
<?php the_excerpt(__('Read more',False));?>
```

### Seo Like

Esistono molti plugin per rendere il proprio sito più **SeoLike**, in pochi sanno però che è possibile inserire delle ottimizzazioni all'interno del proprio template rendendo tutto più facile. Come fare? Basta inserire le seguenti righe di codice all'interno del file functions.php:

```php
<?php
//Ottimizzazione SEO
function add_meta_tag(){
  global $wp_query;
  $post = $wp_query->get_queried_object();
  $desc = get_bloginfo('description');
  $KeywordsAssociated = "LE KEYWORDS DI DEFAULT";
  $keys = $KeywordsAssociated;
  
  if(is_single() || is_page()){
    $desc = cut($post->post_content, 25);
  }
  
  if(is_single()){
    $keywords = array();
    $tags = get_the_tags($post->ID);
    $categories = get_the_category($post->ID);
    
    if(is_array($tags)){
      foreach ($tags as $tag)
        $keywords[] = $tag->name;
    }
    
    if(is_array($categories)){
      foreach ($categories as $category)
        $keywords[] = $category->cat_name;
    }
    
    $keys = implode(", ", $keywords);
  }
  
  if(is_category()){
    $desc = strip_tags(category_description());
  }
  
  $desc = str_replace(array("n","r","t"), " ", $desc);
  $desc = str_replace('"', "'", $desc);
  
  echo '<meta name="description" content="' . $desc . '" />' . "n";
  echo '<meta name="keywords" content="'. $keys . '" />' . "n";
}

add_action('wp_head', 'add_meta_tag');

function cut($content, $cut = 0, $encode_html = 0) {
  if ( $cut && !$encode_html )
    $encode_html = 2;
  
  if ( 1== $encode_html ) {
    $content = wp_specialchars($content);
    $cut = 0;
  } elseif ( 0 == $encode_html ) {
    $content = make_url_footnote($content);
  } elseif ( 2 == $encode_html ) {
    $content = strip_tags($content);
  }
  
  if ( $cut ) {
    $blah = explode(' ', $content);
    if ( count($blah) > $cut ) {
      $k = $cut;
      $use_dotdotdot = 1;
    } else {
      $k = count($blah);
      $use_dotdotdot = 0;
    }
    
    for ( $i=0; $i<$k; $i++ )
      $excerpt .= $blah[$i].' ';
    
    $excerpt .= ($use_dotdotdot) ? '...' : '';
    $content = $excerpt;
  }
  
  $content = str_replace(']]>', ']]&gt;', $content);
  return $content;
}
?>
```

Dove "LE KEYWORDS DI DEFAULT" sono le keywords che vogliamo impostare di Default per il sito, per ogni articolo invece verrà creato un meta tag per la descrizione della pagina contenente un buon numero di parole iniziali dell'articolo, come Keywords saranno usate le categorie e le keywords dello stesso.

Per rendere il titolo del sito più indicizzabile si deve sostituire il nodo "title" all'interno dell'"head" con:

```php
<title>
  <?php
    wp_title('');
    if (function_exists('is_tag') and is_tag()) {
      echo 'Tag per ' . $tag;
    }
    if (is_archive()) {
      echo 'Archivio ';
    } elseif (is_search()) {
      echo 'Ricerca per ' . wp_specialchars($s,1);
    }
    if ( !(is_404()) && (is_search()) or (is_single()) or (is_page()) or (function_exists('is_tag') and is_tag()) or (is_archive()) ) {
      echo ' | ';
    }
    bloginfo('name');
    if(is_home()) {
      echo ' - ';
      bloginfo('description');
    }
  ?>
</title>
```

### Codice Per numero di fans su Facebook

Una cosa molto simpatica per un sito con una pagina facebook è pubblicare il numero di fan, non è molto difficile, basta incollare questo codice dove si vuole che appaia il numero:

```php
<?php
  $page_id = "XXXXXXXXXXXX";
  $xml = @simplexml_load_file("http://api.facebook.com/restserver.php?method=facebook.fql.query&query=SELECT%20fan_count%20FROM%20page%20WHERE%20page_id=".$page_id."") or die ("a lot");
  $fans = $xml->page->fan_count;
  echo $fans;
?>
```

E sostituire il valore XXXXXXXXXXXX con il pageId della pagina facebook associata.

### Dove andare da qua?

Creare un template da zero è sicuramente difficile, richiede molto tempo ed una buona conoscenza di php e CSS oltre che le api di wordpress. Permette però di avere un vestito fatto su misura per il proprio sito, ed è possibile anche rivenderlo a terzi. Consiglio in generale una lettura del codex di Wordpress e magari per avere qualcosa di italiano consiglio le guide di [yourinspirationweb](http://www.yourinspirationweb.com). Consiglio inoltre una veloce lettura anche degli snippets di wordpress che spesso contengono codice per creare qualcosa di molto carino.

Per i consigli sul SEO ringrazio **[Daniele Ghidoli](http://danieleghidoli.it/)** di [bigthink.it](http://www.bigthink.it/)
