import * as React from 'react'

interface IProps {
  title: string
  author?: string
}

type Title = ({ title, author }: IProps) => JSX.Element

const Title: Title = ({ title, author }) => (
  <h1 className="title">
    {title}
    { author && (<small className="by">{author}</small>) }
  </h1>
)

export default Title
