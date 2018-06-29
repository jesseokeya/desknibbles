import React, { Component } from 'react';
import axios from 'axios';
import '../styles/style.css'

class FaveSnackers extends Component {
    constructor() {
        super()
        this.state = {
            server: 'https://desknibbles.herokuapp.com',
            faveSnackers: []
        }
    }

    componentDidMount() {
        const { server } = this.state
        axios.get(`${server}/faveSnack`).then(res => {
            this.setState({ faveSnackers: res.data })
        }).catch(err => {
            if (err) { throw err }
        })
    }

    dispayTable(value, index) {
        return (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{value.first_name}</td>
                <td>{value.last_name}</td>
                <td>{value.email}</td>
                <td>{value.gender}</td>
                <td>{value.fave_snack}</td>
            </tr>
        )
    }

    render() {
        const { faveSnackers } = this.state
        return (
            <div className="card shadow" style={{ backgroundColor: '#2d3034' }}>
                <div className="card-body tbl-flw">
                    <table className="table table-striped table-dark tbl-flw">
                        <thead className="tbl-flw">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">FaveSnack</th>
                            </tr>
                        </thead>
                        <tbody className="tbl-flw">
                            {
                                faveSnackers.map(this.dispayTable)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export { FaveSnackers }