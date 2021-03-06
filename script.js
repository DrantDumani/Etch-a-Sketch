let root = document.documentElement
let lastEl = null
let cellByCell = Number(getComputedStyle(root).getPropertyValue("--rowByCol"))
let sketchpad = document.querySelector(".sketchpad")
let numInput = document.querySelector(".numOfCells")

let colorInput = document.querySelector(".currentColor")
let currentColor = colorInput.value
let clearBtn = document.querySelector(".clear")

let rainbowFlag = false
let grayScaleFlag = false

let rainbowToggle = document.querySelector(".rainbow")
let grayScaleToggle = document.querySelector(".grayscale")

let dimLabel = document.querySelector(".dim-label")
setLabel(numInput.value)

function setLabel(value){
	dimLabel.textContent = `${value}x${value}`
}

function checkRainbow(){
	grayScaleFlag = false
	rainbowFlag = true
}

function checkGrayScale(){
	rainbowFlag = false
	grayScaleFlag = true
}

sketchpad.addEventListener("pointermove", (event) => {
	let elem = document.elementFromPoint(event.pageX - window.scrollX, event.pageY - window.scrollY)

	if (elem !== lastEl && elem.classList.contains("cell")){
		let cellColor = ""
		if (rainbowFlag) {
			cellColor = setRandomColor()
        }
        else if (grayScaleFlag){
        	cellColor = incGrayScale(getComputedStyle(elem).backgroundColor)
        }
        else {
        	cellColor = colorInput.value
        }
        elem.style.backgroundColor = cellColor
        lastEl = elem
	}
})

function init(dimensions){
	let arrOfCells = []
	
	for (let row = 0; row < dimensions; row++){
		for (let col = 0; col < dimensions; col++){
			let cell = document.createElement("div")
			cell.classList.add("cell")
			arrOfCells.push(cell)
		}
	}
	sketchpad.replaceChildren(...arrOfCells)
}

function setRandomColor() {
	let rndmColor = Math.floor(Math.random() * 16777216).toString(16)
	let hexStr = `#${rndmColor}`
	return hexStr
}

function incGrayScale(hexStr) {
	let tenPercent = Math.floor(255 * 0.1)
	let nextRGB = hexStr.replace(/\d+/g, (num) => {
		let gray = Math.floor(Number(num) - tenPercent)
		return gray >= 0 ? gray : 0
	})
	return nextRGB
}

clearBtn.addEventListener("click", () => {init(cellByCell)})

colorInput.addEventListener("change", (event) => {
	grayScaleFlag = false
	rainbowFlag = false
	currentColor = event.target.value
})

numInput.addEventListener("input", (event) => {
	cellByCell = event.target.value
	root.style.setProperty("--rowByCol", event.target.value)
	setLabel(cellByCell)
	init(cellByCell)
})

rainbowToggle.addEventListener("click", checkRainbow)
grayScaleToggle.addEventListener("click", checkGrayScale)

init(cellByCell)