import Hero from '../assets/img/hero.gif'

export function Home() {
    return (
        <section className="home">
            <div className="top">
                <img src={Hero} />
            </div>
        </section>
    )
}