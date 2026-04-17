chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'destroySheets') {
    removeAllParentContainers();
    document.querySelectorAll('.toggle-button').forEach(btn => btn.remove());
    panelcount = 1;
    return sendResponse({ status: 'ok' });
  }

  if (message.action === 'spawnSheets') {
    for (let i = 0; i < message.count; i++) createcharmscheckpanel();
    return sendResponse({ status: 'ok' });
  }

  if (message.action === 'spawncreatures') {
    for (let i = 0; i < message.count; i++) createcreaturecreatorpanel();
    return sendResponse({ status: 'ok' });
  }

  if (message.action === 'spawnNamed') {
    for (let i = 0; i < message.count; i++) createnamedpanel();
    return sendResponse({ status: 'ok' });
  }
});
