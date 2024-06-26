import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'
import {FcLike} from 'react-icons/fc'
import {IoLocationSharp} from 'react-icons/io5'

class Header extends Component {
  state = {
    completeData: [],
    data: [],
    query: '',
    pageCount: 0,
    status: 'INITIAL',
    hoveredImage: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({status: 'LOADING'})
    const {query} = this.state
    const queryParam = query.length === 0 ? 'random' : query

    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${queryParam}&client_id=UjzsujdxWqVzYDUVxps4WKTCW0uKh-tg6_BHtbLowFw`,
    )
    if (response.ok) {
      const data = await response.json()
      const paginatedData = data.results.slice(0, 6)

      this.setState({
        completeData: data.results,
        pageCount: Math.ceil(data.results.length / 6),
        query: '',
        status: 'SUCCESS',
        data: paginatedData,
      })
    } else {
      this.setState({
        query: '',
        status: 'FAIL',
      })
    }
  }

  handlePageClick = data => {
    this.setState({status: 'LOADING'})

    setTimeout(() => {
      const {completeData} = this.state
      const itemsPerPage = 6
      const start = data.selected * itemsPerPage
      const end = start + itemsPerPage
      const paginatedData = completeData.slice(start, end)

      this.setState({data: paginatedData, status: 'SUCCESS'})
    }, 500)
  }

  onEnterQuery = event => {
    this.setState({query: event.target.value})
  }

  onSelectOption = value => {
    this.setState({query: value})
  }

  handleMouseEnter = image => {
    this.setState({hoveredImage: image})
  }

  handleMouseLeave = () => {
    this.setState({hoveredImage: null})
  }

  renderDisplay = () => {
    const {status} = this.state

    switch (status) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'ERROR':
        return this.renderError()
      default:
        return null
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {pageCount, data, hoveredImage} = this.state
    return (
      <div>
        <ul className="ss">
          <li
            className="sample-items"
            onClick={() => {
              this.onSelectOption('Animals')
            }}
          >
            Animals
          </li>
          <li
            className="sample-items"
            onClick={() => {
              this.onSelectOption('Mountains')
            }}
          >
            Mountains
          </li>
          <li
            className="sample-items"
            onClick={() => {
              this.onSelectOption('Flowers')
            }}
          >
            Flowers
          </li>
          <li
            className="sample-items"
            onClick={() => {
              this.onSelectOption('Beaches')
            }}
          >
            Beaches
          </li>
        </ul>
        <ul className="images-container">
          {data.map(each => {
            console.log(each)
            return (
              <li
                key={each.id}
                className="images-card"
                onMouseEnter={() => this.handleMouseEnter(each)}
                onMouseLeave={this.handleMouseLeave}
              >
                <img
                  src={each.urls.full}
                  alt={each.description}
                  className="images"
                />
                {hoveredImage === each && (
                  <div className="hover-details">
                    <a href={each.urls.full} target="_blank" rel="noreferrer">
                      Open in new tab
                    </a>
                    <p className="details">
                      Photographer : {each.user.first_name}
                    </p>
                    <p>
                      <span>
                        <FcLike className="likes" />
                      </span>
                      : <span className="like">{each.likes}</span>
                    </p>
                    <p>
                      <span>
                        <IoLocationSharp className="likes" />
                      </span>
                      : <span className="like">{each.user.location}</span>
                    </p>
                    <p className="details">
                      Description :{' '}
                      <span className="details"> {each.alt_description}</span>
                    </p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <ReactPaginate
          nextLabel="next >"
          previousLabel="< previous"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick}
          containerClassName="pagination pages"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    )
  }

  renderError = () => <div>Error occurred.</div>

  render() {
    const {query} = this.state

    return (
      <>
        <div className="header-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/du6aueulp/image/upload/v1715935663/cpvochxgnaycbnpdpmbb.png"
              className="logo"
              alt="logo"
            />
          </div>
          <div className="search-container">
            <input
              className="input-container"
              type="search"
              onChange={this.onEnterQuery}
              value={query}
            />
            <button
              type="button"
              className="search-button"
              onClick={this.fetchData}
            >
              Search
            </button>
          </div>
        </div>

        {this.renderDisplay()}
      </>
    )
  }
}

export default Header
