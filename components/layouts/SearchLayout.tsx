import {
  FC,
  ReactNode,
} from "react";
import Head from "next/head";
import Header from "../common/Header";
import React from 'react';
// import { useRouter } from "next/router";

type SearchLayoutProps = {
  title?: string;
  children: ReactNode;
};

type HeaderLayoutProps = {
  title?: string;
  children: ReactNode;
};

export const HeaderLayout: FC<HeaderLayoutProps> = ({ title, children }) => {

  return (
    <>
      <Head>
        <title>{title ? `${title} - Bundler` : `Bundler`}</title>
      </Head>
      <div className="w-full h-screen overflow-y-auto flex flex-col space-t-4 justify-between  overflow-x-hidden ">
        <div className="w-full mx-auto">
          <Header />
          <div className="flex  justify-start items-start  w-full">
            <div className=" pt-10 mx-auto space-t-6 w-full ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SearchLayout: FC<SearchLayoutProps> = ({
  title,
  children,
}: SearchLayoutProps) => {








  // const handleSelect = (value: SerumMarketInfo | undefined) => {
  //   if (value) {
  //     setSelected(value);
  //     router.push({
  //       pathname: `/market/${value.address.toString()}`,
  //       query: router.query,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (serumMarkets) {
  //     if (marketQuery !== "") {
  //       const q = new RegExp(marketQuery, "i");
  //       setFilteredMarkets(
  //         serumMarkets.filter((row) => serumMarketFilter(q, row)).slice(0, 5)
  //       );
  //     } else setFilteredMarkets(serumMarkets.slice(0, 5));
  //   } else setFilteredMarkets([]);
  // }, [marketQuery, serumMarkets]);

  return (
    <HeaderLayout title={title}>
      <div>
        {/* <Combobox value={selected} onChange={(value) => handleSelect(value)}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-md bg-neutral-900 text-left border border-neutral-700 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0">
              <Combobox.Button as="div">
                <Combobox.Input
                  placeholder="Search markets"
                  className="w-full border-none py-3 pl-3 pr-10 text-sm leading-5 solapetext focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-white"
                  onChange={debouncedChangeHandler}
                />
              </Combobox.Button>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-custom-green-500"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setMarketQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md solapenav shadow-2xl border border-neutral-700 py-1 text-base sm:text-sm">
                {filteredMarkets.length === 0 && marketQuery !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-neutral-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredMarkets.map((market) => (
                    <Combobox.Option
                      key={market.address.toBase58()}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 flex items-center justify-between ${active
                          ? "solapetext font-medium"
                          : "text-neutral-800"
                        }`
                      }
                      value={market}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`block truncate text-sm`}>
                          {prettifyPubkey(market.address)}
                        </span>
                      </div>
                      {market.baseSymbol && market.quoteSymbol ? (
                        <div>
                          <p>
                            {market.baseSymbol}/{market.quoteSymbol}
                          </p>
                        </div>
                      ) : null}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox> */}
      </div>
      {children}
    </HeaderLayout>
  );
};

export const getSearchLayout = (page: React.ReactNode, title?: string) => (
  <SearchLayout title={title}>{page}</SearchLayout>
);
