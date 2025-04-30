// ==UserScript==
// @name         HubSpot Markdown Paste
// @namespace    https://github.com/avallete/hubspot-markdown-paster
// @version      0.1
// @description  Paste markdown into HubSpot rich text editors using Cmd+Shift+0
// @author       Avallete
// @match        https://app.hubspot.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/marked/marked.min.js
// @downloadURL  https://raw.githubusercontent.com/avallete/hubspot-markdown-paster/main/hubspot-markdown-paste.user.js
// @updateURL    https://raw.githubusercontent.com/avallete/hubspot-markdown-paster/main/hubspot-markdown-paste.user.js
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    async function handlePaste() {
        const editor = document.querySelector('[data-test-id="rte-content"]');
        if (!editor) {
            console.log('[HubSpot Markdown Paste] No editor found');
            return;
        }

        try {
            const pastedText = await navigator.clipboard.readText();
            const html = marked.parse(pastedText);
            editor.innerHTML = html;
            console.log('[HubSpot Markdown Paste] Markdown pasted into editor');
        } catch (err) {
            console.error('[HubSpot Markdown Paste] Failed to read clipboard or parse markdown:', err);
        }
    }

    function initialize() {
        console.log('[HubSpot Markdown Paste] Initialized');

        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '0') {
                e.preventDefault();
                handlePaste();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
