pragma solidity >=0.4.22 <0.9.0;

contract Chess {
    uint256 public gameID;
    address public owner;

    struct Game {
        address player1;
        address player2;
        address payable winner;
        uint256 amountBet;
        bool finished;
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

    function newGame() public payable {
        require(msg.value > 0, "Invalid Bet Amount");
        GameInfo[gameID].player1 = msg.sender;
        GameInfo[gameID].amountBet = msg.value;
        GameInfo[gameID].finished = false;
        uint256 game = gameID;
        GamesPlayed[msg.sender].push(game);
        gameID++;
    }

    function getGameID(address player) public view returns (uint256) {
        return GamesPlayed[player][GamesPlayed[player].length - 1];
    }

    function getStake(uint256 game) public view returns (uint256) {
        return GameInfo[game].amountBet;
    }

    function joinGame(uint256 game) public payable {
        require(GameInfo[game].amountBet != 0, "Game does not exist");
        GamesPlayed[msg.sender].push(game);
        GameInfo[game].player2 = msg.sender;
    }

    function declareWinner(uint256 game, address winner) public {
        require(!GameInfo[game].finished);
        require(GameInfo[game].amountBet != 0, "Game does not exist");
        require(GameInfo[game].winner == address(0));
        require(msg.sender == owner);
        require(
            winner == GameInfo[game].player1 ||
                winner == GameInfo[game].player2,
            "Winner not Valid"
        );
        GameInfo[game].winner = payable(winner);
        GameInfo[game].winner.transfer(2 * (GameInfo[game].amountBet));
        GameInfo[game].finished = true;
    }

    function getGames(address user) public view returns (uint256[] memory) {
        uint256[] memory games = GamesPlayed[user];
        return games;
    }

    function getLatestGameId() public view returns (uint256) {
        return gameID;
    }

    function getGame(uint256 game) public view returns (Game memory) {
        Game memory requestedGame;
        requestedGame = GameInfo[game];
        return requestedGame;
    }

    function getBet(uint256 game) public view returns (Bet memory) {
        Bet memory requestedGame;
        requestedGame = BetInfo[game];
        return requestedGame;
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
        //require(checkPlayer(msg.sender, game), "Bet already Made");
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

    function settleBet(uint256 game, address winner) public payable {
        uint256 transfer;
        uint256 winAmount;
        uint256 loseAmount;
        uint256 winnerCount = 0;
        for (uint256 i = 0; i < BetInfo[game].betters.length; i++) {
            if (BetInfo[game].betters[i].betSide == winner) {
                winnerCount++;
            }
        }
        Better[] memory winners = new Better[](winnerCount);
        uint256 count = 0;
        for (uint256 i = 0; i < BetInfo[game].betters.length; i++) {
            if (BetInfo[game].betters[i].betSide == winner) {
                winners[count] = BetInfo[game].betters[i];
                count++;
            }
        }
        if (winner == GameInfo[game].player1) {
            winAmount = BetInfo[game].amountPlayer1;
            loseAmount = BetInfo[game].amountPlayer2;
        } else {
            winAmount = BetInfo[game].amountPlayer2;
            loseAmount = BetInfo[game].amountPlayer1;
        }
        uint256 totalAmount = winAmount + loseAmount;
        for (uint256 j = 0; j < count; j++) {
            if (winners[j].betterAddress != address(0)) {
                transfer = winners[j].amountBet;
                winners[j].betterAddress.transfer(
                    (totalAmount / winAmount) * transfer
                );
            }
        }
    }
}
