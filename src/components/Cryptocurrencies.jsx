import React, { useState, useEffect } from "react";
import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    return () => {
      setCryptos(cryptoList?.data?.coins);
      const filteredData = cryptoList?.data?.coins.filter((coins) =>
        coins.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setCryptos(filteredData);
    };
  }, [cryptoList, searchTerm]);

  // console.log(cryptos);
  if (isFetching) return "Loading...";

  return (
    <div>
      {/* The search bar in the currency components */}
      {/* Because of the term simpified the search bar is not displayed in the homepage but in the present component*/}
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/*Displaying the cards in the component */}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cryptocurrencies;
