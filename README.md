# Store React Form Data or State in Local Storage

### Introduction to Web Storage
Let’s understand web storage, and it is used to store data locally on the user’s browser. There are two types of web storage Local and Session storage.

**Local Storage** – Data is stored in the browser’s memory, and it doesn’t expire even after the browser’s window is closed.
**Session storage** – Data exists as long as the browser’s window is not closed.

The web storage is handy when you are developing shopping cart, storing user logged-in state, or user preferences.
Local storage is best web storage due to it’s higher storage limit. Following are the local storage methods.

| Method	   | Description |
| -------------|------------- |
| setItem()	   | Set values in local storage by using key and value |
| getItem()	   | Get a value by using the key |
| removeItem() |	Delete an item by using key |
| clear()	   | Clears the storage data |

### Code

```
import React, { Component } from 'react';

export default class Document extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      title: '',
      description: '',
      price: ''
    }
    this.data = null;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault()
    let datas = []
    if(localStorage.getItem('document')){
      let data = JSON.parse(localStorage.getItem('document'))
      data.push(this.state)
      datas = data
    }else
      datas.push(this.state)
    localStorage.setItem('document', JSON.stringify(datas));
    console.log("State pushed to local storage");
    this.getDataFromLocalStorage()
  }

  getDataFromLocalStorage(){
    let data = JSON.parse(localStorage.getItem('document'));
    this.data = data
    console.log(data)

    //For showing last data in the form
    if (localStorage.getItem('document')) {
      this.setState({
        title: data[data.length - 1].title,
        description: data[data.length - 1].description,
        price: data[data.length - 1].price
      })
    } else {
      this.setState({
        title: '',
        description: '',
        price: ''
      })
    }
  }

  componentDidMount() {
    this.getDataFromLocalStorage()
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" className="form-control" value={this.state.description} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" className="form-control" value={this.state.price} onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
        <br/>
        <div>
          <h3>Data From the local storage</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              { this.data !== null && this.data.map((item, index) => {
                  return(
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                    </tr>
                  )
                }) 
              }
              
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.