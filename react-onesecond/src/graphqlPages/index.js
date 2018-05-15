import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
const ADD_TODO = gql`
    mutation addTodo($type: String!) {
        addTodo(type: $type) {
            id
            type
        }
    }
`;
const GET_TODOS = gql`
    query games {
        games {
            name
            price
        }
    }
`;
const QueryComponent = () => (
    <Query query={GET_TODOS}>
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
        <Mutation
            mutation={ADD_TODO}
            update={(cache, { data: { addTodo } }) => {
                const { todos } = cache.readQuery({ query: GET_TODOS });
                cache.writeQuery({
                    query: GET_TODOS,
                    data: { todos: todos.concat([addTodo]) }
                });
            }}
        >
            {(addTodo, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addTodo({ variables: { type: input.value } });
                            input.value = "";
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button type="submit">Add Todo</button>
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