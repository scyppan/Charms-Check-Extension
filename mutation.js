let observer = null;

// Function to check if we're in the chat interface
function isInChatInterface() {
    const chatButton = document.querySelector('[aria-label="Chat with everyone"]');
    const chatWindow = document.querySelector('[jsname="ME4pNd"]');
    return chatButton !== null || chatWindow !== null;
}

// Function to initialize the main call MutationObserver
function initMainCallObserver() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if (isInChatInterface()) {
                    console.log("Chat interface detected. Initializing charmscheck...");
                    initializecharmscheck();
                    observer.disconnect(); // Stop observing once we've detected the chat interface
                    break;
                }
            }
        }
    };

    observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

// Check if already in the chat interface, otherwise initialize MutationObserver
if (isInChatInterface()) {
    console.log("Already in chat interface. Initializing charmscheck...");
    initializecharmscheck();
} else {
    console.log("Not in chat interface. Setting up MutationObserver...");
    initMainCallObserver();
}
