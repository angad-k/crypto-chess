pragma solidity >=0.4.22 <0.9.0;

contract Chess {
  uint256 public gameID;
  address public owner;

  struct Game {
    address player1;
    address player2;
    address payable winner;
    uint256 amountBet;
  }

  struct Better {
    uint256 amountBet;
    address payable betterAddress;
    address betSide;
  }

  struct Bet {
    uint256 amountPlayer1;
    uint256 amountPlayer2;
    Better[] betters;
  }

  mapping(uint256 => Game) public GameInfo;
  mapping(address => uint256[]) public GamesPlayed;
  mapping(uint256 => Bet) public BetInfo;

  constructor() {
    owner = msg.sender;
    gameID = 1568;
  }

  function newGame() public payable{
    require(msg.value > 0, "Invalid Bet Amount");
    GameInfo[gameID].player1 = msg.sender;
    GameInfo[gameID].amountBet = msg.value;
    uint256 game = gameID;
    GamesPlayed[msg.sender].push(game);
    gameID++;
  }

  function getGameID(address player) public view returns(uint256){
    return GamesPlayed[player][GamesPlayed[player].length-1];
  }

  function joinGame(uint256 game) public payable {
    require(GameInfo[game].amountBet != 0, "Game does not exist");
    GamesPlayed[msg.sender].push(game);
    GameInfo[game].player2 = msg.sender;
  }

  function declareWinner(uint256 game, address winner) public {
    require(GameInfo[game].amountBet != 0, "Game does not exist");
    require(GameInfo[game].winner == address(0));
    require(
      winner == GameInfo[game].player1 || winner == GameInfo[game].player2,
      "Winner not Valid"
    );
    GameInfo[game].winner = payable(winner);
    GameInfo[game].winner.transfer(2 * (GameInfo[game].amountBet));
    settleBet(game);
  }

  function getGames(address user) public view returns (Game[] memory) {
    Game[] memory Games;
    for (uint256 i = 0; i < GamesPlayed[user].length; i++) {
      Games[i] = (GameInfo[GamesPlayed[user][i]]);
    }
    return Games;
  }

  function checkPlayer(address player, uint256 game)
    private
    view
    returns (bool)
  {
    for (uint256 i = 0; i < BetInfo[game].betters.length; i++) {
      if (BetInfo[game].betters[i].betterAddress == player) return false;
    }
    return true;
  }

  function bet(address side, uint256 game) public payable {
    require(GameInfo[game].amountBet != 0, "Game does not exists");
    require(
      side == GameInfo[game].player1 || side == GameInfo[game].player2,
      "Invalid Bet"
    );
    require(checkPlayer(msg.sender, game), "Bet already Made");
    if (side == GameInfo[game].player1) {
      BetInfo[game].amountPlayer1 += msg.value;
    } else {
      BetInfo[game].amountPlayer2 += msg.value;
    }
    Better memory user;
    user.amountBet = msg.value;
    user.betterAddress = payable(msg.sender);
    user.betSide = side;

    BetInfo[game].betters.push(user);
  }

  function settleBet(uint256 game) private {
    uint256 transfer;
    uint256 winAmount;
    uint256 loseAmount;
    Better[] memory winners;
    uint256 count = 0;
    address winnerSide = GameInfo[game].winner;
    for (uint256 i = 0; i < BetInfo[game].betters.length; i++) {
      if (BetInfo[game].betters[i].betSide == winnerSide) {
        winners[count] = BetInfo[game].betters[i];
        count++;
      }
    }
    if (winnerSide == GameInfo[game].player1) {
      winAmount = BetInfo[game].amountPlayer1;
      loseAmount = BetInfo[game].amountPlayer2;
    }
    for (uint256 j = 0; j < count; j++) {
      if (winners[j].betterAddress != address(0))
        transfer = winners[j].amountBet;
      winners[j].betterAddress.transfer(
        (transfer * (10000 + ((loseAmount * 10000) / winAmount))) / 10000
      );
    }
  }
}
