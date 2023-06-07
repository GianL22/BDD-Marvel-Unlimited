import { ApolloClient, InMemoryCache } from "@apollo/client"
import { useMemo } from "react"


export const useApollo = () => {
    const client = useMemo(
        () => 
            new ApolloClient({
                uri: process.env.NEXT_PUBLIC_API_URL,
                cache: new InMemoryCache(),
            }),
        []
    );
    return client;
}