import React, { Component } from 'react';
import '../../../css/Paginator.css';
import '../../../css/Buttons.css';

class Paginator extends Component {
  render() {
    const pages = [];
    for (let i = 0; i < this.props.pages; i++) {
      pages.push({ page: i + 1 });
    }

    return (
      <div className="paginator">
        <span
          className="flatButton"
          onClick={() => this.props.navigate(this.props.current - 1)}
          disabled={!this.props.current || this.props.current === 1}>
          Prev
          </span>
        <div className="pages">
          {this.props.pages <= 9 && pages.map((page, index) =>
            <div
              key={page.page}
              onClick={() => this.props.navigate(page.page)}
              className={(this.props.current === index + 1) ? "page_icon current" : "page_icon"}>
            </div>
          )}
          {this.props.pages > 9 && <span className="extra">{`${this.props.current} of ${this.props.pages}`}</span>}
        </div>
        <span
          className="flatButton"
          onClick={() => this.props.navigate(this.props.current + 1)}
          disabled={!this.props.current || !this.props.pages || this.props.current === this.props.pages}>
          Next
          </span>
      </div>
    );
  }
}

export default Paginator;
