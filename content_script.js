document.addEventListener("dragover", (e) => e.preventDefault())

document.addEventListener("drop", (e) => {
    e.preventDefault()
    const video = document.querySelector("video")
    if (video) {
        const track = document.createElement("track")
        const file = e.dataTransfer.items[0].getAsFile()
        const url = URL.createObjectURL(file)
        track.src = url
        track.default = true
        video.appendChild(track)
        browser.runtime.sendMessage({subs: file})
    }
})