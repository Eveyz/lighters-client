// var App = React.createClass({
//   getInitialState: function() {
//     var pages = Math.ceil((this.props.data.length / this.props.itemsPerPage));
//     return {
//       pages: pages,
//       currentPage: 1,
//       searchQuery: ''
//     };

//   },
//   updateCurrentPage: function(i) {
//     var pageToGo = this.state.currentPage + i;
//     var currentPage = ((pageToGo <= 0) || (pageToGo > this.state.pages)) ? this.state.currentPage : pageToGo;
//     this.setState({
//       currentPage: currentPage
//     });
//   },
//   goToPage: function(page) {
//     this.setState({
//       currentPage: page
//     });
//   },
//   handleSearchQuery: function(e) {
//     this.setState({
//       searchQuery: e.target.value
//     });
//   },
//   render: function() {
//     return ( < div >
//       < SearchBar handleSearchQueryChange = {
//         this.handleSearchQuery
//       }
//       searchQuery = {
//         this.state.searchQuery
//       }
//       /> < Table data = {
//       this.props.data
//     }
//     currentPage = {
//       this.state.currentPage
//     }
//     itemsPerPage = {
//       this.props.itemsPerPage
//     }
//     searchQuery = {
//       this.state.searchQuery
//     }
//     /> < Pagination searchQuery = {
//     this.state.searchQuery
//   }
//   currentPage = {
//     this.state.currentPage
//   }
//   pages = {
//     this.state.pages
//   }
//   updateCurrentPage = {
//     this.updateCurrentPage
//   }
//   goToPage = {
//     this.goToPage
//   }
//   /> < /div >
// );
// }
// });

// var SearchBar = React.createClass({
//   handleFormSubmit: function(e) {
//     e.preventDefault();
//     return;
//   },
//   render: function() {
//     return ( < div className = "section" >
//       < div className = "container" >
//       < div className = "row" >
//       < form className = "col s12"
//       onSubmit = {
//         this.handleFormSubmit
//       } >
//       < div className = "row" >
//       < div className = "input-field col s12" >
//       < i className = "material-icons prefix" > search < /i>	 < input type = "text"
//       className = "validate"
//       placeholder = "Search..."
//       id = "search"
//       value = {
//         this.props.searchQuery
//       }
//       onChange = {
//         this.props.handleSearchQueryChange
//       }
//       /> < label
//       for = "search" > Search... < /label> < /div > < /div> < /form > < /div> < /div > < /div>
//     );
//   }
// });

// var Table = React.createClass({
//       render: function() {
//           var rows = this.props.data.map(function(item, index) {
//                 var limit = (this.props.currentPage * this.props.itemsPerPage) - 1;
//                 var row = [];
//                 if (!this.props.searchQuery) {
//                   if ((index <= limit) && (index >= (limit - this.props.itemsPerPage + 1))) {
//                     var keys = Object.keys(item);
//                     for (var key in keys) {
//                       row.push( < td > {
//                           item[keys[key]]
//                         } < /td>);
//                       }
//                     }
//                   } else {
//                     var keys = Object.keys(item);
//                     var match = 0;
//                     for (var key in keys) {
//                       if (item[keys[key]].toString().indexOf(this.props.searchQuery) !== -1 || match) {
//                         row.push( < td > {
//                             item[keys[key]]
//                           } < /td>);
//                           match++;
//                         }
//                       }
//                     }

//                     return ( < tr > {
//                         row
//                       } < /tr>);
//                     }.bind(this));
//                   var headers = function() {
//                     var keys = Object.keys(this.props.data[0]);
//                     var headers = [];
//                     for (var key in keys) {
//                       headers.push( < td > {
//                           keys[key].toString().toUpperCase()
//                         } < /td>);
//                       }
//                       return (headers);
//                     }.bind(this)();
//                     return ( < div className = "section" >
//                       < div className = "container" >
//                       < div className = "row" >
//                       < div className = "col s12" >
//                       < table className = "striped" >
//                       < thead >
//                       < tr > {
//                         headers
//                       } < /tr> < /thead > < tbody > {
//                         rows
//                       } < /tbody> < /table > < /div> < /div > < /div>	 < /div >
//                     );
//                   }
//                 });

//               var Pagination = React.createClass({
//                     render: function() {
//                       var pagination = function() {
//                         if (!this.props.searchQuery) {
//                           var pages = [];
//                           pages.push( < li > < a href = "#!"
//                             onClick = {
//                               () => this.props.updateCurrentPage(-1)
//                             } > < i className = "material-icons" > chevron_left < /i></a > < /li>);
//                             for (var i = 1; i <= this.props.pages; i++) {
//                               let counter = i;
//                               (this.props.currentPage === counter) ? pages.push( < li className = "active" > < a href = "#!"
//                                 onClick = {
//                                   () => this.props.goToPage(counter)
//                                 } > {
//                                   i
//                                 } < /a></li > ): pages.push( < li className = "waves-effect" > < a href = "#!"
//                                 onClick = {
//                                   () => this.props.goToPage(counter)
//                                 } > {
//                                   i
//                                 } < /a></li > );
//                             }
//                             pages.push( < li className = "waves-effect" > < a href = "#!"
//                               onClick = {
//                                 () => this.props.updateCurrentPage(1)
//                               } > < i className = "material-icons" > chevron_right < /i></a > < /li>);
//                               return (pages);
//                             }
//                           }.bind(this)();
//                           return ( < div className = "section" >
//                             < div className = "container" >
//                             < div className = "row" >
//                             < div className = "col s12" >
//                             < center >
//                             < ul className = "pagination" > {
//                               pagination
//                             } < /ul> < /center > < /div> < /div > < /div> < /div >
//                           );
//                         }
//                       });

//                     ReactDOM.render( < App data = {
//                         data
//                       }
//                       itemsPerPage = {
//                         5
//                       }
//                       />,
//                       document.getElementById('app')
//                     );
