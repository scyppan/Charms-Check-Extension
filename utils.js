function simulateClick(element) {
    
    console.log("simulating click on btn", element);

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
            var btn = document.querySelector('button[aria-label="More options"][aria-haspopup="dialog"]');
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
                    var panel = document.querySelector('.TZFSLb');
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
            var btn = document.querySelector('[aria-label="Chat with everyone"]');
            if (isElementVisible(btn)) {
                (function clickUntilChatOpens() {
                    // if chat still closed…
                    if (!isChatWindowOpen()) {
                      console.log("this is the button", btn);
                      console.log("Chat button is visible & chat is closed. Clicking...");
                      simulateClick(btn);
                      console.log("I tried to click");
                  
                      // try again in 200 ms
                      setTimeout(clickUntilChatOpens, 200);
                    } else {
                      // once open, grab the window
                      const win = document.querySelector('[jsname="ME4pNd"]');
                      console.log("Chat window opened:", win);
                      // you’ve succeeded!
                    }
                  })();

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
