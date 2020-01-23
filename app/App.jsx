import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { lazy, LazyBoundary } from 'react-imported-component'
import { GlobalStyles } from './styles'
import Header from './components/Header'
import Home from './pages/Home'
import LoadingComponent from './pages/Loading'

const About = lazy(() => import('./pages/About'))

export const renderAboutPage = () => (
  <LazyBoundary fallback={<LoadingComponent />}>
    <About />
  </LazyBoundary>
)

const App = () => (
  <React.Fragment>
    <GlobalStyles />
    <Header />

    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' render={renderAboutPage} />
      <Redirect to='/' />
    </Switch>
  </React.Fragment>
)

export default App
