import { useEffect, useState } from 'react';
import MindSection from './MindSection';
import RestaurantChain from './RestaurantChain';
import Restaurants from './Restaurants';
import { SWIGGY_API } from '../utils/constants';
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = ()=>{
    const [mindData, setMindData] = useState();
    const [chainHeader, setChainHeader] = useState();
    const [chains, setChains] = useState();
    const [restaurantsHeader, setRestaurantsHeader] = useState();
    const [restaurants, setRestaurants] = useState()

    const fetchData = async () => {
        const data = await fetch(SWIGGY_API);
        const json = await data.json();

        console.log(json);

        const dishes = json?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.info;
        const chainHeader = json?.data?.cards?.[1]?.card?.card?.header?.title;
        const chains = json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        const restaurantsHeader = json?.data?.cards?.[2]?.card?.card?.title;
        const restaurants =  json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        setMindData(dishes);
        setChainHeader(chainHeader);
        setChains(chains);
        setRestaurantsHeader(restaurantsHeader);
        setRestaurants(restaurants);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === "false"){
        <h1>Look's like you are offline!! Please, check your Internet Connection</h1>
    }

    return(
        <div className='Body'>

            {/* Whats on your Mind Section */}
            <div className='Mind-Section'>
                <MindSection dishes={mindData}/>
            </div>

            {/* Top Restaurants Chains in Location Section */}
            <div className='Restaurant-Chains'>
                <RestaurantChain ChainHeader={chainHeader} Chains={chains} />
            </div>

            {/* Restaurants with Online food delivery in Loaction */}
            <div className='Restaurants'>
                <Restaurants RestaurantHeader={restaurantsHeader} Restaurants={restaurants} />
            </div>
        </div>
    )
}

export default Body;