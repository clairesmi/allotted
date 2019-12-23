![General Assembly Logo](/src/assets/ga-logo.png)

# Software Engineering Immersive – Project 03

This was the third project on the General Assembly Sofware Engineering Immersive. It was a group project which took place over 9 days (week 9) and I worked with Jenny Judova, Paul Cooke and Lloyd Noone. 

# Allotted

Allotted is a web platform that allows people who grow their own produce to share their excess production with people in their community. 

## Brief


    - Build a full-stack application with backend and front-end using a MERN stack

    - Work with at least 3 models/schema that are related in some way 

    - Incorporate CRUD funtionality 

    - Consume one or more public APIs

    - Establish a user journey and wireframes that clearly show which elements are MVP (CRUD fucntionality) and which elements are bonus features

    -Fully test at least one model 

    - Deploy the project online 



![Home Page screenshot](/src/assets/home-page.png)


## Deployment 

The project is deployed online with Heroku and can be found here:

https://allotaveg.herokuapp.com/

## Getting started

Use the clone button to download the source code. Enter the following commands in the CLI: 

```
<!— To install all the packages listed in the package.json: —> $ yarn 

<!— Run the app on localhost:4000 : —> $ yarn start 

<!— Check the console for any issues and if there are check the package.json for any dependancies missing —>

<!- Navigate to http://localhost:4000/>
```
## Technologies Used:

    JavaScript
    React
    HTML5
    CSS3
    Sass
    Node.js
    Mongoose
    Express
    Axios
    Yarn
    Supertest
    Mocha
    Chai
    Firebase

### External APIs

    MapBox Api
    postcodes.io API
    Recipe Puppy

## User Experience 

The app is a sharing platform where users can either register as a grower or as someone who is interested in collecting some produce from a grower.

![Register Page](/src/assets/register-form.png)

Produce that is being offered can be viewed on the Vegetable Index Page (Veg on Offer) which can be switched to Map View. The Map View was one of the elements that I focused on. I used an Axios post request to send the postcode of the location of each item to the postcodes.io API which returned the co-ordinates. I then posted the co-ordinates on to the map and used the map method to post each item on to it's postcode.  


```
 getPostcodes() {
    const vegetables = this.filterVegetables()
    const postcodes = vegetables.map(veg => veg.vegLocation.replace(' ', ''))
    axios.post('https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes/', { postcodes } )
      .then(res => this.setState({ postcodes: res.data.result, vegetables: vegetables }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  ```

  ```
  {this.state.postcodes.map((postcode, i) => (

              <div key={i}>
                {showPopup && <Popup

                  latitude={postcode.result.latitude}
                  longitude={postcode.result.longitude}
                  closeButton={false}
                  closeOnClick={true}
                  tipSize={12}
                  sortByDepth={true}
                  anchor="bottom" >


                  {this.state.vegetables.map(veg =>
                    <div key={veg._id}>
                      {veg.vegLocation.replace(' ', '') === postcode.query ? <Link to={`/vegetables/${veg._id}`}>
                        {veg.title} 🥕 {veg.vegLocation} </Link> : null}

                    </div>)}

                </Popup>}

              </div>
            ))} 
```

![Map Page screenshot](/src/assets/map-page.png)


The user can select an item and then book an appointment to collect it with it's grower. There is a chat function for the users to communicate through which I created the back end routes for.

On the show page for the available produce, I also worked with the Recipe Puppy API to suggest recipes for the user based on posting the name of the item to the API. I then created show and hide functionality based on showing only 3 recipes or 10. 

![Recipes screenshot](/src/assets/recipes.png)

## Testing

I also focused on creating a set of tests for the vegetable model. I built a test file for each of the CRUD functionalities as below: 

```
const testVeg = {
  
  title: 'Box of tomato',
  typeOfVeg: 'tomato',
  varietyOfVeg: 'cherry',
  pickedDate: 5,
  description: 'very sweet',
  image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
  isClaimed: false,
  vegLocation: 'SW18 4TQ',
  availablePickUpDays: ['Monday', 'Tuesday'],
  availablePickUpTimes: ['18', '19']
  
}

const testUserData =    {
  username: 'Lloyd',
  email: 'lloyd@email.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  availablePickUpDays: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ], 
  availablePickUpTimes: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ]
}

describe('POST /vegetables', () => {

  let token = null 

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Veg.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.post('/api/vegetables')
      .send(testVeg)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
```

The tests start off with the broadest scope of checking if a user is logged in (as they must be logged in to post an item). The tests then become more specific, looking at which fields and which data types should be returned.

## Reflection and Future improvements 

Overall we worked very well as a team - we implemented daily standups and a Trello board to organise our workloads. 

We would have liked to have added WebSockets to the chat function for live updates. We also should have taken more time to think about and plan the styling of the app with some more wireframing and sketching of ideas. 