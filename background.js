browser.runtime.onMessage.addListener((e) => {
    console.log("HELLO FROM BACKGROUND SCRIPT!", e)
})