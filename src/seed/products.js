const products = [
  // === ELETTRONICA (categoryId: 1) ===
  { title: 'Cuffie Bluetooth Wireless', description: 'Cuffie over-ear wireless premium con cancellazione attiva del rumore, 30 ore di autonomia e supporto audio Hi-Res. Cuscinetti in memory foam per un comfort prolungato.', price: 149.99, discountPrice: 119.99, sku: 'ELET-1001', categoryId: 1, brand: 'SoundMax', rating: 4.5, ratingCount: 342 },
  { title: 'Smart TV 4K Ultra HD 55"', description: 'Display 4K cristallino con supporto HDR10+, app di streaming integrate, controllo vocale e audio Dolby Atmos. Perfetta per serate cinema e gaming.', price: 699.99, discountPrice: 599.99, sku: 'ELET-1002', categoryId: 1, brand: 'VisionPro', rating: 4.7, ratingCount: 218 },
  { title: 'Laptop Pro 15" i7', description: 'Portatile potente da 15.6 pollici con processore Intel Core i7, 16GB RAM, 512GB SSD e scheda grafica dedicata. Ideale per professionisti e creativi.', price: 1299.99, sku: 'ELET-1003', categoryId: 1, brand: 'TechBook', rating: 4.6, ratingCount: 156 },
  { title: 'Smartphone X12', description: 'Smartphone di punta con display AMOLED da 6.7 pollici, tripla fotocamera (108MP + 12MP + 5MP), connettivita\' 5G e batteria che dura tutto il giorno.', price: 899.99, discountPrice: 799.99, sku: 'ELET-1004', categoryId: 1, brand: 'PhoneX', rating: 4.4, ratingCount: 489 },
  { title: 'Base di Ricarica Wireless', description: 'Caricatore wireless veloce compatibile con tutti i dispositivi Qi. Supporta ricarica rapida fino a 15W con indicatore LED e superficie antiscivolo.', price: 29.99, sku: 'ELET-1005', categoryId: 1, brand: 'ChargeTech', rating: 4.2, ratingCount: 567 },
  { title: 'Tastiera Meccanica Gaming', description: 'Tastiera meccanica RGB con switch Cherry MX, tasti macro programmabili, telaio in alluminio e poggiapolsi rimovibile. N-key rollover per il gaming competitivo.', price: 129.99, discountPrice: 99.99, sku: 'ELET-1006', categoryId: 1, brand: 'GameGear', rating: 4.6, ratingCount: 283 },
  { title: 'Hub USB-C 7-in-1', description: 'Hub USB-C versatile con uscita HDMI 4K, 3 porte USB 3.0, lettore schede SD/microSD e pass-through di alimentazione da 100W. Plug and play.', price: 49.99, sku: 'ELET-1007', categoryId: 1, brand: 'ConnectPro', rating: 4.3, ratingCount: 412 },
  { title: 'Cassa Bluetooth Portatile', description: 'Cassa portatile impermeabile con suono a 360 gradi, 20 ore di autonomia, microfono integrato per chiamate e modalita\' luci RGB.', price: 79.99, discountPrice: 59.99, sku: 'ELET-1008', categoryId: 1, brand: 'SoundMax', rating: 4.4, ratingCount: 321 },
  { title: 'Auricolari con Cancellazione del Rumore', description: 'Auricolari true wireless con cancellazione attiva ibrida del rumore, modalita\' trasparenza, custodia con ricarica wireless e 8 ore di autonomia (32 con custodia).', price: 199.99, sku: 'ELET-1009', categoryId: 1, brand: 'SoundMax', rating: 4.5, ratingCount: 267 },
  { title: 'Tablet Air 10"', description: 'Tablet da 10.9 pollici con display Retina, processore octa-core, 128GB di memoria, supporto per pennino e batteria che dura tutto il giorno.', price: 449.99, discountPrice: 399.99, sku: 'ELET-1010', categoryId: 1, brand: 'TechBook', rating: 4.5, ratingCount: 178 },

  // === ABBIGLIAMENTO (categoryId: 2) ===
  { title: 'T-Shirt in Cotone Classica', description: 'T-shirt morbida in 100% cotone organico con vestibilita\' classica. Tessuto pre-ristretto, colletto rinforzato, disponibile in 12 colori. Perfetta per tutti i giorni.', price: 24.99, sku: 'ABBI-2001', categoryId: 2, brand: 'UrbanBasics', rating: 4.3, ratingCount: 892 },
  { title: 'Jeans Slim Fit', description: 'Jeans slim fit moderni in denim elasticizzato premium. Vita media comoda, gamba affusolata e classico design a cinque tasche.', price: 59.99, discountPrice: 44.99, sku: 'ABBI-2002', categoryId: 2, brand: 'DenimCo', rating: 4.4, ratingCount: 634 },
  { title: 'Cappotto in Misto Lana', description: 'Elegante cappotto doppiopetto in misto lana-cashmere. Completamente foderato con tasche interne. Un capo senza tempo per la stagione fredda.', price: 249.99, sku: 'ABBI-2003', categoryId: 2, brand: 'ClassicWear', rating: 4.7, ratingCount: 145 },
  { title: 'Scarpe da Running Pro', description: 'Scarpe da corsa leggere con ammortizzazione reattiva, tomaia in mesh traspirante e suola in gomma resistente. Progettate per strada e sentieri.', price: 119.99, discountPrice: 89.99, sku: 'ABBI-2004', categoryId: 2, brand: 'SpeedStep', rating: 4.5, ratingCount: 478 },
  { title: 'Borsa a Tracolla in Pelle', description: 'Borsa a tracolla in vera pelle con tracolla regolabile, scomparti multipli e finiture in ottone anticato. Contiene tablet fino a 10 pollici.', price: 89.99, sku: 'ABBI-2005', categoryId: 2, brand: 'CraftLeather', rating: 4.6, ratingCount: 213 },
  { title: 'Occhiali da Sole Aviator', description: 'Occhiali da sole aviator classici con lenti polarizzate, protezione UV400 e montatura leggera in metallo. Include custodia e panno per pulizia.', price: 69.99, discountPrice: 49.99, sku: 'ABBI-2006', categoryId: 2, brand: 'SunStyle', rating: 4.2, ratingCount: 567 },
  { title: 'Sciarpa in Cashmere', description: 'Sciarpa lussuosamente morbida in 100% cashmere. Leggera ma calda, con un delicato motivo a spina di pesce. Misure 180cm x 30cm.', price: 79.99, sku: 'ABBI-2007', categoryId: 2, brand: 'ClassicWear', rating: 4.8, ratingCount: 98 },
  { title: 'Scarponi da Trekking Impermeabili', description: 'Scarponi da trekking robusti e impermeabili con suola Vibram, fodera Gore-Tex e supporto alla caviglia. Per avventure serie su qualsiasi terreno.', price: 179.99, discountPrice: 149.99, sku: 'ABBI-2008', categoryId: 2, brand: 'TrailMaster', rating: 4.6, ratingCount: 312 },

  // === LIBRI (categoryId: 3) ===
  { title: 'L\'Arte della Programmazione', description: 'Guida completa alle best practice di ingegneria del software, design pattern e principi di clean code. Perfetto per sviluppatori di livello intermedio e avanzato.', price: 39.99, sku: 'LIBR-3001', categoryId: 3, brand: 'TechPress', rating: 4.8, ratingCount: 456 },
  { title: 'Manuale di Data Science', description: 'Dalle basi della statistica alle applicazioni di machine learning. Include progetti pratici con Python, dataset reali ed esercizi concreti.', price: 49.99, discountPrice: 37.99, sku: 'LIBR-3002', categoryId: 3, brand: 'TechPress', rating: 4.6, ratingCount: 312 },
  { title: 'Sviluppo Web Moderno', description: 'Padroneggia React, Node.js e il deployment in cloud. Copre sviluppo frontend e backend con esempi di progetti reali e best practice aggiornate.', price: 44.99, sku: 'LIBR-3003', categoryId: 3, brand: 'CodeBooks', rating: 4.5, ratingCount: 287 },
  { title: 'Machine Learning in Pratica', description: 'Guida pratica all\'implementazione di modelli ML in produzione. Copre TensorFlow, PyTorch, deployment dei modelli, monitoraggio e best practice MLOps.', price: 54.99, sku: 'LIBR-3004', categoryId: 3, brand: 'TechPress', rating: 4.7, ratingCount: 198 },
  { title: 'La Mente Creativa', description: 'Esplora la scienza della creativita\' e dell\'innovazione. Combina ricerche neuroscientifiche con tecniche pratiche per sbloccare il tuo potenziale creativo.', price: 19.99, discountPrice: 14.99, sku: 'LIBR-3005', categoryId: 3, brand: 'MindBooks', rating: 4.3, ratingCount: 423 },
  { title: 'Strategia Aziendale 101', description: 'Framework essenziali per il pensiero strategico, analisi competitiva e innovazione dei modelli di business. Utilizzato nei programmi MBA di tutto il mondo.', price: 34.99, sku: 'LIBR-3006', categoryId: 3, brand: 'BizPress', rating: 4.4, ratingCount: 345 },
  { title: 'Cucina per Tutti', description: 'Oltre 200 ricette facili da seguire per ogni livello. Copre cucine internazionali, meal prep, restrizioni alimentari e basi di cucina.', price: 29.99, discountPrice: 22.99, sku: 'LIBR-3007', categoryId: 3, brand: 'FoodBooks', rating: 4.6, ratingCount: 567 },
  { title: 'Storia del Mondo: Un Viaggio', description: 'Un racconto coinvolgente che copre 5000 anni di civilta\' umana. Riccamente illustrato con mappe, cronologie ed estratti da fonti primarie.', price: 42.99, sku: 'LIBR-3008', categoryId: 3, brand: 'HistoryPress', rating: 4.5, ratingCount: 234 },

  // === CASA E CUCINA (categoryId: 4) ===
  { title: 'Set Pentole in Acciaio Inox', description: 'Set professionale da 10 pezzi con costruzione tri-ply in acciaio inox, manici rivettati e coperchi in vetro temperato. Adatto al forno fino a 260°C.', price: 199.99, discountPrice: 159.99, sku: 'CASA-4001', categoryId: 4, brand: 'ChefLine', rating: 4.7, ratingCount: 289 },
  { title: 'Robot Aspirapolvere', description: 'Robot aspirapolvere smart con navigazione LiDAR, aspirazione da 2500Pa, base svuotamento automatico e controllo da app. Gestisce tappeti, parquet e peli di animali.', price: 349.99, sku: 'CASA-4002', categoryId: 4, brand: 'CleanBot', rating: 4.5, ratingCount: 423 },
  { title: 'Cuscino in Memory Foam', description: 'Cuscino ergonomico sagomato con memory foam arricchito di gel rinfrescante. Supporta collo e colonna vertebrale. Include fodera ipoallergenica in bambu\'.', price: 49.99, discountPrice: 39.99, sku: 'CASA-4003', categoryId: 4, brand: 'SleepWell', rating: 4.4, ratingCount: 678 },
  { title: 'Lampada da Scrivania LED', description: 'Lampada da scrivania LED moderna con 5 temperature colore, 7 livelli di luminosita\', porta USB per ricarica e timer automatico 30 minuti. Pannello touch.', price: 39.99, sku: 'CASA-4004', categoryId: 4, brand: 'BrightHome', rating: 4.3, ratingCount: 345 },
  { title: 'Caffettiera French Press', description: 'French press premium da 1 litro con vetro borosilicato a doppia parete, stantuffo in acciaio inox e manico termoresistente. Prepara 8 tazze di caffe\' ricco.', price: 34.99, sku: 'CASA-4005', categoryId: 4, brand: 'BrewMaster', rating: 4.6, ratingCount: 512 },
  { title: 'Purificatore d\'Aria HEPA', description: 'Purificatore d\'aria True HEPA che copre fino a 40 mq. Cattura il 99,97% di allergeni, polvere e fumo. Modalita\' notte silenziosa e indicatore qualita\' dell\'aria.', price: 159.99, discountPrice: 129.99, sku: 'CASA-4006', categoryId: 4, brand: 'PureAir', rating: 4.5, ratingCount: 267 },
  { title: 'Set Taglieri in Bambu\'', description: 'Set di 3 taglieri in bambu\' organico di diverse dimensioni. Superficie delicata sulle lame con scanalature raccogli-succo e impugnature ergonomiche. Antimicrobico.', price: 29.99, sku: 'CASA-4007', categoryId: 4, brand: 'EcoKitchen', rating: 4.4, ratingCount: 423 },
  { title: 'Termostato Smart', description: 'Termostato smart WiFi con capacita\' di apprendimento, report energetici e integrazione con assistenti vocali. Risparmia fino al 23% su riscaldamento e raffrescamento.', price: 199.99, discountPrice: 169.99, sku: 'CASA-4008', categoryId: 4, brand: 'SmartHome', rating: 4.6, ratingCount: 189 },

  // === SPORT E OUTDOOR (categoryId: 5) ===
  { title: 'Tappetino Yoga Premium', description: 'Tappetino yoga extra spesso 6mm con superficie antiscivolo, linee di allineamento e cinghia per trasporto. Realizzato in materiale TPE ecologico. 183cm x 66cm.', price: 39.99, sku: 'SPRT-5001', categoryId: 5, brand: 'ZenFit', rating: 4.5, ratingCount: 567 },
  { title: 'Set Manubri Regolabili', description: 'Manubri regolabili salvaspazio da 2,5 kg a 25 kg ciascuno. Sistema di cambio peso rapido con meccanismo di blocco sicuro. Include vassoio portaoggetti.', price: 299.99, discountPrice: 249.99, sku: 'SPRT-5002', categoryId: 5, brand: 'IronPower', rating: 4.7, ratingCount: 234 },
  { title: 'Tenda da Campeggio 4 Posti', description: 'Tenda a cupola impermeabile per 4 persone con montaggio facile, costruzione a doppia parete, vestibolo per attrezzatura e finestre in rete per ventilazione.', price: 149.99, sku: 'SPRT-5003', categoryId: 5, brand: 'WildCamp', rating: 4.4, ratingCount: 345 },
  { title: 'Borraccia Termica', description: 'Borraccia in acciaio inox a doppia parete con isolamento sottovuoto. Mantiene le bevande fredde 24h o calde 12h. Capacita\' 750ml con tappo a prova di perdita. Senza BPA.', price: 24.99, discountPrice: 19.99, sku: 'SPRT-5004', categoryId: 5, brand: 'HydroMax', rating: 4.6, ratingCount: 789 },
  { title: 'Casco da Ciclismo', description: 'Casco da ciclismo leggero e aerodinamico con sistema di protezione MIPS, 16 canali di ventilazione, regolazione con ghiera e luce LED posteriore integrata.', price: 89.99, sku: 'SPRT-5005', categoryId: 5, brand: 'RideGuard', rating: 4.5, ratingCount: 198 },
  { title: 'Set Elastici Fitness', description: 'Set di 5 elastici di resistenza con diversi livelli di tensione (2-23 kg). Include ancoraggio per porta, maniglie, cavigliere e guida agli esercizi.', price: 19.99, discountPrice: 14.99, sku: 'SPRT-5006', categoryId: 5, brand: 'FlexBand', rating: 4.3, ratingCount: 678 },
  { title: 'Zaino da Trekking 40L', description: 'Zaino da trekking resistente da 40 litri con copripioggia, scomparto per sacca idrica, lunghezza busto regolabile e tasche organizer multiple.', price: 89.99, sku: 'SPRT-5007', categoryId: 5, brand: 'TrailMaster', rating: 4.6, ratingCount: 312 },
  { title: 'Orologio Fitness Tracker', description: 'Fitness tracker avanzato con cardiofrequenzimetro, GPS, monitoraggio del sonno, sensore ossigeno nel sangue e 7 giorni di autonomia. Impermeabile fino a 50m.', price: 129.99, discountPrice: 99.99, sku: 'SPRT-5008', categoryId: 5, brand: 'FitPulse', rating: 4.4, ratingCount: 456 },

  // === BELLEZZA E CURA DELLA PERSONA (categoryId: 6) ===
  { title: 'Siero Vitamina C', description: 'Siero viso illuminante con 20% Vitamina C, acido ialuronico e vitamina E. Riduce macchie scure, linee sottili e uniforma il tono della pelle. Flacone contagocce da 30ml.', price: 29.99, sku: 'BELL-6001', categoryId: 6, brand: 'GlowSkin', rating: 4.5, ratingCount: 567 },
  { title: 'Spazzolino Elettrico Pro', description: 'Spazzolino elettrico sonico con 5 modalita\' di pulizia, sensore di pressione, timer 2 minuti e 30 giorni di autonomia. Include 3 testine e custodia da viaggio.', price: 79.99, discountPrice: 59.99, sku: 'BELL-6002', categoryId: 6, brand: 'DentaCare', rating: 4.6, ratingCount: 423 },
  { title: 'Asciugacapelli Ionico', description: 'Asciugacapelli professionale ionico con motore da 1875W, 3 impostazioni di calore, tasto colpo freddo e bocchetta concentratrice. Riduce crespo e tempi di asciugatura.', price: 59.99, sku: 'BELL-6003', categoryId: 6, brand: 'StylePro', rating: 4.4, ratingCount: 345 },
  { title: 'Crema Viso Idratante', description: 'Crema idratante quotidiana ricca con ceramidi, niacinamide e SPF 30. Formula non grassa adatta a tutti i tipi di pelle. Testata dermatologicamente. 50ml.', price: 24.99, discountPrice: 19.99, sku: 'BELL-6004', categoryId: 6, brand: 'GlowSkin', rating: 4.5, ratingCount: 678 },
  { title: 'Kit Cura della Barba', description: 'Set completo per la cura della barba con olio, balsamo, pettine in legno, spazzola in setole di cinghiale, forbici e sagoma. Ingredienti 100% naturali.', price: 34.99, sku: 'BELL-6005', categoryId: 6, brand: 'ManCraft', rating: 4.3, ratingCount: 234 },
  { title: 'Crema Solare SPF 50', description: 'Protezione solare leggera ad ampio spettro con SPF 50. Resistente all\'acqua, non comedogenica e reef-safe. Formula senza alone bianco. Tubo da 100ml.', price: 14.99, sku: 'BELL-6006', categoryId: 6, brand: 'SunShield', rating: 4.4, ratingCount: 890 },
  { title: 'Set Oli Essenziali', description: 'Set di 8 oli essenziali puri: lavanda, eucalipto, tea tree, menta, arancia, limone, rosmarino e incenso. 10ml ciascuno. Per diffusore o uso topico.', price: 24.99, discountPrice: 18.99, sku: 'BELL-6007', categoryId: 6, brand: 'PureEssence', rating: 4.6, ratingCount: 456 },
  { title: 'Set Pennelli Trucco', description: 'Set professionale di 12 pennelli trucco con setole sintetiche, manici in bambu\' e custodia arrotolabile in pelle. Per fondotinta, cipria, contouring e occhi.', price: 29.99, sku: 'BELL-6008', categoryId: 6, brand: 'BeautyTools', rating: 4.5, ratingCount: 345 }
];

function seedProducts(db) {
  const insert = db.prepare(
    `INSERT INTO products (title, description, price, discountPrice, stock, sku, categoryId, image, images, rating, ratingCount, brand)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  for (const p of products) {
    const stock = Math.floor(Math.random() * 200) + 10;
    const image = `https://picsum.photos/seed/${p.sku}/400/400`;
    const images = JSON.stringify([
      `https://picsum.photos/seed/${p.sku}-1/400/400`,
      `https://picsum.photos/seed/${p.sku}-2/400/400`,
      `https://picsum.photos/seed/${p.sku}-3/400/400`
    ]);

    insert.run(
      p.title, p.description, p.price, p.discountPrice || null,
      stock, p.sku, p.categoryId, image, images,
      p.rating, p.ratingCount, p.brand
    );
  }
  console.log(`  ✓ ${products.length} prodotti inseriti`);
}

module.exports = seedProducts;
