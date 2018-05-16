import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
const ADD_GAMES = gql`
    mutation addGames($name: String,$price:String) {
        addGames(name: $name,price:$price) {
            name
            price
        }
    }
`;
const GET_GAMES = gql`
    query games {
        games {
            name
            price
        }
    }
`;
const QueryComponent = () => (
    <Query query={GET_GAMES} >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.games.map((game) => (
                <div key={game.name}>
                    <p>{`${game.name}: ${game.price}`}</p>
                </div>
            ));
        }}
    </Query>
);
const MutationComponent = () => {
    let input;
    return (
        <Mutation mutation={ADD_GAMES}>
            {(addGames, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addGames({ variables: { name: "wow", price: "98" } });
                            input.value = "";
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button type="submit">Add Game</button>
                    </form>
                </div>
            )}
        </Mutation>
    )
};

class MyComponent extends Component {
    render() {
        return <div>
            1<QueryComponent></QueryComponent>
            2<MutationComponent></MutationComponent>
        </div>;
    }
}

export default MyComponent;