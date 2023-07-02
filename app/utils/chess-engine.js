"use strict";
var Chess = {
  board: {
    "a": [8, 0, false, false, false, false, 16, 24],
    "b": [10, 1, false, false, false, false, 17, 26],
    "c": [12, 2, false, false, false, false, 18, 28],
    "d": [15, 3, false, false, false, false, 19, 31],
    "e": [14, 4, false, false, false, false, 20, 30],
    "f": [13, 5, false, false, false, false, 21, 29],
    "g": [11, 6, false, false, false, false, 22, 27],
    "h": [9, 7, false, false, false, false, 23, 25]
  },
  pieces: [
    { "index":0, "type": "pawn", "color": "black" },
    { "index":2, "type": "pawn", "color": "black" },
    { "index":3, "type": "pawn", "color": "black" },
    { "index":4, "type": "pawn", "color": "black" },
    { "index":5, "type": "pawn", "color": "black" },
    { "index":6, "type": "pawn", "color": "black" },
    { "index":7, "type": "pawn", "color": "black" },
    { "index":8, "type": "pawn", "color": "black" },
    { "index":9, "type": "rook", "color": "black" },
    { "index":10, "type": "rook", "color": "black" },
    { "index":11, "type": "knight", "color": "black" },
    { "index":12, "type": "knight", "color": "black" },
    { "index":13, "type": "bishop", "color": "black" },
    { "index":14, "type": "bishop", "color": "black" },
    { "index":15, "type": "king", "color": "black" },
    { "index":16, "type": "queen", "color": "black" },
    { "index":17, "type": "pawn", "color": "white" },
    { "index":18, "type": "pawn", "color": "white" },
    { "index":19, "type": "pawn", "color": "white" },
    { "index":20, "type": "pawn", "color": "white" },
    { "index":21, "type": "pawn", "color": "white" },
    { "index":22, "type": "pawn", "color": "white" },
    { "index":23, "type": "pawn", "color": "white" },
    { "index":24, "type": "pawn", "color": "white" },
    { "index":25, "type": "rook", "color": "white" },
    { "index":26, "type": "rook", "color": "white" },
    { "index":27, "type": "knight", "color": "white" },
    { "index":28, "type": "knight", "color": "white" },
    { "index":29, "type": "bishop", "color": "white" },
    { "index":30, "type": "bishop", "color": "white" },
    { "index":31, "type": "king", "color": "white" },
    { "index":32, "type": "queen", "color": "white" },
    { "index":33, "type": "queen", "color": "black" }
  ],
  rules: {
    "pawn": {
      "directions": ["forward"],
      "ratio": [0],
      "max": 1,
      "special": ["checkUnused", "farmerHits"]
    },
    "rook": {
      "directions": ["forward", "backward", "left", "right"],
      "ratio": [0],
      "max": false,
      "special": ["checkCastling"]
    },
    "knight": {
      "directions": ["forward", "backward", "left", "right"],
      "ratio": [0.5, 2],
      "max": 2,
      "jump": true
    },
    "bishop": {
      "directions": ["forward", "backward", "left", "right"],
      "ratio": [1],
      "max": false
    },
    "king": {
      "directions": ["forward", "backward", "left", "right"],
      "ratio": [0, 1],
      "max": 1,
      "special": ["checkCastling"]
    },
    "queen": {
      "directions": ["forward", "backward", "left", "right"],
      "ratio": [0, 1],
      "max": false
    }
  },
  Game: function() {
    var gameInstance = this
    this.board = Chess.board
    this.pieces = Chess.pieces
    this.pieces.forEach(function(piece) {
      piece.moves = piece.moves != undefined ? piece.moves : 0
    });
    this.rules = Chess.rules
    this.specialRules = {
      checkUnused: function(move, way, valid) {
        var fromField = getPiece(move.from)
        if (fromField.moves <= 0 && way.length - 1 <= 2 && valid.ratio.ratio === 0) {
          return {
            max: true
          }
        }
      },
      checkCastling: function(move, way, valid) {

      },
      farmerHits: function(move, way, valid) {
        var fromField = getPiece(move.from)
        var toField = getPiece(move.to)
        var diff = getDiff(fromField, move.to)
        if (toField.color) {
          if (toField.color != fromField.color) {
            if (valid.ratio.ratio == 0) {
              return {
                ratio: { allowed: false, ratio: 0 }
              }
            }
            else if (valid.ratio.ratio == 1 && ((fromField.color == "black" && diff[1] >= 0) || (fromField.color == "white" && diff[1] < 0))) {
              return {
                ratio: { allowed: true, ratio: 1 },
                direction: { allowed: true, direction: "forward"}
              }
            }
          }
        }
      }
    }
    /*this.print = function() {
      return exportMethods.print(gameInstance, "console");
    };
    this.exportSVG = function() {
      return exportMethods.exportSVG(gameInstance);
    }*/
    function getPiece(field) {
      var row = field.substring(0, 1).toLowerCase()
      var line = parseInt(field.substring(1))
      try {
        var pieceId = gameInstance.board[row][gameInstance.board[row].length - line]
      } catch (e) {
        return "invalid"
      }
      if (pieceId == undefined) return "invalid"
      var piece = pieceId === false ? "empty" : ({
        type: gameInstance.pieces[pieceId].type,
        color: gameInstance.pieces[pieceId].color,
        moves: gameInstance.pieces[pieceId].moves,
        id: pieceId,
        row: row,
        line: line,
        coords: getCoords(row, line)
      })
      return piece
    }
    function setField(field, pieceId) {
      var row = field.substring(0, 1).toLowerCase()
      var line = parseInt(field.substring(1))
      gameInstance.board[row][gameInstance.board[row].length - line] = pieceId
    }
    this.move = function(move) {
      move.rules = move.rules == undefined ? true : move.rules
      move.test = move.test == undefined ? false : move.test
      var from = getPiece(move.from)
      var to = getPiece(move.to)
      if (from === "empty" || from === "invalid" || to === "invalid") return (to === "invalid" ? to : from).firstCharToUpperCase() + " field!";
      var result = {
        success: true,
        hit: false
      }
      var rulesValidation = rulesValid(move)
      var errors = []
      var valid = rulesValidation.way.validation;
      (function() {
        if (valid.obstacles > 0) errors.push("Way is blocked")
        if (valid.direction.allowed != true) errors.push("Direction is not allowed")
        if (valid.ratio.allowed != true) errors.push("Not allowed to move so")
        if (valid.max != true) errors.push("Too many fields")
        if (valid.target != true) errors.push("Target is blocked")
      })()
      if (move.rules === true) {
        result.success = rulesValidation.success
        if (result.success === true) setMove()
        else result.error = errors
      }
      else setMove()
      function setMove() {
        if (to != "empty") result.hit = to
        result.move = rulesValidation.way
        result.move.validation.direction = result.move.validation.direction.direction
        result.move.validation.ratio = result.move.validation.ratio.ratio
        if (move.test == false) {
          setField(move.to, from.id)
          setField(move.from, false)
          gameInstance.pieces[from.id].moves++
        }
        result.move.from = move.from
        result.move.to = move.to
        result.move.targets = getTargets(move.to)
        result.move.attacks = getAttacks(move.to)
      }
      return result
    }
    this.getTargets = function(field) {
      return getTargets(field)
    }
    this.getAttacks = function(field) {
      return getAttacks(field)
    }
    function getCoords(row, line) {
      if (!line) {
        var field = row
        row = field.substring(0, 1).toLowerCase()
        line = parseInt(field.substring(1))
      }
      var x = Object.keys(gameInstance.board).indexOf(row)
      var y = gameInstance.board[row].length - line
      return [x, y]
    }
    function getDiff(from, to) {
      var row = to.substring(0, 1).toLowerCase()
      var line = parseInt(to.substring(1))
      var pieceCoords = from.coords
      var targetCoords = getCoords(row, line)
      var diff = [targetCoords[0] - pieceCoords[0], targetCoords[1] - pieceCoords[1]]
      return diff
    }
    function checkDirection(from, to, rules) {
      var directions = rules.directions
      var diff = getDiff(from, to)
      var absDiff = diff[0] + diff[1]
      var direction = Math.abs(diff[0]) >= Math.abs(diff[1]) ? (diff[0] >= 0 ? "right" : "left") : (diff[1] >= 0 ? (from.color == "black" ? "forward" : "backward") : (from.color == "black" ? "backward" : "forward"))
      var result = {
        allowed: false,
        direction: direction
      }
      if (rules.directions.indexOf(direction) > -1) result.allowed = true
      return result
    }
    function checkRatio(from, to, rules) {
      var diff = getDiff(from, to)
      var result = {
        allowed : false,
        ratio: Math.abs(diff[0] / diff[1]) == Infinity ? 0 : Math.abs(diff[0] / diff[1])
      }
      if (rules.ratio.indexOf(result.ratio) > -1) result.allowed = true
      return result
    }
    function getWay(from, to) {
      var fromField = getPiece(from)
      var diff = getDiff(fromField, to)
      var ratio = [Math.abs(diff[1]) / Math.abs(diff[0]), Math.abs(diff[0]) / Math.abs(diff[1])]
      if (Math.abs(diff[0]) >= Math.abs(diff[1])) {
        var steps = [diff[0] >= 0 ? 1 : -1, diff[1] >= 0 ? ratio[0] : -ratio[0]]
      }
      else {
        var steps = [diff[0] >= 0 ? ratio[1] : -ratio[1], diff[1] >= 0 ? 1 : -1]
      }
      var coords = fromField.coords
      var targetCoords = getCoords(to)
      var way = []
      var finished = false
      while (finished == false && true) {
        if ((Math.round(coords[0] * 10000) / 10000) == targetCoords[0] && (Math.round(coords[1] * 10000) / 10000) == targetCoords[1]) finished = true
        way.push([Math.round(coords[0]), Math.round(coords[1])])
        coords[0] += steps[0]
        coords[1] += steps[1]
      }
      return {
        way: way,
        step: steps
      }
    }
    function rulesValid(move) {
      var way = getWay(move.from, move.to)
      var fromField = getPiece(move.from)
      var rules = gameInstance.rules[fromField.type]
      var isValid = {
        obstacles: getObstacles(way, move, rules),
        direction: checkDirection(fromField, move.to, rules),
        ratio: checkRatio(fromField, move.to, rules),
        max: (rules.max >= (way.way.length - 1) ? true : (rules.max != false ? false : true)),
        target: getPiece(move.to).color === fromField.color ? false : true
      }
      if (rules.special) {
        rules.special.forEach(function(special) {
          var specialResult = gameInstance.specialRules[special](move, way.way, isValid)
          if (specialResult) {
            Object.keys(specialResult).forEach(function(keyName) {
              isValid[keyName] = specialResult[keyName];
            });
          }
        });
      }
      way.validation = isValid
      return {
        success: (isValid.obstacles == 0 && isValid.direction.allowed === true && isValid.ratio.allowed === true && isValid.max === true && isValid.target === true) ? true : false,
        way: way
      }
    }
    function getObstacles(way, move, rules) {
      var obstacles = 0
      for (var i = 0; i < way.way.length; i++) {
        var coords = way.way[i]
        if (i > 0 && i < way.way.length - 1) obstacles += getPiece(Object.keys(gameInstance.board)[coords[0]] + (gameInstance.board[Object.keys(gameInstance.board)[coords[0]]].length - coords[1])) === "empty" ? 0 : (rules.jump != true ? 1 : 0)
      }
      return obstacles
    }
    function inChess(move) {
      var targets = getTargets(move.to)
      return true
    }
    function getFieldRelation(fieldName, relation) {
      var field = getPiece(fieldName)
      if (field === "empty") {
        field = {
          row: fieldName.substring(0, 1).toLowerCase(),
          line: parseInt(fieldName.substring(1))
        }
      }
      var targets = []
      var rows = Object.keys(gameInstance.board)
      for (var i = 0; i < rows.length; i++) {
        for (var a = 0; a < gameInstance.board[rows[i]].length; a++) {
          var target = [rows[i], a + 1]
          var move = {
            from: (relation == "targets" ? (field.row + field.line) : (target[0] + target[1])),
            to: (relation == "targets" ? (target[0] + target[1]) : (field.row + field.line)),
            rules: true,
            test: true
          }
          if (getPiece(move.from) !== "empty") {
            var valid = rulesValid(move)
            if (valid.success) {
              var result = {
                field: target,
                coords: [i, gameInstance.board[rows[i]].length - target[1]],
                hit: getPiece(move.to)
              }
              if (relation === "attacks") {
                delete result.hit
                result.attacker = getPiece(move.from);
              }
              targets.push(result)
            }
          }
        }
      }
      return targets
    }
    function getTargets(field) {
      return getFieldRelation(field, "targets")
    }
    function getAttacks(field) {
      return getFieldRelation(field, "attacks")
    }
  }
}
String.prototype.firstCharToUpperCase = function() {
  return this.charAt(0).toUpperCase() + this.substring(1)
}
module.exports = {Chess};
