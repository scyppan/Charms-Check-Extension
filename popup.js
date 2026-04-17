document.addEventListener('DOMContentLoaded',function(){
  var createbtn   = document.getElementById('createBtn');
  var numsheets   = document.getElementById('numSheets');
  if(!createbtn||!numsheets) return console.error('popup.js: missing sheet controls');
  createbtn.addEventListener('click',function(){
    var count = parseInt(numsheets.value,10)||0;
    if(count<1) return console.warn('popup.js: invalid sheet count');
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      if(!tabs[0]) return console.error('popup.js: no active tab');
      chrome.tabs.sendMessage(tabs[0].id,{action:'spawnSheets',count});
    });
  });

  var genericbtn  = document.getElementById('addGenericBtn');
  var numgeneric  = document.getElementById('numGeneric');
  if(!genericbtn||!numgeneric) console.error('popup.js: missing generic controls');
  else genericbtn.addEventListener('click',function(){
    var count = parseInt(numgeneric.value,10)||0;
    if(count<1) return console.warn('popup.js: invalid generic count');
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      if(!tabs[0]) return console.error('popup.js: no active tab');
      chrome.tabs.sendMessage(tabs[0].id,{action:'spawncreatures',count});
    });
  });

  var addnamedbtn = document.getElementById('addNamedBtn');
  var numnamed    = document.getElementById('numNamed');
  if(!addnamedbtn||!numnamed) console.error('popup.js: missing named controls');
  else addnamedbtn.addEventListener('click',function(){
    var count = parseInt(numnamed.value,10)||0;
    if(count<1) return console.warn('popup.js: invalid named count');
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      if(!tabs[0]) return console.error('popup.js: no active tab');
      chrome.tabs.sendMessage(tabs[0].id,{action:'spawnNamed',count});
    });
  });

  var destroybtn  = document.getElementById('destroyBtn');
  if(!destroybtn) console.error('popup.js: missing destroy control');
  else destroybtn.addEventListener('click',function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      if(!tabs[0]) return console.error('popup.js: no active tab');
      chrome.tabs.sendMessage(tabs[0].id,{action:'destroySheets'});
    });
  });
});
