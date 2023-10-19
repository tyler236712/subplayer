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
video.addEventListener("dragover", (e) => {e.preventDefault(); e.stopPropagation();})
video.addEventListener("dragleave", (e) => {e.preventDefault(); e.stopPropagation();})

video.addEventListener("drop", async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
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









