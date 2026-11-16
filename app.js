(function(){
var d=document,kosz={},el=function(s){return d.querySelector(s)},all=function(s){return d.querySelectorAll(s)};
var panel=el('#koszyk'),zas=el('.zaslona'),poz=el('[data-poz]');
function otworz(){panel.classList.add('on');zas.classList.add('on');panel.setAttribute('aria-hidden','false');setTimeout(function(){el('.zamknij').focus()},50)}
function zamknij(){panel.classList.remove('on');zas.classList.remove('on');panel.setAttribute('aria-hidden','true');el('[data-demo]').hidden=true}
function rysuj(){
 var ids=Object.keys(kosz),szt=0,h='';
 ids.forEach(function(id){var p=kosz[id];szt+=p.q;
  h+='<div class="p"><img src="'+p.img+'" alt="" width="64" height="64"><div><b>'+p.n+'</b><small>cena z cennika</small></div><div class="ilosc"><button type="button" data-m="'+id+'" aria-label="Mniej">-</button><span>'+p.q+'</span><button type="button" data-p="'+id+'" aria-label="Więcej">+</button></div></div>'});
 poz.innerHTML=h||'<p class="pusty">Koszyk jest pusty. Dodaj produkty ze sklepu.</p>';
 all('[data-licz]').forEach(function(x){x.textContent=szt});
 el('[data-szt]').textContent=szt+' szt.';
}
all('[data-dodaj]').forEach(function(b){b.addEventListener('click',function(){
 var id=b.dataset.id;kosz[id]=kosz[id]||{n:b.dataset.n,img:b.dataset.img,q:0};kosz[id].q++;rysuj();
 b.textContent='Dodano';b.classList.add('ok');clearTimeout(b._t);b._t=setTimeout(function(){b.textContent='Do koszyka';b.classList.remove('ok')},1400);
})});
poz.addEventListener('click',function(e){var t=e.target,id;
 if(id=t.dataset.p){kosz[id].q++}else if(id=t.dataset.m){kosz[id].q--;if(kosz[id].q<1)delete kosz[id]}else return;rysuj()});
all('[data-otworz]').forEach(function(b){b.addEventListener('click',otworz)});
all('[data-zamknij]').forEach(function(b){b.addEventListener('click',zamknij)});
d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
el('[data-zamow]').addEventListener('click',function(){el('[data-demo]').hidden=false});
all('.filtry button').forEach(function(b){b.addEventListener('click',function(){
 all('.filtry button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
 var f=b.dataset.f;all('.prod').forEach(function(p){p.hidden=!(f==='*'||p.dataset.k===f)});
})});
var mb=el('.menu-btn'),mm=el('#mmenu');
mb.addEventListener('click',function(){var on=mm.classList.toggle('on');mb.setAttribute('aria-expanded',on)});
mm.addEventListener('click',function(e){if(e.target.tagName==='A'){mm.classList.remove('on');mb.setAttribute('aria-expanded','false')}});
var pl=el('.plywak');
if('IntersectionObserver' in window){new IntersectionObserver(function(en){pl.classList.toggle('on',!en[0].isIntersecting)}).observe(el('.hero'))}
el('#zapytanie').addEventListener('submit',function(e){e.preventDefault();var k=this.querySelector('.komunikat');k.hidden=false;k.textContent='To podgląd - formularz nie wysyła wiadomości. W gotowej stronie zapytanie trafi na zamowienia@tosse.com.pl.'});
})();
