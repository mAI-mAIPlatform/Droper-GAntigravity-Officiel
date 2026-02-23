export const simpleChase = (bot, target, speed) => {
    const dx = target.x - bot.x;
    const dy = target.y - bot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Tactical distance: ranged enemies stay back
    const optimalDistance = bot.shootCooldown ? 250 : 0;
    const stopDistance = optimalDistance - 50;

    if (distance > optimalDistance) {
        bot.x += (dx / distance) * speed;
        bot.y += (dy / distance) * speed;
    } else if (distance < stopDistance) {
        // Retreat if too close
        bot.x -= (dx / distance) * speed * 0.5;
        bot.y -= (dy / distance) * speed * 0.5;
    }

    bot.angle = Math.atan2(dy, dx);
};
