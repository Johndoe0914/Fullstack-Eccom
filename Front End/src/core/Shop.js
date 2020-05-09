import React, {useState, useEffect} from "react"
import Layout from "./Layout"
import { getFilteredProducts, getCategories} from "./apiCore";
import Card from '../core/Card';
import Checkbox from "../core/Checkbox";
import {prices} from "./fixedPrices";
import RadioBox from "./RadioBox";



const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    




    //Grabs categories and sets categories to display
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = newFilters => {
        // console.log(newFilters)

        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
              
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        )
    }



    useEffect(() => {
      init()
      loadFilteredResults(skip, limit, myFilters.filters)
      
    }, [])


        //handles filters and filterBy changes
    const handleFilters = (filters ,filterBy) => {
        console.log(filters, filterBy)
        
        const newFilters = {...myFilters}

        newFilters.filters[filterBy] = filters

        if(filterBy ==='price') {
            //grab array value

            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {

        const data = prices;
        let array = [];
        // LOOP THROUGH PRICES BY KEY 
        for(let key in data) {
            // CHECK IF ID IN PRICES IS EQUAL TO INPUT VALUE
            if(data[key]._id === parseInt(value)) {
                // ADD PRICE TO NEW ARRRAY
                array = data[key].array
            }
        }
        return array 
    }

  
    return (
        <Layout title="Shop page" description="Search and find books of your choice" className="container-fluid">
        <div className="row">

            <div className="col-4">
                <h4>Filter by category</h4>

            <ul>
                <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
            </ul>
            <h4>Filter by price</h4>

<div>
    <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
</div>

            </div>


            <div className="col-8">
                <h2 className="mb-4">Products</h2>
                <div className="row">
                    {filteredResults.map((product, index) => (
                      
                      <div key={index} className="col-4 mb-3">
        <Card  product={product}/>
        </div>
                    
                    ))}
                </div>
                <hr />
                {loadMoreButton()}
            </div>
        </div>
        
       </Layout>
    )
}

export default Shop