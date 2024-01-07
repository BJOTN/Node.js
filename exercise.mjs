function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}
const players = ['Joe', 'Caroline', 'Sabrina'];


async function luckyDrawPlayers(players) {
    try {
      const draw = players.map((player)=> luckyDraw(player))
      const result = await Promise.all(draw)
      result.forEach((result) => {
        console.log(result);
      });
    } catch (error) {
      console.error(error)
    }
  }

  luckyDrawPlayers(players)