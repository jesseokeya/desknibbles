import React, { Component } from 'react';
import axios from 'axios';
import { toNumber } from 'lodash';
import '../styles/style.css'

class Solution extends Component {
    constructor() {
        super()
        this.state = {
            realStocked: [1, 2, 3, 4, 5, 6, 7, 6],
            emails: [],
            totalPrice: '',
            server: 'http://localhost:3001'
        }
        this.filter = this.filter.bind(this)
    }

    componentDidMount() {
        const { server } = this.state
        axios.get(`${server}/faveSnack`).then(res => {
            axios.get('https://desknibbles.ca/products.json?limit=250').then(_res => {
                const { realStocked, emails, totalPrice } = this.filter(_res.data.products, res.data)
                this.setState({ realStocked, emails, totalPrice })
            })
        }).catch(err => {
            if (err) { throw err }
        })
    }

    filter(products, faveSnackers) {
        let realStocked = []
        let emails = []
        let totalPrice = 0
        faveSnackers.forEach(faveSnacker => {
            const faveSnack = faveSnacker.fave_snack
            products.forEach(product => {
                if (product.product_type === 'Snack') {
                    if ((product['title'].includes(faveSnack) || product['handle'].includes(faveSnack)) || (faveSnack.includes(product['title']) || faveSnack.includes(product['handle'])) || (faveSnack.includes(product['vendor']))) {
                        emails.push(faveSnacker.email)
                        const price = toNumber(product['variants'][0].price)
                        realStocked.push(`${product['title']} - $${price}`)
                        totalPrice += price
                    }
                }
            })
        })
        return { realStocked, emails, totalPrice }
    }

    displayItems(item, index) {
        return (
            <li key={index} className="list-group-item list-group-item-light"><b>{item}</b></li>
        )
    }

    render() {
        let { realStocked, emails, totalPrice } = this.state
        realStocked = new Set(realStocked)
        realStocked = Array.from(realStocked)
        return (
            <div>
                <div className="card shadow">
                    <div className="card-body">
                        <h5 className="card-title">Developer Intern Co-op Question?</h5>
                        <p className="card-text">
                            Use the following fake snacker list to find all emails of snackers with a 'fave_snack' of a product we stock <br />
                            https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json<br /><br />
                            Our product list can be found here (assume all products here are in stock: https://desknibbles.ca/products.json?limit=250
                            <br />
                            a) List the real stocked snacks you found under the snacker's 'fave_snack'?<br />
                            b) What're the emails of the snackers who listed those as a 'fave_snack'?<br />
                            c) If all those snackers we're to pay for their 'fave_snack' what's the total price?<br />
                        </p>
                    </div>
                </div>
                <br />
                <div className="card shadow">
                    <div className="card-body">
                        <h5 className="card-title">My Solution</h5>
                        <div className="card-text">
                            a) Real stocked snacks found under the snacker's 'fave_snack' below: <br />
                            <ul className="list-group">
                                {realStocked.map(this.displayItems)}
                            </ul>
                            <br />
                            b) Emails of the snackers who listed those as a 'fave_snack' below: <br />
                            <ul className="list-group">
                                {emails.map(this.displayItems)}
                            </ul>
                            <br />
                            c) Total price of 'fave_snacks': <b>${totalPrice}</b> <br />
                        </div>
                        <hr />
                        <p className="card-text">Thanks for this challenge really enjoyed doing it. By the way my favourite snack is <b> Clif Crunch Bar <span role="img" aria-label="winking face"> 😉 </span> </b> </p>
                        <hr />
                        <p className="card-text"> Love what you guys are doing at <b> desk nibbles </b> hope i can join the team 🎳. </p>
                        <hr />
                        <b> Contact Me: </b> <br />
                        <h4><a href="https://www.linkedin.com/in/jesse-okeya-45a38510a/" className="badge badge-primary space-left"> LinkedIn </a></h4>
                        <h4><a href="https://github.com/jesseokeya" className="badge badge-dark space-left"> Github </a></h4>
                        <h4><a href="http://jesseokeya.com" className="badge badge-info space-left"> Portfolio </a></h4>
                        <hr/>
                        <b> Peep the code for this website at  </b>
                        <h4><a href="https://github.com/jesseokeya/desknibbles" className="badge badge-info space-left"> Codes For This Website </a></h4>
                    </div>
                </div>
            </div>
        )
    }
}

export { Solution }