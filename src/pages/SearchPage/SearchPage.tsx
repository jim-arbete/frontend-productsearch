import React, { Suspense } from 'react';
import { useAsync, IfFulfilled, IfRejected, PromiseFn } from "react-async"

import logo from './logo.svg';

// const BASE_API = 'https://swapi.co/api/starships'
const BASE_API = 'https://search-pj-campaigns-dykc3wbnqz22xvoiwp2ta5bk3m.eu-west-1.es.amazonaws.com/campaign-se-4-deals/_search'

// const fetchSearch: PromiseFn<string> = ({ searchTerm }) =>
//   fetch(`https://swapi.co/api/starships/${searchTerm}`)
//     .then(res => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
//     .then(res => res.json())

const fetchSearch: PromiseFn<any> = async ({ term }, { signal }) => {
  const query = {
    query: {
      match: {
        'product.name': 'apple'
      }
    }
  };
  const response = await fetch(BASE_API, {
    signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(query)
  })
  if (!response.ok) throw new Error(`${response.status}`)
  return response.json()
}

// // type SearchDataDTO = {imdbID: string; Title: string; Year: string;}
// const state = useAsync({ promiseFn: fetchSearch, debugLabel: `User ${searchTerm}`, searchTerm })

const SearchPlaceholder = () => (
  <div className="placeholder">
    <div className="productname">Loading..</div>
    <div className="pricedrop" />
    <div className="formatedprice" />
  </div>
)

type SearchItemProps = {
  name: string
  formatedprice: string
  imageSrc?: string
  pricedrop?: number
}
const SearchItem = ({ name, imageSrc, formatedprice, pricedrop }: SearchItemProps ) => (
  <div className="searchitem">
    <div className="product-image">
      {!imageSrc ?? <img src={imageSrc} alt={name} />}
    </div>
    <div className="product-name">{name}</div>
    <div className="pricedrop">{pricedrop}</div>
    <div className="formated-price">{formatedprice}</div>
  </div>
)

const SearchItems = ({ items }: { items: any[] }) => {
  if (!items.length) return <p>Empty search result</p>
  console.log('items :', items);
  return (
    <>
      {items.map(item => <SearchItem
        key={item?._id ?? 1}
        name={item?._source?.product?.name ?? '-'}
        formatedprice={item?._source?.price?.display?.offer ?? '-'}
        // pricedrop={159}
        />)}
    </>
  )
};

const SwapiApi = ({ term }: { term: string }) => {
  const state = useAsync({ suspense: true, promiseFn: fetchSearch, term })
  // <IfFulfilled state={state}>{data => <pre>{JSON.stringify(data, null, 2)}</pre>}</IfFulfilled>
  return (
    <>
      <IfFulfilled state={state}>{data => <SearchItems items={data?.hits?.hits ?? []} />}</IfFulfilled>
      <IfRejected state={state}>{error => <p>{error.message}</p>}</IfRejected>
    </>
  )
}

const SearchPage = () => (
  <div id="SearchPage">
    <header>
      <div className="align-site-content-center flex flex-vertical-center">
        <a href="/"><img src={logo} className="flex flex-vertical-center App-logo" alt="logo" /></a>
        <a href="/">React - Search Products App</a>
      </div>
    </header>
    <div id="main">
      <div className="align-site-content-center flex flex-vertical-center">
      <article>
        <Suspense
          fallback={
            <>
              <SearchPlaceholder />
              <SearchPlaceholder />
            </>
          }
        >
          <SwapiApi term="apple" />
        </Suspense>
      </article>
      </div>
    </div>
  </div>
);

export default SearchPage;