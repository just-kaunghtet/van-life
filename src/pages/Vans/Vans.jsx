import React from "react"
import { Link , useSearchParams } from "react-router-dom"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])
    const [searchVans, setSearchVans]= useSearchParams()
    const filter=searchVans.get("type")
    function handleFilter(key, value)
    {
        setSearchVans(prevParams=>
            {
                if (value===null)
                {
                    prevParams.delete(key)
                }
                else
                {
                    prevParams.set(key, value)
                }
                return prevParams
            })
        
    }   
    const filteredVans= filter ? vans.filter(vans=>vans.type===filter ) : vans
    const vanElements = filteredVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id} state={{search : searchVans.toString()}}>
                <img src={van.imageUrl} alt=""/>
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
        
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div>
                <button className="van-type simple" onClick={()=> handleFilter("type","simple")}>Simple</button>
                <button className="van-type luxury" onClick={()=> handleFilter("type","luxury")}>Luxury</button>
                <button className="van-type rugged" onClick={()=> handleFilter("type","rugged")}>Rugged</button>
                <button onClick={()=> handleFilter(null)}>Clear</button>
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}