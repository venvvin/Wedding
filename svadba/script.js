document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const langButtons = document.querySelectorAll("[data-lang]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  function updateActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
    });
  });

  const translations = {
    en: {
      "nav.home": "Home",
      "nav.schedule": "Schedule",
      "nav.travel": "Travel",
      "nav.party": "Wedding Party",
      "nav.todo": "Things to Do",
      "nav.faq": "FAQs",

      "hero.eyebrow": "We’re getting married",
      "hero.location": "Rimini, Italy",

      "schedule.title": "Schedule",
      "schedule.ceremonyTitle": "Ceremony",
      "schedule.receptionTitle": "Reception",
      "schedule.receptionText": "Dinner, speeches and dancing",

      "travel.title": "Travel",
      "travel.intro": "A few travel notes to make your stay easy, relaxed, and enjoyable.",
      "travel.airportTitle": "Airport",
      "travel.airportText": "Nearest airports:",
      "travel.accommodationTitle": "Accommodation",
      "travel.accommodationText1": "We recommend staying near the city center or near the venue.",
      "travel.accommodationText2": "Hotel suggestions and booking links can go here later.",
      "travel.weatherTitle": "Expected Weather",
      "travel.weatherIntro": "You can expect warm late-summer days, plenty of sunshine, and mild evenings.",
      "travel.weatherDay1": "Partly cloudy",
      "travel.weatherDay2": "Sunny",
      "travel.weatherDay3": "Sunny",
      "travel.weatherDay4": "Sunny",
      "travel.packTitle": "What to Pack",
      "travel.packText": "We recommend bringing light clothing for warm days, something elegant for the celebration, comfortable shoes, and a light layer for the evening.",
      "travel.arrivalTitle": "Arrival Tip",
      "travel.arrivalText": "If possible, we recommend arriving at least one day before the wedding so you can settle in and enjoy the weekend with us.",
      "travel.closing": "We look forward to welcoming you there.",

      "party.title": "Wedding Party",
      "party.maidOfHonor": "Maid of Honor",
      "party.bestMan": "Best Man",
      "party.groupTitle": "Bridesmaids & Groomsmen",
      "party.groupText": "Add your names here",

      "todo.title": "Things to Do",
      "todo.intro": "We chose Rimini not only for our wedding, but also for its atmosphere. Here are a few places and experiences we think you’ll love.",
      "todo.centerTitle": "Historic Center",
      "todo.centerText": "Walk through the old town, visit Arco di Augusto and Ponte di Tiberio.",
      "todo.beachTitle": "Beach & Sunset",
      "todo.beachText": "Enjoy long sandy beaches and beautiful sunsets by the sea.",
      "todo.foodTitle": "Food & Aperitivo",
      "todo.foodText": "Try local pasta, seafood and don’t miss an evening aperitivo.",
      "todo.gelatoTitle": "Gelato Stops",
      "todo.gelatoText": "Take a break with authentic Italian gelato around the city.",
      "todo.sanmarinoTitle": "San Marino Trip",
      "todo.sanmarinoText": "A short trip to San Marino offers stunning views and a unique atmosphere.",
      "todo.relaxTitle": "Just Relax",
      "todo.relaxText": "Slow down, enjoy the vibe, coffee, and time with friends and family.",

      "faq.title": "FAQs",
      "faq.q1": "What should I wear?",
      "faq.a1": "We would love to see everyone dressed in elegant wedding attire. Think classic, refined, and appropriate for a warm late-summer celebration.",
      "faq.q2": "Will transportation be provided?",
      "faq.a2": "Information will be shared closer to the wedding.",
      "faq.q3": "Will the ceremony and reception take place at the same venue?",
      "faq.a3": "The ceremony will take place in the church, followed by a transfer to the reception venue.",
      "faq.q4": "Will the wedding be indoors or outdoors?",
      "faq.a4": "If the weather is nice, the celebration will be held outdoors. In case of unfavorable weather, everything will take place indoors.",
      "faq.q5": "Is there a dress code for the welcome dinner or other events?",
      "faq.a5": "Details will be shared closer to the date.",
      "faq.q6": "Can I take photos during the ceremony?",
      "faq.a6": "Yes, you are welcome to take photos.",
      "faq.q7": "Should we rent a car?",
      "faq.a7": "Renting a car can be helpful, but it is not necessary.",
      "faq.q8": "Will there be transportation after the celebration?",
      "faq.a8": "Information will be shared closer to the wedding.",
      "hero.playGame": "Want to win a prize? Play the game",

      "game.title": "Wedding Game",
      "game.subtitle": "Play and win a prize",
      "game.nameLabel": "Your name",
      "game.namePlaceholder": "Enter your name",
      "game.countryLabel": "Where are you coming from?",
      "game.countrySK": "Slovakia",
      "game.countryIT": "Italy",
      "game.countryLU": "Luxembourg",
      "game.start": "Start game",
      "game.controls": "Use ↑ and ↓ to avoid obstacles and reach the wedding.",
      "game.winTitle": "You won!",
      "game.winText": "Your prize: a dance with the newlyweds",
      "game.download": "Download your prize",
      "game.back": "Back to website",
      "game.retry": "Try again",
      "game.language": "Language",
      "footer.text": "Zuzka & Valerio · 19 September 2026"

    },

    sk: {
      "nav.home": "Domov",
      "nav.schedule": "Program",
      "nav.travel": "Cestovanie",
      "nav.party": "Svadobná oslava",
      "nav.todo": "Tipy v okolí",
      "nav.faq": "FAQ",

      "hero.eyebrow": "Budeme sa brať",
      "hero.location": "Rimini, Taliansko",

      "schedule.title": "Program",
      "schedule.ceremonyTitle": "Obrad",
      "schedule.receptionTitle": "Hostina",
      "schedule.receptionText": "Večera, príhovory a zábava",

      "travel.title": "Cestovanie",
      "travel.intro": "Niekoľko praktických informácií, aby bol váš pobyt jednoduchý, príjemný a bez stresu.",
      "travel.airportTitle": "Letisko",
      "travel.airportText": "Najbližšie letiská:",
      "travel.accommodationTitle": "Ubytovanie",
      "travel.accommodationText1": "Odporúčame ubytovanie blízko centra mesta alebo v blízkosti miesta konania.",
      "travel.accommodationText2": "Sem je možné neskôr doplniť tipy na hotely a rezervačné odkazy.",
      "travel.weatherTitle": "Očakávané počasie",
      "travel.weatherIntro": "Môžete očakávať teplé neskoro-letné dni, veľa slnka a príjemné večery.",
      "travel.weatherDay1": "Polooblačno",
      "travel.weatherDay2": "Slnečno",
      "travel.weatherDay3": "Slnečno",
      "travel.weatherDay4": "Slnečno",
      "travel.packTitle": "Čo si zbaliť",
      "travel.packText": "Odporúčame vziať si ľahké oblečenie na teplé dni, niečo elegantné na oslavu, pohodlné topánky a ľahkú vrstvu na večer.",
      "travel.arrivalTitle": "Tip k príchodu",
      "travel.arrivalText": "Ak je to možné, odporúčame prísť aspoň deň pred svadbou, aby ste sa stihli ubytovať a užiť si s nami celý víkend.",
      "travel.closing": "Tešíme sa, že vás tam privítame.",

      "party.title": "Svadobná oslava",
      "party.maidOfHonor": "Svedkyňa",
      "party.bestMan": "Svedok",
      "party.groupTitle": "Družičky a družbovia",
      "party.groupText": "Sem doplňte mená",

      "todo.title": "Tipy v okolí",
      "todo.intro": "Rimini sme si vybrali nielen kvôli svadbe, ale aj kvôli jeho atmosfére. Tu je niekoľko miest a zážitkov, ktoré by sa vám mohli páčiť.",
      "todo.centerTitle": "Historické centrum",
      "todo.centerText": "Prejdite sa starým mestom a navštívte Arco di Augusto a Ponte di Tiberio.",
      "todo.beachTitle": "Pláž a západ slnka",
      "todo.beachText": "Užite si dlhé piesočné pláže a krásne západy slnka pri mori.",
      "todo.foodTitle": "Jedlo a aperitivo",
      "todo.foodText": "Ochutnajte miestne cestoviny, morské plody a večerné aperitivo.",
      "todo.gelatoTitle": "Gelato",
      "todo.gelatoText": "Dajte si pravé talianske gelato kdekoľvek v meste.",
      "todo.sanmarinoTitle": "Výlet do San Marina",
      "todo.sanmarinoText": "Krátky výlet do San Marina ponúka krásne výhľady a jedinečnú atmosféru.",
      "todo.relaxTitle": "Oddych",
      "todo.relaxText": "Spomaľte, užite si atmosféru, kávu a čas s blízkymi.",

      "faq.title": "FAQ",
      "faq.q1": "Čo si mám obliecť?",
      "faq.a1": "Budeme radi, ak si všetci zvolia elegantné svadobné oblečenie. Myslite na klasický a vkusný štýl vhodný na teplú neskoro-letnú oslavu.",
      "faq.q2": "Bude zabezpečená doprava?",
      "faq.a2": "Informácie budú zdieľané bližšie k termínu svadby.",
      "faq.q3": "Bude obrad aj hostina na tom istom mieste?",
      "faq.a3": "Obrad sa uskutoční v kostole, následne bude presun na miesto hostiny.",
      "faq.q4": "Bude svadba vnútri alebo vonku?",
      "faq.a4": "Ak bude pekné počasie, oslava sa uskutoční vonku. V prípade nepriaznivého počasia sa všetko presunie dovnútra.",
      "faq.q5": "Je dress code aj na welcome dinner alebo iné sprievodné udalosti?",
      "faq.a5": "Detaily budú zdieľané bližšie k dátumu.",
      "faq.q6": "Môžem počas obradu fotiť?",
      "faq.a6": "Áno, fotenie je vítané.",
      "faq.q7": "Máme si požičať auto?",
      "faq.a7": "Požičanie auta môže byť praktické, ale nie je nevyhnutné.",
      "faq.q8": "Bude po oslave zabezpečená doprava?",
      "faq.a8": "Informácie budú zdieľané bližšie k termínu svadby.",
      "hero.playGame": "Chceš získať cenu? Zahraj si hru",

      "game.title": "Svadobná hra",
      "game.subtitle": "Zahraj si a vyhraj cenu",
      "game.nameLabel": "Tvoje meno",
      "game.namePlaceholder": "Zadaj svoje meno",
      "game.countryLabel": "Odkiaľ prichádzaš?",
      "game.countrySK": "Slovensko",
      "game.countryIT": "Taliansko",
      "game.countryLU": "Luxembursko",
      "game.start": "Spustiť hru",
      "game.controls": "Použi ↑ a ↓, vyhýbaj sa prekážkam a doraz na svadbu.",
      "game.winTitle": "Vyhral si!",
      "game.winText": "Tvoja výhra: tanec s novomanželmi",
      "game.download": "Stiahnuť výhru",
      "game.back": "Späť na stránku",
      "game.retry": "Skúsiť znova",
      "game.language": "Jazyk",
      "footer.text": "Zuzka & Valerio · 19. september 2026"
    },

    it: {
      "nav.home": "Home",
      "nav.schedule": "Programma",
      "nav.travel": "Viaggio",
      "nav.party": "Corte nuziale",
      "nav.todo": "Cose da fare",
      "nav.faq": "FAQ",

      "hero.eyebrow": "Ci sposiamo",
      "hero.location": "Rimini, Italia",

      "schedule.title": "Programma",
      "schedule.ceremonyTitle": "Cerimonia",
      "schedule.receptionTitle": "Ricevimento",
      "schedule.receptionText": "Cena, discorsi e festa",

      "travel.title": "Viaggio",
      "travel.intro": "Qualche informazione utile per rendere il vostro soggiorno semplice, piacevole e rilassato.",
      "travel.airportTitle": "Aeroporto",
      "travel.airportText": "Aeroporti più vicini:",
      "travel.accommodationTitle": "Alloggio",
      "travel.accommodationText1": "Consigliamo di soggiornare vicino al centro città o vicino alla location.",
      "travel.accommodationText2": "Qui potete aggiungere in seguito suggerimenti per hotel e link di prenotazione.",
      "travel.weatherTitle": "Meteo previsto",
      "travel.weatherIntro": "Potete aspettarvi giornate calde di fine estate, tanto sole e serate piacevoli.",
      "travel.weatherDay1": "Parzialmente nuvoloso",
      "travel.weatherDay2": "Soleggiato",
      "travel.weatherDay3": "Soleggiato",
      "travel.weatherDay4": "Soleggiato",
      "travel.packTitle": "Cosa mettere in valigia",
      "travel.packText": "Consigliamo abiti leggeri per le giornate calde, qualcosa di elegante per la festa, scarpe comode e uno strato leggero per la sera.",
      "travel.arrivalTitle": "Consiglio per l’arrivo",
      "travel.arrivalText": "Se possibile, vi consigliamo di arrivare almeno un giorno prima del matrimonio, così potrete sistemarvi e godervi il weekend con noi.",
      "travel.closing": "Non vediamo l’ora di darvi il benvenuto.",

      "party.title": "Corte nuziale",
      "party.maidOfHonor": "Damigella d'onore",
      "party.bestMan": "Testimone",
      "party.groupTitle": "Damigelle e testimoni",
      "party.groupText": "Aggiungete qui i nomi",

      "todo.title": "Cose da fare",
      "todo.intro": "Abbiamo scelto Rimini non solo per il matrimonio, ma anche per la sua atmosfera. Ecco alcuni luoghi ed esperienze che pensiamo vi piaceranno.",
      "todo.centerTitle": "Centro storico",
      "todo.centerText": "Passeggiate nel centro storico e visitate l’Arco di Augusto e il Ponte di Tiberio.",
      "todo.beachTitle": "Spiaggia e tramonto",
      "todo.beachText": "Godetevi le lunghe spiagge sabbiose e i bellissimi tramonti sul mare.",
      "todo.foodTitle": "Cibo e aperitivo",
      "todo.foodText": "Provate la pasta locale, il pesce e non perdetevi un aperitivo serale.",
      "todo.gelatoTitle": "Gelato",
      "todo.gelatoText": "Concedetevi un vero gelato italiano in città.",
      "todo.sanmarinoTitle": "Gita a San Marino",
      "todo.sanmarinoText": "Una breve gita a San Marino offre viste spettacolari e un’atmosfera unica.",
      "todo.relaxTitle": "Relax",
      "todo.relaxText": "Rilassatevi, godetevi l’atmosfera, un caffè e il tempo con amici e famiglia.",
      "hero.playGame": "Vuoi vincere un premio? Gioca",

      "game.title": "Gioco del matrimonio",
      "game.subtitle": "Gioca e vinci un premio",
      "game.nameLabel": "Il tuo nome",
      "game.namePlaceholder": "Inserisci il tuo nome",
      "game.countryLabel": "Da dove vieni?",
      "game.countrySK": "Slovacchia",
      "game.countryIT": "Italia",
      "game.countryLU": "Lussemburgo",
      "game.start": "Inizia il gioco",
      "game.controls": "Usa ↑ e ↓ per evitare gli ostacoli e arrivare al matrimonio.",
      "game.winTitle": "Hai vinto!",
      "game.winText": "Il tuo premio: un ballo con gli sposi",
      "game.download": "Scarica il tuo premio",
      "game.back": "Torna al sito",
      "game.retry": "Riprova",
      "game.language": "Lingua",
      "faq.title": "FAQ",
      "faq.q1": "Come devo vestirmi?",
      "faq.a1": "Ci farebbe piacere vedere tutti con un abbigliamento elegante da matrimonio. Pensate a uno stile classico, raffinato e adatto a una calda festa di fine estate.",
      "faq.q2": "Sarà previsto il trasporto?",
      "faq.a2": "Le informazioni saranno condivise più vicino alla data del matrimonio.",
      "faq.q3": "Cerimonia e ricevimento si terranno nello stesso luogo?",
      "faq.a3": "La cerimonia si terrà in chiesa, seguita dal trasferimento alla location del ricevimento.",
      "faq.q4": "Il matrimonio sarà al chiuso o all’aperto?",
      "faq.a4": "Se il tempo sarà bello, la festa si svolgerà all’aperto. In caso di maltempo, tutto si terrà al chiuso.",
      "faq.q5": "C’è un dress code per la welcome dinner o altri eventi?",
      "faq.a5": "I dettagli saranno condivisi più vicino alla data.",
      "faq.q6": "Posso fare foto durante la cerimonia?",
      "faq.a6": "Sì, siete i benvenuti a fare foto.",
      "faq.q7": "Dovremmo noleggiare un’auto?",
      "faq.a7": "Noleggiare un’auto può essere utile, ma non è necessario.",
      "faq.q8": "Ci sarà trasporto dopo la festa?",
      "faq.a8": "Le informazioni saranno condivise più vicino alla data del matrimonio.",

      "footer.text": "Zuzka & Valerio · 19 settembre 2026"
    }
  };

  function updateLangButtons(lang) {
    langButtons.forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-lang") === lang);
    });
  }

  function updateNavToggleLabel(lang) {
    if (!navToggle) return;

    if (lang === "sk") {
      navToggle.setAttribute("aria-label", "Otvoriť menu");
    } else if (lang === "it") {
      navToggle.setAttribute("aria-label", "Apri menu");
    } else {
      navToggle.setAttribute("aria-label", "Open menu");
    }
  }

  function setLang(lang) {
    const currentTranslations = translations[lang] || translations.en;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (currentTranslations[key] !== undefined) {
        el.textContent = currentTranslations[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (currentTranslations[key] !== undefined) {
        el.innerHTML = currentTranslations[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (currentTranslations[key] !== undefined) {
        el.placeholder = currentTranslations[key];
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (currentTranslations[key] !== undefined) {
        el.setAttribute("title", currentTranslations[key]);
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (currentTranslations[key] !== undefined) {
        el.setAttribute("aria-label", currentTranslations[key]);
      }
    });

    updateNavToggleLabel(lang);
    updateLangButtons(lang);
    localStorage.setItem("lang", lang);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      if (lang) {
        setLang(lang);
      }
    });
  });

  const savedLang = localStorage.getItem("lang") || "en";
  setLang(savedLang);
});