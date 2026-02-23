export const simpleChase = (bot, target, speed) => {
    const dx = target.x - bot.x;
    const dy = target.y - bot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
        bot.x += (dx / distance) * speed;
        bot.y += (dy / distance) * speed;
        bot.angle = Math.atan2(dy, dx);
    }
};
