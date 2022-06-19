import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';

export default class news extends Component {
  static defaultProps ={
    country:'in',
    pageSize:8,
    category: 'general'
  }

  static propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() +string.slice(1);
  }
  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: false,
      page:1
     
    }
     document.title= `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
  
  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
     this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()
     console.log(parsedData);
    this.setState({articles:parsedData.articles,
             totalResults:parsedData.totalResults,
              loading:false
    });
  }
 
handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}”&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

  }
 
handleNextClick = async () => {
    console.log("Next");
   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) 
   {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
       this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })}
    

 }

  render() {
    return (
      <div className= "container my-3 mx-5">
      <h1 className="text-center my-4">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
     {this.state.loading && <Spinner/>}
      <div className="row mx-5">
      {!this.state.loading && this.state.articles.map((element)=>{
      return <div className="col md-4" key={element.url}>
       <NewsItem title={element.title?element.title:""}
            description={element.description?element.description:""} imageUrl={element.urlToImage}
            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
       
      </div>
  
      })}
      </div>
      <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
    <button disabled={this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
</div>
   </div>
  
    )
  }
}
