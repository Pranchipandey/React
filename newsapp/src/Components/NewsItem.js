import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
  // let {title,description}=this.props();
    return (
      
      <div>
     <div className="card" style={{width:"350px"}}>
      <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '80%', zIndex: '1'}}> {this.props.source}
                        </span>
      <img src={!this.props.imageUrl?"https://www.pinkvilla.com/files/styles/fbimagesection/public/horoscope-june-18-2022-social.jpg?itok=MtqP_D8X":this.props.imageUrl} class="card-img-top" alt="..." />
      <div className="card-body">
       <h5 className="card-title">{this.props.title}...</h5>
       <p className="card-text">{this.props.description}...</p>
       <p className="card-text"><small className="text-muted">by {!this.props.author? "Unknown" :this.props.author} on {new Date(this.props.date).toGMT}.</small></p>
      <a href={this.props.newsUrl} target="blank" class="btn btn-sm btn-dark">Read More</a>
  </div>
</div>

       
      </div>
    )
  }
}
