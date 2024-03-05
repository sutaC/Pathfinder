// @ts-check
import { getPath, mesurePathDistance } from "./lib/path.js";
import { drawPoints, drawPath, clearCanvas } from "./lib/drawing.js";

/**
 * @typedef {import('./lib/types.js').Point} Point
 */

/** @type {HTMLButtonElement | null} */
const btnFindPath = document.querySelector("#btnFindPath");
if (!btnFindPath) throw ReferenceError("Could not find element '#btnFindPath'");
/** @type {HTMLCanvasElement | null} */
const canvas = document.querySelector("#canvas");
if (!canvas) throw ReferenceError("Could not find element '#canvas'");
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Could not create canvas context");
const controls = document.querySelector("#controls");
if (!controls) throw ReferenceError("Could not find element '#controls'");
/** @type {HTMLInputElement | null} */
const inpSteps = controls.querySelector("#inpSteps");
if (!inpSteps) throw ReferenceError("Could not find element '#inpSteps'");
/** @type {HTMLLabelElement | null} */
const labSteps = controls.querySelector("#labSteps");
if (!labSteps) throw ReferenceError("Could not find element '#labSteps'");
/** @type {HTMLOutputElement | null} */
const outTime = controls.querySelector("#time > output");
if (!outTime) throw ReferenceError("Could not find element '#time > output'");
/** @type {HTMLOutputElement | null} */
const outDistance = controls.querySelector("#distance > output");
if (!outDistance)
    throw ReferenceError("Could not find element '#distance > output'");
/** @type {HTMLButtonElement | null} */
const btnReset = document.querySelector("#btnReset");
if (!btnReset) throw ReferenceError("Could not find element '#btnReset'");
/** @type {HTMLDivElement | null} */
const divSize = document.querySelector("#size");
if (!divSize) throw new ReferenceError("Could not find element '#size'");

const MAX_HEIGHT = 500;
const MAX_WIDTH = 500;
canvas.height = MAX_HEIGHT;
canvas.width = MAX_WIDTH;
divSize.innerText = `Size: ${MAX_WIDTH}x${MAX_HEIGHT}px`;

controls.classList.add("hidden");
inpSteps.min = "0";
inpSteps.step = "1";

// Variables
/** @type {Point[]} */
let points = [];
/** @type {number | null} */
let aIdx = null;
/** @type {number | null} */
let bIdx = null;
/** @type {number[] | null} */
let path = null;
/** @type {number | null} */
let step = null;

// Reactivity

const handleBtnFinPath = () => {
    if (aIdx === null || bIdx === null) return;

    btnFindPath.disabled = true;

    const sTime = performance.now();
    path = getPath(aIdx, bIdx, points);
    const eTime = performance.now();
    const time = eTime - sTime;

    clearCanvas(ctx, canvas);
    drawPath(path, points, ctx);
    drawPoints(points, ctx, aIdx, bIdx);
    // console.log("Path: ", path);

    outDistance.innerText = mesurePathDistance(path, points).toString();
    outTime.innerText = time.toString();
    step = path.length - 1;
    labSteps.innerText = `${step} / ${path.length - 1} steps`;
    inpSteps.max = (path.length - 1).toString();
    inpSteps.value = step.toString();
    controls.classList.remove("hidden");
};
btnFindPath.addEventListener("click", handleBtnFinPath);

const handleStep = () => {
    if (path === null || step === null || aIdx === null || bIdx === null)
        return;

    step = Number.parseInt(inpSteps.value);

    labSteps.innerText = `${step} / ${path.length - 1} steps`;

    clearCanvas(ctx, canvas);
    drawPath(path.slice(0, step + 1), points, ctx);
    drawPoints(points, ctx, aIdx, bIdx);
};
inpSteps.addEventListener("input", handleStep);

const handleReset = () => {
    points = [];

    for (let i = 0; i < 50; i++) {
        /** @type {Point} */
        const point = {
            x: Math.floor(Math.random() * MAX_WIDTH),
            y: Math.floor(Math.random() * MAX_HEIGHT),
        };
        points.push(point);
    }

    aIdx = Math.floor(Math.random() * points.length);
    do {
        bIdx = Math.floor(Math.random() * points.length);
    } while (bIdx === aIdx);

    path = null;
    step = null;

    controls.classList.add("hidden");
    btnFindPath.disabled = false;

    clearCanvas(ctx, canvas);
    drawPoints(points, ctx, aIdx, bIdx);
};
btnReset.addEventListener("click", handleReset);

// Startup
handleReset();
