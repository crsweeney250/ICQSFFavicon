init();

function init() {
	chrome.storage.sync.get({
	  showPod: true,
	}, function(items) {
		var showPod = items.showPod;

		var sd = subDomain(document.location.href);
		if (sd.indexOf('coastala') !== -1 ) {
			changeFaviconred();
		}
		if (sd.indexOf('full') !== -1) {
			changeFaviconorange();
		}

		if (sd.indexOf('qa') !== -1) {
			changeFaviconyellow();
		}
		if (sd.indexOf('design') !== -1 || sd.indexOf('tapp') !== -1 || sd.indexOf('test') !== -1) {
			changeFavicongreen();
		}
//catchall		
		if (sd.indexOf('tapp') !== -1 || sd.indexOf('test') !== -1) {
			changeFavicon();
		}
		
		if (showPod) {
			changeTitle(sd);
    }
	});
}

function subDomain(url) {
	// IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
	url = url.replace(new RegExp(/^\s+/),""); // START
	url = url.replace(new RegExp(/\s+$/),""); // END
 
	// IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
	url = url.replace(new RegExp(/\\/g),"/");
 
	// IF THERE, REMOVES 'http://', 'https://' or 'ftp://' FROM THE START
	url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
 
	// IF THERE, REMOVES 'www.' FROM THE START OF THE STRING
	url = url.replace(new RegExp(/^www\./i),"");
 
	// REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
	url = url.replace(new RegExp(/\/(.*)/),"");
 
	// REMOVES '.??.??' OR '.???.??' FROM END - e.g. '.CO.UK', '.COM.AU'
	if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
	      url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");
 
	// REMOVES '.??' or '.???' or '.????' FROM END - e.g. '.US', '.COM', '.INFO'
	} else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
	      url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
	}
 
	return url;
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//sets title like so: na2 | salesforce.com | Home
function changeTitle(sd) {
	var serverName = sd.split('.')[0];
  if (endsWith(serverName, '--c')) {
    serverName = serverName.substring(0, serverName.length - 3);
  }
  window.document.title = serverName+' | '+window.document.title;
}


function changeFavicon() {
  var head = document.getElementsByTagName("head")[0];
  var links = head.getElementsByTagName("link");
  // Remove previous favicon
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel=="shortcut icon") {
      head.removeChild(links[i]);
      break;
    }
  }
  // Add new favicon
  var sboxFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQzFBRUQ4MzI3MjYxMUU1ODUwODlDODg4OEQ5QUU5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQzFBRUQ4NDI3MjYxMUU1ODUwODlDODg4OEQ5QUU5MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBDMUFFRDgxMjcyNjExRTU4NTA4OUM4ODg4RDlBRTkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBDMUFFRDgyMjcyNjExRTU4NTA4OUM4ODg4RDlBRTkwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+b74ongAABBlJREFUeNrsl11sU2UYx//v6Tmn7Tn92jpi3fcY2zJH2BzRaIgXfkAUTSQmAibEj0i42R1eEBODidz6ceG8mOCN0cSvYPzIEq/UmCgJcQvKwhgwNhgCo+vWru3a057z+rynacfY1p4NCRfyJE1P2r7v83uf9/98lHHOcTdNwl22ewDyal+YHDxjWjBMomSA6mJQ6YHe2B0FEI6TOQsTyRyGozmMz+cIgOGBkILOKgWNusyDRFL83ZxhIU9CFnAhVYImS2uClG91fokcfzuZxkdn5jEezy25rM6gigMdfjzb6OVzBsfP/yzQK4MraRNNPhnb6zx4LOJGe1Dhuiw5gmA3p+H1BZO/PTSLAXK+muluCT1Vqn3ykZix7PutG9x4qydkw1i0dTJX2F+TGXzK8uiUALIm59/Ryff8Ok2huL173Rbx4tU2HcSIsXgBstmnoLfGjY6gjBqPqwRSApjNWnzfLzcweDl9xxTfHFDw0kYdr7T5sImeBUQJQIS/9ZsppLJW2U3e2xzArnY/Nlarpc++Holj9x8xxyAvt/vwTm+V0A1bUgeIoaLzg4+ElzgX9mJXEBdeqHMM8OlYEp+fTyJncV4CoOxBV0Atu3Df5qD9/gkJlR27aL86PpvEX9cWbKi+Rq9jiKNnk4hmrEIaivSLUeiFUsuZrhZ4h6PZ0mdjtEn3j9fWrIcJqi9/Ro1CKY5mTHw4ksDwrFF20eC5Qnr274jg1HMRfPVoNfbe5163KEcpQ1ie7mFgNIE+ISKrcms+1hvCQ7UebIkshjtF+fbF6Tj2D82tCeAD0pNMAPh4NOnIuTDbydCiKBv8Mna2+fE6qXqSwnrkXMoxQE9YhSSS7lTMqPjjdo8Evr/FDn3R3jidsNNvgEQprMmvOHZeT6W7i3pLQVUOpiIhtulk3g69uIaiPRFU8FSzZj/HDcsxQF9nwG5eLEN30PDlFG6k8xUXFevASjZOUWw9fsWR892tGt59OIwGnQqR6Fl7WzRHC0XI3z8xYzu72X6i7Hhm8GrF9Y2kl0PdQRzuqUKtJi82o5FZg7/22wxOTmf+09q/s0FDwM2gUdFvIX30ht3YWqMub0aiEJ24nkX/aBw/XF6o2A+cOj/UHcL9mgRR3wJ03yHVtXo7FhBiCrqYMDGVymOKNHF8Ir2k6q1kYa8LD1a7Qc0UsayJAPX8p+u9eL5Jp8FEhtfFmKOJSJC1Upiob3ODNhPjVoQ2P/C7AV6mST1JRekg9YiAwqj/MzotR0RzrXjaihPRrXY1bfKjZ+fRTxPSsiyhg+2o8+JNEtU2KseKxNY1rJYFENeSoNwenjHw/aUU/o7lMJ/n1Mdd2F7rxeN0+nq9cpjXDVA00bcTdCUZIhIVW0zAPgq5xyXd9pjO7v03/N8D/CvAAKhttvZ/WR+LAAAAAElFTkSuQmCC';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}

// Coastala
  
 function changeFaviconorange() {
  var head = document.getElementsByTagName("head")[0];
  var links = head.getElementsByTagName("link");
  // Remove previous favicon
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel=="shortcut icon") {
      head.removeChild(links[i]);
      break;
    }
  }
  // Add new favicon
  var sboxFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAGPSURBVFhH7ZYxSAJhGIZfLxKCcKvBLVzCjARXEaExwSAcQ4NyCJfa2m6WcHEsaIggkNAlnFTQqVGicnARnAqnhJCM67v/PrhMxcDzvyEfOO57vxPel+/+/34dGgEbUfhuG/MA8wDWBOh0gEQCcDoBdd28QiGgUuEfjWb6bZhMAu4qizFcfQCtFotBJk8gkwGCQcDrBSIRoFDgB0QgMNlc52DJmMgIxk+gVgNKRyx+cfEORKPAapkbf+S8DXS7LAxGB2g0gNtdFhazdgbE4yzGBXC5gFM3C4u5pAm0aRLM8Bro9WZnrnO4zIXBcIB0mgs5mAHKtKD0lfp1w40ZonsxRoB8Hqgei1IKulexKEojQJ1WpmweTsRtQe33VSjPQkin/Erb0OfTsPfJHcncLdIr+LEnpUPeivjo2AV5KwiHWdkAeTu0ZlPD9Q53JLN/TxPweICXLe5IRPckb/MwisWAjUdRzpynTSCXE+XgaVivA6kUsP3GDYsprQDZLOD3c8OKv2RTMnwaSmYe4L8HAL4BTTN0tCUVQnsAAAAASUVORK5CYII=';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}

function changeFaviconyellow() {
  var head = document.getElementsByTagName("head")[0];
  var links = head.getElementsByTagName("link");
  // Remove previous favicon
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel=="shortcut icon") {
      head.removeChild(links[i]);
      break;
    }
  }
  // Add new favicon
  var sboxFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAF4SURBVFhH7ZaxagJBEIb/u0ICEssUCjamObhKSBODiOliG9MqIRa+g/gAgq8Q0htypVUULNKkSIoUFpdUpgnYxMo0k91zyAVcTeHdLoT7YLiZ2WP+YbjdPYsEMIjNT2MkDSQNRNPAfA40m0AqBSys0MplYDzmlzYgt+FOtFpEn6LMNsvn+eV1xOof9PtEpRKR4xDVakSexwuCYlEtuMkUqLOSyURdRFo2S9Ruq9e2WTrNxUPUJ+F0CuQcDiLm7gZoNDgA1A1kMsD7goOIcXLAbMaBqoHlEvja4yAm9kPJ9W3Y67Gjh3ACoxFwdBq4sfN4D1SrgbuagOfpE5dIreEwcFcTkKeWCcS3YKPT4cgA3a6YgOsSHl44o5ljV0zg157UjtC2g0PHFELbRqXCkQGEtkW+Tzg45IxmPnwxgUIBuLrgjEakptAOT8J6Hbi+DdzYuTwHBoPADe8CmXh7Bs5OOBEDsvbr04+4RH0da+Sf/BXvQNKA4QaAb8pSpAI7w9IBAAAAAElFTkSuQmCC';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}
function changeFaviconred() {
  var head = document.getElementsByTagName("head")[0];
  var links = head.getElementsByTagName("link");
  // Remove previous favicon
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel=="shortcut icon") {
      head.removeChild(links[i]);
      break;
    }
  }
  // Add new favicon
  var sboxFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAFMSURBVFhH7ZcxqsJAEIYnCiKIklrBXrCyVcTeVqxtLLyFteAdPIF2diLoAbSz8QqCrSCOM2YeKrMvFmZ3C/PBn2R2Z/cfNtmEBEiARzJy9kZaQFpAMgWcTgCDAUAuBxAET7XbAOu1JP0Db8OvGA55H8erWpVkDfV+YDpFbDYRazXEbhdxsZAOotHQZnEyYG5lNhs9wZ/KZcTRyNwXp0JBJn9CrQYOBz04Kc1mYhJBLQaKRT0wKVUqYhKhvwWXC0A+L4ElXiz1NpxM5MIRj3VgVqv3pbIp9hIoIuZznWRby+XDOnoG+K3lA7LOjq/XMWy30uKY242KqNffl8alyDvAMEQ4n6Ukx4QhbcNSSSIPkHcGOh2JPMDeeDya748LkTcdiX7fnGBT7EnQldDr6SRbYi+Bohf2e8RWSw9ISjz3bidmEemfUVrArxcAcAfyfeH6vdzlpAAAAABJRU5ErkJggg==';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}

function changeFavicongreen() {
  var head = document.getElementsByTagName("head")[0];
  var links = head.getElementsByTagName("link");
  // Remove previous favicon
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel=="shortcut icon") {
      head.removeChild(links[i]);
      break;
    }
  }
  // Add new favicon
  var sboxFavIcon ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAGUSURBVFhH7ZY/SEJRFMY/XyQRIc2N3rHFEBxNnBIqHXIJQgcRCoManBTbDSwQHFuqSTCsXQf3wCCQ8A6S0KQ2OCQNdrvvkIhagu/PkD943O8778H5eOe+P5a+ACai0Goa8wDzANoEaLWAcBiwWsHud34OuN1AuUwXjWf2xzAaBdt+IzMefvwENBrkhvk7QCYDFApAuw3Y7UAkAgQC6jmnE+xsTdVTwHcfSA2YHKBSAeukyQzDDx8Bvx9s65Uq08H3xTi6XXIq4wPUamAvcTLawjt7QChEbtImdLlI6EAiQUJlNECvB3azSUZ7WG6DlMpogPT4uevFYA+USmDdCyn1hq+cAl6v1GqAuzuwhStZMAq+eAT4fOoIjG7+DfvMyVVBMimFKaRSIkCxSM4ExOgVNJvkTED0VmCzkTMB0VuBx0POBERvS79e77PnE6oYC1+/FHeAMfDbZSoZh+wpeg/ehMEg2MGHlHrDr5eAfF7q4c9xtQrEYmDxVSpoCz9/B7JZwOGgym8/JAahzU/pDMwD/PcAwBfZmYG6VQiOhQAAAABJRU5ErkJggg==';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}
