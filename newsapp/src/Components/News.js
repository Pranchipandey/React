import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js';

export default class news extends Component {
 
  constructor(){
    super();
    this.state={
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=94f4d426b1964d30b7a57fc19d5cbf65&page=1&pageSize=${this.props.pageSize}`;
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
    let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=94f4d426b1964d30b7a57fc19d5cbf65”&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
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
   if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) 
   {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=94f4d426b1964d30b7a57fc19d5cbf65&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
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
      <div className= "container my-3">
      <h1 className="text-center">NewsMonkey - Top Headlines</h1>
     {this.state.loading && <Spinner/>}
      <div className="row mx-3">
      {!this.state.loading && this.state.articles.map((element)=>{
      return <div className="col md-4" key={element.url}>
       <NewsItem title={element.title?element.title:""}
            description={element.description?element.description:""} imageUrl={element.urlToImage}
            newsUrl={element.url} />
       
      </div>
  
      })}
      </div>
      <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
    <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
</div> {/*disabled={this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pageSize)}*/}
   </div>
  
    )
  }
}
