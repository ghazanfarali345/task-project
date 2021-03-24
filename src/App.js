import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from "./components/Header/Header";
import GlobalStyles from "./GlobalStyle";
import Gist from './components/Gist/Gist'
import { getGistForUser } from './services/gistService'
import { getPublicGists } from './services/gistService'
import Loading from './components/Spinner/Spinner'


const App = () => {

  const [dataArray, setDataArray] = useState()
  const [fiteredGist, setFilteredGist] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {

    const listHandler = async () => {
      const { data } = await getPublicGists()
      setDataArray(data)
      if (data) {
        setIsLoading(false)
      }
    }
    listHandler()
  }, [])



  // remove duplicate entries
  const seen = new Set();

  const filteredArr = dataArray?.filter(el => {
    const duplicate = seen.has(el.owner.login);
    seen.add(el.owner.login);
    return !duplicate;
  });



  const filterUsername = () => {
    setIsLoading(true)

    if (searchVal === '') {
      getPublicGists()
      setIsLoading(false)

      return
    }
    if (searchVal)
      getGistForUser(searchVal)
        .then(details => {
          setFilteredGist(details.data)
          setSearchVal('')
          setIsLoading(false)

          console.log(details.data)
        })
        .catch(err => console.log(err, 'er'))
  }

  return (
    <Wrapper className="App" data-testid="app">
      <Header onChange={(e) => setSearchVal(e.target.value)} searchVal={searchVal} onFindUser={filterUsername} />
      <GlobalStyles />
      { isLoading ? <Loading /> :
        <Gist fiteredGist={fiteredGist} filteredArr={filteredArr} dataArray={dataArray} />

      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
