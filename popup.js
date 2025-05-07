// popup.js
document.addEventListener('DOMContentLoaded', function() {
    var btn   = document.getElementById('createBtn');
    var input = document.getElementById('numSheets');
    if (!btn || !input) {
      console.error('popup.js: couldn’t find #createBtn or #numSheets');
      return;
    }
  
    btn.addEventListener('click', function() {
      var count = parseInt(input.value, 10) || 0;
      if (count < 1) {
        console.warn('popup.js: invalid sheet count:', input.value);
        return;
      }
  
      // send message to the active tab’s content script
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (!tabs[0]) {
          console.error('popup.js: no active tab');
          return;
        }
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'spawnSheets', count: count },
          function(response) {
            if (chrome.runtime.lastError) {
              console.error('popup.js:', chrome.runtime.lastError.message);
            } else {
              console.log('popup.js: spawnSheets →', response);
            }
          }
        );
      });
    });
  });
  