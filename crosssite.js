// crosssite.js

var messagePosted = false;      // Flag to check if message was successfully posted
var initialAttemptFailed = false; // Flag to check if initial attempt failed
var messagePending = false;
var chatWindowOpen = false;     // Track the state of the chat window

function callfunction(msg) {
    switch (msg) {
        case "test":
            console.log("test");
            msgpostmanager("Charms Check Extension is ready!");
            break;
        default:
            msgpostmanager(msg);
            break;
    }
}

function isChatWindowOpen() {
    var chatWindow = document.querySelector('[jsname="ME4pNd"]');
    var messageInput = document.querySelector('textarea');
    var sendButton  = document.querySelector('button[jsname="SoqoBf"]');

    return chatWindow && isElementVisible(chatWindow) && messageInput && sendButton;
}

function openChatWindow() {
    return new Promise(function(resolve, reject) {
        clickChatButton(
            function() {
                chatWindowOpen = true;
                resolve();
            },
            function(err) {
                reject(err);
            }
        );
    });
}

var debounceTimeout = null;
function msgpostmanager(message) {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(function() {
        messagePending = true;

        if (!chatWindowOpen) {
            openChatWindow().then(
                function() {
                    sendMessage(message).then(
                        function() {
                            messagePending = false;
                            chatWindowOpen = true;
                        },
                        function(err) {
                            console.error("Error sending message:", err);
                            messagePending = false;
                            chatWindowOpen = true;
                        }
                    );
                },
                function(err) {
                    console.error("Error opening chat window:", err);
                    messagePending = false;
                    chatWindowOpen = false;
                }
            );
        }
        else {
            sendMessage(message).then(
                function() {
                    messagePending = false;
                },
                function(err) {
                    console.error("Error sending message:", err);
                    messagePending = false;
                }
            );
        }
    }, 300);
}

function sendMessage(msg) {
    return new Promise(function(resolve, reject) {
        console.log("Attempting to send message...");
        var inputSel   = 'textarea';
        var buttonSel  = 'button[jsname="SoqoBf"]';
        var containers = document.querySelectorAll('.jO4O1, .chmVPb');

        var messageInput = document.querySelector(inputSel);
        var sendButton   = document.querySelector(buttonSel);
        var beforeCount  = containers.length;

        if (messageInput && sendButton) {
            if (sendButton.hasAttribute('disabled')) {
                sendButton.removeAttribute('disabled');
            }
            messageInput.value = msg;
            simulateClick(sendButton);
            console.log("Message sent.");

            setTimeout(function() {
                var newCount = document.querySelectorAll('.jO4O1, .chmVPb').length;
                console.log("Before:", beforeCount, "After:", newCount);

                if (newCount > beforeCount) {
                    console.log("Message successfully posted.");
                    messagePosted = true;
                    messagePending = false;
                    resolve();
                } else {
                    console.log("Message was not posted. Retrying...");
                    handleRetryOrFailure(1, msg).then(resolve).catch(reject);
                }
            }, 1000);
        }
        else {
            console.log("Message input or send button not found. Retrying...");
            handleRetryOrFailure(1, msg).then(resolve).catch(reject);
        }
    });
}

function handleRetryOrFailure(attempts, msg) {
    return new Promise(function(resolve, reject) {
        var maxAttempts = 50;
        if (attempts >= maxAttempts) {
            if (!initialAttemptFailed) {
                initialAttemptFailed = true;
                showInitialFailurePrompt();
            }
            messagePending = false;
            chatWindowOpen = true;
            reject(new Error("Maximum retry attempts reached."));
        }
        else {
            setTimeout(function() {
                sendMessage(msg)
                    .then(resolve)
                    .catch(function() {
                        handleRetryOrFailure(attempts + 1, msg)
                            .then(resolve)
                            .catch(reject);
                    });
            }, 500);
        }
    });
}

function showInitialFailurePrompt() {
    var modal = document.createElement('div');
    modal.id = 'initialFailureModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '10000';
    modal.innerHTML =
        '<h3>Unable to connect to chat</h3>' +
        '<p>Charms Check is having difficulty connecting to the chat window. Can you please open it yourself?</p>' +
        '<button id="closeInitialFailureModal">Close</button>';

    document.body.appendChild(modal);
    document.getElementById('closeInitialFailureModal').addEventListener('click', function() {
        modal.remove();
    });
}

function showFailurePrompt(msg) {
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '10000';
    modal.innerHTML =
        '<h3>Unable to post to chat</h3>' +
        '<p>However, here is your roll result: ' + msg + '</p>' +
        '<p>Closing any mini-windows and clicking the chat button yourself will likely resolve this issue.</p>' +
        '<button id="closeModal">Close</button>';

    document.body.appendChild(modal);
    document.getElementById('closeModal').addEventListener('click', function() {
        modal.remove();
    });
}

function addeventlistener() {
    window.addEventListener('message', function(event) {
        if (event.origin !== "https://charmscheck.com") {
            return;
        }
        console.log("Received message from iframe:", event.data);
        msgpostmanager(event.data);
    }, false);
}

// Bootstrap the retry observer
initButtonObserver();

function initButtonObserver() {
    var targetNode = document.body;
    var config     = { childList: true, subtree: true };

    function callback(mutationsList) {
        for (var i = 0; i < mutationsList.length; i++) {
            var mutation = mutationsList[i];
            if (mutation.type === 'childList') {
                console.log("DOM mutation detected. Checking if buttons need to be assigned...");
                if (messagePending) {
                    tryAssignButtons();
                } else {
                    console.log("No message pending. Not trying to open chat window.");
                }
            }
        }
    }

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function tryAssignButtons() {
    if (!messagePending) {
        console.log("No message pending. Not trying to open chat window.");
        return;
    }

    var chatButton       = document.querySelector('[aria-label="Chat with everyone"][jsname="A5il2e"]');
    var moreOptionsButton= document.querySelector('[jscontroller="PIVayb"][aria-label="More options"]');

    if (isElementVisible(chatButton)) {
        clickChatButton(
            function() { finalizeInitialization(); },
            function(err) { console.error("Error clicking chat button:", err); }
        );
    }
    else if (isElementVisible(moreOptionsButton)) {
        openMoreOptionsPanel(
            function() {
                clickChatButton(
                    function() { finalizeInitialization(); },
                    function(err) { console.error("Error clicking chat button:", err); }
                );
            },
            function(err) { console.error("Error opening more options panel:", err); }
        );
    }
    else {
        window.setTimeout(function() {
            tryAssignButtons();
        }, 50);
    }
}

function finalizeInitialization() {
    if (initialAttemptFailed) {
        var modal = document.getElementById('initialFailureModal');
        if (modal) { modal.remove(); }
        msgpostmanager("{AUTOMATED MESSAGE} Hey everyone! I have logged in with my charms check extension enabled!");
        initialAttemptFailed = false;
    }
}
