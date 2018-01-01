import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
import Footer from '../footer/Footer.js';
import Datestamp from '../datestamp/Datestamp.js';
import {convertTextToP, convertLineToText, convertTextToLine, validatePageNumber} from '../../utils/utils.js';
import Loader from '../loader/Loader.js';
import {getBlogs, updateBlog, addBlog, removeBlog} from '../../actions/actions.js';
import Paginator from '../paginator/Paginator.js';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    admin: state.login.admin,
    blogs: state.blogs.blogList,
    loading: state.blogs.loading
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    requestBlogs: (token) => {dispatch(getBlogs(token));},
    goToBlogs: () => {dispatch(replace('/19th-hole'));},
    goToBlogsPage: (page) => {dispatch(push('/19th-hole/'+page));},
    updateBlog: (token, blog) => {dispatch(updateBlog(token, blog));},
    addBlog: (token, blog) => {dispatch(addBlog(token, blog));},
    removeBlog: (token, blog) => {dispatch(removeBlog(token, blog));}
  }
};

class NineteenPage extends Component {
  constructor(props){
    super(props);
    this.start = 0;
    this.perPage = 3;
    this.localblogs = [];
    this.state={
      editing: null,
      date: null,
      dateError: '',
      title: null,
      body: null,
      newPost: false
    }
  }

  componentWillMount(){
    window.scrollTo(0,0);

    // make a request for updated blogs and use localstorage in the meantime if we have it
    if(!this.props.blogs.length){
      this.props.requestBlogs(this.props.token);
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
      const header = 3*parseFloat(getComputedStyle(document.documentElement).fontSize);
      const landing = document.getElementsByClassName("landing_image")[0].offsetHeight || 0;
      window.scrollTo(0,landing - header);
    }
    if(this.props.loading && !nextProps.loading){
      this.setState({saving: null});
    }
  }

  _validateDate(date=this.state.date){
    if(!date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)){
      this.setState({dateError: 'Please use the format YYYY-MM-DD'});
      return false;
    }
    else if(isNaN(Date.parse(date))){
      this.setState({dateError: 'Invalid Date'});
      return false;
    }
    else{
      this.setState({dateError: ''});
      return true;
    }
  }

  _changeEdit(newBlog, save){
    if(this.state.editing && save){ // clicked save button
      // push the changes
      //TODO: validate the data
      if(!this._validateDate() || !this.state.title || !this.state.body){return;}
      
      this.props.updateBlog(this.props.token,{
        id: this.state.editing,
        date: this.state.date,
        title: this.state.title,
        body: convertLineToText(this.state.body)
      });
    }
    if(newBlog){ // clicked edit
      this.setState({
        editing: newBlog.id,
        newPost: false,
        date: newBlog.date,
        dateError: '',
        title: newBlog.title,
        body: convertTextToLine(newBlog.body)
      });
      //TODO: calculate from REMS
      setTimeout(()=>window.scrollTo(0, document.getElementById('section_'+newBlog.id).offsetTop-48), 100);
    }
    else{ // clicked cancel or save
      this.setState({
        editing: null,
        newPost: false,
        date: null,
        dateError: '',
        title: null,
        body: null,
        saving: save ? this.state.editing : null
      });
    }
  }

  _getToday(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd;} 
    if(mm<10) {mm='0'+mm;} 
    return (yyyy + '-' + mm + '-' + dd);
  }

  _createNewPost(){
    this.setState({
      newPost: true,
      editing: -1,
      date: this._getToday(),
      dateError: '',
      title: '',
      body: '',
      saving: null
    });
  }

  _addNewPost(){
    if(!this._validateDate() || !this.state.title || !this.state.body){return;}
    
    this.props.addBlog(this.props.token,{
      date: this.state.date,
      title: this.state.title,
      body: convertLineToText(this.state.body)
    });
    this.setState({
      editing: null,
      newPost: false,
      date: null,
      dateError: '',
      title: null,
      body: null,
      saving: null
    });
  }

  _removeBlog(id){
    this.props.removeBlog(this.props.token, {id: id});
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
           {this.props.admin && 
            <section className="left">
              {!this.state.newPost && 
                <div className="structured_panel wide">
                  <div className="button se_button" style={{marginTop:'0rem'}} onClick={this._createNewPost.bind(this)}>
                    <span>New Post</span>
                  </div>
                </div>
              }
              {this.state.newPost && <h1>New Post</h1>}
              {this.state.newPost &&
                <div className="structured_panel wide" style={{marginTop:'2rem'}}>
                  <span>
                    <a 
                      className="button_link"
                      onClick={()=>this._addNewPost()}
                      disabled={!this.state.title || !this.state.body || this.state.dateError || !this.state.date}
                    >ADD</a>
                    <a 
                      className="button_link"
                      style={{marginLeft:'1rem'}}
                      onClick={()=>this.setState({newPost:false})}
                    >CANCEL</a>
                  </span>
                  <label style={{marginTop:'2rem'}}>Date</label>
                  <input type="text" 
                    value={this.state.date}
                    placeholder={'YYYY-MM-DD'}
                    onChange={(evt) => {this.setState({date: evt.target.value}); this._validateDate(evt.target.value)}}
                  />
                  {this.state.dateError && (<span className="validation_error">{this.state.dateError}</span>)}
                  <label style={{marginTop:'1rem'}}>Title</label>
                  <input type="text" 
                    value={this.state.title}
                    onChange={(evt) => this.setState({title: evt.target.value})}
                  />
                  <label style={{marginTop:'1rem'}}>Post</label>
                  <textarea value={this.state.body}
                    onChange={(evt) => this.setState({body: evt.target.value})}
                  />
                </div>
              }
            </section>
          }
          {blogs.length > 0 && blogs.slice(this.start, this.start+this.perPage).map((blog)=>
            <section key={blog.id} id={'section_' + blog.id} className="left">
              <Datestamp datestamp={blog.date}/>
              {this.props.admin && this.state.editing !== blog.id &&
                <span style={{marginBottom: '2rem'}}>
                  <a 
                    className="button_link"
                    onClick={this._changeEdit.bind(this, blog, false)}
                  >EDIT</a>
                </span>
              }
              {this.props.admin && this.state.editing === blog.id &&
                <span>
                  <a 
                    className="button_link"
                    onClick={this._changeEdit.bind(this, null, true)}
                    disabled={!this.state.title || !this.state.body || this.state.dateError || !this.state.date}
                  >SAVE</a>
                  <a 
                    className="button_link"
                    style={{marginLeft:'1rem'}}
                    onClick={this._changeEdit.bind(this, null, false)}
                  >CANCEL</a>
                  <a 
                    className="button_link"
                    style={{marginLeft:'1rem'}}
                    onClick={() => this._removeBlog(blog.id)}
                  >DELETE</a>
                </span>
              }
              {this.state.editing === blog.id &&
                <div className="structured_panel wide" style={{marginTop:'2rem'}}>
                  <label>Date</label>
                  <input type="text" 
                    value={this.state.date}
                    placeholder={'YYYY-MM-DD'}
                    onChange={(evt) => {this.setState({date: evt.target.value}); this._validateDate(evt.target.value)}}
                  />
                  {this.state.dateError && (<span className="validation_error">{this.state.dateError}</span>)}
                  <label style={{marginTop:'1rem'}}>Title</label>
                  <input type="text" 
                    value={this.state.title}
                    onChange={(evt) => this.setState({title: evt.target.value})}
                  />
                  <label style={{marginTop:'1rem'}}>Post</label>
                  <textarea value={this.state.body}
                    onChange={(evt) => this.setState({body: evt.target.value})}
                  />
                </div>
              }
              {this.props.loading && this.state.saving === blog.id &&  <Loader/>}
              {this.state.editing !== blog.id && this.state.saving !== blog.id && 
                <h1>{blog.title}</h1>
              }
              {this.state.editing !== blog.id && this.state.saving !== blog.id && 
                convertTextToP(blog.body)
              }
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
