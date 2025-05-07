function simulateClick(element) {
    if (element) {
        var event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    } else {
        console.error("Element not found to click.");
    }
}

function retryUntilSuccess(action, maxRetries, delay, onSuccess, onFailure) {
    var attempts = 0;

    function tryAction() {
        attempts++;
        if (action()) {
            onSuccess();
        } else if (attempts < maxRetries) {
            window.setTimeout(tryAction, delay);
        } else {
            onFailure(new Error("Failed to complete action after " + maxRetries + " attempts"));
        }
    }

    tryAction();
}

function openMoreOptionsPanel(onSuccess, onFailure) {
    retryUntilSuccess(
        function () {
            var btn = document.querySelector('[jscontroller="PIVayb"][aria-label="More options"]');
            if (isElementVisible(btn)) {
                console.log("More options button is visible. Clicking...");
                simulateClick(btn);
                return true;
            }
            return false;
        },
        50,
        100,
        function () {
            retryUntilSuccess(
                function () {
                    var panel = document.querySelector('.TZFSLb.AM6FT.P9KVBf.qjTEB');
                    return isElementVisible(panel);
                },
                50,
                100,
                onSuccess,
                onFailure
            );
        },
        onFailure
    );
}

function clickChatButton(onSuccess, onFailure) {
    retryUntilSuccess(
        function () {
            var btn = document.querySelector('[aria-label="Chat with everyone"][jsname="A5il2e"]');
            if (isElementVisible(btn)) {
                if (!isChatWindowOpen()) {
                    console.log("Chat button is visible & chat is closed. Clicking...");
                    simulateClick(btn);
                }

                return true;
            }
            return false;
        },
        50,
        200,
        function () {
            retryUntilSuccess(
                function () {
                    var win = document.querySelector('[jsname="ME4pNd"]');
                    var input = document.querySelector('textarea');
                    var send = document.querySelector('button[jsname="SoqoBf"]');
                    return win && input && send;
                },
                50,
                200,
                onSuccess,
                onFailure
            );
        },
        onFailure
    );
}
