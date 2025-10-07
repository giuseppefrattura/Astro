---
slug: creare-ed-usare-files-persistenti-in-un-app-iphone
published: true
title: Creare ed usare files persistenti in un app iPhone
publishDate: 16 Jun 2011
description: Guida su come gestire file persistenti in iPhone.
---

In un applicativo iPhone può essere utile creare dei file, ad esempio di testo, ma non solo e magari poterli inviare via posta.
Per questo scopo ci vengono in aiuto due classi di Cocoa (sia desktop che mobile) NSFileManager ed NSFileHandle.

### Per usare filemanager basta scrivere:

```objective-c
NSFileManager *filemgr;
filemgr = [NSFileManager defaultManager];
```

Da qui le possibilità sono varie:

### Verificare l’esistenza di un file

```objective-c
NSFileManager *filemgr;
filemgr = [NSFileManager defaultManager];
if ([filemgr fileExistsAtPath: @"/tmp/myfile.txt" ] == YES)
 NSLog (@"File exists");
else
 NSLog (@"File not found");
```

### Comparare il contenuto di due file

```objective-c
NSFileManager *filemgr;
filemgr = [NSFileManager defaultManager];
if ([filemgr contentsEqualAtPath: @"/tmp/myfile.txt" andPath: @"/tmp/sales.txt"] == YES)
 NSLog (@"File contents match");
else
 NSLog (@"File contents do not match");
```

### Verificare i permessi di scrittura e lettura di un file

```objective-c
NSFileManager *filemgr;
filemgr = [NSFileManager defaultManager];
if ([filemgr isWritableFileAtPath: @"/tmp/myfile.txt"] == YES)
 NSLog (@"File is writable");
else
 NSLog (@"File is read only");
```

### Muovere/rinominare un file

```objective-c
NSFileManager *filemgr;
filemgr = [NSFileManager defaultManager];
if ([filemgr moveItemAtPath: @"/tmp/myfile.txt" toPath: @"/tmp/newfile.txt" error: NULL] == YES)
 NSLog (@"Move successful");
else
 NSLog (@"Move failed");
```

### Creare una copia di un file

```objective-c
if ([filemgr copyItemAtPath: @"/tmp/myfile.txt" toPath: @"/Users/demo/newfile.txt" error: NULL] == YES)
 NSLog (@"Copy successful");
else
 NSLog (@"Copy failed");
```

### Eliminare un file

```objective-c
NSFileManager *filemgr;
filemgr = [NSFileManager defaultManager];
if ([filemgr removeItemAtPath: @"/tmp/myfile.txt" error: NULL] == YES)
 NSLog (@"Remove successful");
else
 NSLog (@"Remove failed");
```

### Trovare l’offset

NSFileHandle serve per gestire il contenuto dei file.

```objective-c
file = [NSFileHandle fileHandleForUpdatingAtPath: @"/tmp/myfile.txt"];
if (file == nil)
 NSLog(@"Failed to open file");
NSLog (@"Offset = %llu", [file offsetInFile]);
[file seekToEndOfFile];
NSLog (@"Offset = %llu", [file offsetInFile]);
[file seekToFileOffset: 30];
NSLog (@"Offset = %llu", [file offsetInFile]);
[file closeFile];
```

### Leggere i dati da un file

```objective-c
NSData *databuffer;
file = [NSFileHandle fileHandleForReadingAtPath: @"/tmp/myfile.txt"];
if (file == nil)
 NSLog(@"Failed to open file");
[file seekToFileOffset: 10]; //10 byte alla volta
databuffer = [file readDataOfLength: 5];
[file closeFile];
```

### Scrivere dati in un file

```objective-c
#import <Foundation/Foundation.h>
int main (int argc, const char * argv[])
{
 NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
 NSFileHandle *file;
 NSMutableData *data;
 const char *bytestring = "black dog";
 data = [NSMutableData dataWithBytes:bytestring length:strlen(bytestring)];
 file = [NSFileHandle fileHandleForUpdatingAtPath: @"/tmp/quickfox.txt"];
 if (file == nil)
 NSLog(@"Failed to open file");
 [file seekToFileOffset: 10];
 [file writeData: data];
 [file closeFile];
 [pool drain];
 return 0;
}
```

Fonte: [Techotopia](http://www.techotopia.com/index.php/Working_with_Files_in_Objective-C)
