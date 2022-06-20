import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '../src/models'

export default function Home({data}) {
  console.log(data)
  const [posts, setPosts] = useState([])

 
  useEffect(() => {
    fetchPosts()
    async function fetchPosts() {
      const postData = await DataStore.query(Post)
      setPosts(postData)
    }
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts())
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <div className={styles.container}>
      <h1>Posts!</h1>
      {
        posts.map(post => (
          <Link href={`/posts/${post.id}`}>
            <a>
              <h2>{post.title}</h2>
              <h3>Data from API: {data.name}</h3>
            </a>
          </Link>
        ))
      }
    </div>
  )
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://d2exmp6j4rjt6r.cloudfront.net/api/hello`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}