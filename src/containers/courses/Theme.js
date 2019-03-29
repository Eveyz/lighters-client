import React from 'react'

class Theme extends React.Component {
  render() {
    return(
      <div className="col m6 s12">
        <img className="theme-img clickable" src={require(`../../images/classroom/${this.props.src}`)} />
      </div>
    )
  }
}

export default Theme