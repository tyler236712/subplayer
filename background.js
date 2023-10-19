browser.runtime.onMessage.addListener((e) => {
    const file = e.subs
    const fr = new FileReader()

    fr.onload = (e) => {
        const contents = e.target.result
        console.log(contents)
    }

    fr.readAsText(file)
})