import React, { useEffect, useState } from 'react'
import './Battle.scss'

export default function Battle() {
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [score, setScore] = useState({
    player1: 0,
    player2: 0
  });

  function getRandomNumber() {
    return Math.floor(Math.random() * 151);
  }

  function getRandomPokemon1() {
    fetch('https://pokeapi.co/api/v2/pokemon/' + getRandomNumber())
      .then(res => res.json())
      .then(data => setPlayer1(data))
  }

  function getRandomPokemon2() {
    fetch('https://pokeapi.co/api/v2/pokemon/' + getRandomNumber())
      .then(res => res.json())
      .then(data => setPlayer2(data))
  }

  const startBattle = () => {
    if (Object.keys(player1).length === 0 || Object.keys(player2).length === 0) {
      getRandomPokemon1();
      getRandomPokemon2();
    }
    let player1Stats = {
      name: player1.name,
      hp: player1?.stats?.[0]?.base_stat,
      attack: player1?.stats?.[1]?.base_stat,
      speed: player1?.stats?.[5]?.base_stat,
    }

    let player2Stats = {
      name: player2.name,
      hp: player2?.stats?.[0]?.base_stat,
      attack: player2?.stats?.[1]?.base_stat,
      speed: player2?.stats?.[5]?.base_stat,
    }

    let attacker = player1Stats.speed > player2Stats.speed ? player1Stats : player2Stats;
    let defender = attacker === player1Stats ? player2Stats : player1Stats;

    while (player1Stats.hp > 0 && player2Stats.hp > 0) {
      //attack
      defender.hp -= attacker.attack;
      //check if dead
      if (defender.hp <= 0) {
        defender.hp = 0;
        if (defender.name === player1Stats.name) {
          setScore({ player2: score.player2 + 1, player1: 0 });
          getRandomPokemon1();
        } else {
          setScore({ player1: score.player1 + 1, player2: 0 });
          getRandomPokemon2();
        }
      }
      //switch attacker and defender
      let temp = attacker;
      attacker = defender;
      defender = temp;
    }
  }

  return (
    <div className='battle__container'>
      <div className='battle__player'>
        <h2 className='battle__player-name'>Player 1</h2>
        <p className='battle__pokemon-name'>{player1?.name?.toUpperCase()}</p>
        <img
          className='battle__pokemon-image'
          src={player1?.sprites?.other?.['official-artwork']?.front_default}
        />
        <div className='battle__pokemon-stats'>
          <div className='battle__pokemon-stat'>
            <p>HP</p>
            <p>{player1?.stats?.[0]?.base_stat}</p>
          </div>
          <div className='battle__pokemon-stat'>
            <p>Attack</p>
            <p>{player1?.stats?.[1]?.base_stat}</p>
          </div>
          <div className='battle__pokemon-stat'>
            <p>Speed</p>
            <p>{player1?.stats?.[5]?.base_stat}</p>
          </div>
        </div>
      </div>
      <div className='battle__center'>
        <button className='battle__button' onClick={startBattle}>
          BATTLE
        </button>
        <div className='battle__score'>
          <p>Score</p>
          <p>{score.player1} - {score.player2}</p>
        </div>
      </div>
      <div className='battle__player'>
        <h2 className='battle__player-name'>Player 2</h2>
        <p className='battle__pokemon-name'>{player2?.name?.toUpperCase()}</p>
        <img
          className='battle__pokemon-image'
          src={player2?.sprites?.other?.['official-artwork']?.front_default}
        />
        <div className='battle__pokemon-stats'>
          <div className='battle__pokemon-stat'>
            <p>HP</p>
            <p>{player2?.stats?.[0]?.base_stat}</p>
          </div>
          <div className='battle__pokemon-stat'>
            <p>Attack</p>
            <p>{player2?.stats?.[1]?.base_stat}</p>
          </div>
          <div className='battle__pokemon-stat'>
            <p>Speed</p>
            <p>{player2?.stats?.[5]?.base_stat}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
