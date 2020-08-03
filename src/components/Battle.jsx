import React from 'react';
import './Battle.css'


class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBattle: props.battle.isBattle,
            homePokemon: props.battle.homePokemon,
            awayPokemon: props.battle.awayPokemon,
            initialHpHomePokemon: props.battle.homePokemon.properties.stats[0].base_stat,
            initialHpAwayPokemon: props.battle.awayPokemon.properties.stats[0].base_stat,
            firstAttackPokemon: {},
            secondAttackPokeon: {},
            resultOfTheBattle: "Win",
            backgroundColorOfTryAgain: 'red',
            battleIsFinish: false,
            opacityWinner: 0
        }
    }
    componentDidMount() {
        this.calculateFirstAttack();
    }

    calculateFirstAttack = () => {
        let homePokemonSpeed = this.state.homePokemon.properties.stats[5].base_stat;
        let awayPokemonSpeed = this.state.awayPokemon.properties.stats[5].base_stat;
        if (homePokemonSpeed > awayPokemonSpeed) {
            this.setState({ firstAttackPokemon: this.state.homePokemon, secondAttackPokeon: this.state.awayPokemon })
        } else {
            this.setState({ firstAttackPokemon: this.state.awayPokemon, secondAttackPokeon: this.state.homePokemon })
        }
    }

    startBattle = (firstOpponent, secondOpponent) => {
        let attackOfFirstOpponent = firstOpponent.properties.stats[1].base_stat;
        let defenseOfSecondOpponent = secondOpponent.properties.stats[2].base_stat;
        let randomNumber = Math.floor(Math.random() * 200);
        let resultAfterAttack = (attackOfFirstOpponent / defenseOfSecondOpponent) * randomNumber;
        let primaryOpponent = {};

        if (this.state.secondAttackPokeon == this.state.homePokemon) {
            primaryOpponent = this.state.homePokemon;
            let hpAfterAttack = Math.floor(this.state.homePokemon.properties.stats[0].base_stat - resultAfterAttack);

            hpAfterAttack = hpAfterAttack < 0 ? 0 : hpAfterAttack;
            let currentPokemon = this.state.homePokemon;
            currentPokemon.properties.stats[0].base_stat = hpAfterAttack;
            this.setState({ homePokemon: currentPokemon });
            let a = document.getElementById(this.state.awayPokemon.properties.id);
            let b = document.getElementById(this.state.homePokemon.properties.id);
            let opacity = 1;
            let tiemout = 1500;
            let interval2 = setInterval(() => {
                if (opacity <= 0.5) {
                    opacity += 0.1;
                } else {
                    opacity -= 0.1;
                }

                b.style.opacity = opacity;
                tiemout -= 100;
                if (tiemout <= 0) {
                    clearInterval(interval2)
                    b.style.opacity = 1;
                }
            }, 100)
            let margin = 0;
            let interval = setInterval(() => {
                margin += 1;
                let marginString = `${margin}%`
                a.style.marginRight = marginString;
                if (margin >= 50) {
                    clearInterval(interval);
                    a.style.marginRight = 0;
                }
            }, 50)
            if (hpAfterAttack > 0) {

                setTimeout(() => {
                    this.ContinuingBattle(primaryOpponent, firstOpponent, secondOpponent)
                }, 2500)
            } else {
                this.setState({ resultOfTheBattle: "You Lose", backgroundColorOfTryAgain: "green", battleIsFinish: true, opacityWinner: 1 })
            }
        } else {
            primaryOpponent = this.state.awayPokemon;
            let hpAfterAttack = Math.floor(this.state.awayPokemon.properties.stats[0].base_stat - resultAfterAttack);
            hpAfterAttack = hpAfterAttack < 0 ? 0 : hpAfterAttack;
            let currentPokemon = this.state.awayPokemon;
            currentPokemon.properties.stats[0].base_stat = hpAfterAttack;
            this.setState({ awayPokemon: currentPokemon });
            let a = document.getElementById(this.state.homePokemon.properties.id);
            let b = document.getElementById(this.state.awayPokemon.properties.id);
            let opacity = 1;
            let tiemout = 1500;
            let interval2 = setInterval(() => {
                if (opacity <= 0.5) {
                    opacity += 0.1;
                } else {
                    opacity -= 0.1;
                }

                b.style.opacity = opacity;
                tiemout -= 100;
                if (tiemout <= 0) {
                    clearInterval(interval2)
                    b.style.opacity = 1;
                }
            }, 100)
            let margin = 0;
            let interval = setInterval(() => {
                margin += 1;
                let marginString = `${margin}%`
                a.style.marginLeft = marginString;
                if (margin >= 50) {
                    clearInterval(interval);
                    a.style.marginLeft = 0;
                }
            }, 50)
            if (hpAfterAttack > 0) {

                setTimeout(() => {
                    this.ContinuingBattle(primaryOpponent, secondOpponent, firstOpponent)
                }, 2500)
            } else {
                this.setState({ resultOfTheBattle: "You Win", backgroundColorOfTryAgain: "green", battleIsFinish: true, opacityWinner: 1 })
            }

        }
    }
    ContinuingBattle = (primaryOpponent, firstOpponent, secondOpponent) => {
        console.log(primaryOpponent, firstOpponent, secondOpponent)
        let attackOfFirstOpponent = firstOpponent.properties.stats[1].base_stat;
        let defenseOfSecondOpponent = secondOpponent.properties.stats[2].base_stat;
        let randomNumber = Math.floor(Math.random() * 200);

        let resultAfterAttack = (attackOfFirstOpponent / defenseOfSecondOpponent) * randomNumber;

        if (primaryOpponent == firstOpponent) {
            console.log(`insde if`)
            primaryOpponent = secondOpponent
            let hpAfterAttack = Math.floor(this.state.homePokemon.properties.stats[0].base_stat - resultAfterAttack);

            hpAfterAttack = hpAfterAttack < 0 ? 0 : hpAfterAttack;
            let currentPokemon = this.state.homePokemon;
            currentPokemon.properties.stats[0].base_stat = hpAfterAttack;
            this.setState({ homePokemon: currentPokemon });
            let a = document.getElementById(this.state.awayPokemon.properties.id);
            let b = document.getElementById(this.state.homePokemon.properties.id);
            let opacity = 1;
            let tiemout = 1500;
            let interval2 = setInterval(() => {
                if (opacity <= 0.5) {
                    opacity += 0.1;
                } else {
                    opacity -= 0.1;
                }

                b.style.opacity = opacity;
                tiemout -= 100;
                if (tiemout <= 0) {
                    clearInterval(interval2)
                    b.style.opacity = 1;
                }
            }, 100)
            let margin = 0;
            let interval = setInterval(() => {
                margin += 1;
                let marginString = `${margin}%`
                a.style.marginRight = marginString;
                if (margin >= 50) {
                    clearInterval(interval);
                    a.style.marginRight = 0;
                }
            }, 50)
            if (hpAfterAttack > 0) {


                setTimeout(() => {
                    this.ContinuingBattle(primaryOpponent, firstOpponent, secondOpponent)
                }, 2500)
            } else {
                this.setState({ resultOfTheBattle: "You Lose", backgroundColorOfTryAgain: "green", battleIsFinish: true, opacityWinner: 1 })

            }
        } else {
            console.log(`insde else`)
            primaryOpponent = secondOpponent
            let hpAfterAttack = Math.floor(this.state.awayPokemon.properties.stats[0].base_stat - resultAfterAttack);
            hpAfterAttack = hpAfterAttack < 0 ? 0 : hpAfterAttack;
            let currentPokemon = this.state.awayPokemon;
            currentPokemon.properties.stats[0].base_stat = hpAfterAttack;
            this.setState({ awayPokemon: currentPokemon });
            let a = document.getElementById(this.state.homePokemon.properties.id);
            let b = document.getElementById(this.state.awayPokemon.properties.id);
            let opacity = 1;
            let tiemout = 1500;
            let interval2 = setInterval(() => {
                if (opacity <= 0.5) {
                    opacity += 0.1;
                } else {
                    opacity -= 0.1;
                }

                b.style.opacity = opacity;
                tiemout -= 100;
                if (tiemout <= 0) {
                    clearInterval(interval2)
                    b.style.opacity = 1;
                }
            }, 100)
            let margin = 0;
            let interval = setInterval(() => {
                margin += 1;
                let marginString = `${margin}%`
                a.style.marginLeft = marginString;
                if (margin >= 50) {
                    clearInterval(interval);
                    a.style.marginLeft = 0;
                }
            }, 50)
            if (hpAfterAttack > 0) {

                setTimeout(() => {
                    this.ContinuingBattle(primaryOpponent, secondOpponent, firstOpponent)
                }, 2500)
            } else {
                this.setState({ resultOfTheBattle: "You Win", backgroundColorOfTryAgain: "green", battleIsFinish: true, opacityWinner: 1 })
            }
        }
    }
    setHpBarColor = (initialHp, afterHp) => {
        if ((initialHp / 2) < afterHp) {
            return "green"
        } else if ((initialHp / 10) > afterHp) {
            return "red"
        } else {
            return "yellow"
        }
    }

    render() {

        if (this.state.homePokemon) {

            return (
                <div className="battle-container">
                    <div className="logoBattle"></div>
                    <div className="row">
                        <div className="col-lg-3 offset-lg-2 home-pokemon">
                            <div className="nameBar"><h2>{this.state.homePokemon.name}</h2></div>
                            <div style={{ backgroundColor: this.setHpBarColor(this.state.initialHpHomePokemon, this.state.homePokemon.properties.stats[0].base_stat) }} className="hp-bar">{this.state.homePokemon.properties.stats[0].base_stat}</div>
                            <img id={this.state.homePokemon.properties.id} src={this.state.homePokemon.properties.sprites.back_default}></img>
                        </div>

                        <div className="col-lg-3 offset-lg-1 away-pokemon">
                            <div className="nameBar"><h2>{this.state.awayPokemon.name}</h2></div>
                            <div style={{ backgroundColor: this.setHpBarColor(this.state.initialHpAwayPokemon, this.state.awayPokemon.properties.stats[0].base_stat) }} className="hp-bar">{this.state.awayPokemon.properties.stats[0].base_stat}</div>
                            <img id={this.state.awayPokemon.properties.id} src={this.state.awayPokemon.properties.sprites.front_default}></img>
                        </div>
                    </div>
                    {!this.state.battleIsFinish ?
                        <div className="row">
                            <div className="col-lg-4 offset-lg-4 start">
                                <div onClick={() => { this.startBattle(this.state.firstAttackPokemon, this.state.secondAttackPokeon) }}><h2>Start Battle</h2></div>
                            </div>
                        </div> : <div className="row">
                            <div style={{ cursor: "none" }} className="col-lg-4 offset-lg-4 start">
                                <div><h2>Start Battle</h2></div>
                            </div>
                        </div>}
                    <div className="row">
                        <div style={{ opacity: this.state.opacityWinner }} className="col-lg-12">
                            <h1>{this.state.resultOfTheBattle}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div onClick={this.props.battle.handleBattle} className="col-lg-2 offset-lg-5 try-again" style={{ backgroundColor: this.state.backgroundColorOfTryAgain }}>
                            <h4>Try Again</h4>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Loading...</h1>

                </div>
            )
        }
    }
}

export default Battle