import React from 'react'
import Helmet from 'react-helmet-async'
import Page from '../components/Page'

const Home = () => (
  <Page>
    <Helmet>
      <title>Home Page</title>
    </Helmet>

    <div>
      Follow me at <a href='https://medium.com/@patrickleet'>@patrickleet</a>
    </div>
  </Page>
)

export default Home
