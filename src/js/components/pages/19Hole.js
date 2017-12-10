import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
import Footer from '../footer/Footer.js';
import Datestamp from '../datestamp/Datestamp.js';
import {convertTextToP, validatePageNumber} from '../../utils/utils.js';
import Loader from '../loader/Loader.js';
import {getBlogs} from '../../actions/actions.js';
import Paginator from '../paginator/Paginator.js';


const mapStateToProps = (state)=>{
  return {
    blogs: state.blogs.blogList,
    loading: state.blogs.loading
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    requestBlogs: () => {dispatch(getBlogs());},
    goToBlogs: () => {dispatch(replace('/19th-hole'));},
    goToBlogsPage: (page) => {dispatch(push('/19th-hole/'+page));}
  }
};

class NineteenPage extends Component {
  constructor(props){
    super(props);
    
    this.start = 0;
    this.perPage = 3;
    this.localblogs = [];
  }

  componentWillMount(){
    window.scrollTo(0,0);

    // make a request for updated blogs and use localstorage in the meantime if we have it
    if(!this.props.blogs.length){
      this.props.requestBlogs();
      let localblogs = JSON.parse(localStorage.getItem('blogs'));
      if(localblogs){
        this.localblogs= localblogs;
        this.start = validatePageNumber(localblogs, this.perPage, this.props.match.params.page, this.props.goToBlogs);
        return;
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.blogs.length){
      this.start = validatePageNumber(nextProps.blogs, this.perPage, nextProps.match.params.page, this.props.goToBlogs);
    }
    if(nextProps.match.params.page !== this.props.match.params.page){
      const top = 17*parseFloat(getComputedStyle(document.documentElement).fontSize);
      window.scrollTo(0,top-48);
    }
  }

  render() {
    // determine which dataset to render from
    const blogs = (!this.props.blogs.length ? this.localblogs : this.props.blogs);

    return (
      <div>
        <section className="landing_image image3">
          <main className="page_title">
            <h1>The 19th Hole</h1>
            <h3>Golf Stories and Q&amp;A</h3>
          </main>
        </section>
        <div>
          {this.props.loading &&
              <section className="left">
                <div>
                    <p>Loading 19th Hole...</p>
                    <Loader/>
                </div>
              </section>
            }
            {blogs.length > 0 && blogs.slice(this.start, this.start+this.perPage).map((blog)=>
              <section key={blog.id} className="left">
                <Datestamp datestamp={blog.date}/>
                <h1>{blog.title}</h1>
                {convertTextToP(blog.body)}
              </section>
            )}
            <section>
              <Paginator pages={Math.ceil(blogs.length/this.perPage)} current={this.start/this.perPage+1} navigate={this.props.goToBlogsPage}/>
            </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NineteenPage);
