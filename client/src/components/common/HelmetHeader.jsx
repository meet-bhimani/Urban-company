import { Helmet } from 'react-helmet-async'

const HelmetHeader = ({ title, description }) => {
  return (
    <>
      <Helmet>
        <title title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
      </Helmet>
    </>
  )
}

export default HelmetHeader
