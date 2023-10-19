const video = document.querySelector("video")

document.addEventListener("dragenter", (e) => {e.preventDefault(); e.stopPropagation();console.log("drag entered")})
document.addEventListener("dragover", (e) => {e.preventDefault(); e.stopPropagation();createDropZone();})
document.addEventListener("dragleave", (e) => {e.preventDefault(); e.stopPropagation();cleanUpDropzone();})

document.addEventListener("drop", (e) => {
    e.preventDefault()
    e.stopPropagation()
    cleanUpDropzone()
    console.log("hello")
    // const body = document.body

    // const track = document.createElement("track")
    const file = e.dataTransfer.items[0].getAsFile()
    // const url = URL.createObjectURL(file)
    // track.src = url
    // track.default = true
    // video.appendChild(track)
    browser.runtime.sendMessage({subs: file, })
})

function getVideo() {
    const video = document.querySelector("video");
    if (video) return video
    return null
}




function createDropZone() {
    if (document.querySelector(".dropzone")) return

    // get position and lengths of video
    const videoPosition = video.getBoundingClientRect()
    const top = Math.floor(videoPosition.top + window.scrollY)
    const left = Math.floor(videoPosition.left + scrollX)
    const height = videoPosition.height
    const width = videoPosition.width
    console.log(videoPosition)

    // create dropzone element
    const dropzone = document.createElement("div")
    dropzone.classList.add("dropzone")
    dropzone.style.pointerEvents = "none"
    dropzone.style.height = `${height}px`
    dropzone.style.width = `${width}px`
    dropzone.style.position = "absolute"
    dropzone.style.zIndex = "100"
    dropzone.style.top = `${top}px`
    dropzone.style.left = `${left}px`
    dropzone.style.backgroundColor = "white"
    document.body.appendChild(dropzone)
}

// removes dropzone from dom if it exists
function cleanUpDropzone() {
    const dropzone = document.querySelector(".dropzone")
    if (dropzone) {
        document.body.removeChild(dropzone)
    }
}
