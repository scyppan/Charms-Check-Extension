let chatWindowOpened = false;
let actionInProgress = false;

function masterScript() {
    return new Promise(function(resolve, reject) {
        function tryAssignButtons(attempts) {
            if (attempts >= 50) {
                reject(new Error("Failed to assign buttons after 50 attempts."));
                return;
            }

            var chatBtn = document.querySelector('[aria-label="Chat with everyone"][jsname="A5il2e"]');
            var moreBtn = document.querySelector('[jscontroller="PIVayb"][aria-label="More options"]');

            if (isElementVisible(chatBtn)) {
                console.log("Chat button assigned. Clicking...");
                clickChatButton(resolve, reject);
            } else if (isElementVisible(moreBtn)) {
                console.log("More options button assigned. Clicking...");
                openMoreOptionsPanel(
                    function() { clickChatButton(resolve, reject); },
                    reject
                );
            } else {
                console.log("Buttons not assigned. Retrying...");
                window.setTimeout(function() {
                    tryAssignButtons(attempts + 1);
                }, 200);
            }
        }

        tryAssignButtons(0);
    });
}

function initializecharmscheck() {
    console.log("Initializing charmscheck...");
    createcharmscheckpanel();
    console.log("Charmscheck initialized");
    console.log("Testing...");

    masterScript().then(function() {
        addeventlistener();

        return new Promise(function(resolve, reject) {
            clickChatButton(
                function() {
                    console.log("Chat window confirmed.");
                    resolve();
                },
                function(err) {
                    console.error("Failed to open chat window:", err);
                    reject(err);
                }
            );
        });
    }).then(function() {
        msgpostmanager("{AUTOMATED MESSAGE} Hey everyone! I have logged in with my charms check extension enabled!");
        console.log("Message posted.");
    }).catch(function(err) {
        console.error("Error during testing:", err);
    });
}
