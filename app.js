// ============================================================
//  FIREBASE
// ============================================================
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyA3N5KQjVyK_zqR4NKTY6CzTAZ7kMaiD0s",
  authDomain:        "game-on-d1391.firebaseapp.com",
  databaseURL:       "https://game-on-d1391-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "game-on-d1391",
  storageBucket:     "game-on-d1391.firebasestorage.app",
  messagingSenderId: "81470361729",
  appId:             "1:81470361729:web:c8e6c7887fa79ca5163d80"
};

// ============================================================
//  KONFIGURASJON
// ============================================================
const CFG = {
  version:        "2.4",
  build:          "20260622",
  duration:       25 * 60,
  hintDelays:     [30, 60, 90, 120],
  adminPass:      "admin2025",
  gameId:         "gameon-v1",
  warnAt:         5 * 60,
  // Poenggivning per vanskelighetsgrad
  pts:            { lett:100, middels:300, vanskelig:600 },
  hintDeduct:     { lett:15,  middels:40,  vanskelig:80  },
  // Justerbare av admin
  admRefreshSecs: 3,
  maxTeams:       0,
  countdownSecs:  5,
};
// Standardverdier for alle justerbare innstillinger
const DEFAULTS = {
  durationMins: 25, hintDelays:[30,60,90,120],
  admRefreshSecs:3, maxTeams:0, countdownSecs:5
};

// ============================================================
//  SVAR — XOR-kodet (30 svar: 10 temaer × 3 nivåer)
// ============================================================
const _k = ["G4m3O","nK3y2","025!X","Z"];
function _KEY(){return _k.join('');}
function _enc(s){const k=_KEY(),n=s.toLowerCase().trim();return btoa(n.split('').map((c,i)=>String.fromCharCode(c.charCodeAt(0)^k.charCodeAt(i%k.length))).join(''));}

// Admin-hjelper: dekod et svar (kun for fasit-panel)
function _getAnswer(ti,li){
  const k=_KEY(),b=_AH[ti*3+li];
  try{return atob(b).split('').map((c,i)=>String.fromCharCode(c.charCodeAt(0)^k.charCodeAt(i%k.length))).join('');}
  catch(e){return '?';}
}
function _chk(topicIdx,lvlIdx,inp){return _enc(inp)===_AH[topicIdx*3+lvlIdx];}
const _AH=[
  // T1: ASCII
  "L10=","JlAAWiE=","NVsCRw==",
  // T2: Hex
  "KF8=","N1UeQDgK","NFEOQSoa",
  // T3: Base64
  "L1EBXyA=","L1UOWCoc","L1UOWA==",
  // T4: Caesar/ROT13
  "MFsfXys=","N1UeQDgBOVc=","L1UeWw==",
  // T5: Subnetting
  "dQFYHX1bfh1LBwUcBQ==","dg1fHX5Ycx1IHAEH","cgVd",
  // T6: Porter
  "cwBe","dAdVCg==","Kk0eQiM=",
  // T7: Linux
  "K0c=","aFEZUGAdI1IdXUc=","NVsCRw==",
  // T8: Web
  "cwRZ","P0ce","NEUBEyYAIVYaRlldWw==",
  // T9: Hash
  "dAY=","N1UeQDgBOVc=","dQVfAH0IeQpOUwUFVBQ5bXMHVQp7D3tWTVMIAgRHO2k=",
  // T10: CTF
  "IVgMVA==","KVkMQw==","NFkP",
];

// ============================================================
//  OPPGAVER — 10 temaer × 3 nivåer
// ============================================================
const TASKS=[
{
  topic:"ASCII / Desimal → Tekst", icon:"🔢",
  levels:[
    {level:"lett",   pts:100, teaser:"Tallverdier skjuler bokstaver — slå opp i tabellen",
     q:"Konverter disse ASCII-desimalverdiene til tekst:\n\n`72  105`",
     hints:["ASCII tilordner tall til tegn. A=65, B=66 ... Z=90, a=97, b=98 ...",
            "72 er en stor bokstav. 65=A, 66=B ... teller du 7 fra A er du på H.",
            "72 = 'H'. 105 = 'i' (97=a, 98=b ... 105=i). Sett dem sammen.",
            "Svaret er to bokstaver: Hi — skriv med små bokstaver: hi"]},
    {level:"middels",pts:300, teaser:"5 tall, 5 bokstaver — et kjent Unix-brukernavn",
     q:"Konverter disse ASCII-desimalverdiene til tekst:\n\n`65  100  109  105  110`",
     hints:["65 er 'A' (start av store bokstaver). Men her vil svaret være med små bokstaver.",
            "65=A/a, 100=d, 109=m. De tre første bokstavene er a, d, m.",
            "65=a, 100=d, 109=m, 105=i, 110=n. Sett dem i rekkefølge.",
            "Svaret er 5 bokstaver og er standard superbruker-navn i Unix: admin"]},
    {level:"vanskelig",pts:600, teaser:"Binær → desimal → ASCII — tre konverteringer i ett",
     q:"Konverter binærtallene til desimal, deretter til ASCII-tegn:\n\n`01110010  01101111  01101111  01110100`",
     hints:["Posisjonsverdier fra høyre: 1, 2, 4, 8, 16, 32, 64, 128.",
            "01110010 = 64+32+16+2 = 114 = 'r'. ASCII 114 er en liten bokstav.",
            "r(114), o(111), o(111), t(116). Sett dem sammen.",
            "Svaret er 4 bokstaver og er superbrukeren i Linux: root"]},
  ]
},
{
  topic:"Heksadesimal → Tekst", icon:"🧩",
  levels:[
    {level:"lett",   pts:100, teaser:"To hex-par, to bokstaver — det korteste svaret",
     q:"Dekod hex-verdiene til tekst:\n\n`4F  4B`",
     hints:["Hex er base-16. 4F = 4×16 + 15 = 79.",
            "0x4F = 79 = 'O'. 0x4B = 75. Finn ASCII-tegnet for 75.",
            "4F=79=O, 4B=75=K. Skriv med små bokstaver.",
            "Svaret er 2 bokstaver — en vanlig bekreftelse: ok"]},
    {level:"middels",pts:300, teaser:"Seks hex-par = et kjent Linux-passordord",
     q:"Dekod hex-verdiene til tekst:\n\n`70  61  73  73  77  64`",
     hints:["0x70 = 7×16+0 = 112. Finn ASCII-tegnet for 112 (hint: p=112).",
            "70=p, 61=a, 73=s, 73=s. De fire første er 'pass'.",
            "70=p, 61=a, 73=s, 73=s, 77=w, 64=d → 'passwd'",
            "Svaret er 6 bokstaver — filnavnet /etc/passwd uten stien: passwd"]},
    {level:"vanskelig",pts:600, teaser:"Dekod hex, reverser resultatet — dobbelt utfordring",
     q:"Dekod hex til tekst — tegnene er reverserte. Dekod og reverser svaret:\n\n`74  65  72  63  65  73`",
     hints:["0x74=116, 0x65=101, 0x72=114. De tre første ASCII-tegnene er t, e, r.",
            "t(74), e(65), r(72), c(63), e(65), s(73) → staver 'terces'. Reverser det.",
            "terces reversert = secret. Men vent — 63 hex er ikke 'c'! 0x63=99='c' ✓",
            "Dekodede tegn: t,e,r,c,e,s → reverser → secret"]},
  ]
},
{
  topic:"Base64 Dekoding", icon:"🔐",
  levels:[
    {level:"lett",   pts:100, teaser:"CTF-klassiker — én dekoding og du er ferdig",
     q:"Dekod denne Base64-strengen:\n\n`aGVsbG8=`",
     hints:["Base64 bruker A-Z, a-z, 0-9, +, / — vanlig i cookies og tokens.",
            "Python: import base64; base64.b64decode('aGVsbG8=').decode()",
            "Bruk CyberChef (gchq.github.io/CyberChef) med 'From Base64'.",
            "Svaret er 5 bokstaver — en klassisk hilsen: hello"]},
    {level:"middels",pts:300, teaser:"En kjent type person i CTF-verdenen",
     q:"Dekod denne Base64-strengen:\n\n`aGFja2Vy`",
     hints:["Base64 uten = på slutten betyr lengden går opp i 3.",
            "Python: base64.b64decode('aGFja2Vy').decode() — prøv det!",
            "De første 3 base64-tegnene 'aGF' = 'hac'. Hva følger?",
            "Svaret er 6 bokstaver — en person som bryter datasystemer: hacker"]},
    {level:"vanskelig",pts:600, teaser:"Dobbelt kodet — du må dekode TO ganger",
     q:"Dobbelt Base64-kodet. Dekod to ganger for å finne svaret:\n\n`YUdGamF3PT0=`",
     hints:["Første dekoding gir en ny Base64-streng, ikke klartekst.",
            "Steg 1: atob('YUdGamF3PT0=') → en ny Base64-streng med = på slutten.",
            "Steg 1 gir: aGFjaw== → dekod denne én gang til.",
            "aGFjaw== → 4 bokstaver: hack"]},
  ]
},
{
  topic:"Caesar-chiffer / ROT13", icon:"🔄",
  levels:[
    {level:"lett",   pts:100, teaser:"ROT13 — internetts mest brukte chiffer",
     q:"Dekrypter dette ROT13-krypterte ordet:\n\n`jbeyq`",
     hints:["ROT13 forskyver hvert bokstav 13 plasser. ROT13 er sin egen inverse.",
            "j→w (j=10, 10-13+26=23=w). b→o. e→r.",
            "j=w, b=o, e=r, y=l, q=d → sett dem sammen.",
            "Svaret er 5 bokstaver — planeten vi bor på: world"]},
    {level:"middels",pts:300, teaser:"Et viktig ord — 8 bokstaver, 13 plasser forskyvet",
     q:"Dekrypter dette ROT13-krypterte ordet:\n\n`cnffjbeq`",
     hints:["ROT13: trekk 13 fra bokstavens plass (eller legg til 13 og ta modulo 26).",
            "c→p (c=3, 3+13=16=p). n→a. f→s.",
            "c=p, n=a, f=s, f=s, j=w, b=o, e=r, q=d → sett dem sammen.",
            "Svaret er 8 bokstaver og er verdens dårligste passord: password"]},
    {level:"vanskelig",pts:600, teaser:"Ukjent skift — du må finne nøkkelen selv",
     q:"Dekrypter dette Caesar-krypterte ordet.\nSkiftet er UKJENT — bruk frekvensanalyse eller prøv alle 25:\n\n`ohzo`",
     hints:["Caesar har bare 25 mulige nøkler. Prøv alle systematisk: shift 1, 2, 3...",
            "Shift 7 tilbake: o=15, 15-7=8=h. h=8, 8-7=1=a. z=26, 26-7=19=s. o=15, 15-7=8=h.",
            "Med shift -7: o→h, h→a, z→s, o→h → staver 'hash'.",
            "Svaret er 4 bokstaver — nøkkelfunksjonen i kryptografi: hash"]},
  ]
},
{
  topic:"Subnetting og CIDR", icon:"🌐",
  levels:[
    {level:"lett",   pts:100, teaser:"Subnetmasker 101 — hva betyr /24 i desimal?",
     q:"Skriv subnetmasken for CIDR-prefiks /24 i dotted decimal notation:\n(format: a.b.c.d)",
     hints:["CIDR /24 = de første 24 bitene er nettverksdelen.",
            "24 enere etterfulgt av 8 nuller i binær: 11111111.11111111.11111111.00000000",
            "Konverter hvert oktet: 11111111=255, 00000000=0. Tre ganger 255, én gang 0.",
            "Svaret: 255.255.255.0"]},
    {level:"middels",pts:300, teaser:"Finn siste adresse — broadcast for et /28-nettverk",
     q:"Hva er broadcast-adressen for nettverket:\n\n`192.168.1.0/28`\n\n(format: a.b.c.d)",
     hints:["/28 = 28 nettverksbiter, 4 host-biter. 2^4 = 16 adresser totalt.",
            "Nettverket starter på .0 og inneholder 16 adresser: .0 til .15.",
            "Broadcast-adressen er alltid den SISTE adressen i subnettverket.",
            "Svaret: 192.168.1.15 (siste av 16 adresser fra .0 til .15)"]},
    {level:"vanskelig",pts:600, teaser:"Et litt større nettverk — tell nøye",
     q:"Nettverket er `10.0.0.0/23`.\nHvor mange BRUKBARE host-adresser finnes det?",
     hints:["/23 betyr 23 nettverksbiter og 9 host-biter (32-23=9).",
            "2^9 = 512 adresser totalt. Husk å trekke fra nettverks- og broadcast-adressen.",
            "512 - 2 = 510 brukbare host-adresser.",
            "Svaret: 510"]},
  ]
},
{
  topic:"Porter og Tjenester", icon:"🚪",
  levels:[
    {level:"lett",   pts:100, teaser:"Den krypterte webporten — alle kjenner den",
     q:"Hvilken standardport bruker HTTPS-protokollen?",
     hints:["HTTPS er HTTP over TLS/SSL — kryptert web-trafikk.",
            "HTTP bruker port 80. HTTPS bruker en port i 400-serien.",
            "Porten er mellom 440 og 445.",
            "Svaret: 443"]},
    {level:"middels",pts:300, teaser:"Windows fjernskriverbord skjuler seg bak dette nummeret",
     q:"Hvilken TCP-standardport bruker RDP (Remote Desktop Protocol)?",
     hints:["RDP er Microsofts protokoll for grafisk fjernpålogging til Windows.",
            "Porten er et 4-sifret tall som starter med 3.",
            "Porten er mellom 3000 og 4000, men over 3300.",
            "Svaret: 3389"]},
    {level:"vanskelig",pts:600, teaser:"Tre åpne porter — identifiser databasetjenesten",
     q:"Nmap viser tre åpne porter på en server:\n`21/tcp  FTP\n22/tcp  SSH\n3306/tcp  ???`\n\nHvilken databasetjeneste kjører typisk på port 3306?",
     hints:["Port 3306 er en svært utbredt åpen-kildekode database.",
            "Tjenesten brukes av nesten alle LAMP/LEMP-webservere.",
            "Databasen starter på M og slutter på L.",
            "Svaret: mysql"]},
  ]
},
{
  topic:"Linux og Terminal", icon:"🐧",
  levels:[
    {level:"lett",   pts:100, teaser:"Filsystemet vil liste seg selv — 2 bokstaver",
     q:"Hvilken Linux-kommando lister innholdet i en katalog/mappe?\n(forkortelse, 2 bokstaver)",
     hints:["Kommandoen er en av de aller første du lærer i Linux.",
            "Den heter List (noe). Forkortelsen er veldig kort.",
            "2 bokstaver: l og s.",
            "Svaret: ls"]},
    {level:"middels",pts:300, teaser:"Her bor de hashede passordene — full sti",
     q:"Hvilken fil i Linux inneholder de hashede passordene til brukerne?\n(skriv full sti, f.eks. /etc/noe)",
     hints:["Filen finnes under /etc/ og er bare lesbar av root.",
            "Filnavnet er relatert til 'shadow' — skygge.",
            "Full sti: /etc/shadow",
            "Svaret: /etc/shadow"]},
    {level:"vanskelig",pts:600, teaser:"Hva returnerer denne ene-liniers pipeline?",
     q:"Hva er output av denne Linux-kommandoen:\n\n`cat /etc/passwd | cut -d: -f1 | head -1`",
     hints:["/etc/passwd inneholder info om alle brukere, én per linje.",
            "'cut -d: -f1' henter første felt (brukernavn) fra kolon-separert fil.",
            "'head -1' tar bare første linje. Første bruker i /etc/passwd er alltid...",
            "Svaret er superbrukeren i Linux — alltid første linje: root"]},
  ]
},
{
  topic:"Web-sikkerhet", icon:"🕸️",
  levels:[
    {level:"lett",   pts:100, teaser:"Denne siden finnes ikke lenger — kjent statuskode",
     q:"Hvilken HTTP-statuskode returneres når en ressurs ikke finnes?\n(3 sifre)",
     hints:["HTTP-statuskoder: 2xx=OK, 3xx=Redirect, 4xx=Klientfeil, 5xx=Serverfeil.",
            "Koden er i 4xx-serien og er den mest kjente feilkoden.",
            "Du ser denne koden daglig på internett. Den er 4-0-noe.",
            "Svaret: 404"]},
    {level:"middels",pts:300, teaser:"3-bokstavers forkortelse for skript-injeksjon i nettsider",
     q:"Denne angrepstypen injiserer ondsinnet JavaScript i nettsider via input-felt.\nHva er den 3-bokstavs forkortelsen?",
     hints:["Angrepstypen kalles 'Cross-Site Scripting'.",
            "Første bokstav er X (Cross), andre S (Site), tredje S (Scripting).",
            "Forkortelsen skrives X-S-S men leses som tre enkeltbokstaver.",
            "Svaret: xss"]},
    {level:"vanskelig",pts:600, teaser:"Enkelthermetegnet som avslutter spørringer",
     q:"En sårbar innloggingsside aksepterer dette i brukernavnfeltet:\n\n`' OR '1'='1`\n\nHvilken type angrep er dette? (2 ord, engelsk)",
     hints:["Angrepet utnytter at brukerinput settes direkte inn i en databasespørring.",
            "Payload-en ' OR '1'='1 gjør at betingelsen alltid er sann.",
            "Angrepstypen begynner med 'SQL' og bruker injeksjon.",
            "Svaret: sql injection"]},
  ]
},
{
  topic:"Hash-funksjoner", icon:"🔑",
  levels:[
    {level:"lett",   pts:100, teaser:"Tell tegnene — where enkel matte møter kryptografi",
     q:"Telle oppgave:\n\n`d41d8cd98f00b204e9800998ecf8427e`\n\nHvor mange tegn har en MD5-hash? (svar med tall)",
     hints:["MD5 produserer alltid en hash av fast lengde.",
            "Trekk med fingeren over hash-strengen og tell... eller se i grupper av 8.",
            "8 grupper med 4 tegn = ? tegn. Eller: d41d8cd9 = 8 tegn, ×4 grupper = 32.",
            "Svaret: 32"]},
    {level:"middels",pts:300, teaser:"Verdens mest kjente hashede passord — sjekk crackstation.net",
     q:"Finn klarteksten til denne berømte MD5-hashen:\n\n`5f4dcc3b5aa765d61d8327deb882cf99`",
     hints:["Denne MD5-hashen er en av de mest kjente i cybersikkerhet-verdenen.",
            "Prøv crackstation.net eller skriv: echo -n 'dittgjett' | md5sum",
            "Passordet er et vanlig engelsk ord du bruker for å låse opp en dør.",
            "Svaret: password (MD5 av 'password' = 5f4dcc3b...)"]},
    {level:"vanskelig",pts:600, teaser:"Hva er MD5-hashen av 'admin'? Alle 32 tegn",
     q:"Beregn MD5-hashen av teksten `admin`.\nSkriv inn alle 32 tegn i hashen:\n(bruk: echo -n 'admin' | md5sum  eller  md5.online.no)",
     hints:["MD5 av 'admin' er en av de mest brukte hashverdiene i passord-databaser.",
            "Linux: echo -n 'admin' | md5sum | cut -c1-32",
            "De første 8 tegnene er: 21232f29...",
            "Full hash: 21232f297a57a5a743894a0e4a801fc3"]},
  ]
},
{
  topic:"CTF-kunnskap", icon:"🚩",
  levels:[
    {level:"lett",   pts:100, teaser:"Det endelige målet i enhver CTF-konkurranse",
     q:"I en CTF (Capture The Flag) konkurranse, hva kaller man det man leter etter?\n\nEksempel: FLAG{dette_er_et_eksempel}\n\n(1 ord, engelsk)",
     hints:["Svaret er bokstavelig talt i navnet på konkurranseformatet.",
            "Capture The ___ — hva fanger man?",
            "Det er det siste ordet i 'Capture The Flag'.",
            "Svaret: flag"]},
    {level:"middels",pts:300, teaser:"Hackernes favoritt nettverksscanner — industri-standard",
     q:"Hvilket kommandolinjeverktøy er industristandarden for port-scanning og nettverksoppdagelse?\n(1 ord, brukes i alle CTF-er og pentest)",
     hints:["Verktøyet ble laget av Fyodor og er tilgjengelig på nmap.org.",
            "Kommandoen begynner med 'n' og er 4 bokstaver.",
            "Eksempel på bruk: ___ -sV -p 80,443 192.168.1.1",
            "Svaret: nmap"]},
    {level:"vanskelig",pts:600, teaser:"WannaCrys smittevektor — protokollen bak det store angrepet",
     q:"WannaCry ransomware (2017) brukte EternalBlue-exploiten til å spre seg.\nEternalBlue utnyttet en sårbarhet i en bestemt Windows-protokoll.\n\nHvilken protokoll? (3 bokstaver)",
     hints:["Protokollen brukes for fildeling og skriverdeling i Windows-nettverk.",
            "Den kjører på port 445 (TCP). Porten er kjent som 'Windows file sharing'.",
            "Protokollen heter Server Message Block — en 3-bokstavers forkortelse.",
            "Svaret: smb"]},
  ]
},
];

// ============================================================
//  STATE
// ============================================================
let ST={
  teamName:"",registered:false,registeredAt:0,playing:false,
  gameStartTime:0,questionStartTime:0,currentQ:0,
  hintsPerQ:Array(10).fill(0),totalHints:0,
  done:Array(10).fill(false),wrongAttempts:Array(10).fill(0),
  choices:Array(10).fill(null),   // 'lett'|'middels'|'vanskelig'
  scores:Array(10).fill(0),       // poeng per spørsmål
  totalScore:0,
  finished:false,finishTime:0,timedOut:false,
};
function blankST(){return {teamName:'',registered:false,registeredAt:0,playing:false,gameStartTime:0,questionStartTime:0,currentQ:0,hintsPerQ:Array(10).fill(0),totalHints:0,done:Array(10).fill(false),wrongAttempts:Array(10).fill(0),choices:Array(10).fill(null),scores:Array(10).fill(0),totalScore:0,finished:false,finishTime:0,timedOut:false};}
function calcScore(topicIdx){
  const lvl=ST.choices[topicIdx];if(!lvl)return 0;
  const lvlIdx=['lett','middels','vanskelig'].indexOf(lvl);
  const base=CFG.pts[lvl];
  const hints=ST.hintsPerQ[topicIdx];
  const deduct=CFG.hintDeduct[lvl];
  return Math.max(Math.round(base*0.3), base - hints*deduct);
}
function updateTotalScore(){
  ST.totalScore=ST.scores.reduce((a,b)=>a+b,0);
  // Tidbonus: max 300 pts, proporsjonalt med gjenstående tid
  if(ST.finished){
    const elapsed=Math.floor((ST.finishTime-ST.gameStartTime)/1000);
    const rem=Math.max(0,CFG.duration-elapsed);
    ST.timeBonus=Math.round(rem/5);
    ST.totalScore+=ST.timeBonus;
  }
}

// ============================================================
//  STORAGE
// ============================================================
const LS={
  key:n=>'go_v1_'+n,
  get(k){try{return JSON.parse(localStorage.getItem(LS.key(k)));}catch(e){return null;}},
  set(k,v){try{localStorage.setItem(LS.key(k),JSON.stringify(v));}catch(e){}},
  del(k){try{localStorage.removeItem(LS.key(k));}catch(e){}},
};
function saveTeam(){LS.set('team_'+ST.teamName,ST);}
function loadTeam(n){return LS.get('team_'+n)||null;}
function getTeams(){return LS.get('teams')||[];}
function addTeam(n){const t=getTeams();if(!t.includes(n)){t.push(n);LS.set('teams',t);}}
function getStartData(){return LS.get('start');}
function fmtTime(s){const m=Math.floor(s/60),sec=s%60;return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');}
function escH(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function escA(s){return String(s).replace(/"/g,"&quot;").replace(/'/g,"&#39;");}

// ============================================================
//  FIREBASE
// ============================================================
let db=null;
function initFirebase(){
  if(!FIREBASE_CONFIG.apiKey)return;
  const loadScript=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s);};
  loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",()=>{
    loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js",()=>{
      try{firebase.initializeApp(FIREBASE_CONFIG);db=firebase.database();}catch(e){console.warn('Firebase err:',e);}
    });
  });
}
function fbPath(p){return CFG.gameId+'/'+p;}
async function fbSet(p,v){if(!db)return;try{await db.ref(fbPath(p)).set(v);}catch(e){}}
async function fbGet(p){if(!db)return null;try{return(await db.ref(fbPath(p)).once('value')).val();}catch(e){return null;}}
function fbOn(p,cb){if(!db)return null;const ref=db.ref(fbPath(p));ref.on('value',s=>cb(s.val()));return ref;}
function fbSaveTeam(){fbSet('teams/'+ST.teamName,{...ST,_ts:Date.now()});}
async function fbGetAllTeams(){return await fbGet('teams');}
function fbRemoveTeam(n){if(!db)return;try{db.ref(fbPath('teams/'+n)).remove();}catch(e){}}
async function fbRemoveAllTeams(){
  if(!db)return;
  try{
    // Slett hvert lag enkeltvis (håndterer tilfeller der parent-sletting blokkeres)
    const snap=await db.ref(fbPath('teams')).once('value');
    if(snap.exists()){
      const dels=[];
      snap.forEach(child=>{dels.push(db.ref(fbPath('teams/'+child.key)).remove());});
      await Promise.all(dels);
    }
    // Slett så parent-noden
    await db.ref(fbPath('teams')).remove();
    console.log('[GameOn] Firebase teams cleared OK');
  }catch(e){console.error('[GameOn] fbRemoveAllTeams error:',e);}
}

// ============================================================
//  TIMER (bulletproof: Date.now()-basert, 500ms interval)
// ============================================================
let _tid=null, _qst=0, _gst=0;
function startTimer(gst){_gst=gst;_qst=Date.now();stopTimer();gameTick();_tid=setInterval(gameTick,500);}
function stopTimer(){if(_tid!==null){clearInterval(_tid);_tid=null;}}
function gameTick(){
  try{
    const now=Date.now();
    const elapsed=Math.max(0,Math.floor((now-_gst)/1000));
    const rem=Math.max(0,CFG.duration-elapsed);
    const qEl=Math.floor((now-_qst)/1000);
    const tel=document.getElementById('timer-txt');
    if(tel)tel.textContent=fmtTime(rem);
    const ring=document.getElementById('t-ring');
    if(ring){
      ring.style.strokeDashoffset=String(((CFG.duration-rem)/CFG.duration)*175.929);
      ring.style.stroke=rem<CFG.warnAt?'#ef4444':rem<CFG.warnAt*2?'#f59e0b':'#22d3ee';
    }
    updateHintUI(qEl);
    if(rem<=0){stopTimer();stopGameWatcher();handleTimeout();}
  }catch(e){console.error('gameTick:',e);}
}
function setQStart(){_qst=Date.now();ST.questionStartTime=_qst;saveTeam();}


// ============================================================
//  ADMIN INNSTILLINGER
// ============================================================
function applySettings(s){
  if(!s)return;
  if(typeof s.durationMins==='number'&&s.durationMins>=1){
    CFG.duration=s.durationMins*60;
    CFG.warnAt=Math.min(5*60,Math.floor(CFG.duration/5));
  }
  if(Array.isArray(s.hintDelays)&&s.hintDelays.length===4)CFG.hintDelays=[...s.hintDelays];
  if(typeof s.admRefreshSecs==='number')CFG.admRefreshSecs=s.admRefreshSecs;
  if(typeof s.maxTeams==='number')CFG.maxTeams=s.maxTeams;
  if(typeof s.countdownSecs==='number')CFG.countdownSecs=s.countdownSecs;
}
async function loadSettings(){
  let s=null;
  if(db){try{s=await fbGet('settings');}catch(e){}}
  if(!s)s=LS.get('gameSettings');
  if(s)applySettings(s);
}
function populateSettingsUI(){
  const g=id=>document.getElementById(id);
  const d=g('s-duration');if(d)d.value=Math.round(CFG.duration/60);
  const c=g('s-countdown');if(c)c.value=CFG.countdownSecs;
  CFG.hintDelays.forEach((v,i)=>{const h=g('s-hint'+(i+1));if(h)h.value=v;});
  const r=g('s-refresh');if(r)r.value=CFG.admRefreshSecs;
  const m=g('s-maxteams');if(m)m.value=CFG.maxTeams;
}
async function saveSettings(){
  const iv=id=>parseInt(document.getElementById(id)?.value)||0;
  const s={
    durationMins: Math.max(1,Math.min(120,iv('s-duration'))||25),
    countdownSecs:Math.max(3,Math.min(30,iv('s-countdown'))||5),
    hintDelays:   [1,2,3,4].map(i=>Math.max(5,iv('s-hint'+i))||[30,60,90,120][i-1]),
    admRefreshSecs:Math.max(1,Math.min(60,iv('s-refresh'))||3),
    maxTeams:     Math.max(0,iv('s-maxteams')),
  };
  // Valider hint-rekkefølge
  for(let i=1;i<4;i++){if(s.hintDelays[i]<=s.hintDelays[i-1]){showSMsg('Hint må låses opp i stigende rekkefølge','err');return;}}
  if(s.hintDelays[3]>=s.durationMins*60){showSMsg('Hint 4 må komme før spilletiden utløper','err');return;}
  applySettings(s);
  LS.set('gameSettings',s);
  if(db){try{await fbSet('settings',s);}catch(e){}}
  restartAdmInt();
  showSMsg('✓ Lagret!','ok');
  setTimeout(()=>showSMsg('',''),3000);
}
async function resetSettings(){
  if(!confirm('Tilbakestill alle innstillinger til standard?'))return;
  applySettings(DEFAULTS);
  LS.del('gameSettings');
  if(db){try{await db.ref(fbPath('settings')).remove();}catch(e){}}
  populateSettingsUI();
  restartAdmInt();
  showSMsg('✓ Standard gjenopprettet!','ok');
  setTimeout(()=>showSMsg('',''),3000);
}
function autoScaleHints(){
  const durSecs=(parseInt(document.getElementById('s-duration')?.value)||25)*60;
  const scale=durSecs/(25*60);
  [30,60,90,120].forEach((d,i)=>{
    const el=document.getElementById('s-hint'+(i+1));
    if(el)el.value=Math.max(10,Math.round(d*scale/5)*5);
  });
}
function toggleSettings(){
  const body=document.getElementById('settings-body');
  const icon=document.getElementById('settings-icon');
  if(!body)return;
  const open=body.style.display==='none'||!body.style.display;
  body.style.display=open?'block':'none';
  icon.textContent=open?'▲':'▼';
  if(open)populateSettingsUI();
}
function showSMsg(txt,cls){
  const el=document.getElementById('settings-msg');
  if(!el)return;el.textContent=txt;el.className='msg '+(cls||'');el.style.display=txt?'block':'none';
}
function restartAdmInt(){
  if(_admInt){clearInterval(_admInt);_admInt=setInterval(adminRefresh,CFG.admRefreshSecs*1000);}
}
// ============================================================
//  GAME-STOPP LYTTER
// ============================================================
let _gameWatchRef=null,_gameWatchInt=null;
function startGameWatcher(gameStartTime){
  stopGameWatcher();
  if(db){
    _gameWatchRef=db.ref(fbPath('config'));
    _gameWatchRef.on('value',snap=>{
      const v=snap.val();
      if(v&&v.stopped&&v.stopped>gameStartTime){stopGameWatcher();stopTimer();showGameStopped();}
      if(v&&v.podium&&v.podium.triggeredAt>gameStartTime){
        LS.set('podiumResult',v.podium);
        stopGameWatcher();stopTimer();
        const pos=v.podium.first?.name===ST.teamName?1:v.podium.second?.name===ST.teamName?2:v.podium.third?.name===ST.teamName?3:0;
        showTeamPodium(pos);
      }
    });
  }
  _gameWatchInt=setInterval(()=>{
    const stopped=LS.get('gameStopped');
    if(stopped&&stopped>gameStartTime){stopGameWatcher();stopTimer();showGameStopped();}
    const pr=LS.get('podiumResult');
    if(pr&&pr.triggeredAt>gameStartTime){
      stopGameWatcher();stopTimer();
      const pos=pr.first?.name===ST.teamName?1:pr.second?.name===ST.teamName?2:pr.third?.name===ST.teamName?3:0;
      showTeamPodium(pos);
    }
  },1000);
}
function stopGameWatcher(){
  if(_gameWatchRef){try{_gameWatchRef.off();}catch(e){}; _gameWatchRef=null;}
  if(_gameWatchInt){clearInterval(_gameWatchInt);_gameWatchInt=null;}
}
function showGameStopped(){document.getElementById('stopped-ov').classList.add('show');}

// ============================================================
//  HINT UI
// ============================================================
function countUnlocked(qEl){let u=0;CFG.hintDelays.forEach((d,i)=>{if(qEl>=d)u=i+1;});return u;}
function renderAllHints(qEl){
  const area=document.getElementById('hints');if(!area)return;
  const lvl=ST.choices[ST.currentQ];if(!lvl)return; // Ikke vist ennå
  const task=TASKS[ST.currentQ];
  const diff=task.levels.find(l=>l.level===lvl);if(!diff)return;
  const unlocked=countUnlocked(qEl);
  let html='';
  for(let i=0;i<4;i++){
    const isUnlocked=i<unlocked;
    const thresh=CFG.hintDelays[i];
    const left=Math.max(0,thresh-qEl);
    const pct=Math.min(100,(qEl/thresh)*100);
    const lc=i>=3?'h4':i>=2?'h3':'';
    if(isUnlocked){
      html+=`<div class="hint-row unlocked ${lc}" id="hr${i}"><div class="hint-hdr"><div class="hn">${i+1}</div>Hint ${i+1}${i===2?' 🔵':i===3?' ⚠️':''}</div><div class="hint-body">${diff.hints[i]}</div></div>`;
    }else{
      html+=`<div class="hint-row locked" id="hr${i}"><div class="hint-hdr"><div class="hn">${i+1}</div><span id="hcd${i}">🔒 Hint ${i+1} — om ${left}s</span><div class="hbar-wrap"><div class="hbar" id="hb${i}" style="width:${pct}%"></div></div></div></div>`;
    }
  }
  area.innerHTML=html;
}
function updateHintUI(qEl){
  if(!ST.choices[ST.currentQ])return;
  const prev=ST.hintsPerQ[ST.currentQ]||0;
  const unlocked=countUnlocked(qEl);
  if(unlocked>prev){
    ST.hintsPerQ[ST.currentQ]=unlocked;
    ST.totalHints=ST.hintsPerQ.reduce((a,b)=>a+b,0);
    saveTeam();if(db)fbSaveTeam();
    renderAllHints(qEl);return;
  }
  for(let i=prev;i<4;i++){
    const thresh=CFG.hintDelays[i];
    const left=Math.max(0,thresh-qEl);
    const pct=Math.min(100,(qEl/thresh)*100);
    const cd=document.getElementById('hcd'+i);if(cd)cd.textContent=`🔒 Hint ${i+1} — om ${left}s`;
    const hb=document.getElementById('hb'+i);if(hb)hb.style.width=pct+'%';
  }
}

// ============================================================
//  DIFFICULTY PICKER
// ============================================================
function showDifficultyPicker(qIdx){
  const task=TASKS[qIdx];
  document.getElementById('dpick-icon').textContent=task.icon;
  document.getElementById('dpick-name').textContent=task.topic;
  document.getElementById('dpick-num').textContent='Oppgave '+(qIdx+1)+' av 10';
  const configs=[
    {level:'lett',   cls:'easy', emoji:'🟢', label:'LETT',       pts:CFG.pts.lett,       desc:task.levels[0].teaser},
    {level:'middels',cls:'med',  emoji:'🟡', label:'MIDDELS',    pts:CFG.pts.middels,    desc:task.levels[1].teaser},
    {level:'vanskelig',cls:'hard',emoji:'🔴',label:'VANSKELIG',  pts:CFG.pts.vanskelig,  desc:task.levels[2].teaser},
  ];
  document.getElementById('dpick-cards').innerHTML=configs.map(c=>`
    <div class="dcard ${c.cls}" onclick="selectDifficulty('${c.level}')">
      <div class="dcard-emoji">${c.emoji}</div>
      <div class="dcard-level">${c.label}</div>
      <div class="dcard-pts">${c.pts}<span> pts</span></div>
      <div class="dcard-desc">${c.desc}</div>
      <div class="dcard-btn">VELG →</div>
    </div>`).join('');
  document.getElementById('dpick-wrap').style.display='flex';
  document.getElementById('qcard').style.display='none';
}
function selectDifficulty(level){
  ST.choices[ST.currentQ]=level;
  saveTeam();if(db)fbSaveTeam();
  setQStart(); // Hint-timer starter fra nå
  document.getElementById('dpick-wrap').style.display='none';
  document.getElementById('qcard').style.display='';
  renderQuestion();
}

// ============================================================
//  GAME LOGIC
// ============================================================
function beginGame(gameStartTime){
  _gst=gameStartTime;_qst=Date.now();
  ST.playing=true;ST.gameStartTime=gameStartTime;
  saveTeam();if(db)fbSaveTeam();
  R('game');
  startTimer(gameStartTime);
  startGameWatcher(gameStartTime);
}
function renderQuestion(){
  const lvl=ST.choices[ST.currentQ];
  if(!lvl){showDifficultyPicker(ST.currentQ);return;}
  const task=TASKS[ST.currentQ];
  const diff=task.levels.find(l=>l.level===lvl);
  const lvlIdx=['lett','middels','vanskelig'].indexOf(lvl);
  document.getElementById('gteam').textContent=ST.teamName;
  const diffColors={lett:'easy',middels:'med',vanskelig:'hard'};
  const diffLabels={lett:'LETT',middels:'MIDDELS',vanskelig:'VANSKELIG'};
  document.getElementById('qbadge').textContent=diffLabels[lvl];
  document.getElementById('qbadge').className='qbadge '+diffColors[lvl];
  document.getElementById('qpts').textContent='+'+CFG.pts[lvl]+' pts';
  document.getElementById('qnum').textContent=String(ST.currentQ+1).padStart(2,'0')+'/10';
  document.getElementById('qcat').textContent=task.topic;
  document.getElementById('qtitle').textContent=task.topic;
  document.getElementById('qtext').innerHTML=diff.q.replace(/`([^`]+)`/g,'<code>$1</code>');
  document.getElementById('ans').value='';
  document.getElementById('ans').className='';
  document.getElementById('fb').textContent='';document.getElementById('fb').className='fb';
  renderAllHints(Math.floor((Date.now()-_qst)/1000));
  renderProgress();
  document.getElementById('ans').focus();
}
function renderProgress(){
  const c=document.getElementById('pdots');if(!c)return;
  const colors={lett:'#10b981',middels:'#f59e0b',vanskelig:'#ef4444'};
  c.innerHTML=TASKS.map((_,i)=>{
    let cl='pd';
    if(ST.done[i])cl+=' done';
    else if(i===ST.currentQ)cl+=' cur';
    const col=ST.choices[i]?colors[ST.choices[i]]:'';
    return`<div class="${cl}" style="${col?'background:'+col+';box-shadow:0 0 6px '+col:''}" title="Q${i+1}${ST.choices[i]?' ('+ST.choices[i]+')':''}"></div>`;
  }).join('');
}
let _lastSubmit=0;
function submitAnswer(){
  const _now=Date.now();
  if(_now-_lastSubmit<3000){
    const wait=Math.ceil((3000-(_now-_lastSubmit))/1000);
    setFb('Vent '+wait+' sek…','warn');return;
  }
  _lastSubmit=_now;
  const input=document.getElementById('ans').value.trim();if(!input)return;
  const lvl=ST.choices[ST.currentQ];if(!lvl)return;
  const lvlIdx=['lett','middels','vanskelig'].indexOf(lvl);
  const btn=document.getElementById('subbtn');btn.disabled=true;
  const correct=_chk(ST.currentQ,lvlIdx,input);
  if(correct){
    playSound('ok');
    document.getElementById('ans').value='';
    ST.done[ST.currentQ]=true;
    ST.scores[ST.currentQ]=calcScore(ST.currentQ);
    updateTotalScore();
    saveTeam();if(db)fbSaveTeam();
    showCorrect();
    setTimeout(()=>{
      hideCorrect();
      if(ST.currentQ>=9){finishGame();}
      else{ST.currentQ++;ST.choices[ST.currentQ]=ST.choices[ST.currentQ]||null;saveTeam();if(db)fbSaveTeam();showDifficultyPicker(ST.currentQ);}
      btn.disabled=false;
    },1400);
  }else{
    playSound('err');
    ST.wrongAttempts[ST.currentQ]++;
    const inp=document.getElementById('ans');
    inp.classList.add('wrong');setTimeout(()=>inp.classList.remove('wrong'),450);
    inp.value='';inp.focus();
    setFb('Feil svar — prøv igjen','err');
    setTimeout(()=>setFb('',''),2500);
    btn.disabled=false;
  }
}
function finishGame(){
  stopTimer();stopGameWatcher();
  ST.finished=true;ST.finishTime=Date.now();
  updateTotalScore();
  saveTeam();if(db)fbSaveTeam();
  playSound('win');R('win');startFireworks();
}
function handleTimeout(){
  stopGameWatcher();
  ST.timedOut=true;saveTeam();if(db)fbSaveTeam();
  R('timeout');
}
function setFb(txt,cls){const el=document.getElementById('fb');el.textContent=txt;el.className='fb '+(cls||'');}
function showCorrect(){
  const isLast=ST.currentQ>=9;const pts=ST.scores[ST.currentQ];
  document.getElementById('ct').textContent=isLast?'🏁 FULLFØRT!':'✓ KORREKT!';
  document.getElementById('cs').textContent=isLast?'Alle 10 oppgaver løst!':'+'+pts+' poeng';
  document.getElementById('cbox').className='cbox'+(isLast?' flag':'');
  document.getElementById('cov').classList.add('show');
}
function hideCorrect(){document.getElementById('cov').classList.remove('show');}
function leaveGame(){
  stopTimer();stopLobby();stopGameWatcher();
  if(ST.teamName){
    LS.del('team_'+ST.teamName);
    LS.set('teams',getTeams().filter(n=>n!==ST.teamName));
    if(db)fbRemoveTeam(ST.teamName);
    LS.del('last_team');
  }
  const prevName=ST.teamName||'';
  ST=blankST();
  document.getElementById('tname').value=prevName;R('home');
}
function resetAndHome(){
  stopTimer();stopFireworks();stopGameWatcher();
  LS.del('gameStopped');
  document.getElementById('stopped-ov').classList.remove('show');
  document.getElementById('team-podium-ov').classList.remove('show');
  LS.del('podiumResult');
  ST=blankST();
  document.getElementById('tname').value='';R('home');
}

// ============================================================
//  LOBBY
// ============================================================
let _lobbyInt=null, _fbTeamsRef=null, _fbCfgRef=null;
function startLobby(){
  if(!FIREBASE_CONFIG.apiKey&&db===null)document.getElementById('lobby-local-warn').style.display='block';
  else document.getElementById('lobby-local-warn').style.display='none';
  stopLobby();
  _lobbyInt=setInterval(checkForGameStart,800);
  window.addEventListener('storage',onStorageEvent);
  if(db){
    _fbCfgRef=db.ref(fbPath('config'));
    _fbCfgRef.on('value',snap=>{
      const v=snap.val();
      if(v&&v.resetAt)LS.set('lastResetAt',v.resetAt);
      if(v&&v.startTime){
        const delay=v.startTime-Date.now();
        if(delay>800){showLobbyCountdown(v.startTime);}
        else{stopLobby();beginGame(v.startTime);}
      }
    });
    _fbTeamsRef=db.ref(fbPath('teams'));
    _fbTeamsRef.on('value',snap=>{
      const fbTeams=snap.val()||{};
      const resetAt=LS.get('lastResetAt')||0;
      const names=Object.keys(fbTeams).filter(n=>(fbTeams[n].registeredAt||fbTeams[n]._ts||0)>=resetAt);
      renderLobbyTeams(names);
    });
  }
  updateLobbyUI();
}
function stopLobby(){
  clearInterval(_lobbyInt);_lobbyInt=null;
  if(_cntdwnTimeout){clearTimeout(_cntdwnTimeout);_cntdwnTimeout=null;}
  window.removeEventListener('storage',onStorageEvent);
  if(_fbTeamsRef){_fbTeamsRef.off();_fbTeamsRef=null;}
  if(_fbCfgRef){_fbCfgRef.off();_fbCfgRef=null;}
}

let _cntdwnTimeout=null;
function showLobbyCountdown(startTime){
  const wrap=document.getElementById('lobby-countdown');
  const numEl=document.getElementById('lcd-num');
  if(!wrap)return;
  wrap.style.display='flex';
  const tick=()=>{
    const rem=Math.ceil((startTime-Date.now())/1000);
    if(numEl)numEl.textContent=rem>0?rem:'🚀';
    if(rem<=0){
      wrap.style.display='none';
      stopLobby();beginGame(startTime);return;
    }
    _cntdwnTimeout=setTimeout(tick,100);
  };
  tick();
}
function checkForGameStart(){
  const d=getStartData();
  if(!d||d.gameId!==CFG.gameId||!d.startTime)return;
  const delay=d.startTime-Date.now();
  if(delay>800){showLobbyCountdown(d.startTime);}
  else{stopLobby();beginGame(d.startTime);}
}
function onStorageEvent(e){
  if(e.key===LS.key('start')){
    const d=JSON.parse(e.newValue||'{}');
    if(d.startTime){const delay=d.startTime-Date.now();if(delay>800)showLobbyCountdown(d.startTime);else{stopLobby();beginGame(d.startTime);}}
  }
}
function renderLobbyTeams(names){
  document.getElementById('lobby-teams-list').innerHTML=
    !names.length?'<span style="color:var(--muted);font-size:13px">Ingen andre lag ennå</span>':
    names.map(t=>`<div class="lobby-team-item">${escH(t)}</div>`).join('');
}
function updateLobbyUI(){
  document.getElementById('lobby-team-name').textContent=ST.teamName;
  if(!db){
    const resetAt=LS.get('lastResetAt')||0;
    const names=getTeams().filter(n=>{const s=loadTeam(n);return s&&(resetAt===0||(s.registeredAt||0)>=resetAt);});
    renderLobbyTeams(names);
  }
}

// ============================================================
//  WIN SCREEN
// ============================================================
function renderWin(){
  const elapsed=Math.floor((ST.finishTime-ST.gameStartTime)/1000);
  document.getElementById('wteam').textContent=ST.teamName;
  document.getElementById('wtime').textContent='Fullført på '+fmtTime(elapsed);
  const flagTeam=ST.teamName.toUpperCase().replace(/\s+/g,'_').replace(/[^A-Z0-9_]/g,'');
  const m=Math.floor(elapsed/60),s=elapsed%60;
  document.getElementById('flag-val').textContent=`FLAG{${flagTeam||'TEAM'}_${ST.totalScore}PTS_${m}M${String(s).padStart(2,'0')}S}`;
  const tb=ST.timeBonus||0;
  const baseScore=ST.scores.reduce((a,b)=>a+b,0);
  document.getElementById('wstats').innerHTML=`
    <div>Hint brukt: <span>${ST.totalHints}</span></div>
    <div>Grunnpoeng: <span>${baseScore}</span></div>
    <div>Tidsbonus: <span>+${tb}</span></div>
    <div style="color:var(--amber);font-weight:700;font-size:16px">Total: <span>${ST.totalScore} pts</span></div>`;
}
function renderTimeout(){
  const done=ST.done.filter(Boolean).length;
  document.getElementById('to-n').textContent=done;
  document.getElementById('to-prog').innerHTML=TASKS.map((t,i)=>`<div class="tpr"><div class="tpd ${ST.done[i]?'ok':'no'}">${ST.done[i]?'✓':'✗'}</div><span style="color:${ST.done[i]?'#94a3b8':'#475569'}">${t.topic}</span></div>`).join('');
}

// ============================================================
//  ROUTER
// ============================================================
function R(screen){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  const ids={home:'s-home',lobby:'s-lobby',game:'s-game',win:'s-win',timeout:'s-timeout',
    'admin-login':'s-admin-login',admin:'s-admin',spectator:'s-spectator',podium:'s-podium',rules:'s-rules'};
  const el=document.getElementById(ids[screen]);
  if(el)el.classList.add('on');
  if(screen!=='spectator')stopSpectator();
  if(screen==='home'){const hv=document.getElementById('home-version');if(hv)hv.textContent='v'+CFG.version+' · build '+CFG.build;}
  if(screen==='game'){
    if(!ST.choices[ST.currentQ])showDifficultyPicker(ST.currentQ);
    else renderQuestion();
  }
  if(screen==='win')renderWin();
  if(screen==='timeout')renderTimeout();
  if(screen==='lobby')startLobby();
  if(screen==='admin'){clearInterval(_admInt);loadSettings().then(()=>{_admInt=setInterval(adminRefresh,CFG.admRefreshSecs*1000);adminRefresh();renderCompletedGames();['adm-ver','adm-ver-hdr'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='v'+CFG.version+' · build '+CFG.build;});});}
  if(screen==='spectator'){startSpectator();}
  if(screen==='podium'){renderPodium();setTimeout(()=>startFireworks('fw-cv2'),800);}
  // Bruk pushState for spill-skjermen slik at Tilbake-knappen kan blokkeres
  if(screen==='game'){history.pushState({screen:'game'},'','#game');}
  else{history.replaceState(null,'',screen==='admin'?'#admin':screen==='home'?'#':'#'+screen);}
}

// ============================================================
//  REGISTRERING
// ============================================================
async function registerTeam(){
  const nm=document.getElementById('tname').value.trim();
  if(!nm){showMsg('hmsg','Skriv inn lagnavn!','err');return;}
  if(nm.length<2){showMsg('hmsg','Lagnavn må ha minst 2 tegn','err');return;}
  // Sjekk duplikat lagnavn
  if(getTeams().includes(nm)){showMsg('hmsg','Lagnavn er allerede tatt!','err');return;}
  if(db){const exists=await fbGet('teams/'+nm);if(exists){showMsg('hmsg','Lagnavn er allerede tatt!','err');return;}}
  // Sjekk maxTeams mot både localStorage og Firebase
  if(CFG.maxTeams>0){
    let cur=getTeams().length;
    if(db){const fbTeams=await fbGet('teams');if(fbTeams)cur=Math.max(cur,Object.keys(fbTeams).length);}
    if(cur>=CFG.maxTeams){showMsg('hmsg','🔒 Maks '+CFG.maxTeams+' lag nådd. Kontakt admin.','err');return;}
  }
  ST={...blankST(),teamName:nm,registered:true,registeredAt:Date.now()};
  addTeam(nm);saveTeam();LS.set('last_team',nm);
  if(db)fbSaveTeam();
  const d=getStartData();
  if(d&&d.gameId===CFG.gameId&&d.startTime){
    if(Date.now()>d.startTime){
      showMsg('hmsg','🔒 Spillet er allerede i gang. Kontakt admin.','err');
      // Rydd opp ghost-registrering
      LS.del('team_'+nm);LS.set('teams',getTeams().filter(n=>n!==nm));
      if(db)fbRemoveTeam(nm);
      ST=blankST();
      return;
    }
    beginGame(d.startTime);
  }
  else{R('lobby');}
}

// ============================================================
//  ADMIN
// ============================================================
let _admAuthed=false,_admInt=null;
function adminLogin(){
  const pw=document.getElementById('adm-pw').value;
  if(pw===CFG.adminPass){_admAuthed=true;document.getElementById('adm-pw').value='';document.getElementById('admsg').style.display='none';R('admin');}
  else{showMsg('admsg','Feil passord','err');}
}
async function adminRefresh(){
  if(!_admAuthed)return;
  const now=Date.now();
  document.getElementById('last-ref').textContent='Kl. '+new Date().toLocaleTimeString('no-NO');
  const fb=document.getElementById('fb-banner');
  if(!FIREBASE_CONFIG.apiKey){fb.style.display='flex';fb.className='fbanner warn';fb.innerHTML='⚠ Local Mode';}
  else if(db){fb.style.display='flex';fb.className='fbanner ok';fb.innerHTML='✓ Firebase tilkoblet — sanntidsdata';}
  if(db){
    const fbCfg=await fbGet('config');
    if(fbCfg&&fbCfg.startTime)LS.set('start',fbCfg);
    if(fbCfg&&fbCfg.resetAt)LS.set('lastResetAt',fbCfg.resetAt);
  }
  const startData=getStartData();
  const gameStarted=startData&&startData.gameId===CFG.gameId&&startData.startTime;
  document.getElementById('pg-panel').style.display=gameStarted?'none':'block';
  document.getElementById('ig-panel').style.display=gameStarted?'block':'none';
  document.getElementById('adm-stop-btn').style.display=gameStarted?'inline-flex':'none';
  const admRem=document.getElementById('adm-rem');
  if(gameStarted){
    const rem=Math.max(0,CFG.duration-Math.floor((now-startData.startTime)/1000));
    admRem.style.display='flex';document.getElementById('adm-rem-val').textContent=fmtTime(rem);
  }else{admRem.style.display='none';}
  let allTeams={};
  if(db){const fbData=await fbGetAllTeams();if(fbData&&Object.keys(fbData).length>0)allTeams=fbData;}
  if(Object.keys(allTeams).length===0){getTeams().forEach(n=>{const s=loadTeam(n);if(s)allTeams[n]=s;});}
  const resetAt=LS.get('lastResetAt')||0;
  if(resetAt>0)Object.keys(allTeams).forEach(name=>{const t=allTeams[name];if((t.registeredAt||t._ts||0)<resetAt)delete allTeams[name];});
  if(gameStarted){adminRenderInGame(startData.startTime,allTeams);}
  else{adminRenderPreGame(allTeams);}
}
function adminRenderPreGame(allTeams){
  const teams=allTeams?Object.keys(allTeams):getTeams();
  document.getElementById('pg-count-num').textContent=teams.length;
  document.getElementById('start-game-btn').disabled=teams.length===0;
  document.getElementById('pg-teams').innerHTML=
    teams.length===0?'<span class="team-pill empty">Ingen lag ennå...</span>':
    teams.map(t=>`<div class="team-pill">● ${escH(t)}</div>`).join('');
}
function adminRenderInGame(startTime,allTeams){
  _lastAllTeams=allTeams||{};
  const all=allTeams?Object.values(allTeams):getAllTeamStates();
  const tbody=document.getElementById('atbody');
  const empty=document.getElementById('aempty');
  if(!all.length){tbody.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  // Bevar åpne detalj-rader gjennom refresh
  const openRows=new Set();
  document.querySelectorAll('[id^="adm-det-"]').forEach(r=>{if(r.style.display!=='none')openRows.add(r.id.replace('adm-det-',''));});
  // FIX 4: Sorter på poeng (høyest), så lagnavn A→Å
  const filterVal=(document.getElementById('adm-filter')?.value||'').toLowerCase().trim();
  const sorted=all.sort((a,b)=>{
    const pa=a.totalScore||0,pb=b.totalScore||0;
    if(pb!==pa)return pb-pa;
    return(a.teamName||'').localeCompare(b.teamName||'','no');
  });
  // FIX 3: Filtrer på lagnavn hvis søkefelt er aktivt
  const visible=filterVal?sorted.filter(s=>(s.teamName||'').toLowerCase().includes(filterVal)):sorted;
  tbody.innerHTML=visible.map(s=>{
    const now=Date.now();
    const elapsed=s.gameStartTime?Math.floor((Math.min(s.finishTime||now,s.gameStartTime+CFG.duration*1000)-s.gameStartTime)/1000):0;
    const done=(s.done||[]).filter(Boolean).length;
    const pct=(done/10)*100;
    const status=s.finished?'done':s.timedOut?'tout':s.playing?'act':'wait';
    const stlbl=s.finished?'🏆 FERDIG':s.timedOut?'⏰ TID UT':s.playing?`<span class="puls g"></span> AKTIV`:'⏳ VENTER';
    const pts=s.totalScore||0;
    const lvlSummary=(s.choices||[]).filter(Boolean).map(l=>({lett:'L',middels:'M',vanskelig:'V'})[l]||'?').join('');
    const safeId=encodeURIComponent(s.teamName||'').replace(/%/g,'_');
    // Detaljert poengberegning per spørsmål
    const detailRows=TASKS.map((t,i)=>{
      if(!s.done||!s.done[i])return'';
      const lvl=(s.choices||[])[i];if(!lvl)return'';
      const lvlIdx=['lett','middels','vanskelig'].indexOf(lvl);
      const base=CFG.pts[lvl];
      const hints=(s.hintsPerQ||[])[i]||0;
      const deduct=CFG.hintDeduct[lvl];
      const sc=(s.scores||[])[i]||0;
      const lvlBadge={lett:'<span style="color:var(--green)">L</span>',middels:'<span style="color:var(--amber)">M</span>',vanskelig:'<span style="color:var(--red)">V</span>'}[lvl];
      return`<tr style="font-size:12px;border-bottom:1px solid rgba(255,255,255,.04)">
        <td style="padding:5px 10px;color:var(--muted)">Q${i+1}</td>
        <td style="padding:5px 10px">${t.icon} ${t.topic}</td>
        <td style="padding:5px 10px">${lvlBadge} ${lvl}</td>
        <td style="padding:5px 10px">${base}</td>
        <td style="padding:5px 10px">${hints>0?'-'+(hints*deduct):0}</td>
        <td style="padding:5px 10px;font-weight:600;color:var(--cyan)">${sc}</td>
      </tr>`;
    }).join('');
    const tb=s.timeBonus||0;
    const baseScore=(s.scores||[]).reduce((a,b)=>a+b,0);
    return`<tr>
      <td><div class="sbadge ${status}">${stlbl}</div></td>
      <td style="font-weight:600">${escH(s.teamName||'?')}</td>
      <td><div class="pbar"><div class="pbarf" style="width:${pct}%"></div></div> ${done}/10</td>
      <td style="font-family:var(--mono);font-size:11px;letter-spacing:.05em">${lvlSummary||'—'}</td>
      <td style="font-weight:700;color:var(--cyan)">${pts>0?pts+' pts':'—'}</td>
      <td>${fmtTime(elapsed)}</td>
      <td>${s.totalHints||0}</td>
      <td style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="abtn" onclick="toggleAdmDetails('${safeId}')" style="font-size:11px;padding:5px 10px">▶ Detaljer</button>
        <button class="abtn danger" onclick="adminResetTeam('${escA(s.teamName||'')}')">Reset</button>
      </td>
    </tr>
    <tr id="adm-det-${safeId}" style="display:none">
      <td colspan="8" style="padding:0 0 8px 0">
        <table style="width:100%;border-collapse:collapse;background:rgba(0,0,0,.2);border-radius:6px;overflow:hidden">
          <thead><tr style="font-size:10px;color:var(--muted)">
            <th style="padding:6px 10px;text-align:left">Q</th>
            <th style="padding:6px 10px;text-align:left">TEMA</th>
            <th style="padding:6px 10px;text-align:left">NIVÅ</th>
            <th style="padding:6px 10px;text-align:left">GRUNNP.</th>
            <th style="padding:6px 10px;text-align:left">HINT</th>
            <th style="padding:6px 10px;text-align:left">SCORE</th>
          </tr></thead>
          <tbody>${detailRows||'<tr><td colspan="6" style="padding:8px 10px;color:var(--muted);font-size:12px">Ingen fullførte spørsmål</td></tr>'}</tbody>
          <tfoot><tr style="border-top:1px solid rgba(255,255,255,.1)">
            <td colspan="5" style="padding:6px 10px;font-size:12px;color:var(--muted)">Grunnpoeng: ${baseScore} + Tidsbonus: +${tb}</td>
            <td style="padding:6px 10px;font-weight:700;color:var(--amber);font-size:14px">${pts} pts</td>
          </tr></tfoot>
        </table>
      </td>
    </tr>`;
  }).join('');
}
function getAllTeamStates(){const teams=getTeams();return teams.map(n=>loadTeam(n)).filter(Boolean);}
function toggleAdmDetails(safeId){
  const row=document.getElementById('adm-det-'+safeId);
  if(!row)return;
  const btn=row.previousElementSibling.querySelector('.abtn');
  const open=row.style.display==='none'||!row.style.display;
  row.style.display=open?'table-row':'none';
  if(btn)btn.textContent=open?'▼ Lukk':'▶ Detaljer';
}
function adminStartGame(){
  if(!confirm('Start spillet for alle registrerte lag?\nLag får '+CFG.countdownSecs+' sekunder nedtelling.'))return;
  const startTime=Date.now()+(CFG.countdownSecs*1000);
  const data={gameId:CFG.gameId,startTime};
  LS.set('start',data);if(db){try{db.ref(fbPath('config')).update(data);}catch(e){}}adminRefresh();
}
async function adminStopGame(){
  if(!confirm('Stopp spillet? Resultater lagres automatisk.'))return;
  const allTeams=await _fetchCurrentTeams();
  saveCompletedGame(allTeams);
  const resetAt=Date.now(),stopped=resetAt;
  if(db)await fbSet('config',{gameId:CFG.gameId,startTime:null,resetAt,stopped});
  LS.set('gameStopped',stopped);
  setTimeout(async()=>{
    LS.del('start');LS.set('teams',[]);LS.set('lastResetAt',resetAt);
    getTeams().forEach(n=>LS.del('team_'+n));
    if(db)await fbRemoveAllTeams();
    adminRefresh();renderCompletedGames();
    setTimeout(async()=>{if(db){await fbRemoveAllTeams();adminRefresh();}},3000);
  },1500);
}
function adminResetTeam(name){
  if(!confirm('Reset laget «'+name+'»?'))return;
  LS.del('team_'+name);const t=getTeams().filter(n=>n!==name);LS.set('teams',t);
  if(db)fbRemoveTeam(name);adminRefresh();
}
async function adminResetAll(){
  if(!confirm('Reset ALLE lag og spill-start? Resultater lagres.'))return;
  const allTeams=await _fetchCurrentTeams();
  saveCompletedGame(allTeams);
  const resetAt=Date.now(),stopped=resetAt;
  if(db)await fbSet('config',{gameId:CFG.gameId,startTime:null,resetAt,stopped});
  LS.set('gameStopped',stopped);
  setTimeout(async()=>{
    LS.del('start');getTeams().forEach(n=>LS.del('team_'+n));LS.set('teams',[]);
    LS.set('lastResetAt',resetAt);
    if(db)await fbRemoveAllTeams();
    adminRefresh();renderCompletedGames();
    // Ekstra cleanup etter 3s – fanger lag som rakk å skrive etter første sletting
    setTimeout(async()=>{if(db){await fbRemoveAllTeams();adminRefresh();}},3000);
  },1500);
}

// ============================================================
//  GJENNOMFØRTE SPILL – HISTORIKK
// ============================================================
async function _fetchCurrentTeams(){
  let all={};
  if(db){const d=await fbGetAllTeams();if(d&&Object.keys(d).length)all=d;}
  if(!Object.keys(all).length){getTeams().forEach(n=>{const s=loadTeam(n);if(s)all[n]=s;});}
  return all;
}
function saveCompletedGame(allTeams){
  if(!allTeams||!Object.keys(allTeams).length)return null;
  const id='cg_'+Date.now();
  const entry={id,completedAt:Date.now(),
    teams:Object.values(allTeams).map(s=>({
      teamName:s.teamName||'?',totalScore:s.totalScore||0,
      finished:s.finished||false,timedOut:s.timedOut||false,
      done:(s.done||[]).filter(Boolean).length,
      choices:s.choices||[],scores:s.scores||[],
      hintsPerQ:s.hintsPerQ||[],totalHints:s.totalHints||0,
      timeBonus:s.timeBonus||0,gameStartTime:s.gameStartTime||0,finishTime:s.finishTime||0
    }))
  };
  // Lokalt
  const cgs=LS.get('completedGames')||[];cgs.unshift(entry);LS.set('completedGames',cgs);
  // Firebase
  if(db){try{db.ref(fbPath('completed_games/'+id)).set(entry);}catch(e){}}
  return id;
}
async function loadCompletedGames(){
  if(db){
    try{
      const d=(await db.ref(fbPath('completed_games')).once('value')).val();
      if(d)return Object.values(d).sort((a,b)=>(b.completedAt||0)-(a.completedAt||0));
    }catch(e){}
  }
  return LS.get('completedGames')||[];
}
async function deleteCompletedGame(id){
  if(!confirm('Slett dette spillet?'))return;
  const cgs=(LS.get('completedGames')||[]).filter(g=>g.id!==id);
  LS.set('completedGames',cgs);
  if(db){try{await db.ref(fbPath('completed_games/'+id)).remove();}catch(e){}}
  renderCompletedGames();
}
async function deleteAllCompletedGames(){
  if(!confirm('Slett ALLE lagrede spill? Kan ikke angres.'))return;
  LS.set('completedGames',[]);
  if(db){try{await db.ref(fbPath('completed_games')).remove();}catch(e){}}
  renderCompletedGames();
}
function toggleHistoryPanel(){
  const body=document.getElementById('cg-body');
  const icon=document.getElementById('cg-icon');
  const open=body.style.display==='none';
  body.style.display=open?'block':'none';
  icon.textContent=open?'▲':'▼';
  if(open)renderCompletedGames();
}
async function renderCompletedGames(){
  const el=document.getElementById('cg-list');if(!el)return;
  el.innerHTML='<span style="color:var(--muted);font-size:12px">Laster …</span>';
  const cgs=await loadCompletedGames();
  if(!cgs.length){el.innerHTML='<p style="color:var(--muted);font-size:13px;padding:8px 0">Ingen lagrede spill ennå.</p>';return;}
  el.innerHTML=cgs.map(g=>{
    const date=new Date(g.completedAt).toLocaleString('no-NO');
    const sorted=(g.teams||[]).sort((a,b)=>(b.totalScore||0)-(a.totalScore||0));
    const medals=['🥇','🥈','🥉'];
    const topRows=sorted.slice(0,3).map((t,i)=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0;font-size:12px">
        <span>${medals[i]||'  '} ${escH(t.teamName)}</span>
        <span style="color:var(--cyan);font-weight:600;font-family:var(--mono)">${t.totalScore} pts</span>
      </div>`).join('');
    const more=sorted.length>3?`<div style="font-size:11px;color:var(--muted);margin-top:3px">+${sorted.length-3} andre lag</div>`:'';
    return`<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:12px 14px;margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-size:10px;color:var(--muted)">${date}</div>
          <div style="font-size:13px;font-weight:600;margin-top:2px">${sorted.length} lag deltok</div>
        </div>
        <button class="abtn danger" onclick="deleteCompletedGame('${g.id}')" style="font-size:11px;padding:5px 10px">🗑</button>
      </div>
      ${topRows}${more}
    </div>`;
  }).join('');
}

// ============================================================
//  SPECTATOR – LIVE SCOREBOARD (read-only, URL: #spectator)
// ============================================================
let _specInt=null;
function startSpectator(){
  clearInterval(_specInt);
  renderSpectator();
  _specInt=setInterval(renderSpectator,3000);
}
function stopSpectator(){clearInterval(_specInt);_specInt=null;}
async function renderSpectator(){
  let allTeams={};
  if(db){const d=await fbGetAllTeams();if(d)allTeams=d;}
  if(!Object.keys(allTeams).length){getTeams().forEach(n=>{const s=loadTeam(n);if(s)allTeams[n]=s;});}
  const resetAt=LS.get('lastResetAt')||0;
  if(resetAt>0)Object.keys(allTeams).forEach(nm=>{const t=allTeams[nm];if((t.registeredAt||t._ts||0)<resetAt)delete allTeams[nm];});
  const teams=Object.values(allTeams).sort((a,b)=>(b.totalScore||0)-(a.totalScore||0));
  const startData=getStartData();
  const now=Date.now();
  let timeInfo='';
  if(startData&&startData.startTime){
    const rem=Math.max(0,CFG.duration-Math.floor((now-startData.startTime)/1000));
    timeInfo=rem>0?'⏱ '+fmtTime(rem)+' igjen':'⌛ Tidsfristen er ute';
  }
  document.getElementById('spec-time').textContent=timeInfo;
  document.getElementById('spec-count').textContent=teams.length+' lag';
  const tbody=document.getElementById('spec-tbody');
  if(!teams.length){
    tbody.innerHTML='<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--muted);font-size:14px">Venter på at lag registrerer seg …</td></tr>';
    return;
  }
  const medals=['🥇','🥈','🥉'];
  tbody.innerHTML=teams.map((s,i)=>{
    const done=(s.done||[]).filter(Boolean).length;
    const pts=s.totalScore||0;
    const pct=(done/10)*100;
    const status=s.finished?'done':s.timedOut?'tout':s.playing?'act':'wait';
    const stlbl=s.finished?'🏆':s.timedOut?'⏰':s.playing?'<span class="puls g" style="display:inline-block"></span>':'⏳';
    const rank=medals[i]||(i+1)+'.'
    return`<tr class="spec-row ${status}">
      <td class="spec-rank">${rank}</td>
      <td class="spec-name">${escH(s.teamName||'?')} ${stlbl}</td>
      <td class="spec-bar"><div class="pbar" style="height:8px"><div class="pbarf" style="width:${pct}%"></div></div><div class="spec-prog">${done}/10</div></td>
      <td class="spec-pts">${pts>0?pts+' pts':'—'}</td>
    </tr>`;
  }).join('');
}

// ============================================================
//  PODIUM – SEREMONI-SKJERM (admin-trigger, URL: #podium)
// ============================================================
async function showPodium(){
  let allTeams={};
  if(db){const d=await fbGetAllTeams();if(d)allTeams=d;}
  if(!Object.keys(allTeams).length){getTeams().forEach(n=>{const s=loadTeam(n);if(s)allTeams[n]=s;});}
  const resetAt=LS.get('lastResetAt')||0;
  if(resetAt>0)Object.keys(allTeams).forEach(nm=>{const t=allTeams[nm];if((t.registeredAt||t._ts||0)<resetAt)delete allTeams[nm];});
  const top3=Object.values(allTeams).filter(s=>(s.totalScore||0)>0||s.finished).sort((a,b)=>(b.totalScore||0)-(a.totalScore||0)).slice(0,3);
  const podiumData={
    triggeredAt:Date.now(),
    first:top3[0]?{name:top3[0].teamName,score:top3[0].totalScore||0}:null,
    second:top3[1]?{name:top3[1].teamName,score:top3[1].totalScore||0}:null,
    third:top3[2]?{name:top3[2].teamName,score:top3[2].totalScore||0}:null,
  };
  LS.set('podiumResult',podiumData);
  if(db){try{await db.ref(fbPath('config')).update({podium:podiumData});}catch(e){}}
  R('podium');
}
async function renderPodium(){
  let allTeams={};
  if(db){const d=await fbGetAllTeams();if(d)allTeams=d;}
  if(!Object.keys(allTeams).length){getTeams().forEach(n=>{const s=loadTeam(n);if(s)allTeams[n]=s;});}
  const resetAt=LS.get('lastResetAt')||0;
  if(resetAt>0)Object.keys(allTeams).forEach(nm=>{const t=allTeams[nm];if((t.registeredAt||t._ts||0)<resetAt)delete allTeams[nm];});
  const teams=Object.values(allTeams)
    .filter(s=>(s.totalScore||0)>0||s.finished)
    .sort((a,b)=>(b.totalScore||0)-(a.totalScore||0))
    .slice(0,3);
  const container=document.getElementById('podium-places');
  if(!container)return;
  if(!teams.length){
    container.innerHTML='<div style="color:var(--muted);text-align:center;padding:40px;font-size:14px">Ingen lag med poeng ennå.</div>';
    return;
  }
  // Vis i rekkefølge: 2.plass venstre, 1.plass midten, 3.plass høyre (klassisk podium-layout)
  const cfg=[
    {idx:1,medal:'🥈',color:'#94a3b8',ht:'120px',delay:'0.3s',label:'2. PLASS'},
    {idx:0,medal:'🥇',color:'var(--amber)',ht:'180px',delay:'0.7s',label:'1. PLASS'},
    {idx:2,medal:'🥉',color:'#b45309',ht:'80px',delay:'0.1s',label:'3. PLASS'},
  ];
  container.innerHTML=cfg.map(c=>{
    const t=teams[c.idx];if(!t)return'';
    return`<div class="pdm-slot" style="animation-delay:${c.delay}">
      <div class="pdm-name">${escH(t.teamName)}</div>
      <div class="pdm-score">${t.totalScore} pts</div>
      <div class="pdm-medal">${c.medal}</div>
      <div class="pdm-block" style="height:${c.ht}">
        <span class="pdm-rank" style="color:${c.color}">${c.idx+1}</span>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
//  LAG-PODIUM – vises på spillers skjerm
// ============================================================
function showTeamPodium(position){
  const cfgs={
    1:{emoji:'🥇',label:'1. PLASS!',color:'var(--amber)',glow:'rgba(245,158,11,.35)',fw:true,scale:'1.15'},
    2:{emoji:'🥈',label:'2. PLASS!',color:'#94a3b8',glow:'rgba(148,163,184,.2)',fw:false,scale:'1'},
    3:{emoji:'🥉',label:'3. PLASS!',color:'#cd7c3a',glow:'rgba(180,100,50,.2)',fw:false,scale:'0.9'},
    0:{emoji:'🎮',label:'SPILL AVSLUTTET',color:'var(--cyan)',glow:'rgba(34,211,238,.1)',fw:false,scale:'0.85'},
  };
  const c=cfgs[position]||cfgs[0];
  document.getElementById('pdm-t-emoji').textContent=c.emoji;
  document.getElementById('pdm-t-emoji').style.fontSize=`calc(72px * ${c.scale})`;
  document.getElementById('pdm-t-label').textContent=c.label;
  document.getElementById('pdm-t-label').style.color=c.color;
  document.getElementById('pdm-t-label').style.textShadow=`0 0 24px ${c.glow}`;
  document.getElementById('pdm-t-team').textContent=ST.teamName||'';
  document.getElementById('pdm-t-score').textContent=ST.totalScore?ST.totalScore+' pts':'';
  document.getElementById('team-podium-ov').classList.add('show');
  if(c.fw)startFireworks('tp-fw-cv');
}

// ============================================================
//  CSV-EKSPORT
// ============================================================
let _lastAllTeams={};
function exportCSV(){
  const teams=Object.values(_lastAllTeams).sort((a,b)=>(b.totalScore||0)-(a.totalScore||0));
  if(!teams.length){alert('Ingen lag å eksportere ennå.');return;}
  const hdr=['Plass','Lagnavn','Total','Grunnpoeng','Tidsbonus','Hint','Status',
    ...Array.from({length:10},(_,i)=>'Q'+(i+1)+' score'),
    ...Array.from({length:10},(_,i)=>'Q'+(i+1)+' nivå')];
  const rows=teams.map((t,i)=>{
    const scores=t.scores||Array(10).fill(0);
    const choices=t.choices||Array(10).fill('');
    const base=scores.reduce((a,b)=>a+(b||0),0);
    const status=t.finished?'Fullført':t.timedOut?'Tid ut':`${(t.done||[]).filter(Boolean).length}/10 spm`;
    return[i+1,t.teamName||'',t.totalScore||0,base,t.timeBonus||0,t.totalHints||0,status,...scores,...choices.map(c=>c||'-')];
  });
  const csv=[hdr,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;
  a.download='gameon_'+new Date().toLocaleDateString('no-NO').replace(/\./g,'-')+'.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

// ============================================================
//  FASIT-PANEL (admin)
// ============================================================
function toggleAnswers(){
  const body=document.getElementById('ans-body');
  const icon=document.getElementById('ans-icon');
  if(!body)return;
  const open=body.style.display==='none';
  body.style.display=open?'block':'none';
  icon.textContent=open?'▲':'▼';
  if(open){
    renderAnswers();
    body.scrollTop=0; // start alltid fra toppen
  }
}
function renderAnswers(){
  const el=document.getElementById('ans-list');if(!el)return;
  const lvlCfg=[
    {label:'LETT',     color:'var(--green)', pts:100},
    {label:'MIDDELS',  color:'var(--amber)', pts:300},
    {label:'VANSKELIG',color:'var(--red)',   pts:600},
  ];
  function cleanQ(s){
    return s
      .replace(/`[^`]*`/g,m=>'['+m.slice(1,-1)+']') // `kode` → [kode]
      .replace(/\n+/g,' ')                            // faktiske newlines
      .replace(/\s+/g,' ')
      .trim()
      .substring(0,80)+(s.length>80?'…':'');
  }
  el.innerHTML=TASKS.map((t,ti)=>{
    const rows=t.levels.map((l,li)=>{
      const ans=_getAnswer(ti,li);
      const preview=cleanQ(l.q);
      const c=lvlCfg[li];
      return`<tr style="border-bottom:1px solid rgba(255,255,255,.05)">
        <td style="padding:8px 12px;white-space:nowrap;vertical-align:top">
          <span style="display:inline-block;font-size:10px;font-weight:700;color:${c.color};font-family:var(--gfont);letter-spacing:.04em;padding:2px 7px;border:1px solid ${c.color};border-radius:99px;opacity:.9">${c.label}</span>
          <div style="font-size:10px;color:var(--muted);font-family:var(--mono);margin-top:3px;text-align:center">${c.pts} pts</div>
        </td>
        <td style="padding:8px 12px;font-size:12px;color:rgba(255,255,255,.7);line-height:1.5;vertical-align:top">${escH(preview)}</td>
        <td style="padding:8px 14px;vertical-align:top;text-align:right">
          <code onclick="navigator.clipboard?.writeText(this.dataset.ans);this.setAttribute('data-copied','1');setTimeout(()=>this.removeAttribute('data-copied'),1500)"
            class="ans-code" data-ans="${escH(ans)}"
            title="Klikk for å kopiere">${escH(ans)}</code>
        </td>
      </tr>`;
    }).join('');
    return`<div class="ans-topic">
      <div class="ans-topic-hdr">
        <span style="font-size:18px;line-height:1">${t.icon}</span>
        <span>${escH(t.topic)}</span>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="border-bottom:1px solid rgba(255,255,255,.08)">
          <th style="padding:5px 12px;font-size:9px;color:var(--muted);font-family:var(--gfont);letter-spacing:.08em;font-weight:600;text-align:left">NIVÅ</th>
          <th style="padding:5px 12px;font-size:9px;color:var(--muted);font-family:var(--gfont);letter-spacing:.08em;font-weight:600;text-align:left">SPØRSMÅL (forhåndsvisning)</th>
          <th style="padding:5px 12px;font-size:9px;color:var(--muted);font-family:var(--gfont);letter-spacing:.08em;font-weight:600;text-align:right">SVAR</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }).join('');
}
function showMsg(id,txt,cls){const el=document.getElementById(id);if(!el)return;el.textContent=txt;el.className='msg '+cls;el.style.display=txt?'block':'none';}

// ============================================================
//  LYD
// ============================================================
let _actx=null;
function getCtx(){if(!_actx)_actx=new(window.AudioContext||window.webkitAudioContext)();return _actx;}
function playSound(type){
  try{
    const ctx=getCtx();
    if(type==='ok'){[523,659,784].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=f;const t=ctx.currentTime+i*.1;g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.start(t);o.stop(t+.3);});}
    else if(type==='err'){const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type='sawtooth';o.frequency.value=110;g.gain.setValueAtTime(.12,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.28);o.start();o.stop(ctx.currentTime+.3);}
    else if(type==='win'){[523,659,784,1046,784,1046].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=f;o.type='triangle';const t=ctx.currentTime+i*.14;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.18,t+.04);g.gain.exponentialRampToValueAtTime(.001,t+.4);o.start(t);o.stop(t+.45);});}
  }catch(e){}
}

// ============================================================
//  FYRVERKERI
// ============================================================
let _fw=[],_fwActive=false,_fwInt=null;
function startFireworks(cvId='fw-cv'){
  const c=document.getElementById(cvId)||document.getElementById('fw-cv');c.width=window.innerWidth;c.height=window.innerHeight;
  _fwActive=true;_fw=[];launchFW(c);_fwInt=setInterval(()=>launchFW(c),700);fwLoop(c);
}
function stopFireworks(){_fwActive=false;clearInterval(_fwInt);_fw=[];}
function launchFW(c){
  const x=c.width*(0.15+Math.random()*.7),y=c.height*(0.1+Math.random()*.55);
  const h=Math.floor(Math.random()*360),cnt=55+Math.floor(Math.random()*45);
  for(let i=0;i<cnt;i++){const a=Math.random()*Math.PI*2,sp=1+Math.random()*7;_fw.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,h,al:1,sz:1.5+Math.random()*2.5,dc:.012+Math.random()*.014});}
}
function fwLoop(c){
  if(!_fwActive)return;
  const ctx=c.getContext('2d');
  ctx.fillStyle='rgba(6,6,15,0.2)';ctx.fillRect(0,0,c.width,c.height);
  _fw=_fw.filter(p=>p.al>0);
  _fw.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.07;p.vx*=.99;p.al-=p.dc;ctx.globalAlpha=Math.max(0,p.al);ctx.shadowColor=`hsl(${p.h},100%,65%)`;ctx.shadowBlur=4;ctx.fillStyle=`hsl(${p.h},100%,65%)`;ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);ctx.fill();});
  ctx.globalAlpha=1;ctx.shadowBlur=0;requestAnimationFrame(()=>fwLoop(c));
}

// ============================================================
//  BAKGRUNN
// ============================================================
function initBG(){
  const c=document.getElementById('bg'),ctx=c.getContext('2d');
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  const stars=Array.from({length:200},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,sz:Math.random()*1.8+.3,sp:Math.random()*.22+.04,al:Math.random()*.7+.15}));
  const orbs=[{cx:.2,cy:.3,r:180,cl:'rgba(34,211,238,.035)'},{cx:.8,cy:.7,r:220,cl:'rgba(139,92,246,.035)'},{cx:.5,cy:.1,r:140,cl:'rgba(245,158,11,.025)'}];
  let f=0;
  (function draw(){f++;
    const g=ctx.createLinearGradient(0,0,0,c.height);g.addColorStop(0,'#06060f');g.addColorStop(1,'#0a0a1f');
    ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
    orbs.forEach(o=>{const gr=ctx.createRadialGradient(o.cx*c.width,o.cy*c.height,0,o.cx*c.width,o.cy*c.height,o.r);gr.addColorStop(0,o.cl);gr.addColorStop(1,'transparent');ctx.fillStyle=gr;ctx.fillRect(0,0,c.width,c.height);});
    stars.forEach(s=>{s.y-=s.sp;if(s.y<0){s.y=c.height;s.x=Math.random()*c.width;}ctx.globalAlpha=s.al*(0.5+0.5*Math.sin(f*.03+s.x));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.x,s.y,s.sz,0,Math.PI*2);ctx.fill();});
    ctx.globalAlpha=1;setTimeout(()=>requestAnimationFrame(draw),33);
  })();
}

// ============================================================
//  EVENTS & INIT
// ============================================================
// Blokkér tilbake-navigasjon og refresh midt i spill
window.addEventListener('popstate',()=>{
  if(ST.playing&&!ST.finished&&!ST.timedOut){
    // Trykket Tilbake – skyv frem igjen og hold spilleren på nåværende spørsmål
    history.pushState({screen:'game'},'','#game');
    R('game');
  }
});
window.addEventListener('beforeunload',e=>{
  if(ST.playing&&!ST.finished&&!ST.timedOut){
    e.preventDefault();e.returnValue='';
  }
});

document.getElementById('reg-btn').onclick=registerTeam;
document.getElementById('tname').onkeydown=e=>{if(e.key==='Enter')registerTeam();};
document.getElementById('subbtn').onclick=submitAnswer;
document.getElementById('ans').onkeydown=e=>{if(e.key==='Enter'&&!document.getElementById('subbtn').disabled)submitAnswer();};
document.getElementById('adm-login-btn').onclick=adminLogin;
document.getElementById('adm-pw').onkeydown=e=>{if(e.key==='Enter')adminLogin();};
document.getElementById('check-start-btn').onclick=checkForGameStart;

document.addEventListener('DOMContentLoaded',()=>{
  initBG();initFirebase();loadSettings();
  const hash=location.hash.replace('#','');
  if(hash==='admin'){R('admin-login');return;}
  if(hash==='spectator'){R('spectator');return;}
  if(hash==='podium'){R('podium');return;}
  const nm=LS.get('last_team');
  if(nm){
    const s=loadTeam(nm);
    if(s){
      if(s.finished){ST={...s};R('win');return;}
      if(s.timedOut){ST={...s};R('timeout');return;}
      if(s.playing&&s.gameStartTime){
        const elapsed=Math.floor((Date.now()-s.gameStartTime)/1000);
        if(elapsed<CFG.duration){
          // Auto-resume uten å spørre – spilleren befinner seg på gjeldende spørsmål
          ST={...s};_gst=ST.gameStartTime;_qst=ST.questionStartTime||Date.now();
          R('game');startTimer(ST.gameStartTime);startGameWatcher(ST.gameStartTime);return;
        }
      }
      if(s.registered&&!s.playing){
        ST={...s};
        const startData=getStartData();
        if(startData&&startData.startTime){beginGame(startData.startTime);}
        else{R('lobby');}return;
      }
    }
  }
  R('home');
});
