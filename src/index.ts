import { parseFile, toVtt, type Subtitle } from "js-sub-parsers"

let prev: HTMLElement | null = null
let curr: HTMLElement | null = null


const getFileExtension = (filename: string): string => {
    const matches = filename.match(/(?<=\.)[A-z]*$/)
    if (!matches) return ""
    return matches[0]
}

const video = document.querySelector("video")!

video.addEventListener("dragenter", (e) => {e.preventDefault(); e.stopPropagation();})
video.addEventListener("dragover", (e) => {e.preventDefault(); e.stopPropagation();createDropZone();})
video.addEventListener("dragleave", (e) => {e.preventDefault(); e.stopPropagation();cleanUpDropzone();})

video.addEventListener("drop", async (e) => {
    e.preventDefault()
    e.stopPropagation()
    cleanUpDropzone()
    
    if (!e.dataTransfer || !e.dataTransfer.items.length || e.dataTransfer.items[0].kind !== "file") return
    
    const file = e.dataTransfer.items[0].getAsFile()
    if (!file) return
    const ext = getFileExtension(file?.name)
    let url: string;
    let subtitles: Subtitle[]
    switch (ext) {
        case "srt": {
            subtitles = await parseFile(file)
            const vtt = toVtt(subtitles)
            url = URL.createObjectURL(vtt)
            break
        }
        default: return
    }

    const track = document.createElement("track")
    track.src = url
    track.default = true
    track.kind = "subtitles"
    track.label = "ja"
    video.appendChild(track)
    track.addEventListener("cuechange", handleCueChange)

    for (const sub of subtitles) {
        const div = newSubtitleElement(sub)
        document.body.appendChild(div)
    }
})

function handleCueChange(e: Event) {
    if (!video.textTracks) return
    const track = video.textTracks[0]
    if (!track.activeCues) return
    const active = track.activeCues[0]
    if (!active) return
    const id = active.id
    const sub = document.getElementById(`sub${id}`)
    if (!sub) return
    scroll(sub)
    changeActive(sub)
}

const handleSubClick = (e: MouseEvent) => {
    if (e.target instanceof HTMLDivElement) {
        const start = parseTimestamp(e.target)
        video.currentTime = start
    }
}


function newSubtitleElement(subtitle: Subtitle): HTMLDivElement {
    const div = document.createElement("div")
    div.setAttribute("id", `sub${subtitle.index}`)
    div.setAttribute("class", "subtitle")
    const text = document.createElement("p")
    text.innerText = subtitle.text
    text.setAttribute("class", "sub-text")
    const timestamp = document.createElement("p")
    timestamp.innerText = `${subtitle.start} - ${subtitle.end}`
    timestamp.setAttribute("class", "timestamp")
    div.appendChild(text)
    div.appendChild(timestamp)
    div.addEventListener("click", handleSubClick)
    return div
}

function scroll(div: HTMLElement) {
    const top = div.getBoundingClientRect().top + window.scrollY
    const height = window.innerHeight
    const y = Math.floor(top - (height / 2))
    window.scroll(0, y)
}

function changeActive(div: HTMLElement) {
    div.classList.add("active")
    if (!curr) {
        curr = div
    } else {
        prev = curr
        curr = div
    }

    if (!prev) return
    prev.classList.remove("active")

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

// parses timestamp from html and it returns the time (in seconds) that the sub appears in the video
function parseTimestamp(sub: HTMLDivElement): number {
    if (!sub.classList.contains("subtitle")) return 0
    const timestamp: HTMLParagraphElement = sub.querySelector(".timestamp")!
    const start = timestamp.innerText.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}[\.,][0-9]{3}/)![0].split(":")
    const hrs = Number(start[0])
    const mins = Number(start[1])
    const secs = Number(start[2].replace(",", "."))

    return (hrs*60*60) + (mins*60) + secs
}










