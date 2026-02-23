export const checkCircleCollision = (c1, c2) => {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (c1.radius + c2.radius);
};

export const checkCircleRectCollision = (circle, rect) => {
    // Find the closest point to the circle within the rectangle
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    // Calculate the distance between the circle's center and this closest point
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const distanceSquared = dx * dx + dy * dy;

    return distanceSquared < (circle.radius * circle.radius);
};

export const isPointInRect = (px, py, rect) => {
    return px >= rect.x && px <= rect.x + rect.width &&
        py >= rect.y && py <= rect.y + rect.height;
};

