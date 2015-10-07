$(function() {
  var game;

  $("#newGame").bind("click", function() {
    if (game) {
      game.destroy();
    }
    game = new Game({ shotsPerIteration: $("#shotsPerIteration").val() });
    new GameView({model: game}).render();
  });

  $("#newDeterministicGame").bind("click", function() {
    if (game) {
      game.destroy();
    }
    game = new Game({ shotsPerIteration: 40 });
    new GameView({model: game}).render();
  });

  $("#newAdaptativeGame").bind("click", function() {
    if (game) {
      game.destroy();
    }
    game = new Game({ shotsPerIteration: 1 });
    new GameView({model: game}).render();
  });
});