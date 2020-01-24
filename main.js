const urls = [
	"https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
	"https://images.pexels.com/photos/28061/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
	"https://images.pexels.com/photos/196640/pexels-photo-196640.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
	"https://images.pexels.com/photos/260409/pexels-photo-260409.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
	"https://images.pexels.com/photos/416747/pexels-photo-416747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",

	"https://cdn.pixabay.com/photo/2014/11/17/13/17/crossfit-534615_960_720.jpg",
	"https://cdn.pixabay.com/photo/2015/01/09/11/22/fitness-594143_960_720.jpg",
	"https://cdn.pixabay.com/photo/2016/04/07/01/03/yoga-1313115_960_720.jpg",
	"https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_960_720.jpg",
	"https://cdn.pixabay.com/photo/2015/11/16/01/21/kettlebell-1045067_960_720.jpg",
	"https://cdn.pixabay.com/photo/2016/06/12/20/15/sports-1452965_960_720.jpg",
	"https://cdn.pixabay.com/photo/2016/12/29/03/17/photo-shoot-on-the-floor-1937659_960_720.jpg",

	"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1980&q=80",
	"https://images.unsplash.com/photo-1537289150563-b7f10eee353b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
];

const slider = document.querySelector(".slider");
const app = document.querySelector(".app");

let pix;

let dragged;
let dragging = false;

function resizeGrid() {
	document.documentElement.style.setProperty(
		"--grid-side",
		slider.value + "px"
	);
}

// Map urls into array of html elements
function getPix() {
	const pix = urls.map((url, i) => {
		const pic = document.createElement("div");
		pic.classList.add("pic");
		pic.dataset.index = i;
		pic.innerHTML = `<img src="${url}" draggable="false"/>`;
		return pic;
	});
	return pix;
}

// Rearrange pix array to match order saved in localStorage
function orderPix(pix) {
	const picOrder = localStorage.getItem("indices").split(",");
	const orderedPix = [];

	// .map not used in case `pix` is shorter than `picOrder` (after deleting some urls)
	picOrder.forEach(el => {
		const index = parseInt(el);
		if (pix[index]) orderedPix.push(pix[index]);
	});

	// add new pics to orderedPics
	if (pix.length > orderedPix.length)
		orderedPix.push(...pix.splice(orderedPix.length));

	return orderedPix;
}

function renderPix(pix) {
	app.innerHTML = "";
	pix.forEach(pic => app.appendChild(pic));
}

function getIndices(pix) {
	return pix.map(pic => pic.dataset.index);
}

// ------------ Drag ---------------

function handleMouseDown(e) {
	dragged = e.target.closest(".pic");
	if (!dragged) return;
	dragging = true;
}

function handleMouseMove(e) {
	if (!dragging) return;

	const target = e.target.closest(".pic");
	if (!target || target === dragged) return;

	// move dragged pic within array
	const from = pix.indexOf(dragged);
	const to = pix.indexOf(target);
	from >= to
		? pix.splice(to, 0, pix.splice(from, 1)[0])
		: pix.splice(to, 0, pix.splice(from, 1)[0]);

	renderPix(pix);
	localStorage.setItem("indices", getIndices(pix));
}

function handleMouseUp(e) {
	dragging = false;
}

// ---------------------------------

slider.addEventListener("input", resizeGrid);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

resizeGrid();
pix = getPix();
if (localStorage.length > 0) pix = orderPix(pix);
renderPix(pix);

function movePic(from, to) {
	// [0,1,2,3,4,5]
	//
	// const newIndex = parseInt(newPic.dataset.index);
	// const currentIndex = parseInt(currentPic.dataset.index);
	// let nextIndex;
	// if (moveCurrentTowardsNew)
	// 	// move currentPic 1 cell towards newPic
	// 	nextIndex = currentIndex + (currentIndex < newIndex ? 1 : -1);
	// // move currentPic 1 cell away newPic
	// else nextIndex = currentIndex + (currentIndex < newIndex ? -1 : 1);
	// const nextPic = document.querySelector(`[data-index="${nextIndex}"]`);
	// console.log(nextPic, dragged);
	// if (nextPic === dragged) return;
	// insertPic(currentPic, nextPic, false);
	// // insert newPic in place of currentPic
	// newPic.dataset.index = currentIndex;
	// newPic.style.order = currentIndex;
}
