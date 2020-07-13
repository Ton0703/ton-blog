import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

function NotFound() {
    return (
        <Layout title=': (' color='#000'>
            <SEO title='404'/>
            <div style={{padding: '30px', fontSize: '2rem'}}>
                额。。。这个路径好像不存在？
            </div>
        </Layout>
    )
}

export default NotFound

