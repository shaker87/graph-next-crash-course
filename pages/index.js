import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import {
  Heading,
  Box,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast
} from "@chakra-ui/react";
import Characters from "../components/Characters";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] =  useState(initialState.characters)

  console.log(initialState.characters)

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
      <Heading as="h1" size="2xl" mb={8}>
        rick and morty
      </Heading>
      <Characters characters={characters}></Characters>
    </Box>
   
    </Flex>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            image
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
              created
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      characters: data.characters.results,
    }
  }
}
