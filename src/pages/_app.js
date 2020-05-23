import PropTypes from 'prop-types'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from '../cache'

export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
})

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp
