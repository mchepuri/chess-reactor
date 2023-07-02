import React,{Suspense,useState,useEffect} from 'react';
//import useSWR from 'swr';
import axios from 'axios';
import {fetchData} from '../../utils/fetchData';
export const SuspenseTest = () => {
    //const [data,setData] = useState([]);
    /*const getTracks = async (url) => {
        //setIsLoading(true);
        return axios.get(url);
        //setData(response.data);
        //setIsLoading(false);
    }*/
    const resp = fetchData('https://itunes.apple.com/search?term=jackson');
    const tracks = resp.read();
    //const {tracks,error} = useSWR('https://itunes.apple.com/search?term=jackson',getTracks)
    //const [isLoading,setIsLoading] = useState(true);
   
    /*useEffect(()=>{
        //console.time();
        getTracks();
        
    },[]);
    useEffect(()=>{
        console.log(data);
    },[data]);*/
    //if (isLoading) return <div>Loading cities...</div>;
    /*const albumList = data.results.map((album,index)=>
        <li>{album.artistName} - {album.collectionCensoredName}</li>
    );*/
    return(
    <div><ul>{tracks.results.map((album,index)=>
        <li>{album.artistName} - {album.collectionCensoredName}</li>
    )}</ul></div>);
}
