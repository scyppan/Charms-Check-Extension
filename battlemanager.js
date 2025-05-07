chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'spawnSheets') {
      // 1) Remove any existing panel wrappers + toggles
      document.querySelectorAll('#parent-container').forEach(function(el) {
        el.remove();
      });
      document.querySelectorAll('.toggle-button').forEach(function(btn) {
        btn.remove();
      });
      removeAllParentContainers();
      panelcount=1;
  
      // 2) Call your original createcharmscheckpanel() once per sheet
      for (var i = 0; i < message.count; i++) {
        createcharmscheckpanel();  // exactly your function :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
      }
  
      sendResponse({ status: 'ok' });
    }
  });