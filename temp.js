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

function isElementVisible(element) {
    // returns exactly true or false
    return !!(element && element.offsetWidth > 0 && element.offsetHeight > 0);
}

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