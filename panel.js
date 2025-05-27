var panelcount = 1;

function createcharmscheckpanel() {
    // 1) ensure there’s one shared flex-column for all toggles
    var toggleContainer = document.getElementById('toggle-container');
    if (!toggleContainer) {
        toggleContainer = document.createElement('div');
        toggleContainer.id = 'toggle-container';
        document.body.appendChild(toggleContainer);
    }

    // 2) create a fresh parent wrapper
    var parentContainer = document.createElement('div');
    parentContainer.id = 'parent-container-' + panelcount;
    parentContainer.classList.add('parent-container');
    parentContainer.dataset.panelId = panelcount;    // ← tie to panelcount
    document.body.prepend(parentContainer);

    // 3) create the panel DIV
    var charmscheckpanel = document.createElement('div');
    charmscheckpanel.id = 'charmscheckpanel' + panelcount;
    charmscheckpanel.classList.add('charmscheckpanel', 'collapsed');
    charmscheckpanel.dataset.panelId = panelcount;   // ← optional, same ID
    parentContainer.appendChild(charmscheckpanel);

    // 4) header + destroy button
    var content = document.createElement('div');
    content.innerHTML =
      '<span class="panel-header">' +
        '<h6>Charms Check Extension 25 — Sheet #' + panelcount + '</h6>' +
        '<button class="close-panel-btn" ' +
                'title="clicking this will destroy panel #' + panelcount + '">' +
          'destroy this panel' +
        '</button>' +
      '</span>';
    charmscheckpanel.appendChild(content);

    // 5) iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://charmscheck.com/character-sheet-25/';
    iframe.classList.add('iframe-content');
    iframe.dataset.panelId = panelcount;             // ← tie to panelcount
    charmscheckpanel.appendChild(iframe);

    // random bg
    var choice = Math.floor(Math.random() * 10) + 1;
    iframe.classList.add('bg-' + choice);

    // 6) toggle button
    var toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button', 'initial-animation');
    toggleButton.dataset.panelId = panelcount;       // ← tie to panelcount
    toggleButton.innerHTML =
      '<img src="https://charmscheck.com/wp-content/uploads/2021/09/cropped-Icon1.png" alt="Toggle">' +
      '<span class="toggle-label"></span>';
    
    // allow easy lookup: iframe and button reference each other
    iframe._toggleButton = toggleButton;
    toggleButton._iframe = iframe;

    // 7) toggle handler
    toggleButton.addEventListener('click', function () {
        charmscheckpanel.classList.toggle('collapsed');
        charmscheckpanel.classList.toggle('expanded');
        toggleButton.classList.toggle('floating');
    }, false);

    // 8) append toggle
    toggleContainer.appendChild(toggleButton);

    // 8a) enable HTML5 drag‐and‐drop
    toggleButton.draggable = true;
toggleButton.addEventListener('dragstart', onToggleDragStart, false);
toggleButton.addEventListener('dragend',   onToggleDragEnd,   false);
toggleButton.addEventListener('dragover',  onToggleDragOver,  false);

    // 9) finish initial-animation
    toggleButton.addEventListener('animationend', function () {
        toggleButton.classList.remove('initial-animation');
    }, false);

    // 10) destroy handler
    var closeBtn = charmscheckpanel.querySelector('.close-panel-btn');
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        parentContainer.remove();
        toggleButton.remove();
    }, false);

    panelcount++;
}

function onToggleDragStart(e) {
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function onToggleDragEnd() {
  this.classList.remove('dragging');
}
function onToggleDragOver(e) {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  // insert before or after based on cursor
  const rect = this.getBoundingClientRect();
  const after = e.clientY > rect.top + rect.height/2;
  this.parentNode.insertBefore(dragging, after ? this.nextSibling : this);
}

// optional helper if you call it elsewhere
function createiframe() {
    var charmscheckpanel = document.getElementById('charmscheckpanel');
    if (!charmscheckpanel) {
        console.error('Element with id "charmscheckpanel" not found.');
        return;
    }
    var iframe = document.createElement('iframe');
    iframe.src = "https://charmscheck.com/character-sheet-25/";
    iframe.classList.add('iframe-content');
    charmscheckpanel.appendChild(iframe);
}

function removeAllParentContainers() {
    // grab a static list of every .parent-container in the document
    var panels = document.querySelectorAll('.parent-container');

    // remove each one—no other siblings will be touched
    panels.forEach(function (panel) {
        panel.parentNode.removeChild(panel);
    });
}
