// @ts-check

/**
 * @typedef {import('./types.js').Point} Point
 */

/**
 * @module path
 */

/**
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number} - Distance between points
 */
export function calculateDistance(pointA, pointB) {
    // d=√((x2 – x1)² + (y2 – y1)²)
    return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2);
}

/**
 * @param {Point[]} points
 * @param {number} start
 * @param {number} end
 * @param {number[]} visited
 * @returns {number}
 */
function nextPoint(points, start, end, visited) {
    const distToEnd = calculateDistance(points[start], points[end]);

    /** @type {number | null} */
    let closest = null;
    /** @type {number | null} */
    let closestDisPoints = null;

    for (let i = 0; i < points.length; i++) {
        if (visited.includes(i)) continue;
        closest = i;
        closestDisPoints = calculateDistance(points[i], points[start]);
        break;
    }

    if (closest === null || closestDisPoints === null) {
        throw new Error("Could not find any step");
    }

    for (let i = closest + 1; i < points.length; i++) {
        if (closest === start) continue;
        if (visited.includes(i)) continue;

        const distPointToEnd = calculateDistance(points[i], points[end]);

        if (distPointToEnd >= distToEnd) continue;

        const distPoints = calculateDistance(points[start], points[i]);

        if (distPointToEnd === distToEnd) return i;

        if (distPoints >= closestDisPoints) continue;

        closestDisPoints = distPoints;
        closest = i;
    }

    return closest;
}

/**
 * @param {Point[]} points
 * @param {number} current
 * @param {number} end
 * @param {number[]} path
 * @returns {number[]}
 */
function getPathRc(points, current, end, path) {
    if (current == end) return path;
    if (path.length === points.length) return path;

    const next = nextPoint(points, current, end, path);
    path.push(next);

    return getPathRc(points, next, end, path);
}

/**
 * @param {number} pointA
 * @param {number} pointB
 * @param {Point[]} points
 * @returns {number[]} - Path of points
 */
export function getPath(pointA, pointB, points) {
    /** @type {number[]} */
    const path = [];
    path.push(pointA);

    return getPathRc(points, pointA, pointB, path);
}

/**
 * @param {number[]} path
 * @param {Point[]} points
 * @returns {number}
 */
export function mesurePathDistance(path, points) {
    let distance = 0;
    for (let i = 1; i < path.length; i++) {
        distance += calculateDistance(points[path[i - 1]], points[path[i]]);
    }
    return Math.floor(distance * 100) / 100;
}
