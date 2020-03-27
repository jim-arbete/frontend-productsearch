import React, { Suspense } from 'react';
import { useAsync, IfFulfilled, IfRejected, PromiseFn } from "react-async"
import logo from './logo.svg';

const BASE_API = 'https://search-pj-campaigns-dykc3wbnqz22xvoiwp2ta5bk3m.eu-west-1.es.amazonaws.com/campaign-se-4-deals/_search'

const fetchSearch: PromiseFn<any> = async ({ term }, { signal }) => {
  const query = {
    query: {
      match: {
        'product.name': term
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

const SearchPlaceholder = () => (
  <div className="searchitem">
    <div className="product-image" />
    <div className="placeholder">&nbsp;</div>
  </div>
)

type SearchItemProps = {
  name: string
  priceFormated: string
  priceCurrent: number
  pricePrevious: number
  priceDiff: number
  imageSrc?: any
}
const SearchItem = ({ name, priceCurrent, pricePrevious, priceDiff, priceFormated, imageSrc }: SearchItemProps ) => {
  const showPriceDropIfLowerThanPreviousPrice = priceCurrent < pricePrevious;
  return (
    <div className="searchitem">
      <div className="product-image">
        {!imageSrc['140'] || <img src={imageSrc['140']} alt={name} />}
      </div>
      <div className="product-name">{name}</div>
      <div className="price-box">
        <div className="formatedprice">{priceFormated}</div>
        {!showPriceDropIfLowerThanPreviousPrice || <div className="pricedrop">Price drop: <strong>{priceDiff}%</strong></div>}
      </div>
    </div>
  )
}

const SearchItems = ({ items }: { items: any[] }) => {
  if (!items.length) return <p>Empty search result</p>
  console.log('items :', items);
  return (
    <>
      {items.map(item => <SearchItem
        key={item?._id ?? 1}
        imageSrc={item?._source?.product?.media?.product_images?.first ?? null}
        name={item?._source?.product?.name ?? '-'}
        priceFormated={item?._source?.price?.display?.offer ?? '-'}
        priceDiff={item?._source?.price?.diff_percentage}
        priceCurrent={item?._source?.price?.offer}
        pricePrevious={item?._source?.price?.compare}
        />)}
    </>
  )
};

const SearchComponent = ({ term }: { term: string }) => {
  const state = useAsync({ suspense: true, promiseFn: fetchSearch, term })
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
              <SearchPlaceholder />
            </>
          }
        >
          <SearchComponent term="hp" />
        </Suspense>
      </article>
      </div>
    </div>
  </div>
);

export default SearchPage;