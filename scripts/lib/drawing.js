// @ts-check

/**
 * @typedef {import('./types.js').Point} Point
 */

/**
 * @module drawing
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {string} color
 */
function drawPoint(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

/**
 * @param {Point[]} points
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} pointA
 * @param {number} pointB
 * @returns {void}
 */
export function drawPoints(points, ctx, pointA, pointB) {
    for (let i = 0; i < points.length; i++) {
        let color = "grey";
        if (i === pointA) color = "red";
        else if (i === pointB) color = "blue";

        drawPoint(ctx, points[i].x, points[i].y, color);
    }
}

/**
 * @param {number[]} path
 * @param {Point[]} points
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawPath(path, points, ctx) {
    ctx.strokeStyle = "yellow";

    let prev = points[path[0]];

    for (let i = 1; i < path.length; i++) {
        const point = points[path[i]];

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.closePath();
        ctx.stroke();

        prev = point;
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLCanvasElement} canvas
 * @returns {void}
 */
export function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
