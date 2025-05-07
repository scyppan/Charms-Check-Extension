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
    document.body.prepend(parentContainer);

    // 3) create the panel DIV
    var charmscheckpanel = document.createElement('div');
    charmscheckpanel.id = 'charmscheckpanel' + panelcount;
    charmscheckpanel.classList.add('charmscheckpanel', 'collapsed');
    parentContainer.appendChild(charmscheckpanel);

    // 4) add your header/content
    var content = document.createElement('div');
    content.innerHTML = '<p>Charms Check Extension 25 — Sheet #' + panelcount + '</p>';
    charmscheckpanel.appendChild(content);

    // 5) inline the iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://charmscheck.com/character-sheet-25/';
    iframe.classList.add('iframe-content');
    charmscheckpanel.appendChild(iframe);

    // 6) create the toggle button
    var toggleButton = document.createElement('button');
    toggleButton.innerHTML =
        '<img src="https://charmscheck.com/wp-content/uploads/2021/09/cropped-Icon1.png" alt="Toggle">';
    toggleButton.classList.add('toggle-button', 'initial-animation');

    // 7) click handler: atomically toggle panel + floating
    toggleButton.addEventListener('click', function () {
        // flip both panel classes
        charmscheckpanel.classList.toggle('collapsed');
        charmscheckpanel.classList.toggle('expanded');
        // and flip the button’s floating state
        toggleButton.classList.toggle('floating');
    }, false);

    // 8) append the toggle into our flex-column container
    toggleContainer.appendChild(toggleButton);

    // 9) finish your initial-animation hook
    toggleButton.addEventListener('animationend', function () {
        toggleButton.classList.remove('initial-animation');
    }, false);

    panelcount++;
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
    panels.forEach(function(panel) {
      panel.parentNode.removeChild(panel);
    });
  }
  