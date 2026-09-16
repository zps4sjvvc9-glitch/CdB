// ==UserScript==
// @name         Calque CdB (Tous les sites)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Calque officiel pour la Pixel War
// @author       Toi
// @match        https://cdb.bde-cs.fr/pixels
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const CALQUE_URL =
        'https://raw.githubusercontent.com/zps4sjvvc9-glitch/CdB/main/calque2.jpg';

    function injecterCalque() {
        const canvas = document.querySelector('canvas');

        if (!canvas) {
            console.log(
                'Calque CdB : Aucun canvas trouvé sur cette page.'
            );
            return;
        }

        // Évite de créer plusieurs calques
        if (canvas.parentElement.querySelector('.calque-cdb')) {
            return;
        }

        const calque = document.createElement('img');

        calque.className = 'calque-cdb';

        // Anti-cache
        calque.src = CALQUE_URL + '?v=' + Date.now();

        // Récupération de la taille réellement affichée
        const rect = canvas.getBoundingClientRect();

        calque.style.position = 'absolute';
        calque.style.top = '0';
        calque.style.left = '0';
        calque.style.width = rect.width + 'px';
        calque.style.height = rect.height + 'px';

        calque.style.opacity = '0.5';
        calque.style.pointerEvents = 'none';
        calque.style.zIndex = '9999';
        calque.style.imageRendering = 'pixelated';

        // Le parent doit servir de référence au positionnement absolu
        const parent = canvas.parentElement;

        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        parent.appendChild(calque);

        console.log(
            'Calque CdB : Calque injecté avec succès !'
        );
    }

    // Première tentative
    window.addEventListener('load', injecterCalque);

    // Si le canvas est créé dynamiquement
    const observer = new MutationObserver(() => {
        if (!document.querySelector('.calque-cdb')) {
            injecterCalque();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
