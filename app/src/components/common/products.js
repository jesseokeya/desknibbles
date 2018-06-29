import React, { Component } from 'react';
import axios from 'axios';

class Products extends Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
        this.displayProducts = this.displayProducts.bind(this)
    }

    componentDidMount() {
        const url = 'https://desknibbles.ca/products.json?limit=250'
        axios.get(url).then(res => {
            const products = res.data.products
            this.setState({ products })
        }).catch(err => {
            if (err) { throw err }
        })
    }

    getProductImage(image) {
        return image.src
    }

    displayProducts(product, index) {
        let image
        if (product.images[0]) {
            image = this.getProductImage(product.images[0])
            return (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                    <div className="card shadow" style={{ marginTop: '5vh', width: 'initial' }}>
                        <img className="card-img-top" src={image} alt="product" />
                        <div className="card-body">
                            <h6 className="card-title"><b>title:</b> {product.title}</h6>
                            <h6 className="card-title"><b>vendor:</b> {product.vendor}</h6>
                            <h6 className="card-title"><b>price:</b> ${product['variants'][0].price}</h6>
                            <p className="card-text">
                                <small className="text-muted">
                                    <b>Date Created: {product.created_at.split('T')[0]}</b>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        const { products } = this.state
        return (
            <div>
                <div className="card-deck">
                    {products.map(this.displayProducts)}
                </div>
            </div>
        )
    }
}

export { Products }