import React from 'react';
import Axios from 'axios';
import './Pokemons.css'

class Pokemons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: props.pokemon.name,
            url: props.pokemon.url,
            pokemon: null,
            Ability: null,
            "Move 1": null,
            "Move 2": null,
            "Move 3": null,
            "Move 4": null,
            Speed: null,
            Special: null,
            Special: null,
            Defense: null,
            Attack: null,
            HP: null
        }


    }
    componentDidMount() {
        this.getInfoOfPokemon(this.state.url)
    }

    getInfoOfPokemon = (url) => {
        Axios.get(url)
            .then((results) => {
                this.setState({ pokemon: results.data })
            })
    }
    getStatsFromPokemon = () => {
        let pokemonStats = this.state.pokemon.stats;

        return pokemonStats.map((value, index) => {
            return (
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-7">{value.stat.name}:</div>
                        <div className="col-lg-5">{this.state.pokemon.stats[index].base_stat}</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        //console.log(this.state.pokemon);
        let currentPokemon = this.state.pokemon;
        if (this.state.pokemon) {
            
            let ability = currentPokemon.abilities.filter(f => !f.is_hidden);

            return (
                <div onClick={this.props.pokemon.battle} className="col-md-4 current-pokemon">
                    <div className="row">
                        <div className="col-lg-12">
                            <img src={currentPokemon.sprites.front_default}></img>
                        </div>
                        <div className="col-lg-7">Name:</div>
                        <div className="col-lg-5">{this.state.Name}</div>
                        <div className="col-lg-7">Ability:</div>
                        <div className="col-lg-5">{ability[0].ability.name}</div>
                        <div className="col-lg-7">Move 1:</div>
                        <div className="col-lg-5">{currentPokemon.moves[0].move.name}</div>
                        <div className="col-lg-7">Move 2:</div>
                        <div className="col-lg-5">{currentPokemon.moves[1].move.name}</div>
                        <div className="col-lg-7">Move 3:</div>
                        <div className="col-lg-5">{currentPokemon.moves[2].move.name}</div>
                        <div className="col-lg-7">Move 4:</div>
                        <div className="col-lg-5">{currentPokemon.moves[3].move.name}</div>
                        {this.getStatsFromPokemon()}
                        {/* <div className="col-lg-6">Speed:</div>
                        <div className="col-lg-6">{currentPokemon.stats[5].base_stat}</div>
                        <div className="col-lg-6">Special Defense:</div>
                        <div className="col-lg-6">{currentPokemon.stats[4].base_stat}</div>
                        <div className="col-lg-6">Special Attack:</div>
                        <div className="col-lg-6">{currentPokemon.stats[3].base_stat}</div>
                        <div className="col-lg-6">Defense:</div>
                        <div className="col-lg-6">{this.state.Name}</div>
                        <div className="col-lg-6">Attack:</div>
                        <div className="col-lg-6">{this.state.Name}</div>
                        <div className="col-lg-6">HP:</div>
                        <div className="col-lg-6">{currentPokemon.stats[5].base_stat}</div> */}
                    </div>

                </div>
            )
        } else {
            return(null)
        }
    }
}
export default Pokemons