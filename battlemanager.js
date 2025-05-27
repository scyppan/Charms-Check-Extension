// battlemanager.js — replace your onMessage handler with:

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'spawnSheets') {
    // just append new sheets; don’t remove old ones
    for (let i = 0; i < message.count; i++) {
      createcharmscheckpanel();
    }
    sendResponse({ status: 'ok' });
  }
});
