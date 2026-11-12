
/* ======================= Ikon ======================= */
const P={
 home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
 calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 list:'<path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
 flag:'<path d="M5 22V4h12l-2 4 2 4H5"/>',
 bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
 folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 chart:'<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
 users:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 right:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',
 bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
 trend:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
 chevL:'<path d="m15 18-6-6 6-6"/>',chevR:'<path d="m9 18 6-6-6-6"/>',
 updown:'<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
 sheet:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
 refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 x:'<path d="M18 6 6 18M6 6l12 12"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',
 more:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
 arrow:'<path d="M7 17 17 7M8 7h9v9"/>',
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
 edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
 palette:'<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A5.7 5.7 0 0 0 22 9.7C22 5.4 17.5 2 12 2z"/>',
 alert:'<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
 swap:'<path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'
};
Object.assign(P,{
 note:'<path d="M5 3h10l4 4v14H5z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 eyeoff:'<path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.7C3.9 8.4 2 12 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
 pin:'<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'
});
const ic=(n,s=20)=>`<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;

function setNavCollapsed(collapsed){
  const app=document.getElementById('app'),button=document.getElementById('navCollapseBtn'),expandButton=document.getElementById('navExpandBtn');
  if(!app||!button||!expandButton)return;
  app.classList.toggle('nav-collapsed',collapsed);
  const side=document.documentElement.dataset.side||'right';
  button.innerHTML=ic(side==='right'?'chevR':'chevL',18);
  button.setAttribute('aria-expanded',String(!collapsed));
  expandButton.setAttribute('aria-expanded',String(!collapsed));
  expandButton.setAttribute('aria-label','Toggle sidebar');
  expandButton.title='Toggle sidebar';
}
function toggleNav(){
  const collapsed=!document.getElementById('app').classList.contains('nav-collapsed');
  setNavCollapsed(collapsed);
}
setNavCollapsed(true);

/* ======================= Konstanta & util ======================= */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const BULAN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const BLN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const HARI=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
const HARI_F=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const PLATFORMS=['Instagram','TikTok','YouTube','Facebook','X / Twitter','LinkedIn'];
const PSHORT={Instagram:'IG',TikTok:'TT',YouTube:'YT',Facebook:'FB','X / Twitter':'X',LinkedIn:'IN'};
const FORMATS=['Feed','Reels','Carousel','Story','Video'];
const FC={Feed:'#2563eb',Reels:'#db2777',Carousel:'#d97706',Story:'#7c3aed',Video:'#059669'};
const STATUSES=['Idea','Draft','Content done','Scheduled','Published'];
const SC={Idea:'#b45309',Draft:'#64748b','Content done':'#0d9488',Scheduled:'#2563eb',Published:'#16a34a'};
const IDEA_ST=['Baru','Riset','Siap dibuat'];
const ISC={Baru:'#64748b',Riset:'#d97706','Siap dibuat':'#16a34a'};
const PRC={High:'#dc2626',Medium:'#d97706',Low:'#64748b'};
const STEPS=['Brief','Script','Produksi','Editing','Caption','Approval'];
const ACC_COLORS=['#4f46e5','#0d9488','#e11d48','#0369a1','#7e22ce','#c2410c','#334155','#16a34a'];
const THEMES={account:['Warna akun',null],indigo:['Indigo','#4f46e5'],emerald:['Emerald','#059669'],rose:['Rose','#e11d48'],ocean:['Ocean','#1470ff'],grape:['Grape','#7e22ce'],amber:['Amber','#c2410c'],slate:['Slate','#334155']};
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const pd=s=>{const[y,m,d]=String(s).split('-').map(Number);return new Date(y,(m||1)-1,d||1)};
const addD=(s,n)=>{const d=pd(s);d.setDate(d.getDate()+n);return ymd(d)};
const NOW=new Date(),TODAY=ymd(NOW);
const nf=n=>Number(n||0).toLocaleString('id-ID');
const cf=n=>new Intl.NumberFormat('id-ID',{notation:'compact',maximumFractionDigits:1}).format(Number(n||0));
const isMob=()=>matchMedia('(max-width:760px)').matches;
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const pj=(s,d)=>{if(Array.isArray(s))return s;try{const v=JSON.parse(s||'');return Array.isArray(v)?v:d}catch(e){return d}};
const fmtShort=s=>{const d=pd(s);return`${HARI_F[d.getDay()].slice(0,3)}, ${d.getDate()} ${BLN[d.getMonth()]}`};
const fmtLong=s=>{const d=pd(s);return`${HARI_F[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`};
const monthRange=m=>[ymd(new Date(m.getFullYear(),m.getMonth(),1)),ymd(new Date(m.getFullYear(),m.getMonth()+1,0))];
const weekStart=s=>{const d=pd(s);d.setDate(d.getDate()-((d.getDay()+6)%7));return ymd(d)};
const initials=n=>String(n||'?').trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const normUrl=u=>!u?'':/^[a-z]+:\/\//i.test(u)?u:'https://'+u;
function domainLabel(u){
  try{const h=new URL(normUrl(u)).hostname.replace(/^www\./,'');
    const map=[['instagram','Instagram'],['tiktok','TikTok'],['youtu','YouTube'],['drive.google','Google Drive'],['docs.google','Google Docs'],['pinterest','Pinterest'],['canva','Canva'],['figma','Figma'],['notion','Notion'],['twitter','X'],['x.com','X'],['facebook','Facebook'],['linkedin','LinkedIn'],['capcut','CapCut'],['spotify','Spotify']];
    const f=map.find(([k])=>h.includes(k));return f?f[1]:h}catch(e){return'Link'}
}
const isUrl=s=>/^(https?:\/\/|www\.)\S+$/i.test(String(s).trim())||/^[\w-]+\.(com|id|co|net|org|io|app|me|ly)(\/\S*)?$/i.test(String(s).trim());

/* ======================= State ======================= */
const S={
  data:{accounts:[],contents:[],campaigns:[],ideas:[],resources:[],settings:{},sheetUrl:''},
  acc:store.get('cp2_acc',''),
  view:store.get('cp2_view','dashboard'),
  cmode:store.get('cp2_cmode','calendar'),
  range:'month',
  month:new Date(NOW.getFullYear(),NOW.getMonth(),1),
  sel:TODAY, sort:{k:'Date',d:1}, picked:new Set(),
  f:{q:'',platform:'',status:'',format:''}, ideaSt:'', ideaQ:'',
  prefs:Object.assign({theme:'ocean',mode:'light',side:'right'},store.get('cp2_prefs',{})),
  ready:false, loadErr:'', notes:store.get('cp2_notes',[])
};

/* ===== Loading guard and visible startup errors ===== */
window.__cpReady=false;
function cpShowErr(msg){
  if(window.__cpReady)return;
  const lock=document.getElementById('lock');if(lock)lock.classList.add('hide');document.body.classList.remove('locked');
  const loader=document.getElementById('loader');if(!loader)return;
  loader.classList.remove('hide');loader.innerHTML='';
  const box=document.createElement('div');box.className='cperr';
  const title=document.createElement('h3');title.textContent='Data belum bisa dimuat';
  const error=document.createElement('pre');error.textContent=String(msg);
  const steps=document.createElement('ol');
  ['Pastikan secrets Google Sheets sudah diatur di Netlify.','Bagikan spreadsheet sebagai Editor ke email service account.','Periksa log Netlify Functions dan coba muat ulang.']
    .forEach(text=>{const li=document.createElement('li');li.textContent=text;steps.appendChild(li)});
  const retry=document.createElement('button');retry.textContent='Coba lagi';retry.onclick=cpRetry;
  box.append(title,error,steps,retry);loader.appendChild(box);
}
function cpWatch(){clearTimeout(window.__cpWd);window.__cpWd=setTimeout(()=>cpShowErr('Server tidak merespons dalam '+Math.round((window.CP_TIMEOUT||45000)/1000)+' detik.'),(window.CP_TIMEOUT||45000)+2000)}
function cpRetry(){const loader=document.getElementById('loader');loader.innerHTML='<div class="spin"></div>';cpWatch();if(window.reload)reload()}
window.addEventListener('error',e=>cpShowErr('Error JavaScript: '+(e.message||e.error)+(e.lineno?' (baris '+e.lineno+')':'')));
window.addEventListener('unhandledrejection',e=>cpShowErr('Error: '+((e.reason&&e.reason.message)||e.reason)));
cpWatch();

/* ======================= API & demo ======================= */
const API_URL=window.CP_API_URL||'/.netlify/functions/api';
async function api(fn,...args){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),window.CP_TIMEOUT||45000);
  try{
    const token=(()=>{try{return localStorage.getItem('cp2_ok')||sessionStorage.getItem('cp2_ok')||''}catch(e){return''}})();
    const headers={'Content-Type':'application/json'};
    if(fn!=='authenticate'&&token)headers.Authorization='Bearer '+token;
    const response=await fetch(API_URL,{method:'POST',headers,
      body:JSON.stringify({action:fn,args}),signal:controller.signal});
    const result=await response.json().catch(()=>({error:'Respons backend tidak valid.'}));
    if(!response.ok)throw new Error(result.error||`Permintaan gagal (${response.status})`);
    return result.data;
  }catch(error){
    if(error.name==='AbortError')throw new Error('Server tidak merespons (timeout) saat memanggil '+fn);
    throw error;
  }finally{clearTimeout(timeout)}
}
const Demo=(()=>{
  const y=NOW.getFullYear(),m=NOW.getMonth(),d=n=>ymd(new Date(y,m,n));
  const SGK='ACC-SGK',PKC='ACC-PKC';
  const cl=st=>JSON.stringify(STEPS.map((t,i)=>({t,d:st==='Published'||st==='Scheduled'||(st==='Content done'&&i<5)||(st==='Draft'&&i<2)})));
  const raw=[[SGK,1,'06:30','Selamat datang di Studio Gerak: intip ruang kelasnya','Feed','Published','Branding','Kelas Perdana Pilates'],[SGK,3,'18:00','Pilates pemula: 5 gerakan dasar yang wajib kamu tahu','Carousel','Published','Edukasi','Kelas Perdana Pilates'],[SGK,5,'07:00','Ikut kelas perdana, begini rasanya','Reels','Published','Testimoni','Kelas Perdana Pilates'],[SGK,8,'12:00','Jadwal kelas minggu ini','Story','Published','Info',''],[SGK,10,'06:30','Stretching 5 menit sebelum tidur','Reels','Published','Tips',''],[SGK,13,'17:00','Kenalan sama instruktur: Coach Maya','Feed','Published','Community','Kelas Perdana Pilates'],[SGK,16,'06:30','Mulai! Challenge 21 Hari Gerak','Reels','Published','Promo','Challenge 21 Hari Gerak'],[SGK,19,'18:00','Checklist harian challenge hari 1-7','Carousel','Published','Edukasi','Challenge 21 Hari Gerak'],[SGK,22,'07:00','Peserta challenge cerita: minggu pertama','Story','Content done','Testimoni','Challenge 21 Hari Gerak'],[SGK,24,'12:00','Yoga vs pilates: pilih yang mana?','Carousel','Scheduled','Edukasi',''],[SGK,26,'06:30','Gerakan ringan buat yang kerja duduk seharian','Reels','Content done','Tips','Challenge 21 Hari Gerak'],[SGK,28,'17:00','Progres peserta di tengah challenge','Feed','Draft','Community','Challenge 21 Hari Gerak'],[SGK,30,'18:00','Promo member baru bulan depan','Feed','Idea','Promo',''],[PKC,2,'20:00','Buku yang bikin aku lupa waktu','Video','Published','Review','Baca 12 Buku Setahun'],[PKC,6,'20:00','Rak buku baru: tur singkat','Video','Published','Lifestyle',''],[PKC,10,'20:00','3 novel pendek buat pembaca pemula','Video','Published','Rekomendasi','Baca 12 Buku Setahun'],[PKC,14,'20:00','Cara baca 20 halaman sehari tanpa paksaan','Video','Published','Tips','Baca 12 Buku Setahun'],[PKC,18,'20:00','Plot twist yang bikin aku teriak','Video','Published','Review',''],[PKC,21,'20:00','Book haul dari bazar buku murah','Video','Content done','Hiburan',''],[PKC,25,'20:00','Ending buku favorit: setuju atau enggak?','Video','Scheduled','Diskusi','Baca 12 Buku Setahun'],[PKC,29,'20:00','Tag temanmu yang suka pinjam buku tapi gak balikin','Video','Draft','Hiburan','']];
  const L=a=>JSON.stringify(a.map(([label,url])=>({label,url})));
  const db={
    accounts:[{ID:SGK,Name:'Studio Gerak',Handle:'@studiogerak.id',Platform:'Instagram',Color:'#0ea5e9',TargetPerWeek:4,Notes:'Studio yoga dan pilates: kelas, tips, komunitas'},{ID:PKC,Name:'Pustaka Kecil',Handle:'@pustakakecil',Platform:'TikTok',Color:'#7c3aed',TargetPerWeek:3,Notes:'Komunitas baca dan review buku'}],
    contents:raw.map((r,i)=>{const pub=r[5]==='Published',reach=pub?700+(i*283)%2100:'',tk=r[0]===PKC;return{ID:'CNT-'+pad(i+1),AccountID:r[0],Date:d(r[1]),Time:r[2],Title:r[3],Platform:tk?'TikTok':'Instagram',Format:r[4],Status:r[5],Campaign:r[7],Pillar:r[6],Caption:'',Hashtags:tk?'#pustakakecil #bukutok':'#studiogerak #pilatesindonesia',Checklist:cl(r[5]),Links:'[]',PostLink:pub?(tk?'https://www.tiktok.com/':'https://www.instagram.com/'):'',ResultLink:r[5]==='Content done'?'https://drive.google.com/':'',Reach:reach,Likes:pub?Math.round(reach*.08+i*2):'',Comments:pub?Math.round(reach*.01)+i%5:'',Shares:pub?(i*3)%17+4:'',Saves:pub?Math.round(reach*.03)+i%6:'',Notes:''}}),
    campaigns:[{ID:'CMP-1',AccountID:SGK,Name:'Kelas Perdana Pilates',StartDate:d(1),EndDate:d(14),Goal:'Isi 40 slot kelas perdana',Color:'#0ea5e9',Status:'Done'},{ID:'CMP-2',AccountID:SGK,Name:'Challenge 21 Hari Gerak',StartDate:d(16),EndDate:d(30),Goal:'Ajak 100 peserta ikut challenge',Color:'#f97316',Status:'Active'},{ID:'CMP-3',AccountID:PKC,Name:'Baca 12 Buku Setahun',StartDate:d(1),EndDate:d(30),Goal:'Bangun komunitas baca 1.500 anggota',Color:'#7c3aed',Status:'Active'}],
    ideas:[{ID:'IDE-1',AccountID:SGK,Title:'Tur 60 detik: satu hari di Studio Gerak',Pillar:'Behind the scene',Format:'Reels',Platform:'Instagram',Priority:'High',Status:'Siap dibuat',Links:L([['Referensi Reels','https://www.instagram.com/reels/']]),Notes:'Buka dengan suara kelas pagi'},{ID:'IDE-2',AccountID:PKC,Title:'Audiobook vs buku cetak: mana yang lebih masuk?',Pillar:'Diskusi',Format:'Video',Platform:'TikTok',Priority:'Medium',Status:'Riset',Links:L([['Artikel sumber','https://www.google.com/search?q=audiobook+vs+buku+cetak']]),Notes:'Minta pendapat di kolom komentar'},{ID:'IDE-3',AccountID:SGK,Title:'Kuis: tipe latihanmu yoga atau pilates?',Pillar:'Edukasi',Format:'Story',Platform:'Instagram',Priority:'Low',Status:'Baru',Links:'[]',Notes:''},{ID:'IDE-4',AccountID:PKC,Title:'Tukar buku antar anggota komunitas',Pillar:'Community',Format:'Video',Platform:'TikTok',Priority:'Medium',Status:'Baru',Links:L([['Contoh video','https://www.tiktok.com/']]),Notes:'Kumpul di akhir pekan'}],
    resources:[{ID:'RES-1',AccountID:SGK,Title:'Panduan visual Studio Gerak',Category:'Brand',Url:'https://drive.google.com/',Notes:'Logo, palet warna, font'},{ID:'RES-2',AccountID:PKC,Title:'Daftar bacaan komunitas',Category:'Aset',Url:'https://drive.google.com/',Notes:''},{ID:'RES-3',AccountID:'',Title:'Inspirasi hook video pendek',Category:'Referensi',Url:'https://www.instagram.com/reels/',Notes:'Dipakai semua akun'},{ID:'RES-4',AccountID:'',Title:'Template caption dan CTA',Category:'Template',Url:'https://docs.google.com/',Notes:''}],
    settings:{AppName:'Content Planner',Owner:'Tim Kreatif',CreatorName:'Dina',CreatorRole:'Social Media Specialist'}
  };
  const K={Accounts:'accounts',Contents:'contents',Campaigns:'campaigns',Ideas:'ideas',Resources:'resources'};
  const P2={Accounts:'ACC',Contents:'CNT',Campaigns:'CMP',Ideas:'IDE',Resources:'RES'};
  return{
    getAllData:()=>JSON.parse(JSON.stringify({...db,prefs:{},sheetUrl:'',demo:true})),
    saveRecord:(s,r)=>{r={...r};if(!r.ID)r.ID=P2[s]+'-'+Math.random().toString(36).slice(2,8).toUpperCase();const a=db[K[s]],i=a.findIndex(x=>x.ID===r.ID);i>-1?a[i]=r:a.push(r);return r},
    deleteRecord:(s,id)=>{db[K[s]]=db[K[s]].filter(x=>x.ID!==id);return true},
    bulkUpdate:(s,ids,p)=>{db[K[s]].forEach(x=>{if(ids.includes(x.ID))Object.assign(x,p)});return ids.length},
    bulkDelete:(s,ids)=>{db[K[s]]=db[K[s]].filter(x=>!ids.includes(x.ID));return ids.length},
    deleteAccount:id=>{['contents','campaigns','ideas','resources'].forEach(k=>db[k]=db[k].filter(x=>x.AccountID!==id));db.accounts=db.accounts.filter(a=>a.ID!==id);return true},
    saveSettings:o=>{Object.assign(db.settings,o);return true},
    savePrefs:()=>true,
    syncMetrics:()=>{throw new Error('Sinkronisasi metrik sosial belum tersedia pada backend baru.')},
    exportToSheet:()=>{throw new Error('Ekspor ke tab spreadsheet belum tersedia. Gunakan Download CSV.')}
  };
})();

/* ======================= Akun ======================= */
const accById=id=>S.data.accounts.find(a=>a.ID===id);
const accColor=id=>(accById(id)||{}).Color||'#64748b';
const curAcc=()=>S.acc==='all'?null:accById(S.acc);
const isAll=()=>S.acc==='all';
function fixAcc(){
  const a=S.data.accounts;
  if(!a.length)return;
  if(S.acc==='all'&&a.length>1)return;
  if(!accById(S.acc))S.acc=a[0]?a[0].ID:'';
}
const scoped=(arr,shared)=>isAll()?arr:arr.filter(x=>x.AccountID===S.acc||(shared&&!x.AccountID));
const defAcc=()=>isAll()?(S.data.accounts[0]||{}).ID||'':S.acc;
function avatar(a,cls=''){
  if(!a)return`<span class="av all ${cls}" aria-hidden="true">${ic('users',cls==='sm'?13:16)}</span>`;
  return`<span class="av ${cls}" style="--c:${esc(a.Color||'#4f46e5')}">${esc(initials(a.Name))}</span>`;
}
function switchAcc(id){
  S.acc=id;store.set('cp2_acc',id);S.picked.clear();closePop();closeSheet();
  applyPrefs();render();
  const a=accById(id);toast(a?`Beralih ke ${a.Name}`:'Menampilkan semua akun');
}
function accMenuHTML(){
  const list=S.data.accounts;
  const cnt=id=>S.data.contents.filter(c=>c.AccountID===id&&c.Date>=TODAY&&c.Status!=='Published').length;
  return`<div class="menu">${list.map(a=>`<button onclick="switchAcc('${a.ID}')">${avatar(a)}<span class="t">${esc(a.Name)}<span>${esc(a.Handle||a.Platform||'')} · ${cnt(a.ID)} mendatang</span></span>${S.acc===a.ID?ic('check',18):''}</button>`).join('')}
    ${list.length>1?`<button onclick="switchAcc('all')">${avatar(null)}<span class="t">Semua akun<span>Gabungan ${list.length} akun</span></span>${isAll()?ic('check',18):''}</button>`:''}
    <hr><button onclick="closePop();closeSheet();openEntity('Accounts')">${ic('plus')}<span class="t">Tambah akun</span></button>
    <button onclick="go('accounts')">${ic('users')}<span class="t">Kelola akun</span></button></div>`;
}
function openAccMenu(btn){
  if(isMob()||!btn){openSheet(`<div class="grab"></div><div class="sh-h"><h3>Pilih akun</h3><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic('x')}</button></div><div class="sh-b">${accMenuHTML()}</div>`,'narrow');return}
  const p=$('#pop');if(p.classList.contains('open')&&p.dataset.k==='acc')return closePop();
  const r=btn.getBoundingClientRect();
  p.innerHTML=accMenuHTML();p.dataset.k='acc';p.style.left='12px';p.style.top='12px';p.classList.add('open');
  const width=p.getBoundingClientRect().width,height=p.getBoundingClientRect().height;
  const left=Math.max(12,Math.min(r.left,window.innerWidth-width-12));
  const below=window.innerHeight-r.bottom-12;
  const top=height<=below?r.bottom+6:Math.max(12,r.top-height-6);
  p.style.left=left+'px';p.style.top=top+'px';
}
function closePop(){$('#pop').classList.remove('open');$('#fab').classList.remove('open')}
document.addEventListener('click',e=>{if(!e.target.closest('#pop')&&!e.target.closest('#accBtn')&&!e.target.closest('#fab'))closePop()});

/* ======================= Tema ======================= */
const mq=matchMedia('(prefers-color-scheme: dark)');
function applyPrefs(){
  const r=document.documentElement,t=THEMES[S.prefs.theme]?S.prefs.theme:'account';
  r.dataset.theme=t;r.dataset.side=S.prefs.side==='left'?'left':'right';
  if(t==='account')r.style.setProperty('--ac',curAcc()?curAcc().Color:'#4f46e5');else r.style.removeProperty('--ac');
  const mode=S.prefs.mode==='system'?(mq.matches?'dark':'light'):S.prefs.mode;
  r.dataset.mode=mode;
  const ico=ic(mode==='dark'?'sun':'moon');$('#modeBtn').innerHTML=ico;$('#modeBtnM').innerHTML=ico;
  const m=document.querySelector('meta[name=theme-color]');if(m)m.content=mode==='dark'?'#171a22':'#ffffff';
}
mq.addEventListener?.('change',()=>S.prefs.mode==='system'&&applyPrefs());
function setPref(k,v){S.prefs[k]=v;store.set('cp2_prefs',S.prefs);applyPrefs();api('savePrefs',S.prefs).catch(()=>{});if(S.view==='settings')render()}
function toggleMode(){setPref('mode',document.documentElement.dataset.mode==='dark'?'light':'dark')}

/* ======================= Navigasi ======================= */
const VIEWS={
  dashboard:['Beranda','home'],content:['Konten','calendar'],campaign:['Campaign','flag'],
  ideas:['Idea Bank','bulb'],resources:['Resources','folder'],analytics:['Analytics','chart'],
  accounts:['Akun','users'],settings:['Pengaturan','gear']
};
const RNAV=[['Rencana',['dashboard','content','campaign']],['Bahan',['ideas','resources']],['Laporan',['analytics','accounts']]];
const BNAV=[['dashboard','Beranda'],['content','Konten'],['ideas','Ide'],['more','Menu']];
/* ===== LOGO =====
 Ganti gambar logo: isi LOGO_SRC di bawah ini, ATAU isi di Pengaturan > Profil > "Logo (URL gambar)".
 Boleh: link share Google Drive, URL https gambar, atau data:image/... (base64). Kosong = logo bawaan. */
const LOGO_SRC='';
const LOGO_SVG=`<svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><circle cx="20" cy="22" r="14" fill="#2f7df6"/><ellipse cx="20" cy="26" rx="9" ry="9" fill="#fff"/><circle cx="15" cy="21" r="2.6" fill="#10244f"/><circle cx="25" cy="21" r="2.6" fill="#10244f"/><circle cx="14.2" cy="20" r=".9" fill="#fff"/><circle cx="24.2" cy="20" r=".9" fill="#fff"/><path d="M17 25l3 4 3-4z" fill="#ff9a1f"/><path d="M8 14q12-12 24 0" fill="none" stroke="#7a4a24" stroke-width="3" stroke-linecap="round"/></svg>`;
function logoIds_(u){
  u=String(u||'').trim();
  if(/drive\.google\.com|docs\.google\.com/i.test(u)){
    const m=u.match(/\/d\/([\w-]{20,})/)||u.match(/[?&]id=([\w-]{20,})/);return m?m[1]:'';
  }
  const m=u.match(/^([\w-]{25,})$/);return m?m[1]:'';
}
function logoCandidates_(u){
  u=String(u||'').trim();if(!u)return [];
  if(/^data:image\//i.test(u))return [u];
  const id=logoIds_(u);
  if(id)return ['https://lh3.googleusercontent.com/d/'+id+'=w256','https://drive.google.com/thumbnail?id='+id+'&sz=w256','https://drive.google.com/uc?export=view&id='+id];
  return /^https?:\/\//i.test(u)?[u]:[];
}
function applyLogo(){
  const raw=((S.data&&S.data.settings)||{}).LogoUrl||LOGO_SRC;
  const cand=logoCandidates_(raw),key=cand.join('|');
  [$('.mark .logo'),$('#lkLogo')].forEach(el=>{
    if(!el)return;
    if(el.dataset.src===key&&el.firstChild)return;
    el.dataset.src=key;el.classList.toggle('img',!!cand.length);
    if(!cand.length){el.innerHTML=LOGO_SVG;return}
    let i=0;const im=new Image();im.alt='Logo';im.decoding='async';im.referrerPolicy='no-referrer';
    im.onerror=()=>{
      if(++i<cand.length){im.src=cand[i];return}
      el.classList.remove('img');el.innerHTML=LOGO_SVG;
      if(!window.__logoWarned){window.__logoWarned=1;console.warn('Logo gagal dimuat:',cand);try{toast('Logo gagal dimuat — pastikan file gambar (PNG/JPG/SVG) dibagikan "Siapa saja yang memiliki link"')}catch(e){}}
    };
    im.src=cand[0];el.innerHTML='';el.appendChild(im);
  });
}
function chrome(){
  $('#icPromo').innerHTML=ic('sheet',22);
  $('#icSrch').innerHTML=ic('search',16);$('#bellBtn').innerHTML=ic('bell',20)+'<i class="bdot" id="bellDot"></i>';
  $('#icNew').innerHTML=ic('plus',18);
  $('#refBtn').innerHTML=ic('refresh');$('#expBtnM').innerHTML=ic('sheet');$('#fab').innerHTML=ic('plus',26);
  $('#setNav').innerHTML=ic('gear',20);$('#expBtnD').innerHTML=ic('sheet',20);applyLogo();
  $('#lockBtn').innerHTML=ic('lock',19);
  $('#bnav').innerHTML=BNAV.map(([v,l])=>`${v==='ideas'?'<i class="bsp"></i>':''}<button data-v="${v}" onclick="${v==='more'?'openMore()':`go('${v}')`}"><span class="pi">${ic(v==='more'?'more':VIEWS[v][1],22)}</span>${l}</button>`).join('');
}
function go(v){S.view=v;store.set('cp2_view',v);S.picked.clear();closeSheet();closePop();render();$('#view').scrollTop=0}

/* ======================= Data helpers ======================= */
const sortDT=(a,b)=>(a.Date+(a.Time||'')).localeCompare(b.Date+(b.Time||''));
function groupBy(arr,k){const o={};arr.forEach(x=>(o[x[k]]=o[x[k]]||[]).push(x));Object.values(o).forEach(a=>a.sort(sortDT));return o}
function upsert(arr,r){const i=arr.findIndex(x=>x.ID===r.ID);i>-1?arr[i]=r:arr.push(r)}
const inMonth=(arr,m=S.month)=>{const[a,b]=monthRange(m);return arr.filter(c=>c.Date>=a&&c.Date<=b)};
const overdue=c=>c.Date<TODAY&&c.Status!=='Published';
function filtered(){
  const q=S.f.q.trim().toLowerCase();
  return scoped(S.data.contents).filter(c=>(!S.f.platform||c.Platform===S.f.platform)&&(!S.f.status||c.Status===S.f.status)&&(!S.f.format||c.Format===S.f.format)&&
    (!q||[c.Title,c.Pillar,c.Campaign,c.Caption,c.Hashtags].join(' ').toLowerCase().includes(q)));
}
function progress(c){const l=pj(c.Checklist,[]);return[l.filter(x=>x.d).length,l.length]}
function progHTML(c){const[d,t]=progress(c);if(!t)return'';return`<span class="prog ${d===t?'full':''}" title="Checklist produksi"><span class="bar"><i style="width:${d/t*100}%"></i></span>${d}/${t}</span>`}
function setF(k,v){S.f[k]=v;S.picked.clear();render()}
const opts=(arr,sel,all)=>(all!=null?`<option value="">${all}</option>`:'')+arr.map(o=>`<option ${o===sel?'selected':''}>${esc(o)}</option>`).join('');

/* ======================= Render ======================= */
function render(){
  fixAcc();
  if(!VIEWS[S.view])S.view='content';
  const v=S.view,a=curAcc(),st=S.data.settings||{};
  $('#appName').textContent=st.AppName||'Content Planner';
  $('#ownerLbl').textContent='by '+(st.Owner||'Tim Kreatif');
  const accHTML=`${avatar(a)}<span class="t"><b>${esc(a?a.Name:'Semua akun')}</b><span>${esc(a?(a.Handle||a.Platform):S.data.accounts.length+' akun')}</span></span><span class="chev">${ic('updown',16)}</span>`;
  $('#accBtn').innerHTML=accHTML;$('#accBtnM').innerHTML=avatar(a);
  $('#tTitle').textContent=VIEWS[v][0];
  $('#tSub').innerHTML=a?`<i class="adot" style="--c:${esc(a.Color)}"></i>${esc(a.Name)} <span class="muted">${esc(a.Handle||'')}</span>`:`<i class="adot" style="--c:var(--ink3)"></i>Semua akun`;
  if(v==='dashboard'){$('#tTitle').textContent='Halo, '+(st.CreatorName||'Creator')+',';$('#tSub').textContent=(st.CreatorRole||'Creator')}
  renderNotesW();
  const up=scoped(S.data.contents).filter(c=>c.Date>=TODAY&&c.Status!=='Published').length;
  const counts={content:up,ideas:scoped(S.data.ideas).length};
  $('#rnav').innerHTML=RNAV.map(([g,items])=>items.map(k=>`<button class="navi ${k===v?'active':''}" onclick="go('${k}')" title="${VIEWS[k][0]}">${ic(VIEWS[k][1])}<span>${VIEWS[k][0]}</span>${counts[k]?`<span class="cnt">${counts[k]}</span>`:''}</button>`).join('')).join('');
  $('#setNav').classList.toggle('active',v==='settings');
  $('.hsearch').style.display=v==='content'?'none':'';
  $('#hchips').replaceChildren();
  $('#bellDot').style.display=scoped(S.data.contents).some(overdue)?'block':'none';
  $$('#bnav button').forEach(b=>b.classList.toggle('active',b.dataset.v===v||(b.dataset.v==='more'&&['campaign','resources','accounts','settings'].includes(v))));
  applyLogo();
  $('#view').innerHTML=!S.ready?vWait():({dashboard:vDash,content:vContent,campaign:vCampaign,ideas:vIdeas,resources:vResources,analytics:vAnalytics,accounts:vAccounts,settings:vSettings})[v]();
  if(v==='content'&&S.cmode==='calendar'&&!isMob())bindDnD();
}

/* ======================= KONTEN: toolbar ======================= */
function vContent(){
  const showMonth=S.cmode==='calendar'||S.range==='month';
  const m=S.month;
  let h=`<div class="tb">
    <div class="seg" role="tablist"><button class="${S.cmode==='calendar'?'on':''}" onclick="setCMode('calendar')">${ic('calendar',16)}Kalender</button><button class="${S.cmode==='list'?'on':''}" onclick="setCMode('list')">${ic('list',16)}List</button></div>
    ${showMonth?`<div class="mnav"><button class="ib bare" onclick="shiftMonth(-1)" aria-label="Bulan sebelumnya">${ic('chevL')}</button><h2>${BULAN[m.getMonth()]} ${m.getFullYear()}</h2><button class="ib bare" onclick="shiftMonth(1)" aria-label="Bulan berikutnya">${ic('chevR')}</button><button class="btn sm" onclick="goToday()">Hari ini</button></div>`:''}
    <span class="sp"></span>
    <label class="search" style="width:260px">${ic('search',17)}<input id="q" placeholder="Cari konten…" value="${esc(S.f.q)}" oninput="qInput(this)"></label>
  </div>
  <div class="filters">
    ${S.cmode==='list'?`<div class="seg">${[['month','Per bulan'],['upcoming','Mendatang'],['overdue','Terlambat'],['all','Semua']].map(([k,l])=>`<button class="${S.range===k?'on':''}" onclick="setRange('${k}')">${l}</button>`).join('')}</div>`:''}
    <select class="fsel ${S.f.platform?'on':''}" onchange="setF('platform',this.value)" aria-label="Platform">${opts(PLATFORMS,S.f.platform,'Semua platform')}</select>
    <select class="fsel ${S.f.status?'on':''}" onchange="setF('status',this.value)" aria-label="Status">${opts(STATUSES,S.f.status,'Semua status')}</select>
    <select class="fsel ${S.f.format?'on':''}" onchange="setF('format',this.value)" aria-label="Format">${opts(FORMATS,S.f.format,'Semua format')}</select>
    ${(S.f.platform||S.f.status||S.f.format||S.f.q)?`<button class="btn sm ghost" onclick="clearF()">Reset filter</button>`:''}
    <span class="count" id="cnt"></span>
  </div>`;
  const body=S.cmode==='list'?vList():(isMob()?mCal():dCal());
  return h+body;
}
function setCMode(m){S.cmode=m;store.set('cp2_cmode',m);S.picked.clear();render()}
function setRange(r){S.range=r;S.picked.clear();render()}
function clearF(){S.f={q:'',platform:'',status:'',format:''};render()}
let qT;function qInput(el){S.f.q=el.value;clearTimeout(qT);qT=setTimeout(()=>{render();const i=$('#q');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},220)}
function shiftMonth(n){S.month=new Date(S.month.getFullYear(),S.month.getMonth()+n,1);const[a,b]=monthRange(S.month);S.sel=TODAY>=a&&TODAY<=b?TODAY:a;S.picked.clear();render()}
function goToday(){S.month=new Date(NOW.getFullYear(),NOW.getMonth(),1);S.sel=TODAY;render()}
function gridDays(){
  const y=S.month.getFullYear(),mo=S.month.getMonth(),off=(new Date(y,mo,1).getDay()+6)%7;
  const cells=Math.ceil((off+new Date(y,mo+1,0).getDate())/7)*7;
  return Array.from({length:cells},(_,i)=>new Date(y,mo,1-off+i));
}

/* ---------- Kalender desktop ---------- */
function ev(c){
  const lk=c.PostLink||c.ResultLink;
  return`<div class="ev" draggable="true" data-id="${c.ID}" style="--c:${FC[c.Format]||'#64748b'}" onclick="event.stopPropagation();openEntity('Contents','${c.ID}')" title="${esc(c.Title)}">
    <div class="ev-top">${isAll()?`<i class="adot" style="--c:${esc(accColor(c.AccountID))}" title="${esc((accById(c.AccountID)||{}).Name||'')}"></i>`:''}${esc(c.Format||'')}<span class="tm">${esc(c.Time||'')} ${PSHORT[c.Platform]||''}</span></div>
    <div class="ev-t">${esc(c.Title)}</div>
    <div class="ev-f"><i class="sdot" style="--s:${SC[c.Status]||'#64748b'}"></i><span class="st">${esc(c.Status)}${progress(c)[1]?` · ${progress(c).join('/')}`:''}</span>${lk?`<a class="lk" href="${esc(lk)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${c.PostLink?'View post':'View result'}">${ic('arrow',13)}</a>`:''}</div></div>`;
}
function dCal(){
  const items=filtered(),by=groupBy(items,'Date'),mo=S.month.getMonth();
  setTimeout(()=>{const e=$('#cnt');if(e)e.textContent=`${inMonth(items).length} konten bulan ini`},0);
  return`<div class="dow">${HARI.map(d=>`<div>${d}</div>`).join('')}</div><div class="cal7">${gridDays().map(d=>{
    const k=ymd(d),l=by[k]||[],dw=d.getDay(),max=4;
    return`<div class="tile ${d.getMonth()!==mo?'out':''} ${k===TODAY?'today':''} ${dw===0||dw===6?'we':''}" data-date="${k}" onclick="newContent({Date:'${k}'})">
      <div class="dh"><span class="dn">${d.getDate()}</span><span class="plus">${ic('plus',15)}</span></div>
      ${l.slice(0,max).map(ev).join('')}${l.length>max?`<button class="more-ev" onclick="event.stopPropagation();S.sel='${k}';setCMode('list')">+${l.length-max} lainnya</button>`:''}</div>`}).join('')}</div>
  <p class="hint" style="margin-top:12px">Tip: seret kartu ke tanggal lain untuk menjadwal ulang. Tekan <span class="kbd">N</span> untuk konten baru.</p>`;
}
function bindDnD(){
  $$('.ev[draggable]').forEach(el=>{
    el.ondragstart=e=>{e.dataTransfer.setData('text/plain',el.dataset.id);e.dataTransfer.effectAllowed='move';el.classList.add('dragging')};
    el.ondragend=()=>el.classList.remove('dragging');
  });
  $$('.tile').forEach(t=>{
    t.ondragover=e=>{e.preventDefault();t.classList.add('drop')};
    t.ondragleave=()=>t.classList.remove('drop');
    t.ondrop=e=>{e.preventDefault();t.classList.remove('drop');reschedule(e.dataTransfer.getData('text/plain'),t.dataset.date)};
  });
}
function reschedule(id,date){
  const c=S.data.contents.find(x=>x.ID===id);if(!c||!date||c.Date===date)return;
  const old=c.Date,r={...c,Date:date};upsert(S.data.contents,r);render();
  api('saveRecord','Contents',r).then(s=>{upsert(S.data.contents,s);toast(`Dipindah ke ${fmtShort(date)}`,{undo:()=>reschedule(id,old)})})
    .catch(e=>{upsert(S.data.contents,c);render();toast(errMsg(e))});
}

/* ---------- Kalender mobile ---------- */
function mCal(){
  const items=filtered(),by=groupBy(items,'Date'),mo=S.month.getMonth(),list=by[S.sel]||[];
  return`<div class="mcal" id="swipe"><div class="dow">${HARI.map(d=>`<div>${d}</div>`).join('')}</div><div class="mg">${gridDays().map(d=>{
    const k=ymd(d),l=by[k]||[];
    return`<button class="md ${d.getMonth()!==mo?'out':''} ${k===TODAY?'today':''} ${k===S.sel?'sel':''}" onclick="pickDay('${k}')">${d.getDate()}<span class="dots">${l.slice(0,4).map(c=>`<i style="--c:${isAll()?esc(accColor(c.AccountID)):FC[c.Format]}"></i>`).join('')}</span></button>`}).join('')}</div></div>
  <div class="dayhd"><h3>${fmtLong(S.sel)}</h3><button class="btn sm" onclick="newContent({Date:'${S.sel}'})">${ic('plus',16)}Tambah</button></div>
  <div class="mlist">${list.length?list.map(c=>item(c,false)).join(''):`<div class="empty"><b>Belum ada jadwal</b>Tap "Tambah" untuk mengisi tanggal ini.</div>`}</div>`;
}
function pickDay(k){const d=pd(k);if(d.getMonth()!==S.month.getMonth())S.month=new Date(d.getFullYear(),d.getMonth(),1);S.sel=k;render()}
function item(c,withCheck=true){
  const d=pd(c.Date),lk=c.PostLink||c.ResultLink;
  return`<div class="item" onclick="openEntity('Contents','${c.ID}')" style="--c:${FC[c.Format]}">
    ${withCheck?`<input type="checkbox" class="ck" ${S.picked.has(c.ID)?'checked':''} onclick="event.stopPropagation();pick('${c.ID}',this.checked)" aria-label="Pilih">`:''}
    <div class="when"><b>${withCheck?d.getDate():esc(c.Time||'--')}</b><span>${withCheck?BLN[d.getMonth()]:(PSHORT[c.Platform]||'')}</span></div>
    <div class="m"><b>${esc(c.Title)}</b><div class="row">
      ${isAll()?`<span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc((accById(c.AccountID)||{}).Name||'')}</span>`:''}
      <span class="chip" style="--c:${FC[c.Format]}">${esc(c.Format)}</span>
      <select class="ssel" style="--s:${SC[c.Status]}" onclick="event.stopPropagation()" onchange="setStatus('${c.ID}',this.value)" aria-label="Ubah status">${opts(STATUSES,c.Status)}</select>
      ${progHTML(c)}${lk?`<a class="lchip" href="${esc(lk)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${ic('arrow',12)}${c.PostLink?'Post':'Hasil'}</a>`:''}
      ${overdue(c)?`<span class="chip" style="--c:#dc2626">Terlambat</span>`:''}</div></div></div>`;
}

/* ---------- List ---------- */
function listItems(){
  let l=filtered();
  if(S.range==='month')l=inMonth(l);
  else if(S.range==='upcoming')l=l.filter(c=>c.Date>=TODAY);
  else if(S.range==='overdue')l=l.filter(overdue);
  const{k,d}=S.sort;
  const val=c=>k==='Date'?c.Date+(c.Time||''):k==='Status'?STATUSES.indexOf(c.Status):k==='Prog'?(progress(c)[1]?progress(c)[0]/progress(c)[1]:-1):String(c[k]||'').toLowerCase();
  return l.sort((a,b)=>{const x=val(a),y=val(b);return(x>y?1:x<y?-1:0)*d});
}
function sortBy(k){S.sort=S.sort.k===k?{k,d:-S.sort.d}:{k,d:1};render()}
function vList(){
  const l=listItems();
  setTimeout(()=>{const e=$('#cnt');if(e)e.textContent=`${l.length} konten`},0);
  const bulk=S.picked.size?`<div class="bulk"><b>${S.picked.size} dipilih</b>
    <select class="fsel" onchange="if(this.value)bulkStatus(this.value)" aria-label="Ubah status"><option value="">Ubah status…</option>${opts(STATUSES)}</select>
    ${S.data.accounts.length>1?`<select class="fsel" onchange="if(this.value)bulkMove(this.value)" aria-label="Pindah akun"><option value="">Pindah akun…</option>${S.data.accounts.map(a=>`<option value="${a.ID}">${esc(a.Name)}</option>`).join('')}</select>`:''}
    <button class="btn sm" onclick="bulkShift(7)">+7 hari</button>
    <button class="btn sm danger" id="bulkDel" onclick="bulkDel(this)">${ic('trash',15)}Hapus</button>
    <button class="ib sm bare" style="color:inherit" onclick="S.picked.clear();render()" aria-label="Batal pilih">${ic('x',16)}</button></div>`:'';
  if(!l.length)return bulk+`<div class="pn"><div class="empty"><b>${S.range==='overdue'?'Tidak ada konten terlambat':'Belum ada konten di sini'}</b>${S.range==='overdue'?'Semua jadwal yang lewat sudah published.':'Ubah filter, atau buat konten baru.'}<br><button class="btn pri" onclick="newContent()">${ic('plus',17)}Konten baru</button></div></div>`;
  const grouped=S.sort.k==='Date';
  if(isMob()){
    let last='';
    return bulk+`<div class="mlist">${l.map(c=>{const wk=weekStart(c.Date);const g=grouped&&wk!==last?`<div class="grp-m">${weekLabel(wk)}</div>`:'';last=wk;return g+item(c)}).join('')}</div>`;
  }
  const all=l.every(c=>S.picked.has(c.ID));
  const th=(k,lab)=>`<th class="sort ${S.sort.k===k?'on':''}" onclick="sortBy('${k}')">${lab} <span class="arr">${S.sort.k===k?(S.sort.d>0?'▲':'▼'):'▲'}</span></th>`;
  let last='';
  return bulk+`<div class="twrap"><table><thead><tr><th style="width:36px"><input type="checkbox" class="ck" ${all?'checked':''} onchange="pickAll(this.checked)" aria-label="Pilih semua"></th>
    ${th('Date','Jadwal')}${th('Title','Konten')}${isAll()?th('AccountID','Akun'):''}${th('Format','Format')}<th>Platform</th>${th('Status','Status')}${th('Prog','Produksi')}<th>Link</th></tr></thead><tbody>
    ${l.map(c=>{
      const wk=weekStart(c.Date),g=grouped&&wk!==last?`<tr class="grp"><td colspan="${isAll()?9:8}">${weekLabel(wk)}</td></tr>`:'';last=wk;
      const links=[...pj(c.Links,[]).slice(0,2).map(x=>[x.url,x.label]),c.PostLink?[c.PostLink,'Post']:null,c.ResultLink?[c.ResultLink,'Hasil']:null].filter(Boolean);
      const a=accById(c.AccountID);
      return g+`<tr class="${S.picked.has(c.ID)?'sel':''}" onclick="openEntity('Contents','${c.ID}')">
      <td onclick="event.stopPropagation()"><input type="checkbox" class="ck" ${S.picked.has(c.ID)?'checked':''} onchange="pick('${c.ID}',this.checked)" aria-label="Pilih"></td>
      <td class="dt ${overdue(c)?'over':''}"><b>${fmtShort(c.Date)}</b><span>${esc(c.Time||'')}${overdue(c)?' · terlambat':''}</span></td>
      <td class="ttl"><b title="${esc(c.Title)}">${esc(c.Title)}</b><span>${[c.Pillar,c.Campaign].filter(Boolean).map(esc).join(' · ')||'—'}</span></td>
      ${isAll()?`<td><span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc(a?a.Name:'—')}</span></td>`:''}
      <td><span class="chip" style="--c:${FC[c.Format]}">${esc(c.Format)}</span></td>
      <td>${esc(c.Platform)}</td>
      <td onclick="event.stopPropagation()"><select class="ssel" style="--s:${SC[c.Status]}" onchange="setStatus('${c.ID}',this.value)" aria-label="Ubah status">${opts(STATUSES,c.Status)}</select></td>
      <td>${progHTML(c)||'<span class="muted">—</span>'}</td>
      <td onclick="event.stopPropagation()"><div class="links">${links.length?links.map(([u,lb])=>`<a class="lchip" href="${esc(u)}" target="_blank" rel="noopener" title="${esc(u)}">${esc(lb)}</a>`).join(''):'<span class="muted">—</span>'}</div></td></tr>`}).join('')}
  </tbody></table></div>`;
}
function weekLabel(ws){
  const we=addD(ws,6),cur=weekStart(TODAY);
  const tag=ws===cur?'Minggu ini · ':ws===addD(cur,7)?'Minggu depan · ':ws===addD(cur,-7)?'Minggu lalu · ':'';
  const a=pd(ws),b=pd(we);
  return`${tag}${a.getDate()} ${BLN[a.getMonth()]} – ${b.getDate()} ${BLN[b.getMonth()]}`;
}
function pick(id,on){on?S.picked.add(id):S.picked.delete(id);render()}
function pickAll(on){listItems().forEach(c=>on?S.picked.add(c.ID):S.picked.delete(c.ID));render()}
function setStatus(id,v){
  const c=S.data.contents.find(x=>x.ID===id);if(!c)return;
  const r={...c,Status:v};
  if(v==='Published'){const l=pj(c.Checklist,[]);if(l.length)r.Checklist=JSON.stringify(l.map(x=>({...x,d:true})))}
  upsert(S.data.contents,r);render();
  api('saveRecord','Contents',r).then(s=>{upsert(S.data.contents,s);toast(`Status: ${v}`,{undo:()=>setStatus(id,c.Status)})}).catch(e=>{upsert(S.data.contents,c);render();toast(errMsg(e))});
}
function bulkRun(patchFn,msg){
  const ids=[...S.picked],before=ids.map(id=>({...S.data.contents.find(x=>x.ID===id)}));
  // kelompokkan per patch yang sama agar 1 request
  const groups={};ids.forEach(id=>{const c=S.data.contents.find(x=>x.ID===id),p=patchFn(c),k=JSON.stringify(p);(groups[k]=groups[k]||{p,ids:[]}).ids.push(id);Object.assign(c,p)});
  S.picked.clear();render();
  Promise.all(Object.values(groups).map(g=>api('bulkUpdate','Contents',g.ids,g.p))).then(()=>toast(msg(ids.length)))
    .catch(e=>{before.forEach(b=>upsert(S.data.contents,b));render();toast(errMsg(e))});
}
const bulkStatus=v=>bulkRun(()=>({Status:v}),n=>`${n} konten → ${v}`);
const bulkMove=a=>bulkRun(()=>({AccountID:a}),n=>`${n} konten dipindah ke ${(accById(a)||{}).Name}`);
const bulkShift=d=>bulkRun(c=>({Date:addD(c.Date,d)}),n=>`${n} konten digeser ${d} hari`);
function bulkDel(b){
  if(!b.classList.contains('arm')){b.classList.add('arm');b.lastChild.textContent='Yakin hapus?';setTimeout(()=>{if(b.isConnected){b.classList.remove('arm');b.lastChild.textContent='Hapus'}},3000);return}
  const ids=[...S.picked],recs=S.data.contents.filter(c=>ids.includes(c.ID));
  S.data.contents=S.data.contents.filter(c=>!ids.includes(c.ID));S.picked.clear();render();
  api('bulkDelete','Contents',ids).then(()=>toast(`${ids.length} konten dihapus`,{undo:()=>Promise.all(recs.map(r=>api('saveRecord','Contents',r))).then(()=>{recs.forEach(r=>upsert(S.data.contents,r));render();toast('Dikembalikan')})}))
    .catch(e=>{recs.forEach(r=>upsert(S.data.contents,r));render();toast(errMsg(e))});
}

/* ======================= BERANDA ======================= */
function ring(p){const r=44,c=2*Math.PI*r;return`<svg width="112" height="112" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--line)" stroke-width="9"/><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--ac)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-Math.min(p,1))}" transform="rotate(-90 50 50)"/></svg>`}
function liContent(c,showDate=true){
  const d=pd(c.Date);
  return`<div class="li" onclick="openEntity('Contents','${c.ID}')"><div class="item" style="padding:0;border:0;background:none;--c:${FC[c.Format]}"><div class="when"><b>${showDate?d.getDate():esc(c.Time)}</b><span>${showDate?BLN[d.getMonth()]:PSHORT[c.Platform]||''}</span></div></div>
    <div class="m"><b>${esc(c.Title)}</b><span>${isAll()?esc((accById(c.AccountID)||{}).Name||'')+' · ':''}${esc(c.Time||'')} · ${esc(c.Format)}</span></div>
    <span class="chip dot" style="--c:${SC[c.Status]}">${esc(c.Status)}</span></div>`;
}
function vSched(){
  const all=scoped(S.data.contents),st=S.data.settings||{};
  const today=all.filter(c=>c.Date===TODAY).sort(sortDT);
  const ws=weekStart(TODAY),we=addD(ws,6),wk=all.filter(c=>c.Date>=ws&&c.Date<=we&&c.Status!=='Idea');
  const wpub=wk.filter(c=>c.Status==='Published').length;
  const target=isAll()?S.data.accounts.reduce((a,x)=>a+(+x.TargetPerWeek||0),0):(+(curAcc()||{}).TargetPerWeek||0);
  const mo=inMonth(all),cnt=s=>mo.filter(c=>c.Status===s).length;
  const next=all.filter(c=>c.Date>TODAY&&c.Date<=addD(TODAY,7)&&c.Status!=='Published').sort(sortDT);
  const late=all.filter(overdue).sort(sortDT);
  const ready=scoped(S.data.ideas).filter(i=>i.Status==='Siap dibuat'||i.Priority==='High').slice(0,4);
  const hour=NOW.getHours(),greet=hour<11?'Selamat pagi':hour<15?'Selamat siang':hour<19?'Selamat sore':'Selamat malam';
  return`<div class="dg">
    <div class="pn s5"><h3>${ic('calendar',18)}Hari ini <button class="r" onclick="newContent({Date:'${TODAY}'})">+ Tambah</button></h3>
      ${today.length?today.map(c=>liContent(c,false)).join(''):`<div class="empty" style="padding:18px 8px"><b>Tidak ada jadwal hari ini</b>Waktu yang pas untuk menyiapkan konten minggu depan.</div>`}</div>
    <div class="pn s3"><h3>${ic('target',18)}Target minggu ini</h3>
      <div class="ringwrap"><div class="ringc">${ring(target?wk.length/target:0)}<div><span>${wk.length}/${target||'–'}<small>terjadwal</small></span></div></div>
      <div><div class="big">${wpub}</div><span class="muted">sudah tayang</span>${target&&wk.length<target?`<p class="muted" style="font-size:12.5px;margin-top:8px">Kurang ${target-wk.length} konten lagi</p>`:''}</div></div></div>
    <div class="pn s4"><h3>${ic('chart',18)}Pipeline ${BULAN[S.month.getMonth()]}</h3>
      <div class="big" style="margin-bottom:10px">${mo.length}<span class="muted" style="font-size:14px;font-family:var(--fb);font-weight:600"> konten</span></div>
      <div class="pipe">${STATUSES.map(s=>cnt(s)?`<i style="--s:${SC[s]};flex:${cnt(s)}" title="${s}: ${cnt(s)}"></i>`:'').join('')}</div>
      <div class="legend">${STATUSES.map(s=>`<div><i class="sdot" style="--s:${SC[s]}"></i>${s}<b>${cnt(s)}</b></div>`).join('')}</div></div>
    ${late.length?`<div class="pn warn s12"><h3 style="color:#dc2626">${ic('alert',18)}${late.length} konten lewat jadwal tapi belum published <button class="r" onclick="S.cmode='list';S.range='overdue';store.set('cp2_cmode','list');go('content')">Lihat semua</button></h3>
      ${late.slice(0,3).map(c=>liContent(c)).join('')}</div>`:''}
    <div class="pn s7"><h3>${ic('list',18)}7 hari ke depan <button class="r" onclick="S.cmode='list';S.range='upcoming';store.set('cp2_cmode','list');go('content')">Buka list</button></h3>
      ${next.length?next.slice(0,7).map(c=>liContent(c)).join(''):`<div class="empty" style="padding:18px 8px"><b>Minggu depan masih kosong</b>Jadwalkan dari Idea Bank atau buat konten baru.</div>`}</div>
    <div class="pn s5"><h3>${ic('bulb',18)}Ide siap dieksekusi <button class="r" onclick="go('ideas')">Idea Bank</button></h3>
      ${ready.length?ready.map(i=>`<div class="li" onclick="openEntity('Ideas','${i.ID}')"><div class="m"><b>${esc(i.Title)}</b><span>${esc(i.Format||'')}${pj(i.Links,[]).length?` · ${pj(i.Links,[]).length} link`:''}</span></div><button class="btn sm" onclick="event.stopPropagation();scheduleIdea('${i.ID}')">Jadwalkan</button></div>`).join(''):`<div class="empty" style="padding:18px 8px"><b>Belum ada ide prioritas</b>Tandai ide sebagai "Siap dibuat" agar muncul di sini.</div>`}</div>
    ${isAll()?`<div class="pn s12"><h3>${ic('users',18)}Ringkasan per akun</h3><div class="grid">${S.data.accounts.map(accCard).join('')}</div></div>`:''}
  </div>`;
}

/* ======================= BERANDA (tampilan baru) ======================= */
const timeAgo=s=>{const m=/(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)/.exec(String(s||''));if(!m)return'';const d=new Date(+m[1],m[2]-1,+m[3],+m[4],+m[5]),mn=Math.max(0,Math.round((Date.now()-d)/60000));if(mn<2)return'Baru saja';if(mn<60)return mn+' menit lalu';if(mn<1440)return Math.floor(mn/60)+' jam lalu';if(mn<10080)return Math.floor(mn/1440)+' hari lalu';return fmtShort(ymd(d))};
const ACT_V={Published:['check','dipublikasikan'],Scheduled:['calendar','dijadwalkan'],'Content done':['file','selesai diproduksi'],Draft:['edit','disimpan sebagai draft'],Idea:['bulb','masuk sebagai ide']};
const pctChg=(a,b)=>b?Math.round((a-b)/b*1000)/10:(a?100:0);
const trChip=v=>`<span class="tr ${v<0?'dn':''}">${ic('trend',13)}${v>0?'+':''}${v}%</span>`;
function statCard(c,icn,val,label,sub,pct,vsTxt,tr){
  return`<div class="sc" style="--c:${c}"><div class="top"><span class="ico">${ic(icn,22)}</span>${trChip(tr)}</div><b class="n">${val}</b><div class="lb">${label}</div><div class="sb">${sub}</div><div class="pr"><span>Progress</span><b>${Math.round(pct)}%</b></div><div class="track"><i style="width:${Math.max(0,Math.min(100,pct))}%"></i></div><div class="vs"><span>vs bulan lalu:</span><b>${vsTxt}</b></div></div>`;
}
function goOverdue(){S.cmode='list';S.range='overdue';store.set('cp2_cmode','list');go('content')}
function goDrafts(){S.f.status='Draft';S.cmode='list';S.range='all';store.set('cp2_cmode','list');go('content')}
function hSearch(e){if(e.key!=='Enter')return;S.f.q=e.target.value;S.cmode='list';S.range='all';store.set('cp2_cmode','list');go('content')}
function goStatus(s){S.f.status=s;S.cmode='list';S.range='all';store.set('cp2_cmode','list');go('content')}
function calcStreak(all){const pub=new Set(all.filter(c=>c.Status==='Published').map(c=>c.Date));let d=pub.has(TODAY)?TODAY:addD(TODAY,-1),n=0;while(pub.has(d)){n++;d=addD(d,-1)}return n}
const ART=`<svg class="art" viewBox="0 0 560 310" preserveAspectRatio="xMaxYMax meet" style="overflow:visible" aria-hidden="true">
<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd8e8"/><stop offset="1" stop-color="#4fb6d8"/></linearGradient>
<linearGradient id="dm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa8ff"/><stop offset="1" stop-color="#2f7df6"/></linearGradient></defs>
<g fill="#fff" opacity=".92"><ellipse cx="470" cy="60" rx="44" ry="14"/><ellipse cx="500" cy="48" rx="28" ry="16"/><ellipse cx="90" cy="46" rx="40" ry="12"/><ellipse cx="520" cy="140" rx="30" ry="10"/></g>
<path d="M-700 300 L-700 250 Q-300 238 -100 252 T200 250 L560 250 L560 310Z" fill="url(#sea)"/>
<path d="M-60 262 Q60 226 190 246 Q260 258 330 268 L330 310 L-60 310Z" fill="#7dc88a"/>
<path d="M300 276 Q420 240 560 262 L560 310 L300 310Z" fill="#5db87a"/>
<g fill="#b8745a"><path d="M196 252 L214 160 L222 160 L240 252 L232 252 L218 190 L204 252Z"/><rect x="203" y="214" width="30" height="4"/><rect x="208" y="188" width="20" height="3"/><rect x="211" y="158" width="14" height="5" rx="2"/></g>
<g fill="#e5483f"><rect x="258" y="212" width="66" height="7" rx="3"/><rect x="266" y="196" width="50" height="6" rx="3"/><rect x="272" y="219" width="7" height="36"/><rect x="305" y="219" width="7" height="36"/></g>
<g><rect x="490" y="212" width="56" height="44" fill="#f2e1b8"/><path d="M486 212 Q518 150 550 212Z" fill="url(#dm)"/><rect x="514" y="140" width="8" height="18" fill="#f2e1b8"/><circle cx="518" cy="138" r="4" fill="#ffc933"/><rect x="496" y="224" width="8" height="22" rx="4" fill="#9ec3ee"/><rect x="514" y="224" width="8" height="22" rx="4" fill="#9ec3ee"/><rect x="532" y="224" width="8" height="22" rx="4" fill="#9ec3ee"/></g>
<g fill="#7e9fc9"><path d="M548 256 L556 256 L553 120 Z"/><rect x="544" y="196" width="18" height="4"/></g>
<path d="M310 296 Q360 258 430 262 Q490 268 500 296Z" fill="#8c7d70"/><path d="M340 296 Q380 272 430 274 Q470 278 480 296Z" fill="#a39385"/>
<g transform="translate(372 30)">
 <path d="M-8 110 q-26 4-24 54 q4 24 26 22 q10-24 6-70z" fill="#9a5a2c"/><rect x="-26" y="124" width="14" height="30" rx="5" fill="#7a4420"/>
 <ellipse cx="-30" cy="118" rx="14" ry="42" fill="#1f63e0" transform="rotate(26 -30 118)"/>
 <ellipse cx="92" cy="92" rx="13" ry="46" fill="#1f63e0" transform="rotate(-48 92 92)"/>
 <ellipse cx="32" cy="136" rx="56" ry="70" fill="#2f7df6"/>
 <ellipse cx="32" cy="152" rx="37" ry="52" fill="#fff"/>
 <circle cx="32" cy="64" r="54" fill="#2f7df6"/>
 <path d="M32 34 C8 34 -4 56 4 78 C10 96 54 96 60 78 C68 56 56 34 32 34Z" fill="#fff"/>
 <circle cx="16" cy="64" r="11" fill="#10244f"/><circle cx="48" cy="64" r="11" fill="#10244f"/>
 <circle cx="12" cy="59" r="4" fill="#fff"/><circle cx="44" cy="59" r="4" fill="#fff"/><circle cx="19" cy="68" r="1.8" fill="#fff"/><circle cx="51" cy="68" r="1.8" fill="#fff"/>
 <ellipse cx="2" cy="78" rx="7" ry="5" fill="#ffb3b3" opacity=".7"/><ellipse cx="62" cy="78" rx="7" ry="5" fill="#ffb3b3" opacity=".7"/>
 <path d="M20 78 Q32 74 44 78 Q42 94 32 96 Q22 94 20 78Z" fill="#ff9a1f"/><path d="M26 85 Q32 90 38 85" fill="none" stroke="#c4560b" stroke-width="2" stroke-linecap="round"/>
 <path d="M-20 34 Q32 -2 84 34 L80 44 Q32 20 -16 44Z" fill="#8a5a33"/>
 <rect x="-22" y="36" width="108" height="10" rx="5" fill="#6d4426"/>
 <circle cx="14" cy="38" r="13" fill="#bfe3ff" stroke="#6d4426" stroke-width="5"/><circle cx="50" cy="38" r="13" fill="#bfe3ff" stroke="#6d4426" stroke-width="5"/>
 <path d="M-12 118 Q32 148 76 118 L82 140 Q32 172 -18 140Z" fill="#ffc933"/><path d="M70 130 L112 116 L100 156Z" fill="#f5b300"/>
 <path d="M8 200 l-10 16 h28z M52 200 l-6 16 h30z" fill="#ff9a1f"/>
</g></svg>`;
const MEDAL=['linear-gradient(135deg,#fbbf24,#f59e0b)','linear-gradient(135deg,#cbd5e1,#94a3b8)','linear-gradient(135deg,#fb923c,#ea580c)'];
function scrollAccounts(direction){
  const rail=$('#accountCards');
  if(!rail)return;
  const card=rail.querySelector('.kc');
  rail.scrollBy({left:direction*((card?.getBoundingClientRect().width||220)+14),behavior:'smooth'});
}
function vDash(){
  const all=scoped(S.data.contents),st=S.data.settings||{};
  const hour=NOW.getHours(),greet=hour<11?'Selamat pagi':hour<15?'Selamat siang':hour<19?'Selamat sore':'Selamat malam';
  const ws=weekStart(TODAY),we=addD(ws,6),wk=all.filter(c=>c.Date>=ws&&c.Date<=we&&c.Status!=='Idea');
  const target=isAll()?S.data.accounts.reduce((a,x)=>a+(+x.TargetPerWeek||0),0):(+(curAcc()||{}).TargetPerWeek||0);
  const late=all.filter(overdue);
  const M=S.month,mo=inMonth(all,M),pmo=inMonth(all,new Date(M.getFullYear(),M.getMonth()-1,1));
  const pubM=mo.filter(c=>c.Status==='Published'),ppub=pmo.filter(c=>c.Status==='Published');
  const eng=c=>['Likes','Comments','Shares','Saves'].reduce((a,k)=>a+(+c[k]||0),0);
  const sumR=l=>l.reduce((a,c)=>a+(+c.Reach||0),0),sumE=l=>l.reduce((a,c)=>a+eng(c),0);
  const reach=sumR(mo),preach=sumR(pmo),er=reach?sumE(mo)/reach*100:0,per=preach?sumE(pmo)/preach*100:0;
  const ready=scoped(S.data.ideas).filter(i=>i.Status==='Siap dibuat'),drafts=all.filter(c=>c.Status==='Draft');
  const bln=BULAN[M.getMonth()];
  /* hero */
  const nextC=[...all].filter(c=>c.Status!=='Published'&&c.Status!=='Idea').sort(sortDT)[0];
  const sub=target?(wk.length<target?`Tinggal ${target-wk.length} konten lagi menuju target minggu ini!`:'Target minggu ini tercapai. Kerja bagus! 🎉'):'Satu konten lebih dekat ke target Anda!';
  const mDone=pubM.length,mTot=mo.length,mp=mTot?Math.round(mDone/mTot*100):0,RR=40,CC=2*Math.PI*RR;
  const hero=`<div class="pgc"><div class="pgr"><svg viewBox="0 0 100 100" width="124" height="124" aria-hidden="true"><circle cx="50" cy="50" r="${RR}" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="11"/><circle cx="50" cy="50" r="${RR}" fill="none" stroke="#22c55e" stroke-width="11" stroke-linecap="round" stroke-dasharray="${CC}" stroke-dashoffset="${CC*(1-mp/100)}" transform="rotate(-90 50 50)"/></svg><b>${mp}%</b></div>
    <div class="pgt"><small>${isAll()?'Semua akun':esc(curAcc().Name)}</small><h2>Progres Konten ${bln}</h2><p><em>${mDone}</em> dari ${mTot} konten <span>tayang</span></p><div class="pgb"><i style="width:${mp}%"></i></div><div class="pgs">${sub}</div></div>
    <button class="pgo" onclick="${nextC?`openEntity('Contents','${nextC.ID}')`:'newContent()'}">${nextC?'Lanjutkan Bekerja':'Buat Konten Baru'}<span>${ic('right',18)}</span></button></div>`;
  const upc=all.filter(c=>c.Date>=TODAY&&c.Status!=='Published').length;
  const MT=[['content','calendar','Konten',upc,'#1f6feb'],['campaign','flag','Campaign',0,'#ea580c'],['ideas','bulb','Idea Bank',scoped(S.data.ideas).length,'#d97706'],['resources','folder','Resources',0,'#0d9488'],['analytics','chart','Analytics',0,'#7e22ce'],['accounts','users','Akun',0,'#e11d48'],['export','sheet','Export Sheet',0,'#16a34a'],['notes','note','Catatan',noteVis().length,'#f5b400']];
  const menu=`<div class="mg">${MT.map(([k,i,l,n,c])=>`<button class="mt ${k==='content'?'hl':''}" onclick="${k==='export'?'openExport()':k==='notes'?'openNotes()':`go('${k}')`}"><span class="mi" style="--c:${c}">${ic(i,26)}${n?`<i class="mb">${n}</i>`:''}</span><b>${l}</b></button>`).join('')}</div>`;
  /* lanjutkan */
  let cont;
  if(nextC){const[dn,tt]=progress(nextC),p=tt?Math.round(dn/tt*100):0;
    cont=`<div class="cont"><div class="th" style="--c:${FC[nextC.Format]||'#2563eb'}">${ic(nextC.Format==='Reels'||nextC.Format==='Video'?'play':'file',32)}<small>${esc(nextC.Format)} · ${esc(PSHORT[nextC.Platform]||'')}</small></div>
    <div class="cb"><b>${esc(nextC.Title)}</b><span>${esc(nextC.Campaign||nextC.Pillar||nextC.Status)} • ${fmtShort(nextC.Date)} ${esc(nextC.Time||'')}${overdue(nextC)?' • <b style="display:inline;color:#dc2626;font-size:inherit">Terlambat</b>':''}</span><div class="pl"><div class="track"><i style="width:${p}%;--c:var(--ac)"></i></div><em>${p}%</em></div></div>
    <button class="startb" onclick="openEntity('Contents','${nextC.ID}')">${ic('play',15)}Buka</button></div>`;
  }else cont=`<div class="cont"><div class="cb"><b>Belum ada konten yang perlu dikerjakan</b><span style="margin-bottom:0">Buat konten baru atau jadwalkan dari Idea Bank.</span></div><button class="startb" onclick="newContent()">${ic('plus',16)}Konten baru</button></div>`;
  /* pipeline */
  const SK=[['Draft','edit','#7c5cff'],['Content done','file','#ef5b5b'],['Scheduled','calendar','#16a34a'],['Published','check','#f59e0b']];
  const skills=`<div class="skg">${SK.map(([s,i,c])=>`<button class="sk" style="--c:${c}" onclick="goStatus('${s}')"><i>${ic(i,20)}</i><span><b>${s}</b><small>${all.filter(x=>x.Status===s).length} konten</small></span><span class="go">${ic('right',15)}</span></button>`).join('')}</div>`;
  /* akun */
  const accs=`<div class="kcs" id="accountCards">${(S.data.accounts.length>1?[null]:[]).concat(S.data.accounts).map(a=>{
    const list=a?S.data.contents.filter(c=>c.AccountID===a.ID):S.data.contents,m=inMonth(list,M),p=m.length?Math.round(m.filter(c=>c.Status==='Published').length/m.length*100):0,on=a?S.acc===a.ID:isAll();
    return`<button class="kc ${on?'on':''}" style="--c:${esc(a?a.Color:'#1f6feb')}" onclick="switchAcc('${a?a.ID:'all'}')"><b>${a?esc(a.Name):'Semua akun'}</b><small>${m.length} konten bulan ini</small><span class="kp"><span class="kt"><i style="width:${p}%"></i></span><em>${p}%</em></span></button>`}).join('')}</div>`;
  /* statistik */
  const stats=`<div class="sg" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
    ${statCard('#1470ff','list',mo.length,'Total Konten',bln,mo.length?pubM.length/mo.length*100:0,pmo.length,pctChg(mo.length,pmo.length))}
    ${statCard('#059669','check',pubM.length,'Published','Sudah tayang',mo.length?pubM.length/mo.length*100:0,ppub.length,pctChg(pubM.length,ppub.length))}
    ${statCard('#ea580c','chart',cf(reach),'Total Reach','Bulan ini',reach?reach/Math.max(reach,preach)*100:0,cf(preach),pctChg(reach,preach))}
    ${statCard('#7e22ce','target',er.toFixed(1)+'%','Engagement Rate','Rata-rata bulan ini',Math.min(100,er*10),per.toFixed(1)+'%',pctChg(er,per))}</div>`;
  const months=[2,1,0].map(k=>{const d=new Date(M.getFullYear(),M.getMonth()-k,1),l=inMonth(all,d);return{d,n:l.length,pub:l.filter(c=>c.Status==='Published').length,r:sumR(l)}});
  const maxN=Math.max(1,...months.map(x=>x.n)),pubAll=all.filter(c=>c.Status==='Published').length,withC=months.filter(x=>x.n).length||1;
  const analytics=`<div class="pn"><div class="ph"><div><h3>Performa Bulanan</h3><p>Jumlah konten & yang sudah tayang, 3 bulan terakhir</p></div><button class="r" onclick="go('analytics')">Lihat Analytics</button></div>
    ${months.map(x=>`<div class="mrow"><div class="mt"><b>${BULAN[x.d.getMonth()]}</b><span class="muted">· ${x.n} konten</span><span class="rt"><span class="tr">${x.pub} tayang</span><span>${cf(x.r)} reach</span></span></div><div class="mbar"><i style="width:${x.n/maxN*100}%">${x.n?Math.round(x.pub/x.n*100):0}%</i></div></div>`).join('')}
    <div class="tiles">
      <div class="tl4" style="--c:#1470ff">${ic('list',20)}<b>${all.length}</b><small>Total Konten</small></div>
      <div class="tl4" style="--c:#059669">${ic('check',20)}<b>${all.length?Math.round(pubAll/all.length*100):0}%</b><small>Rate Tayang</small></div>
      <div class="tl4" style="--c:#7e22ce">${ic('chart',20)}<b>${Math.round(months.reduce((a,x)=>a+x.n,0)/withC)}</b><small>Rata-rata/Bulan</small></div>
      <div class="tl4" style="--c:#ea580c">${ic('arrow',20)}<b>${cf(sumR(all))}</b><small>Total Reach</small></div></div></div>`;
  const recent=[...all].filter(c=>c.UpdatedAt).sort((a,b)=>String(b.UpdatedAt).localeCompare(String(a.UpdatedAt))).slice(0,5);
  const activity=`<div class="pn"><div class="ph"><div><h3>Aktivitas Terbaru</h3><p>Perubahan konten terakhir</p></div><span class="live">Terbaru</span></div>
    ${recent.length?recent.map(c=>{const v=ACT_V[c.Status]||['edit','diperbarui'];return`<div class="act" style="--c:${SC[c.Status]||'#64748b'}" onclick="openEntity('Contents','${c.ID}')"><span class="ai">${ic(v[0],17)}</span><div class="at"><b>${esc(c.Title)}</b> ${v[1]}<small>${timeAgo(c.UpdatedAt)}${isAll()?' · '+esc((accById(c.AccountID)||{}).Name||''):''}</small></div></div>`}).join(''):`<div class="empty"><b>Belum ada aktivitas</b>Buat konten pertama Anda.</div>`}
    <button class="more" onclick="S.cmode='list';S.range='all';store.set('cp2_cmode','list');go('content')">Lihat semua konten</button></div>`;
  const pend=late.length+ready.length+drafts.length;
  const pc=(c,icn,n,t,d,b,fn)=>`<div class="pc" style="--c:${c}"><div class="t2"><span class="pi2">${ic(icn,20)}</span><span class="cn">${n}</span></div><h4>${t}</h4><p>${d}</p><button onclick="${fn}">${b}</button></div>`;
  const pending=`<div class="pn"><div class="ph"><div><h3>Perlu Perhatian</h3><p>Hal yang butuh tindakan Anda</p></div><span class="badge">${pend} Pending</span></div><div class="pa">
    ${pc('#dc2626','alert',late.length,'Konten Terlambat','Sudah lewat jadwal tapi belum berstatus Published','Tinjau Sekarang','goOverdue()')}
    ${pc('#1470ff','bulb',ready.length,'Ide Siap Dibuat','Ide berstatus &quot;Siap dibuat&quot; yang menunggu dijadwalkan','Buka Idea Bank',"go('ideas')")}
    ${pc('#ea580c','edit',drafts.length,'Draft Belum Final','Konten draft yang perlu dilengkapi sebelum tayang','Lihat Draft','goDrafts()')}</div></div>`;
  /* sisi kanan */
  const R=50,C=2*Math.PI*R,pw=target?Math.min(1,wk.length/target):0;
  const days=[0,1,2,3,4,5,6].map(i=>addD(ws,i));
  const goal=`<div class="sd"><h3>Target Mingguan</h3><div class="goal"><div class="rg"><svg width="118" height="118" viewBox="0 0 120 120"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5bb4ff"/><stop offset="1" stop-color="#1470ff"/></linearGradient></defs><circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--line)" stroke-width="11"/><circle cx="60" cy="60" r="${R}" fill="none" stroke="url(#gg)" stroke-width="11" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pw)}" transform="rotate(-90 60 60)"/></svg><div><span>🔥<br>${wk.length}/${target||'–'}<small>konten</small></span></div></div>
    <p><b>${target&&wk.length>=target?'Target tercapai!':'Terus semangat!'}</b>${calcStreak(all)} hari beruntun posting${target&&wk.length<target?`. Kurang ${target-wk.length} konten.`:'.'}</p></div>
    <div class="wd">${days.map((d,i)=>{const on=all.some(c=>c.Date===d&&['Published','Scheduled','Content done'].includes(c.Status));return`<span>${HARI[i]}<i class="${on?'on':''} ${d===TODAY?'td':''}">${on?ic('check',12):''}</i></span>`}).join('')}</div></div>`;
  let lead=pubM.filter(c=>+c.Reach>0);const leadLbl=lead.length?'Bulan ini':'Semua';
  if(!lead.length)lead=all.filter(c=>c.Status==='Published'&&+c.Reach>0);
  lead=[...lead].sort((a,b)=>b.Reach-a.Reach).slice(0,5);
  const board=`<div class="sd"><h3>Konten Terbaik<span class="r">${leadLbl}</span></h3>${lead.length?lead.map((c,i)=>`<div class="lbr" onclick="openEntity('Contents','${c.ID}')"><span class="rk ${i>2?'n':''}" style="${i<3?`--g:${MEDAL[i]}`:''}">${i+1}</span>${avatar(accById(c.AccountID),'sm')}<div class="m"><b>${esc(c.Title)}</b><small>${esc(c.Format)} · ER ${(+c.Reach?eng(c)/c.Reach*100:0).toFixed(1)}%</small></div><b>${cf(c.Reach)}</b></div>`).join(''):`<div class="empty" style="padding:14px 6px"><b>Belum ada data reach</b>Isi metrik di konten yang sudah published.</div>`}</div>`;
  const left=Math.max(0,mo.length-pubM.length);
  const mission=`<div class="mis"><svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="26" width="44" height="30" rx="5" fill="#7c5cff"/><rect x="6" y="18" width="52" height="12" rx="4" fill="#a78bfa"/><rect x="29" y="18" width="6" height="38" fill="#ffc933"/><path d="M32 18c-6-12-18-6-12 0M32 18c6-12 18-6 12 0" fill="none" stroke="#ffc933" stroke-width="4" stroke-linecap="round"/></svg><div style="flex:1;min-width:0"><small>${left?`Publish ${left} konten lagi untuk menutup bulan ${bln}`:`Semua konten ${bln} sudah tayang!`}</small><b>Misi ${bln}</b><div class="pl"><div class="track"><i style="width:${mo.length?pubM.length/mo.length*100:0}%;--c:var(--ac)"></i></div><em>${pubM.length}/${mo.length}</em></div></div></div>`;
  return`<div class="dwrap"><div class="dmain">${hero}
    <div class="sh"><h3>Menu Utama</h3></div>${menu}
    <div class="sh"><h3>Lanjutkan Bekerja</h3><button onclick="S.cmode='list';S.range='upcoming';store.set('cp2_cmode','list');go('content')">Lihat Semua</button></div>${cont}
    <div class="sh"><h3>Pipeline Konten</h3></div>${skills}
     <div class="sh"><h3>Akun Anda</h3><div class="acc-nav"><button type="button" onclick="scrollAccounts(-1)" aria-label="Akun sebelumnya" title="Akun sebelumnya">${ic('chevL',18)}</button><button type="button" onclick="scrollAccounts(1)" aria-label="Akun berikutnya" title="Akun berikutnya">${ic('chevR',18)}</button></div></div>${accs}
    <div class="sh"><h3>Statistik ${bln}</h3></div>${stats}${analytics}${activity}${pending}</div>
    <aside class="dside">${goal}${board}</aside></div><div class="sect">Jadwal &amp; Target</div>`+vSched();
}

/* ======================= CAMPAIGN ======================= */
function vCampaign(){
  const list=scoped(S.data.campaigns);
  const head=`<div class="tb"><span class="sp"></span><button class="btn pri" onclick="openEntity('Campaigns')">${ic('plus',17)}Campaign baru</button></div>`;
  if(!list.length)return head+`<div class="pn"><div class="empty"><b>Belum ada campaign</b>Kelompokkan konten berdasarkan promo atau tema.</div></div>`;
  return head+`<div class="grid">${list.map(c=>{
    const cs=S.data.contents.filter(x=>x.Campaign===c.Name&&x.AccountID===c.AccountID),p=cs.filter(x=>x.Status==='Published').length,pct=cs.length?p/cs.length*100:0;
    const days=c.EndDate?Math.round((pd(c.EndDate)-pd(TODAY))/864e5):null;
    return`<div class="card" onclick="openEntity('Campaigns','${c.ID}')" style="border-top:4px solid ${esc(c.Color||'var(--ac)')}">
      <div class="row"><span class="chip dot" style="--c:${c.Status==='Active'?'#16a34a':c.Status==='Done'?'#64748b':'#d97706'}">${esc(c.Status||'Planning')}</span>${isAll()?`<span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc((accById(c.AccountID)||{}).Name||'')}</span>`:''}${days!=null&&days>=0&&c.Status!=='Done'?`<span class="chip plain">${days} hari lagi</span>`:''}</div>
      <h4>${esc(c.Name)}</h4>${c.Goal?`<p>${esc(c.Goal)}</p>`:''}
      <div class="muted" style="font-size:12.5px">${c.StartDate?fmtShort(c.StartDate):'?'} – ${c.EndDate?fmtShort(c.EndDate):'?'}</div>
      <div class="bl" style="grid-template-columns:1fr auto"><div class="b"><i style="width:${pct}%;--c:${esc(c.Color||'var(--ac)')}"></i></div><span>${p}/${cs.length} tayang</span></div></div>`}).join('')}</div>`;
}

/* ======================= IDEA BANK ======================= */
function vIdeas(){
  const q=S.ideaQ.toLowerCase();
  const list=scoped(S.data.ideas).filter(i=>(!S.ideaSt||i.Status===S.ideaSt)&&(!q||[i.Title,i.Pillar,i.Notes,i.Links].join(' ').toLowerCase().includes(q)));
  const prio={High:0,Medium:1,Low:2};list.sort((a,b)=>(prio[a.Priority]??1)-(prio[b.Priority]??1));
  return`<div class="capture">${ic('bulb',20)}<input id="cap" placeholder="Tulis ide, atau tempel link referensi lalu Enter…" onkeydown="if(event.key==='Enter')quickIdea()"><button class="btn pri sm" onclick="quickIdea()">Simpan</button></div>
  <div class="filters"><div class="seg">${[['','Semua'],...IDEA_ST.map(s=>[s,s])].map(([k,l])=>`<button class="${S.ideaSt===k?'on':''}" onclick="S.ideaSt='${k}';render()">${l}</button>`).join('')}</div>
    <label class="search" style="width:240px">${ic('search',16)}<input placeholder="Cari ide…" value="${esc(S.ideaQ)}" oninput="S.ideaQ=this.value;clearTimeout(qT);qT=setTimeout(()=>{render();const e=document.querySelector('.filters .search input');e.focus();e.setSelectionRange(e.value.length,e.value.length)},220)"></label>
    <span class="sp" style="flex:1"></span><button class="btn" onclick="openEntity('Ideas')">${ic('plus',17)}Ide lengkap</button></div>
  ${list.length?`<div class="grid">${list.map(i=>{const L=pj(i.Links,[]);return`<div class="card" onclick="openEntity('Ideas','${i.ID}')">
    <div class="row"><span class="chip dot" style="--c:${ISC[i.Status]||'#64748b'}">${esc(i.Status||'Baru')}</span><span class="chip" style="--c:${PRC[i.Priority]||'#64748b'}">${esc(i.Priority||'Medium')}</span>${i.Format?`<span class="chip" style="--c:${FC[i.Format]}">${esc(i.Format)}</span>`:''}${isAll()?`<span class="chip dot" style="--c:${esc(accColor(i.AccountID))}">${esc((accById(i.AccountID)||{}).Name||'')}</span>`:''}</div>
    <h4>${esc(i.Title)}</h4>${i.Notes?`<p>${esc(i.Notes)}</p>`:''}
    ${L.length?`<div class="row">${L.map(x=>`<a class="lchip" href="${esc(x.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${esc(x.url)}">${ic('link',13)}${esc(x.label||domainLabel(x.url))}</a>`).join('')}</div>`:''}
    <div class="acts"><button class="btn sm pri" onclick="event.stopPropagation();scheduleIdea('${i.ID}')">${ic('calendar',15)}Jadwalkan</button><button class="btn sm" onclick="event.stopPropagation();openEntity('Ideas','${i.ID}',null,null,true)">${ic('link',15)}Tambah link</button></div></div>`}).join('')}</div>`
  :`<div class="pn"><div class="empty"><b>${q||S.ideaSt?'Tidak ada ide yang cocok':'Idea bank masih kosong'}</b>${q||S.ideaSt?'Coba filter lain.':'Ketik ide atau tempel link referensi di kolom atas.'}</div></div>`}`;
}
function quickIdea(){
  const el=$('#cap'),v=el.value.trim();if(!v)return el.focus();
  if(!S.data.accounts.length)return toast('Buat akun dulu');
  const url=isUrl(v)?normUrl(v):'';
  const rec={AccountID:defAcc(),Title:url?`Referensi dari ${domainLabel(url)}`:v,Status:'Baru',Priority:'Medium',Format:'Reels',Platform:(curAcc()||{}).Platform||'Instagram',Links:url?JSON.stringify([{label:domainLabel(url),url}]):'[]',Notes:''};
  el.value='';
  api('saveRecord','Ideas',rec).then(r=>{upsert(S.data.ideas,r);render();toast(url?'Link disimpan sebagai ide':'Ide disimpan',{action:['Lengkapi',()=>openEntity('Ideas',r.ID)]})}).catch(e=>toast(errMsg(e)));
}
function scheduleIdea(id){
  const i=S.data.ideas.find(x=>x.ID===id);if(!i)return;
  openEntity('Contents',null,{AccountID:i.AccountID,Title:i.Title,Pillar:i.Pillar,Format:i.Format||'Feed',Platform:i.Platform||'Instagram',Caption:i.Notes,Links:i.Links||'[]',Status:'Draft'},()=>{
    api('deleteRecord','Ideas',id).then(()=>{S.data.ideas=S.data.ideas.filter(x=>x.ID!==id);render()});
  });
}

/* ======================= RESOURCES ======================= */
function vResources(){
  const list=scoped(S.data.resources,true),by={};
  list.forEach(r=>(by[r.Category||'Lainnya']=by[r.Category||'Lainnya']||[]).push(r));
  const head=`<div class="tb"><span class="sp"></span><button class="btn pri" onclick="openEntity('Resources')">${ic('plus',17)}Tambah resource</button></div>`;
  const keys=Object.keys(by).sort();
  if(!keys.length)return head+`<div class="pn"><div class="empty"><b>Belum ada resource</b>Simpan link brand guideline, aset foto, atau template.</div></div>`;
  return head+keys.map(k=>`<div class="sec-t">${esc(k)} · ${by[k].length}</div>${by[k].map(r=>`<div class="resrow">
    <span class="av sm" style="--c:${r.AccountID?esc(accColor(r.AccountID)):'var(--ink3)'}">${ic('link',13)}</span>
    <div class="m"><b>${esc(r.Title)}</b><span>${r.AccountID?'':'Bersama · '}${esc(r.Notes||r.Url)}</span></div>
    ${r.Url?`<a class="btn sm" href="${esc(r.Url)}" target="_blank" rel="noopener">Buka ${ic('arrow',14)}</a>`:''}
    <button class="ib sm" onclick="openEntity('Resources','${r.ID}')" aria-label="Edit">${ic('edit',16)}</button></div>`).join('')}`).join('');
}

/* ======================= ANALYTICS ======================= */
function vAnalytics(){
  const m=inMonth(scoped(S.data.contents)).filter(c=>+c.Reach>0);
  const sum=k=>m.reduce((a,c)=>a+(+c[k]||0),0);
  const eng=c=>['Likes','Comments','Shares','Saves'].reduce((a,k)=>a+(+c[k]||0),0);
  const er=c=>+c.Reach?eng(c)/+c.Reach*100:0;
  const avgER=m.length?(m.reduce((a,c)=>a+er(c),0)/m.length):0;
  const top=[...m].sort((a,b)=>b.Reach-a.Reach),maxR=Math.max(1,...top.map(c=>+c.Reach));
  const avgBy=(key,fn)=>{const o={};m.forEach(c=>{const k=fn(c);(o[k]=o[k]||[]).push(c)});return Object.entries(o).map(([k,l])=>[k,l.reduce((a,c)=>a+er(c),0)/l.length,Math.round(l.reduce((a,c)=>a+ +c.Reach,0)/l.length),l.length])};
  const byF=avgBy('f',c=>c.Format).sort((a,b)=>b[2]-a[2]),maxF=Math.max(1,...byF.map(x=>x[2]));
  const byT=avgBy('t',c=>c.Time||'—').sort((a,b)=>b[1]-a[1]);
  const byD=avgBy('d',c=>HARI_F[pd(c.Date).getDay()]).sort((a,b)=>b[1]-a[1]);
  const byA=isAll()?S.data.accounts.map(a=>{const l=m.filter(c=>c.AccountID===a.ID);return[a,l.reduce((s,c)=>s+ +c.Reach,0),l.length]}):[];
  const maxA=Math.max(1,...byA.map(x=>x[1]));
  const head=`<div class="tb"><div class="mnav"><button class="ib bare" onclick="shiftMonth(-1)" aria-label="Bulan sebelumnya">${ic('chevL')}</button><h2>${BULAN[S.month.getMonth()]} ${S.month.getFullYear()}</h2><button class="ib bare" onclick="shiftMonth(1)" aria-label="Bulan berikutnya">${ic('chevR')}</button></div></div>`;
  if(!m.length)return head+`<div class="pn"><div class="empty"><b>Belum ada data performa bulan ini</b>Isi Reach, Likes, dan metrik lain di form konten yang sudah published.</div></div>`;
  return head+`<div class="kpis">
    <div class="kpi"><span>Total reach</span><b>${cf(sum('Reach'))}</b></div><div class="kpi"><span>Likes</span><b>${cf(sum('Likes'))}</b></div>
    <div class="kpi"><span>Comments</span><b>${cf(sum('Comments'))}</b></div><div class="kpi"><span>Saves</span><b>${cf(sum('Saves'))}</b></div>
    <div class="kpi"><span>Rata-rata ER</span><b>${avgER.toFixed(1)}%</b></div><div class="kpi"><span>Konten diukur</span><b>${m.length}</b></div></div>
  <div class="dg">
    <div class="pn s7"><h3>Reach tertinggi</h3><div class="bars">${top.slice(0,8).map(c=>`<div class="bl" style="cursor:pointer" onclick="openEntity('Contents','${c.ID}')"><span title="${esc(c.Title)}">${esc(c.Title)}</span><div class="b"><i style="width:${c.Reach/maxR*100}%;--c:${FC[c.Format]}"></i></div><span>${cf(c.Reach)}</span></div>`).join('')}</div></div>
    <div class="pn s5"><h3>Waktu terbaik (ER)</h3>
      <div class="sec-t" style="margin-top:0">Jam posting</div>${byT.slice(0,3).map(([k,e,,n],i)=>`<div class="li"><span class="chip ${i?'plain':''}" style="--c:var(--ac)">${i===0?'Terbaik':'#'+(i+1)}</span><div class="m"><b>${esc(k)}</b><span>${n} konten</span></div><b>${e.toFixed(1)}%</b></div>`).join('')}
      <div class="sec-t">Hari posting</div>${byD.slice(0,3).map(([k,e,,n],i)=>`<div class="li"><span class="chip ${i?'plain':''}" style="--c:var(--ac)">${i===0?'Terbaik':'#'+(i+1)}</span><div class="m"><b>${esc(k)}</b><span>${n} konten</span></div><b>${e.toFixed(1)}%</b></div>`).join('')}</div>
    <div class="pn ${isAll()?'s6':'s12'}"><h3>Rata-rata reach per format</h3><div class="bars">${byF.map(([f,,r])=>`<div class="bl"><span>${esc(f)}</span><div class="b"><i style="width:${r/maxF*100}%;--c:${FC[f]}"></i></div><span>${cf(r)}</span></div>`).join('')}</div></div>
    ${isAll()?`<div class="pn s6"><h3>Reach per akun</h3><div class="bars">${byA.map(([a,r,n])=>`<div class="bl"><span>${esc(a.Name)}</span><div class="b"><i style="width:${r/maxA*100}%;--c:${esc(a.Color)}"></i></div><span>${cf(r)}</span></div>`).join('')}</div></div>`:''}
    <div class="pn s12"><h3>Detail performa</h3><div class="twrap" style="border:0"><table><thead><tr><th>Konten</th>${isAll()?'<th>Akun</th>':''}<th>Tanggal</th><th>Format</th><th style="text-align:right">Reach</th><th style="text-align:right">Likes</th><th style="text-align:right">Comments</th><th style="text-align:right">Saves</th><th style="text-align:right">ER</th></tr></thead><tbody>
    ${top.map(c=>`<tr onclick="openEntity('Contents','${c.ID}')"><td class="ttl"><b>${esc(c.Title)}</b></td>${isAll()?`<td><span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc((accById(c.AccountID)||{}).Name||'')}</span></td>`:''}<td>${fmtShort(c.Date)}</td><td><span class="chip" style="--c:${FC[c.Format]}">${esc(c.Format)}</span></td><td style="text-align:right">${nf(c.Reach)}</td><td style="text-align:right">${nf(c.Likes)}</td><td style="text-align:right">${nf(c.Comments)}</td><td style="text-align:right">${nf(c.Saves)}</td><td style="text-align:right"><b>${er(c).toFixed(1)}%</b></td></tr>`).join('')}
    </tbody></table></div></div>
  </div>`;
}

/* ======================= AKUN ======================= */
function accCard(a){
  const cs=S.data.contents.filter(c=>c.AccountID===a.ID),mo=inMonth(cs);
  const up=cs.filter(c=>c.Date>=TODAY&&c.Status!=='Published').length,ideas=S.data.ideas.filter(i=>i.AccountID===a.ID).length;
  const pub=mo.filter(c=>c.Status==='Published').length;
  return`<div class="card accard ${S.acc===a.ID?'cur':''}" style="--c:${esc(a.Color)}" onclick="switchAcc('${a.ID}')">
    <div class="top">${avatar(a,'lg')}<div style="flex:1;min-width:0"><h4>${esc(a.Name)}</h4><span class="muted">${esc(a.Handle||'')} · ${esc(a.Platform||'')}</span></div>
      <button class="ib sm" onclick="event.stopPropagation();openEntity('Accounts','${a.ID}')" aria-label="Edit akun">${ic('edit',16)}</button></div>
    <div class="stats"><div><b>${mo.length}</b><span>bulan ini</span></div><div><b>${pub}</b><span>published</span></div><div><b>${up}</b><span>mendatang</span></div></div>
    <div class="row"><span class="chip plain">Target ${+a.TargetPerWeek||0}/minggu</span><span class="chip plain">${ideas} ide</span>${S.acc===a.ID?`<span class="chip" style="--c:${esc(a.Color)}">Aktif</span>`:''}</div></div>`;
}
function vAccounts(){
  return`<div class="tb"><p class="muted" style="flex:1;min-width:200px">Setiap akun punya kalender, ide, campaign, dan analitiknya sendiri. Klik kartu untuk beralih akun.</p>
    ${S.data.accounts.length>1?`<button class="btn" onclick="switchAcc('all')">${ic('users',17)}Lihat semua akun</button>`:''}
    <button class="btn pri" onclick="openEntity('Accounts')">${ic('plus',17)}Tambah akun</button></div>
  ${S.data.accounts.length?`<div class="grid">${S.data.accounts.map(accCard).join('')}</div>`:`<div class="pn"><div class="empty"><b>Belum ada akun</b>Tambahkan akun pertama untuk mulai merencanakan konten.</div></div>`}`;
}

/* ======================= PENGATURAN ======================= */
function vSettings(){
  const st=S.data.settings||{},mode=S.prefs.mode;
  return`<div class="set"><h3>Mode tampilan</h3><p>Terang, gelap, atau ikuti pengaturan perangkat.</p>
    <div class="seg"><button class="${mode==='light'?'on':''}" onclick="setPref('mode','light')">${ic('sun',16)}Terang</button><button class="${mode==='dark'?'on':''}" onclick="setPref('mode','dark')">${ic('moon',16)}Gelap</button><button class="${mode==='system'?'on':''}" onclick="setPref('mode','system')">Ikuti sistem</button></div></div>
  <div class="set"><h3>Posisi menu</h3><p>Sisi layar untuk menu navigasi di tampilan lebar.</p>
    <div class="seg"><button class="${S.prefs.side!=='left'?'on':''}" onclick="setPref('side','right')">Kanan</button><button class="${S.prefs.side==='left'?'on':''}" onclick="setPref('side','left')">Kiri</button></div></div>
  <div class="set"><h3>Kode akses</h3><p>Kode ini diminta saat membuka aplikasi di perangkat baru atau setelah dikunci.${accessHash()===codeHash(DEF_CODE)?' Saat ini masih memakai kode bawaan <b>admin123</b>, sebaiknya diganti.':''}</p>
    <div class="fg" id="sec"><div class="f"><label>Kode saat ini</label><input class="in" type="password" id="cOld" autocomplete="current-password"></div><div></div>
      <div class="f"><label>Kode baru (min. 4 karakter)</label><input class="in" type="password" id="cNew" autocomplete="new-password"></div>
      <div class="f"><label>Ulangi kode baru</label><input class="in" type="password" id="cNew2" autocomplete="new-password"></div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn pri" onclick="saveCode(this)">${ic('lock',16)}Simpan kode</button><button class="btn" onclick="lockNow()">Kunci sekarang</button></div></div>
  <div class="set"><h3>Tema warna</h3><p>"Warna akun" membuat aksen aplikasi berubah mengikuti warna akun yang sedang aktif, jadi kamu langsung tahu sedang mengelola akun mana.</p>
    <div class="themes">${Object.entries(THEMES).map(([k,[n,c]])=>`<button class="th ${S.prefs.theme===k?'on':''}" onclick="setPref('theme','${k}')"><i style="background:${c||`linear-gradient(90deg,${S.data.accounts.map(a=>a.Color).join(',')||'#4f46e5,#0d9488'})`}"></i><b>${n}</b></button>`).join('')}</div></div>
  <div class="set"><h3>Profil</h3><p>Nama yang tampil di aplikasi.</p>
    <div class="fg" id="prof">
      <div class="f"><label>Nama aplikasi</label><input class="in" data-k="AppName" value="${esc(st.AppName||'Content Planner')}"></div>
      <div class="f"><label>Pemilik</label><input class="in" data-k="Owner" value="${esc(st.Owner||'')}"></div>
      <div class="f"><label>Nama kamu</label><input class="in" data-k="CreatorName" value="${esc(st.CreatorName||'')}"></div>
      <div class="f"><label>Peran</label><input class="in" data-k="CreatorRole" value="${esc(st.CreatorRole||'')}"></div>
      <div class="f" style="grid-column:1/-1"><label>Logo (URL gambar / link Google Drive)</label><input class="in" data-k="LogoUrl" placeholder="https://… atau link share Drive; kosongkan = logo bawaan" value="${esc(st.LogoUrl||'')}"></div>
    </div><button class="btn pri" style="margin-top:12px" onclick="saveProfile(this)">Simpan profil</button></div>
  ${vSync()}
  <div class="set"><h3>Data</h3><p>Semua data tersimpan di Google Sheet. Export membuat salinan rapi untuk dibagikan ke tim atau klien.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn pri" onclick="openExport()">${ic('sheet',17)}Export ke Sheet</button>
    ${S.data.sheetUrl?`<a class="btn" href="${esc(S.data.sheetUrl)}" target="_blank" rel="noopener">${ic('file',17)}Buka spreadsheet</a>`:''}
    <button class="btn" onclick="go('accounts')">${ic('users',17)}Kelola akun</button><button class="btn" onclick="reload()">${ic('refresh',17)}Muat ulang</button></div></div>
  <div class="set desk" style="display:block"><h3>Pintasan keyboard</h3><p>Berlaku saat tidak sedang mengetik.</p>
    <div class="shortcuts"><span class="kbd">N</span>Konten baru<span class="kbd">I</span>Ide baru<span class="kbd">/</span>Cari konten<span class="kbd">← →</span>Bulan sebelumnya / berikutnya<span class="kbd">C</span>Ganti Kalender ↔ List<span class="kbd">A</span>Ganti akun<span class="kbd">Esc</span>Tutup jendela</div></div>
  <div class="set"><h3>Pasang di HP</h3><p>Buka link web app di Chrome Android → menu ⋮ → <b>Add to Home screen</b>. Di iPhone: Safari → Share → <b>Add to Home Screen</b>.</p></div>`;
}
function vSync(){
  return`<div class="set"><h3>Sinkronisasi metrik sosial</h3><p>Fitur sinkronisasi otomatis dari API media sosial belum dipindahkan ke backend baru. Metrik tetap bisa diisi manual pada detail konten.</p></div>`;
}
function runSync(b){
  const lbl=b.querySelector('span'),old=lbl.textContent,t=window.CP_TIMEOUT;
  b.disabled=true;lbl.textContent='Menyinkronkan…';window.CP_TIMEOUT=170000;
  api('syncMetrics').then(r=>reload().then(()=>toast(`Sinkron selesai: ${r.linked} dari ${r.total} postingan terhubung`)))
    .catch(e=>toast(errMsg(e))).finally(()=>{window.CP_TIMEOUT=t;b.disabled=false;lbl.textContent=old});
}
function fromPost(key){
  const p=(S.data.unlinked||[]).find(x=>x.Key===key);if(!p)return;
  const a=S.data.accounts.find(x=>x.Platform===p.Platform);
  openEntity('Contents',null,{AccountID:a?a.ID:defAcc(),Title:(p.Caption||'').slice(0,100)||('Postingan '+p.Platform),Date:p.Date,Time:p.Time||'12:00',Platform:p.Platform,Format:p.Format||'Feed',Status:'Published',Caption:p.Caption||'',PostLink:p.PostLink},
    ()=>{S.data.unlinked=(S.data.unlinked||[]).filter(x=>x.Key!==key);reload()});
}
function saveProfile(b){
  const o={};$$('#prof [data-k]').forEach(i=>o[i.dataset.k]=i.value.trim());b.disabled=true;
  api('saveSettings',o).then(()=>{Object.assign(S.data.settings,o);render();toast('Profil disimpan')}).catch(e=>toast(errMsg(e))).finally(()=>b.disabled=false);
}

/* ======================= FORM ======================= */
const ACC_FIELD={k:'AccountID',l:'Akun',t:'account'};
const CONTENT_FIELDS=[
  {sec:'Jadwal'},{k:'Title',l:'Judul konten',full:1,req:1},ACC_FIELD,{k:'Status',l:'Status',t:'select',o:STATUSES},
  {k:'Date',l:'Tanggal',t:'date',req:1},{k:'Time',l:'Jam tayang',t:'time'},
  {k:'Platform',l:'Platform',t:'select',o:PLATFORMS},{k:'Format',l:'Format',t:'select',o:FORMATS},
  {k:'Campaign',l:'Campaign',t:'select',o:r=>['',...S.data.campaigns.filter(c=>!r.AccountID||c.AccountID===r.AccountID).map(c=>c.Name)]},{k:'Pillar',l:'Content pillar'},
  {sec:'Isi konten'},{k:'Caption',l:'Caption / brief',t:'textarea',full:1},{k:'Hashtags',l:'Hashtag',full:1},{t:'copy'},
  {sec:'Checklist produksi'},{k:'Checklist',t:'checklist',full:1},
  {sec:'Link'},{k:'PostLink',l:'Link post (setelah tayang)',t:'url'},{k:'ResultLink',l:'Link hasil konten (Drive, dll)',t:'url'},
  {k:'Links',l:'Link referensi',t:'links',full:1},
  {sec:'Performa'},{k:'Views',l:'Views',t:'number'},{k:'Reach',t:'number'},{k:'Likes',t:'number'},{k:'Comments',t:'number'},{k:'Shares',t:'number'},{k:'Saves',t:'number'},
  {k:'Notes',l:'Catatan',t:'textarea',full:1}
];
const ENT={
  Contents:{key:'contents',name:'konten',fields:CONTENT_FIELDS,
    def:()=>({AccountID:defAcc(),Date:S.sel||TODAY,Time:'06:00',Platform:(curAcc()||{}).Platform||'Instagram',Format:'Feed',Status:'Draft',Checklist:JSON.stringify(STEPS.map(t=>({t,d:false}))),Links:'[]'})},
  Ideas:{key:'ideas',name:'ide',def:()=>({AccountID:defAcc(),Priority:'Medium',Status:'Baru',Format:'Reels',Platform:(curAcc()||{}).Platform||'Instagram',Links:'[]'}),fields:[
    {k:'Title',l:'Ide konten',full:1,req:1},ACC_FIELD,{k:'Status',l:'Tahap',t:'select',o:IDEA_ST},
    {k:'Priority',l:'Prioritas',t:'select',o:['High','Medium','Low']},{k:'Pillar',l:'Pillar'},
    {k:'Format',l:'Format',t:'select',o:FORMATS},{k:'Platform',l:'Platform',t:'select',o:PLATFORMS},
    {k:'Links',l:'Link referensi (video, artikel, audio, moodboard…)',t:'links',full:1},
    {k:'Notes',l:'Catatan / hook',t:'textarea',full:1}]},
  Campaigns:{key:'campaigns',name:'campaign',def:()=>({AccountID:defAcc(),Status:'Planning',Color:curAcc()?curAcc().Color:'#4f46e5',StartDate:TODAY}),fields:[
    {k:'Name',l:'Nama campaign',full:1,req:1},ACC_FIELD,{k:'Status',l:'Status',t:'select',o:['Planning','Active','Done']},
    {k:'StartDate',l:'Mulai',t:'date'},{k:'EndDate',l:'Selesai',t:'date'},{k:'Color',l:'Warna',t:'color'},
    {k:'Goal',l:'Tujuan',full:1},{k:'Notes',l:'Catatan',t:'textarea',full:1}]},
  Resources:{key:'resources',name:'resource',def:()=>({AccountID:defAcc()}),fields:[
    {k:'Title',l:'Judul',full:1,req:1},{...ACC_FIELD,shared:1},{k:'Category',l:'Kategori'},{k:'Url',l:'Link',t:'url',full:1},{k:'Notes',l:'Catatan',t:'textarea',full:1}]},
  Accounts:{key:'accounts',name:'akun',def:()=>({Platform:'Instagram',Color:ACC_COLORS[S.data.accounts.length%ACC_COLORS.length],TargetPerWeek:3}),fields:[
    {k:'Name',l:'Nama akun / brand',full:1,req:1},{k:'Handle',l:'Username',ph:'@namaakun'},{k:'Platform',l:'Platform utama',t:'select',o:PLATFORMS},
    {k:'Color',l:'Warna akun',t:'color'},{k:'TargetPerWeek',l:'Target posting / minggu',t:'number'},{k:'Notes',l:'Catatan',t:'textarea',full:1}]}
};
const linkRow=(l={})=>`<div class="lrow"><input class="in" data-l="label" placeholder="Label (opsional)" value="${esc(l.label||'')}"><input class="in" data-l="url" type="url" inputmode="url" placeholder="https://…" value="${esc(l.url||'')}" onchange="autoLabel(this)"><button type="button" class="ib sm" onclick="this.parentElement.remove()" aria-label="Hapus link">${ic('x',15)}</button></div>`;
const clRow=(x={})=>`<div class="crow"><input type="checkbox" class="ck" ${x.d?'checked':''} aria-label="Selesai"><input class="in" placeholder="Langkah" value="${esc(x.t||'')}"><button type="button" class="ib sm bare" onclick="this.parentElement.remove()" aria-label="Hapus langkah">${ic('x',15)}</button></div>`;
function autoLabel(u){const l=u.parentElement.querySelector('[data-l=label]');if(u.value&&!l.value)l.value=domainLabel(u.value)}
function addLinkRow(btn,focus=true){const w=btn.previousElementSibling;w.insertAdjacentHTML('beforeend',linkRow());if(focus)w.lastElementChild.querySelector('[data-l=url]').focus()}
const PERF_KEYS=['Views','Reach','Likes','Comments','Shares','Saves'];
function autoPanel(r){
  const n=v=>(v===''||v==null)?'–':Number(v).toLocaleString('id-ID');
  const eng=['Likes','Comments','Shares','Saves'].reduce((a,k)=>a+(+r[k]||0),0),base=+r.Reach||0;
  const er=base?(eng/base*100).toFixed(1).replace('.',',')+'%':'–',vr=r.ReachSrc==='views';
  const tiles=[['Views',r.Views],[vr?'Reach*':'Reach',r.Reach],['Likes',r.Likes],['Comments',r.Comments],['Shares',r.Shares],['Saves',r.Saves]];
  return`<div class="f full"><div class="autom">${tiles.map(([l,v])=>`<div class="kpi"><span>${l}</span><b>${n(v)}</b></div>`).join('')}<div class="kpi"><span>Engagement rate</span><b>${er}</b></div></div>
    <p class="hint">${r.PostedTime?`Tayang ${esc(r.PostedDate)} pukul ${esc(r.PostedTime)} WIB${r.Time&&r.Time!==r.PostedTime?` (rencana ${esc(r.Time)})`:''}. `:''}Otomatis dari API ${esc(r.MetricsSrc||'')}, diperbarui ${esc(r.MetricsAt||'-')}.${vr?' *Platform ini tidak menyediakan reach, jadi Views dipakai sebagai pembanding.':''} Angka ini tidak diedit manual.</p></div>`;
}
function fieldHTML(f,rec){
  if(f.sec==='Performa'&&rec.ID&&rec.AutoMetrics)return`<div class="fsec">Performa</div>${autoPanel(rec)}`;
  if(rec.ID&&rec.AutoMetrics&&PERF_KEYS.includes(f.k))return'';
  if(f.sec)return`<div class="fsec">${f.sec}</div>`;
  if(f.t==='copy')return`<div class="f full" style="flex-direction:row"><button type="button" class="btn sm" onclick="copyCaption()">${ic('copy',15)}Salin caption + hashtag</button></div>`;
  const v=rec[f.k]??'',id='f_'+f.k,lab=`<label for="${id}">${esc(f.l||f.k)}${f.req?' *':''}</label>`,cls=`f ${f.full?'full':''}`;
  if(f.t==='account'){
    if(S.data.accounts.length<2&&!f.shared)return`<input type="hidden" data-k="AccountID" value="${esc(v||defAcc())}">`;
    return`<div class="${cls}">${lab}<select class="in" id="${id}" data-k="${f.k}" onchange="accFieldChange()">${f.shared?`<option value="" ${!v?'selected':''}>Bersama (semua akun)</option>`:''}${S.data.accounts.map(a=>`<option value="${a.ID}" ${a.ID===v?'selected':''}>${esc(a.Name)}</option>`).join('')}</select></div>`;
  }
  if(f.t==='links'){const L=pj(v,[]);return`<div class="${cls}">${lab}<div data-k="${f.k}" data-t="links">${(L.length?L:[{}]).map(linkRow).join('')}</div><button type="button" class="btn sm addrow" onclick="addLinkRow(this)">${ic('plus',15)}Tambah link</button></div>`}
  if(f.t==='checklist'){const L=pj(v,[]);return`<div class="${cls}"><div data-k="${f.k}" data-t="checklist">${L.map(clRow).join('')}</div><button type="button" class="btn sm addrow" onclick="this.previousElementSibling.insertAdjacentHTML('beforeend',clRow());this.previousElementSibling.lastElementChild.querySelector('.in').focus()">${ic('plus',15)}Tambah langkah</button></div>`}
  if(f.t==='select'){const o=typeof f.o==='function'?f.o(rec):f.o;if(v&&!o.includes(v))o.push(v);return`<div class="${cls}">${lab}<select class="in" id="${id}" data-k="${f.k}">${o.map(x=>`<option value="${esc(x)}" ${x===v?'selected':''}>${esc(x||'— Tidak ada —')}</option>`).join('')}</select></div>`}
  if(f.t==='textarea')return`<div class="${cls}">${lab}<textarea class="in" id="${id}" data-k="${f.k}">${esc(v)}</textarea></div>`;
  return`<div class="${cls}">${lab}<input class="in" id="${id}" data-k="${f.k}" type="${f.t||'text'}" ${f.t==='number'?'inputmode="numeric" min="0"':''} ${f.ph?`placeholder="${esc(f.ph)}"`:''} value="${esc(v)}"></div>`;
}
function collect(){
  const v={};
  $$('#ef [data-k]').forEach(el=>{
    const k=el.dataset.k,t=el.dataset.t;
    if(t==='links')v[k]=JSON.stringify([...el.querySelectorAll('.lrow')].map(r=>({label:r.querySelector('[data-l=label]').value.trim(),url:r.querySelector('[data-l=url]').value.trim()})).filter(x=>x.url).map(x=>({label:x.label||domainLabel(x.url),url:normUrl(x.url)})));
    else if(t==='checklist')v[k]=JSON.stringify([...el.querySelectorAll('.crow')].map(r=>({t:r.querySelector('.in').value.trim(),d:r.querySelector('.ck').checked})).filter(x=>x.t));
    else if(el.type==='number')v[k]=el.value===''?'':Number(el.value);
    else v[k]=el.value.trim();
  });
  ['PostLink','ResultLink','Url'].forEach(k=>{if(v[k])v[k]=normUrl(v[k])});
  return v;
}
function accFieldChange(){
  const sel=$('#f_Campaign'),acc=$('#f_AccountID');if(!sel||!acc)return;
  const cur=sel.value,names=['',...S.data.campaigns.filter(c=>c.AccountID===acc.value).map(c=>c.Name)];
  sel.innerHTML=names.map(n=>`<option value="${esc(n)}" ${n===cur?'selected':''}>${esc(n||'— Tidak ada —')}</option>`).join('');
}
function copyCaption(){
  const t=[$('#f_Caption')?.value,$('#f_Hashtags')?.value].filter(Boolean).join('\n\n');
  if(!t)return toast('Caption masih kosong');
  const ok=()=>toast('Caption disalin');
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok).catch(fallback);else fallback();
  function fallback(){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(e){toast('Gagal menyalin')}a.remove()}
}
function newContent(preset){
  if(!S.data.accounts.length){toast('Tambahkan akun dulu');return openEntity('Accounts')}
  openEntity('Contents',null,preset);
}
function openEntity(sheet,id,preset,afterSave,focusLinks){
  closePop();
  const E=ENT[sheet],arr=S.data[E.key];
  const rec=id?arr.find(x=>x.ID===id):{...E.def(),...(preset||{})};
  if(!rec)return;
  const nm=E.name[0].toUpperCase()+E.name.slice(1);
  let extra='';
  if(sheet==='Accounts'&&id){
    const n=k=>S.data[k].filter(x=>x.AccountID===id).length;
    extra=`<p class="hint" style="margin-top:14px">Menghapus akun juga menghapus ${n('contents')} konten, ${n('ideas')} ide, ${n('campaigns')} campaign, dan ${n('resources')} resource miliknya.</p>`;
  }
  openSheet(`<div class="grab"></div><div class="sh-h"><h3>${id?'Edit':'Tambah'} ${E.name}</h3>${id&&sheet==='Contents'?`<button class="ib bare" onclick="dupContent('${id}')" title="Duplikat" aria-label="Duplikat">${ic('copy',18)}</button>`:''}<button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic('x')}</button></div>
    <div class="sh-b"><div class="fg" id="ef">${E.fields.map(f=>fieldHTML(f,rec)).join('')}</div>${extra}</div>
    <div class="sh-f">${id&&!(sheet==='Accounts'&&S.data.accounts.length<2)?`<button class="btn danger" id="delB">${ic('trash',16)}<span>Hapus</span></button>`:''}<span class="sp"></span>
      <button class="btn desk" onclick="closeSheet()">Batal</button><button class="btn pri" id="saveB">${id?'Simpan':'Tambah '+E.name}</button></div>`);
  $('#saveB').onclick=()=>{
    const v=collect(),miss=E.fields.find(f=>f.req&&!v[f.k]);
    if(miss){const el=$('#f_'+miss.k);el.focus();el.style.borderColor='#dc2626';return toast(`${miss.l} wajib diisi`)}
    const b=$('#saveB');b.disabled=true;b.textContent='Menyimpan…';
    api('saveRecord',sheet,{...rec,...v}).then(r=>{
      upsert(arr,r);
      if(sheet==='Contents'&&r.Date){S.sel=r.Date;const d=pd(r.Date);if(S.view==='content'&&S.cmode==='calendar')S.month=new Date(d.getFullYear(),d.getMonth(),1)}
      if(sheet==='Accounts'&&!id){S.acc=r.ID;store.set('cp2_acc',r.ID)}
      closeSheet();applyPrefs();render();toast(id?'Perubahan disimpan':`${nm} ditambahkan`);afterSave&&afterSave(r);
    }).catch(e=>{toast(errMsg(e));b.disabled=false;b.textContent='Coba simpan lagi'});
  };
  const del=$('#delB');
  if(del)del.onclick=()=>{
    if(!del.classList.contains('arm')){del.classList.add('arm');del.lastChild.textContent='Tap lagi untuk hapus';setTimeout(()=>{if(del.isConnected){del.classList.remove('arm');del.lastChild.textContent='Hapus'}},3000);return}
    del.disabled=true;
    if(sheet==='Accounts')return api('deleteAccount',id).then(()=>{['contents','ideas','campaigns','resources'].forEach(k=>S.data[k]=S.data[k].filter(x=>x.AccountID!==id));S.data.accounts=S.data.accounts.filter(a=>a.ID!==id);if(S.acc===id)S.acc=S.data.accounts[0].ID;closeSheet();applyPrefs();render();toast('Akun dihapus')}).catch(e=>toast(errMsg(e)));
    api('deleteRecord',sheet,id).then(()=>{S.data[E.key]=S.data[E.key].filter(x=>x.ID!==id);closeSheet();render();
      toast(`${nm} dihapus`,{undo:()=>api('saveRecord',sheet,rec).then(r=>{upsert(S.data[E.key],r);render();toast('Dikembalikan')})})}).catch(e=>toast(errMsg(e)));
  };
  setTimeout(()=>{
    if(focusLinks){const b=[...$$('#ef .addrow')].find(x=>x.previousElementSibling.dataset.t==='links');const empty=b&&[...b.previousElementSibling.querySelectorAll('[data-l=url]')].find(i=>!i.value);empty?empty.focus():b&&addLinkRow(b);empty&&empty.scrollIntoView({block:'center'});return}
    if(!isMob()&&!id)$('#ef .in')?.focus();
  },60);
}
function dupContent(id){
  const c=S.data.contents.find(x=>x.ID===id);if(!c)return;
  const l=pj(c.Checklist,[]).map(x=>({...x,d:false}));
  closeSheet();
  setTimeout(()=>openEntity('Contents',null,{...c,ID:'',Title:c.Title+' (copy)',Status:'Draft',Date:addD(c.Date,7),Checklist:JSON.stringify(l),PostLink:'',ResultLink:'',Reach:'',Views:'',Likes:'',Comments:'',Shares:'',Saves:'',AutoMetrics:'',MetricsAt:'',ReachSrc:''}),40);
}
function openSheet(html,cls=''){const s=$('#sheet');s.className='sheet '+cls;s.innerHTML=html;$('#ov').classList.add('open')}
function closeSheet(){$('#ov').classList.remove('open')}

/* ======================= EXPORT ======================= */
const EX={scope:'current',range:'month',target:'tab',split:false};
function openExport(){
  closePop();
  EX.target='csv';
  if(isAll())EX.scope='all';
  const[a,b]=monthRange(S.month),cur=curAcc();
  const tg=[['csv','Download CSV','Untuk Excel / Sheets',false]];
  openSheet(`<div class="grab"></div><div class="sh-h"><h3>Export ke Sheet</h3><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic('x')}</button></div>
  <div class="sh-b"><div class="fg">
    <div class="f full"><label>Akun</label><div class="seg" id="exScope">${cur?`<button data-v="current" class="${EX.scope==='current'?'on':''}">${esc(cur.Name)}</button>`:''}<button data-v="all" class="${EX.scope==='all'||!cur?'on':''}">Semua akun (${S.data.accounts.length})</button></div></div>
    <div class="f full" id="splitW"><label class="toggle"><input type="checkbox" class="ck" id="exSplit" ${EX.split?'checked':''}>Pisahkan jadi satu tab per akun</label></div>
    <div class="f full"><label>Rentang</label><div class="seg" id="exRange"><button data-v="month" class="${EX.range==='month'?'on':''}">${BULAN[S.month.getMonth()]}</button><button data-v="all" class="${EX.range==='all'?'on':''}">Semua</button><button data-v="custom" class="${EX.range==='custom'?'on':''}">Pilih tanggal</button></div></div>
    <div class="f" id="fromW"><label for="exFrom">Dari</label><input class="in" type="date" id="exFrom" value="${a}"></div>
    <div class="f" id="toW"><label for="exTo">Sampai</label><input class="in" type="date" id="exTo" value="${b}"></div>
    <div class="f"><label for="exSt">Status</label><select class="in" id="exSt">${opts(STATUSES,'','Semua status')}</select></div>
    <div class="f"><label for="exPl">Platform</label><select class="in" id="exPl">${opts(PLATFORMS,'','Semua platform')}</select></div>
    <div class="f full"><label>Simpan sebagai</label><div class="opts" id="exT">${tg.map(([k,t,d,dis])=>`<button class="opt ${EX.target===k?'on':''}" data-v="${k}" ${dis?'disabled':''}><b>${t}</b><span>${d}</span></button>`).join('')}</div></div>
    <p class="f full hint" id="exCnt"></p>
  </div></div>
  <div class="sh-f"><span class="sp"></span><button class="btn desk" onclick="closeSheet()">Batal</button><button class="btn pri" id="exB">${ic('sheet',17)}Export sekarang</button></div>`);
  const seg=(sel,key)=>$(sel).onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;EX[key]=b.dataset.v;$$(sel+' button').forEach(x=>x.classList.toggle('on',x===b));sync()};
  seg('#exScope','scope');seg('#exRange','range');seg('#exT','target');
  ['#exFrom','#exTo','#exSt','#exPl','#exSplit'].forEach(s=>$(s).onchange=sync);
  $('#exB').onclick=doExport;sync();
  function sync(){
    if(!cur)EX.scope='all';
    $('#fromW').style.display=$('#toW').style.display=EX.range==='custom'?'':'none';
    $('#splitW').style.display=EX.scope==='all'&&EX.target!=='csv'&&S.data.accounts.length>1?'':'none';
    $('#exCnt').textContent=`${exRows(exOpts()).length} konten akan diexport.`;
  }
}
function exOpts(){
  let from='',to='';
  if(EX.range==='month')[from,to]=monthRange(S.month);
  if(EX.range==='custom'){from=$('#exFrom').value;to=$('#exTo').value}
  EX.split=$('#exSplit').checked;
  return{accountIds:EX.scope==='all'||!curAcc()?S.data.accounts.map(a=>a.ID):[S.acc],from,to,status:$('#exSt').value,platform:$('#exPl').value,target:EX.target,splitByAccount:EX.scope==='all'&&EX.split};
}
const exRows=o=>S.data.contents.filter(c=>o.accountIds.includes(c.AccountID)&&(!o.from||c.Date>=o.from)&&(!o.to||c.Date<=o.to)&&(!o.status||c.Status===o.status)&&(!o.platform||c.Platform===o.platform)).sort(sortDT);
function doExport(){
  const o=exOpts(),b=$('#exB');
  if(o.target==='csv'){downloadCSV(exRows(o),o);return closeSheet()}
  b.disabled=true;b.textContent='Mengexport…';
  api('exportToSheet',o).then(r=>{closeSheet();toast(`${r.count} konten diexport${r.tabs>1?` ke ${r.tabs} tab`:''}`,{url:r.url})})
    .catch(e=>{toast(errMsg(e));b.disabled=false;b.textContent='Coba export lagi'});
}
function downloadCSV(rows,o){
  const H=['Akun','Tanggal','Hari','Jam','Judul','Platform','Format','Status','Progres','Campaign','Pillar','Caption','Hashtag','Link Post','Link Hasil','Link Referensi','Reach','Likes','Comments','Shares','Saves'];
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  const body=rows.map(c=>{const[d,t]=progress(c);return[(accById(c.AccountID)||{}).Name,c.Date,HARI_F[pd(c.Date).getDay()],c.Time,c.Title,c.Platform,c.Format,c.Status,t?`${d}/${t}`:'',c.Campaign,c.Pillar,c.Caption,c.Hashtags,c.PostLink,c.ResultLink,pj(c.Links,[]).map(x=>x.url).join(' '),c.Reach,c.Likes,c.Comments,c.Shares,c.Saves].map(q).join(',')});
  const csv='\ufeff'+[H.map(q).join(','),...body].join('\n');
  const name=`content-planner_${o.from||'semua'}${o.to?'_'+o.to:''}.csv`;
  try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();a.remove();toast(`${rows.length} konten diunduh`)}
  catch(e){window.open('data:text/csv;charset=utf-8,'+encodeURIComponent(csv))}
}

/* ======================= Quick, more, toast ======================= */
function toggleQuick(e){
  e&&e.stopPropagation();
  const p=$('#pop');if(p.classList.contains('open')&&p.dataset.k==='quick')return closePop();
  p.dataset.k='quick';p.style.left='';p.style.top='';
  p.innerHTML=`<div class="menu"><button onclick="closePop();newContent()">${ic('calendar')}<span class="t">Konten baru<span>Jadwalkan posting</span></span></button>
    <button onclick="closePop();go('ideas');setTimeout(()=>$('#cap')?.focus(),50)">${ic('bulb')}<span class="t">Catat ide / link<span>Simpan ke Idea Bank</span></span></button>
    <button onclick="openExport()">${ic('sheet')}<span class="t">Export ke Sheet</span></button>
    <button onclick="closePop();openAccMenu()">${ic('swap')}<span class="t">Ganti akun</span></button></div>`;
  p.classList.add('open');$('#fab').classList.add('open');
}
function openMore(){
  openSheet(`<div class="grab"></div><div class="sh-h"><h3>Menu</h3><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic('x')}</button></div>
  <div class="sh-b"><div class="menu">
    <button onclick="openAccMenu()">${avatar(curAcc(),'sm')}<span class="t">Ganti akun<span>${esc(curAcc()?curAcc().Name:'Semua akun')}</span></span></button><hr>
    <button onclick="go('analytics')">${ic('chart')}<span class="t">Analytics</span></button>
    <button onclick="openNotes()">${ic('note')}<span class="t">Catatan</span></button>
    <button onclick="go('campaign')">${ic('flag')}<span class="t">Campaign</span></button>
    <button onclick="go('resources')">${ic('folder')}<span class="t">Resources</span></button>
    <button onclick="go('accounts')">${ic('users')}<span class="t">Kelola akun</span></button>
    <button onclick="openExport()">${ic('sheet')}<span class="t">Export ke Sheet</span></button>
    <button onclick="go('settings')">${ic('palette')}<span class="t">Tema & pengaturan</span></button>
    <button onclick="closeSheet();lockNow()">${ic('lock')}<span class="t">Kunci aplikasi</span></button></div></div>`,'narrow');
}
let tT,tFn;
function toast(msg,o={}){
  const t=$('#toast');tFn=o.undo||(o.action&&o.action[1])||null;
  t.innerHTML=`<span class="msg">${esc(msg)}</span>${o.url?`<a href="${esc(o.url)}" target="_blank" rel="noopener">Buka</a>`:''}${o.undo?`<button onclick="runToast()">Urungkan</button>`:''}${o.action?`<button onclick="runToast()">${esc(o.action[0])}</button>`:''}`;
  t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),(o.url||o.undo||o.action)?6500:2800);
}
function runToast(){$('#toast').classList.remove('show');const f=tFn;tFn=null;f&&f()}
const errMsg=e=>(e&&e.message)||String(e)||'Terjadi kesalahan';

/* ======================= Keyboard, gestur, resize ======================= */
document.addEventListener('keydown',e=>{
  if(document.body.classList.contains('locked'))return;
  if(e.key==='Escape'){closeSheet();closePop();return}
  if(e.target.closest('input,textarea,select')||e.metaKey||e.ctrlKey||e.altKey||$('#ov').classList.contains('open'))return;
  const k=e.key.toLowerCase();
  if(k==='n'){e.preventDefault();newContent()}
  else if(k==='i'){e.preventDefault();openEntity('Ideas')}
  else if(k==='/'){e.preventDefault();if(S.view!=='content')go('content');setTimeout(()=>$('#q')?.focus(),30)}
  else if(k==='c'&&S.view==='content')setCMode(S.cmode==='calendar'?'list':'calendar');
  else if(k==='a')openAccMenu(isMob()?null:$('#accBtn'));
  else if((k==='arrowleft'||k==='arrowright')&&['content','analytics'].includes(S.view))shiftMonth(k==='arrowleft'?-1:1);
});
let tx=0,ty=0;
document.addEventListener('touchstart',e=>{if(e.target.closest('#swipe')){tx=e.touches[0].clientX;ty=e.touches[0].clientY}else tx=0},{passive:true});
document.addEventListener('touchend',e=>{if(!tx)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)shiftMonth(dx<0?1:-1);tx=0},{passive:true});
let lastMob=isMob();
addEventListener('resize',()=>{const m=isMob();if(m!==lastMob){lastMob=m;closePop();render()}});

/* ======================= Init ======================= */
/* ======================= Kunci akses ======================= */
const DEF_CODE='admin123';
function h53(str,seed){seed=seed||7;let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0,ch;i<str.length;i++){ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return 4294967296*(2097151&h2)+(h1>>>0)}
const codeHash=c=>'h'+h53('cp|'+c).toString(36)+h53('|'+c,13).toString(36);
const accessHash=()=>((S.data.settings||{}).AccessHash)||store.get('cp2_hash','')||codeHash(DEF_CODE);
const unlockTok=()=>{try{return localStorage.getItem('cp2_ok')||sessionStorage.getItem('cp2_ok')||''}catch(e){return''}};
const isUnlocked=()=>!!unlockTok();
let lkTry=0,lkBlock=0;
function showLock(){$('#lock').classList.remove('hide');document.body.classList.add('locked');closeSheet();closePop();setTimeout(()=>{const i=$('#lkIn');i&&i.focus()},60)}
function hideLock(){$('#lock').classList.add('hide');document.body.classList.remove('locked')}
function lkMsg(t){$('#lkErr').textContent=t||''}
function lkEye(){const i=$('#lkIn'),on=i.type==='password';i.type=on?'text':'password';$('#lkEye').innerHTML=ic(on?'eyeoff':'eye',20)}
function setToken(tok,remember){try{if(remember){localStorage.setItem('cp2_ok',tok);sessionStorage.removeItem('cp2_ok')}else{sessionStorage.setItem('cp2_ok',tok);localStorage.removeItem('cp2_ok')}}catch(e){}}
async function tryUnlock(){
  const inp=$('#lkIn'),v=inp.value;
  if(!v)return lkMsg('Masukkan kode akses.');
  if(Date.now()<lkBlock)return lkMsg('Terlalu banyak percobaan. Coba lagi beberapa detik lagi.');
  const go=$('#lkGo');go.disabled=true;
  try{
    lkMsg('Memeriksa…');
    const result=await api('authenticate',v);
    go.disabled=false;
    setToken(result.token,$('#lkRm').checked);
    inp.value='';lkMsg('');lkTry=0;hideLock();
    await reload();
  }catch(e){
    go.disabled=false;
    lkTry++;if(lkTry>=5){lkBlock=Date.now()+15000;lkTry=0}
    lkMsg(errMsg(e).includes('401')?'Kode akses salah.':errMsg(e));const c=$('#lkCard');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');inp.select();
  }
}
function lockNow(){try{localStorage.removeItem('cp2_ok');sessionStorage.removeItem('cp2_ok')}catch(e){}const i=$('#lkIn');i.value='';i.type='password';$('#lkEye').innerHTML=ic('eye',20);lkMsg('');showLock()}
function relockCheck(){if($('#lock').classList.contains('hide')&&!isUnlocked())showLock()}
function saveCode(b){
  const o=$('#cOld').value,n=$('#cNew').value,n2=$('#cNew2').value;
  if(codeHash(o)!==accessHash())return toast('Kode saat ini salah');
  if(n.length<4)return toast('Kode baru minimal 4 karakter');
  if(n!==n2)return toast('Pengulangan kode baru tidak sama');
  const h=codeHash(n);b.disabled=true;
  api('saveSettings',{AccessHash:h}).then(()=>{
    S.data.settings.AccessHash=h;store.set('cp2_hash',h);
    const remember=!!(()=>{try{return localStorage.getItem('cp2_ok')}catch(e){return''}})();
    return api('authenticate',n).then(r=>{setToken(r.token,remember);render();toast('Kode akses diganti')});
  }).catch(e=>toast('Gagal menyimpan: '+errMsg(e))).finally(()=>b.disabled=false);
}

/* ======================= Catatan ======================= */
let nT;
const noteVis=()=>S.notes.filter(n=>!n.del).sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||(b.u||0)-(a.u||0));
const noteTitle=n=>{const l=String(n.b||'').split('\n').find(x=>x.trim());return l?l.trim().slice(0,70):'Catatan baru'};
const notePrev=n=>{const l=String(n.b||'').split('\n').filter(x=>x.trim());return l[1]?l[1].trim().slice(0,90):'Tidak ada teks tambahan'};
const noteDate=u=>{const d=new Date(u||Date.now()),t=new Date();return d.toDateString()===t.toDateString()?pad(d.getHours())+':'+pad(d.getMinutes()):d.getDate()+' '+BLN[d.getMonth()]};
function saveNotes(){S.notes=S.notes.filter(n=>!n.del||Date.now()-(n.u||0)<2592e6);store.set('cp2_notes',S.notes);clearTimeout(nT);nT=setTimeout(syncNotes,1200);renderNotesW()}
function syncNotes(){
  const j=JSON.stringify(S.notes);
  if(j.length>45000){toast('Catatan terlalu panjang untuk disinkronkan, hanya tersimpan di perangkat ini');return}
  api('saveSettings',{Notes:j}).then(()=>{S.data.settings.Notes=j}).catch(()=>{});
}
function mergeNotes(){
  let srv=[];try{srv=JSON.parse((S.data.settings||{}).Notes||'[]')}catch(e){}
  if(!Array.isArray(srv))srv=[];
  const map={};S.notes.forEach(n=>map[n.id]=n);
  srv.forEach(n=>{if(!n||!n.id)return;const l=map[n.id];if(!l||(n.u||0)>(l.u||0))map[n.id]=n});
  const merged=Object.values(map);
  const before=JSON.stringify(S.notes);S.notes=merged;
  const after=JSON.stringify(S.notes);
  if(before!==after)store.set('cp2_notes',S.notes);
  if(after!==JSON.stringify(srv)&&S.notes.length)syncNotes();
}
function renderNotesW(){
  const el=$('#notesW');if(!el)return;const l=noteVis();
  el.innerHTML=`<div class="nh"><span class="ni">${ic('note',15)}</span><b>Catatan</b><button class="nadd" onclick="newNote()" aria-label="Catatan baru" title="Catatan baru">${ic('plus',16)}</button></div>
  <div class="nl">${l.length?l.slice(0,8).map(n=>`<button class="nr" onclick="openNotes('${n.id}')"><b>${n.pin?`<span class="npin">${ic('pin',12)}</span>`:''}${esc(noteTitle(n))}</b><small><em>${noteDate(n.u)}</em>${esc(notePrev(n))}</small></button>`).join(''):`<p class="ne">Belum ada catatan. Ketuk + untuk mulai menulis.</p>`}</div>
  ${l.length>3?`<button class="nall" onclick="openNotes()">Lihat semua (${l.length})</button>`:''}`;
}
function noteListHTML(q){
  q=String(q||'').trim().toLowerCase();
  const l=noteVis().filter(n=>!q||String(n.b).toLowerCase().includes(q));
  return l.length?l.map(n=>`<button class="nli" onclick="openNote('${n.id}')"><b>${n.pin?`<span class="npin">${ic('pin',13)}</span>`:''}${esc(noteTitle(n))}</b><small>${noteDate(n.u)} · ${esc(notePrev(n))}</small></button>`).join(''):`<div class="empty"><b>${q?'Tidak ada yang cocok':'Belum ada catatan'}</b>${q?'':'Tulis ide, to-do, atau pengingat singkat di sini.'}</div>`;
}
function noteFilter(v){$('#nlist').innerHTML=noteListHTML(v)}
function openNotes(id){
  if(id)return openNote(id);
  openSheet(`<div class="grab"></div><div class="sh-h"><h3>Catatan</h3><button class="btn pri sm" onclick="newNote()">${ic('plus',15)}Baru</button><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic('x')}</button></div>
  <div class="sh-b"><input class="in" id="nq" placeholder="Cari catatan…" oninput="noteFilter(this.value)" style="margin-bottom:12px"><div id="nlist" class="nlist">${noteListHTML('')}</div></div>`,'narrow');
}
function newNote(){const n={id:'N'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),b:'',u:Date.now(),pin:0};S.notes.unshift(n);saveNotes();openNote(n.id)}
function openNote(id){
  const n=S.notes.find(x=>x.id===id);if(!n||n.del)return openNotes();
  openSheet(`<div class="grab"></div><div class="sh-h"><button class="ib bare" onclick="noteDone('${id}')" aria-label="Kembali ke daftar">${ic('chevL')}</button><h3>Catatan</h3><button class="ib bare" id="npin" onclick="notePin('${id}')" aria-label="Sematkan" title="Sematkan">${ic('pin')}</button><button class="ib bare" onclick="noteDel('${id}',this)" aria-label="Hapus catatan" title="Hapus">${ic('trash')}</button></div>
  <div class="sh-b"><textarea class="ned" id="ned" placeholder="Judul di baris pertama, lalu isi catatan…" oninput="noteInput('${id}',this.value)">${esc(n.b)}</textarea></div>
  <div class="sh-f"><span class="muted" style="align-self:center;font-size:12.5px">Tersimpan otomatis</span><span class="sp"></span><button class="btn pri" onclick="noteDone('${id}')">Selesai</button></div>`,'');
  $('#npin').classList.toggle('on',!!n.pin);
  setTimeout(()=>{const t=$('#ned');t&&t.focus()},60);
}
function noteInput(id,v){const n=S.notes.find(x=>x.id===id);if(!n)return;n.b=v;n.u=Date.now();saveNotes()}
function notePin(id){const n=S.notes.find(x=>x.id===id);if(!n)return;n.pin=n.pin?0:1;n.u=Date.now();saveNotes();$('#npin').classList.toggle('on',!!n.pin)}
function noteDel(id,b){
  if(!b.dataset.arm){b.dataset.arm=1;b.classList.add('danger');toast('Tekan ikon sampah sekali lagi untuk menghapus');setTimeout(()=>{delete b.dataset.arm;b.classList.remove('danger')},2500);return}
  const n=S.notes.find(x=>x.id===id);if(n){n.del=1;n.b='';n.u=Date.now();saveNotes()}toast('Catatan dihapus');openNotes();
}
function noteDone(id){const n=S.notes.find(x=>x.id===id);if(n&&!String(n.b).trim()){n.del=1;n.u=Date.now();saveNotes()}openNotes()}

/* ======================= Muat data (cepat: pakai cache dulu) ======================= */
function vWait(){
  if(S.loadErr)return`<div class="pn"><h3>Data belum bisa dimuat</h3><p style="color:var(--ink2);margin-bottom:12px;white-space:pre-wrap">${esc(S.loadErr)}</p><p style="color:var(--ink3);font-size:13px;margin-bottom:14px">Pastikan konfigurasi Google Sheets di Netlify sudah benar dan akses Editor sudah diberikan ke service account.</p><button class="btn pri" onclick="S.loadErr='';render();reload()">Coba lagi</button></div>`;
  return`<div class="skel"><i style="height:190px"></i><i style="height:110px"></i><i style="height:110px"></i></div>`;
}
function saveCache(){try{localStorage.setItem('cp2_cache',JSON.stringify(S.data))}catch(e){}}
S.firstLoad=new Promise(r=>{S._fl=r});
function reload(){
  const b=$('#refBtn');b.style.opacity=.5;
  return api('getAllData').then(d=>{
    if(!d||!Array.isArray(d.accounts))throw new Error('Server mengembalikan data kosong/rusak. Pastikan Code.gs terbaru sudah di-deploy sebagai New version.');
    Object.assign(S.data,d);
    let hasLocal=false;try{hasLocal=!!localStorage.getItem('cp2_prefs')}catch(e){}
    if(d.prefs&&d.prefs.theme&&!hasLocal)Object.assign(S.prefs,d.prefs);
    S.ready=true;S.loadErr='';
    mergeNotes();fixAcc();applyPrefs();
    $('#demoBox').innerHTML='';
    render();saveCache();relockCheck();
  }).catch(e=>{
    if(errMsg(e).includes('Sesi berakhir')){try{localStorage.removeItem('cp2_ok');sessionStorage.removeItem('cp2_ok')}catch(_){}showLock()}
    if(S.ready)toast('Gagal memuat data: '+errMsg(e));
    else{S.loadErr='Gagal memuat data:\n'+errMsg(e);render()}
  }).finally(()=>{b.style.opacity=1;S._fl()});
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.ready)saveCache()});
try{
  const c=store.get('cp2_cache',null);
  if(c&&Array.isArray(c.accounts)){Object.assign(S.data,c);S.ready=true;fixAcc()}
  chrome();applyPrefs();
  applyLogo();$('#lkIc').innerHTML=ic('lock',20);$('#lkEye').innerHTML=ic('eye',20);$('#lkArr').innerHTML=ic('right',18);
  const nm=(S.data.settings||{}).AppName;if(nm)$('#lkT').textContent=nm;
  render();
  if(isUnlocked())hideLock();else showLock();
  window.__cpReady=true;clearTimeout(window.__cpWd);
}catch(e){cpShowErr('Gagal menyiapkan tampilan: '+errMsg(e))}
reload();
