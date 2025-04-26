---
slug: testare-le-proprie-applicazioni-su-iphone-senza-essere-developer
published: true
title: Testare le proprie applicazioni su iPhone senza essere developer
publishDate: 15 Apr 2011
description: Guida per testare app su iPhone senza account developer Apple.
---


Per poter testare le proprie applicazioni sul proprio iPhone o iDevice in generale bisogna essere developer Apple per iOS, questa operazione costa circa 70&euro; all&rsquo;anno.
  <!--more-->
<p>
Per chi per&ograve; vuole solo giocare con le proprie applicazioni o le vuole finire prima di iscriversi come developer c&rsquo;&egrave; qualche possibilit&agrave;.</p>
<p>Per prima cosa bisogna avere un iPhone (o un iPad/iPod) con il Jailbreak ed aver installato AppSync. Attenzione Appsync &egrave; solitamente usato per installare applicazioni pirata, per questo non spiego come installarlo, non &egrave; di per se illegale e su internet si trovano molte guide.</p>
<p>Il secondo passo &egrave; di settare Xcode:<br />

andate su <strong>/developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS[VERSIONE].sdk</strong><br />
dove Versione &egrave; la versione del firmware che intendete usare (solitamente l&rsquo;ultima..).<br />
Aperto il file <strong>SDKSettings.plist</strong> settate il campo <strong>CODE_SIGN_REQUIRED</strong> da YES a NO, poi salvate autenticandovi come amministratori.</p>

<p>Fatto questo aprite Xcode ed andate nelle impostazioni del progetto, cercate il campo &ldquo;<strong>Code Sign Identity</strong>&rdquo; ed impostate &ldquo;<strong>don&rsquo;t code sign</strong>&rdquo;.</p>
<p>Provate a lanciare il progetto con i settaggi di Device e con il vostro dispositivo collegato tramite porta USB e vedrete la vostra applicazione girare sul vostro iPhone.</p>
