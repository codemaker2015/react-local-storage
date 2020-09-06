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