// ==UserScript==
// @name         Calque CdB - Pixel War
// @namespace    https://cdb.bde-cs.fr/
// @version      2.0
// @description  Affiche le calque Pixel War centré sur le plateau
// @author       Toi
// @match        https://cdb.bde-cs.fr/pixels*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const CALQUE_URL =
        'https://raw.githubusercontent.com/zps4sjvvc9-glitch/CdB/main/calque3.png';

    const ID = 'calque-cdb';

    function trouverCanvas() {
        const canvases = [...document.querySelectorAll('canvas')];

        if (!canvases.length) {
            return null;
        }

        // On prend le canvas visible avec la plus grande surface.
        return canvases
            .filter(c => {
                const r = c.getBoundingClientRect();
                return r.width > 100 && r.height > 100;
            })
            .sort((a, b) => {
                const ra = a.getBoundingClientRect();
                const rb = b.getBoundingClientRect();
                return (rb.width * rb.height) - (ra.width * ra.height);
            })[0] || null;
    }

    function injecterCalque() {
        const canvas = trouverCanvas();

        if (!canvas) {
            return;
        }

        const ancien = document.getElementById(ID);

        if (ancien) {
            ancien.remove();
        }

        const rect = canvas.getBoundingClientRect();

        const calque = document.createElement('img');

        calque.id = ID;
        calque.src = CALQUE_URL;

        calque.alt = '';
        calque.draggable = false;

        Object.assign(calque.style, {
            position: 'fixed',

            left: rect.left + 'px',
            top: rect.top + 'px',

            width: rect.width + 'px',
            height: rect.height + 'px',

            margin: '0',
            padding: '0',

            opacity: '0.50',

            pointerEvents: 'none',

            zIndex: '2147483647',

            imageRendering: 'pixelated',

            display: 'block',

            userSelect: 'none'
        });

        document.body.appendChild(calque);

        console.log(
            '[Calque CdB] OK —',
            Math.round(rect.width),
            '×',
            Math.round(rect.height)
        );
    }

    function synchroniser() {
        const canvas = trouverCanvas();
        const calque = document.getElementById(ID);

        if (!canvas) {
            if (calque) {
                calque.remove();
            }
            return;
        }

        const rect = canvas.getBoundingClientRect();

        if (!calque) {
            injecterCalque();
            return;
        }

        calque.style.left = rect.left + 'px';
        calque.style.top = rect.top + 'px';
        calque.style.width = rect.width + 'px';
        calque.style.height = rect.height + 'px';
    }

    // Première injection
    injecterCalque();

    // Le site peut créer/recréer son canvas dynamiquement.
    const observer = new MutationObserver(() => {
        synchroniser();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Redimensionnement / zoom / changement de fenêtre
    window.addEventListener('resize', synchroniser);
    window.addEventListener('scroll', synchroniser);

    // Le canvas peut changer de position après le chargement.
    setInterval(synchroniser, 1000);

})();
