import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client"
import Cookies from "js-cookie"
import { useMemo } from "react"


export const useApollo = () => {
    const authMiddleware =  new ApolloLink((operation, forward) => {
        operation.setContext(({headers = {}}) => ({
            headers: {
                ...headers,
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }))
        return forward(operation)
    })
    const client = useMemo(
        () => 
            new ApolloClient({
                cache: new InMemoryCache(),
                link: concat(
                    authMiddleware, 
                    new HttpLink({
                        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL
                    })
                )
            }),
        []
    );
    return client;
}