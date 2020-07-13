import React from "react"
import { Link } from "gatsby"

function ArticleCard({ data }) {
  const { excerpt, slug, title, date, tags } = data
  return (
    <div className="articleCard">
      <Link to={`/${slug}`}>
        <div className="card-title">{title}</div>
      </Link>
      <div className="card-date">{date}</div>
      <div className="card-excerpt">
        <Link to={`/${slug}`}>{excerpt}</Link>
      </div>
      <div className="card-tag">
        {tags.map((item, index) => (
          <div className="tags-tag" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticleCard

//excerpt: "Test Test Test", slug: "my-third-post", title: "My Third Post!", date: "2020-06-01T00:00:00.000Z"
