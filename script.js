let root = document.documentElement
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

function checkRainbow(){
	grayScaleFlag = false
	rainbowFlag = true
}

function checkGrayScale(){
	rainbowFlag = false
	grayScaleFlag = true
}

function init(dimensions){
	let arrOfCells = []
	
	for (let row = 0; row < dimensions; row++){
		for (let col = 0; col < dimensions; col++){
			let cell = document.createElement("div")
			cell.addEventListener("mouseenter", () => {
				let cellColor = ""
				if (rainbowFlag) {
					cellColor = setRandomColor()
				}
				else if (grayScaleFlag){
					cellColor = incGrayScale(getComputedStyle(cell).backgroundColor)
				}
				else {
					cellColor = colorInput.value
				}
				cell.style.backgroundColor = cellColor
			})
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

numInput.addEventListener("change", (event) => {
	cellByCell = event.target.value
	let max = Number(event.target.max)
	let min = Number(event.target.min)
	if (cellByCell > max || cellByCell < min || typeof(Number(cellByCell)) !== "number") 
	{
		return
	}
	else {
		root.style.setProperty("--rowByCol", event.target.value)
		init(cellByCell)
	}
})

rainbowToggle.addEventListener("click", checkRainbow)
grayScaleToggle.addEventListener("click", checkGrayScale)

init(cellByCell)