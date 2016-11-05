
'use strict';

//hämtar Application-modulen som redan är skapad i Application.js
var application = angular.module('App');

  application.factory('projectsService', function () {

  var projects = [

      {
        name: "Kandidatarbete - Optimering",
        id: 1,
        shortDesc: "Tillsammans med en klasskamrat utvecklade jag en herustik för ruttoptimering av snöplogning i stadsmiljö.",
        desc: [ "Under det tredje året på min utbildning på Linköpings universitet, genomförde jag tillsammans med en klasskamrat ett kandidatarbete inom optimering. Projektet gick ut på att utveckla, implementera och genomföra tester av en optimeringsheuristik för ruttplanering av snöplogning i stadsmiljö.",
                "Heuristiken utvecklades för plogning av gator med olika längd och med olika hög prioritet, målet var att maximera plogning av högt prioriterade gator. Heuristiken tog inte enbart hänsyn till olika prioritet på gatorna, utan även till hur mycket trafik det fanns på vägarna. Heuristiken utvecklades även med ett varierbart sökdjup där det gick att bestämma hur många steg framåt i vägnätverket den tar hänsyn till när beslut fattas om vilken gata som skull plogas härnäst. Utgångspunkten i arbetet var att undersöka hur mycket trafiken samt sökdjupet påverkade resultatet av antalet plogade vägar.",
                "Heuristiken implementerades i JAVA där även ett gränssnitt utvecklades för att åskådliggöra resultaten."],
        pics: ["/Shared/Services/Content/kandidat/frontPage.png",
                "/Shared/Services/Content/kandidat/gui.png",
                "/Shared/Services/Content/kandidat/code.png"]

      },

      {
        name: "Min egen sida",
        id: 2,
          shortDesc: "Ville testa på webprogrammering, en egen hemsida var ett naturligt projekt att starta med.",
          desc: ["Jag var intresserad av att lära mig webprogrammering. Eftersom det inte finns någon kurs som sträcker sig utanför HTML och CSS som jag kan räkna in i min examen, så valde jag att ta mig ann detta på min fritid. Resultatet av detta är den sida som du tittar på just nu.",
                  "Jag ville inte bara lära mig HTML och CSS när jag gjorde sidan, framförallt var angular.js högt prioriterat på listan över saker jag ville lära mig. Detta ledde då även att jag började lärda mig JavaScript. Utöver dessa verktyg har jag även använt mig av bland annat av Node.js, Bootstrap och Express för att bygga sidan. "],
          pics: ["/Shared/Services/Content/page/code.png",
                "/Shared/Services/Content/page/console.png"]
      },

      {
        name: "Självgående robot",
        id: 3,
        shortDesc: "Efter att ha fått en Arduino UNO kunde jag inte låta bli att försöka göra en självgående robot, här är resultatet!",
        desc: ["Efter att jag fått en Arduino UNO och spenderat en del tid åt att genomföra lite exempelprojekt från manualen så bestämde jag mig för att testa att bygga en självgående robot. Detta innebar att jag dels var tvungen att hitta passande komponenter, såsom servon och avståndsmätare, men även bygga både kopplingsplatta samt programmet som ska styra roboten. I konstruktionen har det även gått åt en del lödtenn samt smältlim.",
              "Grundidén i programmet är att låta roboten röra sig framåt och samtidigt lyssna på sensordata från en ultraljudssensor som kan mäta avstånd. När roboten kommer för nära ett föremål eller en vägg så stannar den och utför en undanmanöver för att undvika en kollision. Syftet med roboten är att den med, hjälp av en magnet, helt på egen hand ska åka runt och plocka upp synålar som har hamnat på golvet i hobbyrummet. Programmering av Arduinokoret bygger på C/C++."],
        pics: [ "/Shared/Services/Content/robot/front.jpg",
                "/Shared/Services/Content/robot/topSide.jpg",]
      },

      {
        name: "Android-app - Positionering",
        id: 4,
        shortDesc: "I en projektgrupp bestående av mig och tre klasskamrakamrater gjorde vi en Android app för inomhuspossitionering",
        desc: [ "Vid utveckling av appen delades projektgruppen upp där vi var två stycken som ägnade mer tid åt implementering och utveckling, medan de andra två andra ägnade mer tid åt positioneringsalgoritmen. Positioneringen görs genom att använda telefonens wifiavlyssning och detektera närliggande wifiaccesspunkter. De funna accesspunkterna jämförs sedan med existerande fingerprints som har mätts ut tidigare. Genom att jämföra vilka fingerprints som ger flest matchande accesspunkter kan de tre mest sannolika punkterna bestämmas. Därefter bestäms positionen genom att göra en viktad triangulering mellan dessa tre punkter. ",
                "För att få en jämnare rörelse när man rör sig och positionen uppdateras konstant, så implementerades även ett Kalman filter. Detta filter används för att jämna ut rörelser och förhindrar för stora hopp och flytt av den aktuella positionen."],
        pics: [ "/Shared/Services/Content/posapp/view.png",
                "/Shared/Services/Content/posapp/frontPage.png",]
      },

       {
        name: "Simuleringsprojekt i ARENA - Analys av kösystem",
        id: 5,
        shortDesc: "Jag, tillsammans gjorde en analys av kårhuset trappans kösystem med simuleringsprogrammet ARENA.",
        desc: [ "När kårhuset Trappan hade funderingar på att byta lokaler ville de utreda hur kösystemet för deras nattklubb kunde förbättras. Jag, tillsammans med två klasskamrater, gjorde då en studie på vilke problem som fanns med deras nuvarande kösystem. Studien skall sedan kunna användas som undelag när beslut ska fattas om hur det nya kösystemet skulle se ut. Utredningen gjorde genom att simulera kösystemet i programmvaran ARENA. ",
                "Då det inte fanns någon data att tillgå var vi tvungna att göra mycket insamlingar själva. Detta gjorde då genom att stå på platts vid nattklubben och registrera tider och räkna olika typer av gäster. Efter datainsamligen tog fördelningsfunktioner för ankomstintervall etc. fram och systemet modellerades i ARENA. När modellen kalibrerats genomfördes olika tester för att hitta flaskhalsar i systemet. Data som erhölls från dessa tester analyserdes sedan för att säkerhetsställa den statstiska significansen av resultaten ",
                ""],
        pics: [ "/Shared/Services/Content/arena/box.png",
                "/Shared/Services/Content/arena/boxDetail.png",
                "/Shared/Services/Content/arena/vis.png",
                "/Shared/Services/Content/arena/visDetail.png",]
      },

      {
       name: "Mickes Coffe App",
       id: 6,
       shortDesc: "Med Hjälp av en Arduino + en web-app + ThingSpeak kan jag starta min kaffekokare var jag än är i världen.",
       desc: ["Jag var trött på att inte kunna starta och stänga min kaffekokare med mobiltelefonen. Till följd av detta utvecklade jag med hjälp av en Arduino + en Node-app + Thingspeak ett sätt att göra detta. ",
                " Arduinokortet kopplade jag och programmerade så att den lyssnar på en Thingsspeak-kanal. Beroende på vilken status (1/0) kanalen har, slår arduinokortet från eller till ett relä som i sin tur startar eller stänger kaffekokaren (eller godtycklig pryl som kräver ett vägguttag). Thingspeak-kanalen kan uppdateras från en enkel web-app som helt enkelt kan slå av eller på kaffekokaren från var som helts i världen, förutsatt att man har tillgång till internet."],
       pics: [ "/Shared/Services/Content/coffe/application.png",
               "/Shared/Services/Content/coffe/arduino.png",]
     },

     {
      name: "Examensarbete - Routevalsmodellering",
      id: 7,
      shortDesc: "Som en del i ett forskningsprojekt på SWECO och Linköpings Universitet modellerade jag ruttflöden i Stockholm baserat på Google-data",
      desc: ["Examensarbetet finns publicerat på: http://www.diva-portal.org/smash/get/diva2:946024/FULLTEXT01.pdf",
              ""],
      pics: [ "/Shared/Services/Content/ex/road_network.png"]
     },

          ];

  return {
    all: function() {
      return projects;
    },

    one: function(id){
      return projects[id - 1];
    }
  };

});
