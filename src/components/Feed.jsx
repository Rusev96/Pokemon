import React from 'react';
import Pokemon from './Pokemons';
import Axios from 'axios';
import JSONPokemons from './pokemonsJson.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Battle from './Battle';

class Feed extends React.Component {
    constructor() {
        super();

        this.state = {
            isBattle: false,
            currentPokemon: {
                name: null,
                properties: {}
            },
            randomPokemon: {
                name: null,
                properties: {}
            },
            allPokemons: null
        }
    }
    componentDidMount() {
        this.showPokemons()
    }

    handleBattle = () => {
        this.setState({ isBattle: !this.state.isBattle })
    }

    battle = async (name, url) => {
        let homePokemon = await this.getInfoOfPokemon(name, url)
        this.setState({ currentPokemon: homePokemon})
        let getRandomPokemon = this.getRandomPokemon();
        let getInforandomPokemon = await this.getInfoOfPokemon(getRandomPokemon.name, getRandomPokemon.url);
        this.setState({randomPokemon: getInforandomPokemon })
        this.handleBattle();
    }

    getRandomPokemon = () => {
        let pokemons = JSONPokemons.results;
        let currentPokemon = this.state.currentPokemon
        let pokemons2 = pokemons.filter(function(item){
            return item.name != currentPokemon.name
        });
        
        // pokemons.splice(pokemons.indexOf(indexOfPokemon),1)
        console.log(pokemons2)
        let randomPokemon = pokemons2[Math.floor(Math.random() * pokemons2.length)];
        return randomPokemon

        
    }

    getInfoOfPokemon = async (name, url) => {
        let currentPokemon = {};
        await Axios.get(url)
            .then((results) => {
                currentPokemon = {
                    name: name,
                    properties: results.data
                }

            })
        return currentPokemon;
    }

    showPokemons = () => {
        let allPokemons = JSONPokemons.results;
        this.setState({
            allPokemons: allPokemons.map((value, index) => {
                return (<Pokemon pokemon={{ name: JSONPokemons.results[index].name, url: JSONPokemons.results[index].url, battle: () => { this.battle(JSONPokemons.results[index].name, JSONPokemons.results[index].url) } }}></Pokemon>)
            })
        })
    }

    render() {

        if (!this.state.isBattle) {
            if (this.state.allPokemons) {
                return (
                    <div className="container">
                        <div className="col-lg-12 logo"></div>
                        <div className="row">
                            {this.state.allPokemons}
                            {/* <Pokemon pokemon={{ name: JSONPokemons.results[0].name, url:JSONPokemons.results[0].url }}></Pokemon> */}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <h1>Loading...</h1>
                    </div>
                );

            }
        } else {
            return (
                <div className="general-battle-container">
                    <Battle battle={{ homePokemon: this.state.currentPokemon, awayPokemon: this.state.randomPokemon, handleBattle: this.handleBattle }}></Battle>
                </div>
            );
        }


    }
}

export default Feed;