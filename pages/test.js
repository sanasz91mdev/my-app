import styles from '../styles/Home.module.css'

export default function BasicInfo({ data }) {
    console.log(data)

    return (
        <div className={styles.container}>
            <h3>Name: {data.name}</h3>
            <h3>Deparment: {data.department}</h3>
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