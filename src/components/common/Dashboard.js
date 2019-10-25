import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

// import axios from 'axios'

class Dashboard extends React.Component {
  constructor() {
    super()
   
    this.state = {
      data: {
        username: '',
        email: '',
        userImage: '',
        userLocation: '',
        vegGrown: [],
        vegLookingFor: [],
        rating: '',
        availablePickUpDays: [],
        availablePickUpTimes: []
      }
    }
    // bind here
  }

  componentDidMount() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  render() {
    console.log(this.state)
    
    return (
      <main>
        <section className='panelWrapper'>
          <div>
            <h1>Dashboard</h1>
          </div>
          <div>
            <h2>Username: {this.state.data.username}</h2>
            <h3>User Rating {this.state.data.rating}: </h3>
          </div>
          <div>
            <h2>Grown by me</h2>
            {this.state.data.vegGrown.map(veg => 
              <p key={veg}>{veg}</p>
            )}
          </div>
          <div>
            <h2>Veggies I like</h2>
            {this.state.data.vegLookingFor.map(veg => 
              <p key={veg}>{veg}</p>
            )}
          </div>
          <div>
            <h2>My availability</h2>
            {this.state.data.availablePickUpDays.map(veg => 
              <p key={veg}>{veg}</p>
            )}
          </div>
          <div>
            {this.state.data.availablePickUpTimes.map(veg => 
              <p key={veg}>{veg}</p>
            )}
          </div>
        </section>
        <section>
          <div className='panelWrapper'>
       My Listings
          </div>
          <div className='panelWrapper'>
       My claimed veggies
          </div>
        </section>
      </main>
    )
  }


}

export default Dashboard