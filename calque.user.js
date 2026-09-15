// ==UserScript==
// @name         Calque CdB (Tous les sites)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Calque officiel pour la Pixel War
// @author       Toi
// @match        https://thepixelwar.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', () => {
        // Le script cherche un canvas
        const canvas = document.querySelector('canvas'); 
        
        if (!canvas) {
            console.log("Calque CdB : Aucun canvas trouvé sur cette page. Le calque ne s'affichera pas.");
            return;
        }

        const calque = document.createElement('img');
        
        const timestamp = new Date().getTime();
        calque.src = 'https://raw.githubusercontent.com/zps4sjvvc9-glitch/CdB/main/calque.png?v=' + timestamp; 
        
        calque.style.position = 'absolute';
        calque.style.top = '0';
        calque.style.left = '0';
        calque.style.opacity = '0.5'; 
        calque.style.pointerEvents = 'none'; 
        calque.style.zIndex = '9999'; 
        calque.style.imageRendering = 'pixelated'; 
        
        calque.style.width = canvas.style.width || canvas.width + 'px';
        calque.style.height = canvas.style.height || canvas.height + 'px';

        canvas.parentElement.style.position = 'relative';
        canvas.parentElement.appendChild(calque);
        
        console.log("Calque CdB : Calque injecté avec succès sur le canvas !");
    });
})();
